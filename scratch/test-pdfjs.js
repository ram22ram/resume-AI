const pdfjs = require("pdfjs-dist/legacy/build/pdf");

async function test() {
  console.log("PDFJS loaded successfully");
  console.log("Keys:", Object.keys(pdfjs));
}

test().catch(err => {
  console.error("Error loading PDFJS:", err);
});
