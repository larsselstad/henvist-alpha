/*jshint node: true*/

var corrections = {
    phone: {
        '2491197': '22491197',
        '8174959': '48174959'
    }
};

/*jshint node: true*/

var root = process.cwd();

var pdfToHtml = require(root + '/src/pdfToHtml');

var pathToPdf = __dirname + "/Psykologer_Oslo_telefonliste.pdf";

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