/*jshint node: true*/

var root = process.cwd();

var fs = require('fs'),
    PDFParser = require("pdf2json/pdfparser"),
    pageUtil = require('./pageUtil'),
    htmlMaker = require('./htmlMaker');

module.exports = function (pathToPdf, categories, pageTitle, pagesDataKey, dir) {
    var pdfParser = new PDFParser();

    // denne bør bare returnere grid
    // løses med ett async/promise biblotek
    pdfParser.on("pdfParser_dataReady", function (pdfData) {
        var grid = [];

        pdfData.data.Pages.forEach(function (page) {
            page.Texts.forEach(pageUtil.extractRows(grid));
        });

        var workGrid = pageUtil.mapRow(grid, grid[2]);

        var pagesData = pageUtil.extractData2(workGrid, categories);

        htmlMaker(dir, {
            title: pageTitle,
            headerRow: grid[2],
            people: pagesData[pagesDataKey],
            lastUpdate: pagesData.lastUpdate
        });
    });

    pdfParser.on("pdfParser_dataError", function (data) {
        console.log('error reading: ' + pathToPdf);
    });

    fs.readFile(pathToPdf, function (err, pdfBuffer) {
        if (!err) {
            pdfParser.parseBuffer(pdfBuffer);
        }
    });
};