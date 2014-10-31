/*jshint node: true*/

var root = process.cwd();

var pdfToHtml = require(root + '/src/pdfDataToHtml');

var pathToPdf = __dirname + "/Psykologer_Akershus_telefonliste.pdf";

pdfToHtml(pathToPdf, {
    'Psykologer:': 'Psykologer:',
    'Nevropsykologer:': 'Nevropsykologer:'
}, 'Psykologer', 'Psykologer:', __dirname);