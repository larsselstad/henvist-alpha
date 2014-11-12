/*jshint node: true*/
function isNewRow(a, b) {
    // a is almost equal b
    if (a === b || a === (b + 1) || a === (b - 1)) {
        return false;
    } else if (a > b && a < (b + 10)) {
        // b is slitly smaller then a
        return false;
    } else {
        return true;
    }
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

function makeTextObject(textValue) {
    return {
        text: decodeURIComponent(textValue.R[0].T).trim(),
        x: parseInt(textValue.x, 10),
        y: Math.round(parseFloat(textValue.y) * 10)
    };
}

var pageUtil = {
    extractRows: function (grid) {
        var rowY,
            rowArray;

        return function (textValue) {
            var obj = makeTextObject(textValue);

            if (isNewRow(rowY, obj.y)) {
                // add object to new row
                rowArray = [obj];

                grid.push(rowArray);

                // set y-coordinate that will be this rows y-base
                rowY = obj.y;
            } else {
                rowArray.push(obj);
            }
        };
    },

    mapRow: function (masterRowIndex) {
        return function (row, i, array) {
            var masterRow = array[masterRowIndex];
            var rowArray = new Array(masterRow.length);

            row.forEach(function (el) {
                rowArray[findIndex(masterRow, el.x)] = el.text;
            });

            return rowArray;
        };
    },

    joinCells: function (row) {
        return row.reduce(function(newRow, el, i) {
            var prevEl = newRow[i - 1];
            
            if (prevEl && (prevEl.y + 1) < el.y) {
                prevEl.text += ' ' + el.text;
            } else {
                newRow.push(el);
            }
            
            return newRow;
        }, []);
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