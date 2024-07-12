const fs = require("fs");
const handlebars = require("handlebars");
const puppeteer = require("puppeteer-core");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium",
  });

  const page = await browser.newPage();

  // Read template file
  const templatePath = path.join(__dirname, "templates", "1.html");
  const templateHtml = fs.readFileSync(templatePath, "utf-8");
  const template = handlebars.compile(templateHtml);

  // Generate HTML with data
  const html = template({
    name: "John Doe",
    email: "john.doe@example.com",
    // ... other data
  });

  await page.setContent(html, { waitUntil: "networkidle0" });

  // Generate PDF
  await page.pdf({
    path: "cv.pdf",
    format: "A4",
    printBackground: true,
  });

  await browser.close();
})();
