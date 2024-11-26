import * as path from 'path';
import { chromium } from 'playwright-chromium';
import { promises as fs } from 'fs';

async function generatePdf() {
  const pubDir = './public';
  const pdfPath = path.join(pubDir, 'adam-knee-resume.pdf');
  const pdfSettings = { format: 'A4', path: pdfPath, printBackground: true };

  const resumeHTMLPath = path.join(__dirname, './resume/index.html');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlContent = await fs.readFile(resumeHTMLPath, 'utf8');

  // Set content and wait for it to load
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });

  // Ensure public directory exists
  await fs.mkdir(pubDir, { recursive: true });

  // Generate PDF
  await page.pdf(pdfSettings);

  // Close the browser
  await browser.close();

  console.log(`PDF generated at: ${pdfPath}`);
}

generatePdf().catch((error) => {
  console.error('[Node]: Failed to generate PDF', error);
});
