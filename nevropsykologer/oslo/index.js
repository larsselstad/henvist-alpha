/*jshint node: true*/

var root = process.cwd();

var pdfToHtml = require(root + '/src/pdfToHtml');

var pathToPdf = root + "/data/Psykologer_Oslo_telefonliste.pdf";

var corrections = {
    phone: {
        '2491197': '22491197',
        '8174959': '48174959'
    }
};

pdfToHtml({
    categories: {
        'Psykologer:': 'Psykologer:',
        'Nevropsykologer:': 'Nevropsykologer:'
    },
    dir: __dirname,
    pageTitle: 'Nevropsykologer i Oslo',
    pagesDataKey: 'Nevropsykologer:',
    pathToPdf: pathToPdf,
    headerIndex: 2
});