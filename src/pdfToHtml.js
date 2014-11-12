/*jshint node: true*/

var root = process.cwd();

var fs = require('fs'),
    PDFParser = require("pdf2json/pdfparser"),
    pageUtil = require('./pageUtil'),
    htmlMaker = require('./htmlMaker');

module.exports = function (params) {
    var pdfParser = new PDFParser();

    // denne bør bare returnere grid
    // løses med ett async/promise biblotek
    pdfParser.on("pdfParser_dataReady", function (pdfData) {
        console.log('Reading file: ' + params.pathToPdf);

        var grid = [];

        pdfData.data.Pages.forEach(function (page) {
            page.Texts.forEach(pageUtil.extractRows(grid));
        });

        //console.log(grid);
        
        var workGrid = grid.map(pageUtil.joinCells).map(pageUtil.mapRow(params.headerIndex));

        //console.log(workGrid);
        
        console.log('Headerrow: ' + workGrid[params.headerIndex]);

        var pagesData = pageUtil.extractData2(workGrid, params.categories);

        htmlMaker(params.dir, {
            title: params.pageTitle,
            headerRow: workGrid[params.headerIndex],
            people: pagesData[params.pagesDataKey],
            lastUpdate: pagesData.lastUpdate
        });
        
        console.log('---');
    });

    pdfParser.on("pdfParser_dataError", function (data) {
        console.log('error reading: ' + params.pathToPdf);
    });

    fs.readFile(params.pathToPdf, function (err, pdfBuffer) {
        if (!err) {
            pdfParser.parseBuffer(pdfBuffer);
        } else {
            console.error('Error reading file: ' + params.pathToPdf);
        }
    });
};