import { chromium } from "playwright-chromium";
import { ensureDir } from "@std/fs";

const resumeStyles = `
  body {
      padding: 2rem;
      color: #282828l
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

export async function generatePDF() {
  // Launch Playwright and generate the PDF
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const pubDir = "./public";
  const path = `${pubDir}/adam-knee-resume.pdf`;

  // Set content and wait for it to load
  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  // Ensure public directory exists
  await ensureDir(pubDir);

  // Generate PDF
  await page.pdf({ format: "A4", path });

  // Close the browser
  await browser.close();

  console.log(`PDF generated at: ${path}`);
}

generatePDF().catch((error) =>
  console.error("[Deno]: Failed to generate PDF", error)
);
