/*jshint node: true*/

function runTest(testObj) {
    for (var test in testObj) {
        if (testObj.hasOwnProperty(test)) {
            testObj[test]();
        }
    }
}

runTest(require('./pdf.test'));