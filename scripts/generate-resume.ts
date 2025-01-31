import { readFile, writeFile, mkdir } from 'fs/promises';
import { chromium } from 'playwright-chromium';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { PDFDocument } from 'pdf-lib'; // Import pdf-lib for post-processing

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePdf() {
  const pubDir = './public';
  const pdfSettings = {
    initSettings: {
      width: '8.5in',
      height: '11in',
      printBackground: true
    },
    path: join(pubDir, 'adam-knee-resume.pdf'),
    htmlSource: join(__dirname, '../dist/resume/index.html'),
    desiredPageCount: 2,
    defaultFontSize: 1.0,
    multiPageSpacerHeight: 12 // Spacer height in pixels
  };

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlContent = await readFile(pdfSettings.htmlSource, 'utf8');

  let fontSize = pdfSettings.defaultFontSize; // Initial font size in em
  let pageCount = 0;
  let finalPdfBuffer;

  do {
    // Inject the CSS for #resume with the current font size
    const modifiedHtmlContent = `
      <style>
        #pdf {
          font-size: ${fontSize}em;
        }
      </style>
      ${htmlContent}
    `;

    // Set content with injected CSS and wait for it to load
    await page.setContent(modifiedHtmlContent, { waitUntil: 'networkidle' });

    // Generate PDF in memory
    const pdfBuffer = await page.pdf(pdfSettings.initSettings);

    // Post-process the PDF to move second-page content down
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();

    for (let i = 1; i < pages.length; i++) {
      const page = pages[i];
      // Shift the content of the page down by the spacer height
      page.translateContent(0, -pdfSettings.multiPageSpacerHeight);
    }

    // Save the updated PDF buffer
    const updatedPdfBuffer = await pdfDoc.save();

    // Load the updated PDF and get the page count
    const adjustedPdfDoc = await PDFDocument.load(updatedPdfBuffer);
    pageCount = adjustedPdfDoc.getPageCount();

    console.log(
      `Generated PDF with font-size ${fontSize}em, spacer height ${pdfSettings.multiPageSpacerHeight}px, and ${pageCount} pages.`
    );

    // Decrease font size if too many pages
    fontSize -= 0.15;

    // Save the latest PDF buffer
    finalPdfBuffer = updatedPdfBuffer;
  } while (pageCount > pdfSettings.desiredPageCount && fontSize > 0.5);

  // Ensure public directory exists
  await mkdir(pubDir, { recursive: true });

  // Save the final PDF to disk
  await writeFile(pdfSettings.path, finalPdfBuffer);

  // Close the browser
  await browser.close();

  console.log(`Final PDF generated at ${pdfSettings.path} with ${pageCount} pages.`);
}

generatePdf().catch((error) => {
  console.error('[Node]: Failed to generate PDF', error);
});
