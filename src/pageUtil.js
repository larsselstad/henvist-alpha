/*jshint node: true*/
function almostEqual(a, b) {
    return a === b || a === (b + 1) || a === (b - 1);
}

function findIndex(array, xValue) {
    var lastIndex = 0;

    for (var i = 0; i < array.length; i++) {
        if ((array[i].x - 1) <= xValue) {
            lastIndex = i;
        } else {
            break;
        }
    }

    return lastIndex;
}

function formatPhoneNumber(phoneNumber) {
    var firstChar = phoneNumber.substr(0, 1);

    if (firstChar === '2' || firstChar === '8') {
        return phoneNumber.substr(0, 2) + ' ' + phoneNumber.substr(2, 2) + ' ' + phoneNumber.substr(4, 2) + ' ' + phoneNumber.substr(6, 2);
    } else if (firstChar === '9' || firstChar === '4') {
        return phoneNumber.substr(0, 3) + ' ' + phoneNumber.substr(3, 2) + ' ' + phoneNumber.substr(5);
    } else {
        return 'PhoneNumber not changed: "' + phoneNumber + '"';
    }
}

var pageUtil = {
    extractRows: function (grid) {
        var lastY,
            rowArray;

        return function (textValue) {
            var text = decodeURIComponent(textValue.R[0].T).trim();
            var circaX = parseInt(textValue.x, 10);
            var circaY = Math.round(parseFloat(textValue.y) * 10);

            if (!almostEqual(lastY, circaY)) {
                rowArray = [];

                grid.push(rowArray);
            }

            rowArray.push({
                text: text,
                x: circaX
            });

            lastY = circaY;
        };
    },

    mapRow: function (grid, masterRow) {
        return grid.map(function (row) {
            var rowArray = new Array(masterRow.length);

            row.forEach(function (el) {
                rowArray[findIndex(masterRow, el.x)] = el.text;
            });

            return rowArray;
        });
    },

    extractData2: function (grid, categories) {
        if (!grid) {
            throw new TypeError('extractData needs grid');
        }
        if (!categories) {
            throw new TypeError('extractData needs categories');
        }

        var pageUtil = this,
            data = {},
            currentCategory;

        grid.forEach(function (row, i) {
            var r = row.filter(function (el) {
                return el !== '';
            });

            if (r.length === 1 && i === 0) {
                //console.log('Legger inn sist endret');

                data.lastUpdate = r[0];
            } else if (r.length === 1) {
                //console.log('1 celle: ' + r);

                if (categories.hasOwnProperty(r[0])) {
                    //console.log('Legger til kategori: ' + r[0]);

                    currentCategory = r[0];

                    data[currentCategory] = [];
                }
            } else {
                if (data[currentCategory]) {
                    //console.log('Legger til rad: ' + row + ' i kategori: ' + currentCategory);
                    data[currentCategory].push(row);
                } else {
                    console.log('Rad som ikke er i en kategori: ' + row);
                }
            }
        });

        return data;
    }
};

module.exports = pageUtil;