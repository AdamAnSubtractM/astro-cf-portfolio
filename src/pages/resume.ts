import type { APIRoute } from "astro";
import { chromium } from "playwright-chromium";

export const GET: APIRoute = async () => {
  const htmlContent = `
      <html>
        <head>
          <style>
            /* Add your CSS styles here */
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>My Resume</h1>
          <p>This is a generated PDF of my resume.</p>
          <!-- Add more content here as needed -->
        </body>
      </html>
    `;

  // Launch Playwright and generate the PDF
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set content and wait for it to load
  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  // Generate PDF
  const pdfBuffer = await page.pdf({ format: "A4" });

  // Close the browser
  await browser.close();

  // Set headers for the PDF response
  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=resume.pdf",
    },
  });
};
