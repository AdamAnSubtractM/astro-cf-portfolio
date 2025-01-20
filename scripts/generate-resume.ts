import { readFile, mkdir } from 'fs/promises';
import { chromium } from 'playwright-chromium';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePdf() {
  const pubDir = './public';
  const pdfPath = join(pubDir, 'adam-knee-resume.pdf');
  const pdfSettings = {
    width: '8.5in',
    height: '11in',
    path: pdfPath,
    printBackground: true
  };

  const resumeHTMLPath = join(__dirname, '../dist/resume/index.html');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlContent = await readFile(resumeHTMLPath, 'utf8');

  // Set content and wait for it to load
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });

  // Ensure public directory exists
  await mkdir(pubDir, { recursive: true });

  // Generate PDF
  await page.pdf(pdfSettings);

  // Close the browser
  await browser.close();

  console.log(`PDF generated at: ${pdfPath}`);
}

generatePdf().catch((error) => {
  console.error('[Node]: Failed to generate PDF', error);
});
