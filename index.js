const express = require('express')
const fs = require("fs")
const app = express()
const port = 3000

const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function modifyPdf(dateParam) {
const existingPdfBytes = fs.readFileSync('./template.pdf');


  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const textWidth=200;
  const textHeight=50;
  const { width, height } = firstPage.getSize();

  firstPage.drawRectangle({
    x: 105,
    y: height-100,
    width: textWidth,
    height: textHeight,
    color: rgb(1, 1, 1),
  })
  firstPage.drawText(dateParam, {
    x: 105,
    y: height-92,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('./modifytemplate.pdf', pdfBytes);
}

//'June 29th, 2022'
//modifyPdf();
app.get('/', (req, res) => {
    modifyPdf(req.query.dateParam);
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})