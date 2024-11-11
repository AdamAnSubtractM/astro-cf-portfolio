import { chromium } from 'playwright-chromium';
import { promises as fs } from 'fs';
import * as path from 'path';

const resumeStyles = `
  body {
      padding: 2rem;
      color: #282828;
  }
`;

const htmlContent = `
  <html>
  <head>
    <style>
      ${resumeStyles}
    </style>
  </head>
  <body>
    <h1>My Resume</h1>
    <p>This is a generated PDF of my resume.</p>
    <!-- Add more content here as needed -->
  </body>
  </html>
`;

async function generatePDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const pubDir = './public';
  const pdfPath = path.join(pubDir, 'adam-knee-resume.pdf');

  // Set content and wait for it to load
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });

  // Ensure public directory exists
  await fs.mkdir(pubDir, { recursive: true });

  // Generate PDF
  await page.pdf({ format: 'A4', path: pdfPath });

  // Close the browser
  await browser.close();

  console.log(`PDF generated at: ${pdfPath}`);
}

generatePDF().catch((error) => {
  console.error('[Node]: Failed to generate PDF', error);
});
