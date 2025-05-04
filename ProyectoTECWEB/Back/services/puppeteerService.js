import puppeteer from 'puppeteer';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Para manejar __dirname con módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta a la carpeta de templates
const templatesPath = path.join(__dirname, '../templates');

const generarPDF = async (templateName, data, outputPath = null) => {
  try {
    const templateFile = path.join(templatesPath, `${templateName}.ejs`);

    const html = await ejs.renderFile(templateFile, data, { async: true });

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' }
    });

    await browser.close();

    // Si se desea guardar en el servidor
    if (outputPath) {
      fs.writeFileSync(outputPath, pdfBuffer);
    }

    return pdfBuffer;
  } catch (error) {
    console.error('❌ Error al generar PDF:', error);
    throw error;
  }
};

export default generarPDF;
