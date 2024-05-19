"use strict";
/**
 * Utils
 */
exports.__esModule = true;
exports.testExportData = exports.extractData = exports.parseIntSafe = exports.sanitize = void 0;
// Remove all non-alphanumeric characters from a string
var sanitize = function (fileName) {
    return fileName.trim().replace(/[^\w.-]/g, "");
};
exports.sanitize = sanitize;
/**
 * Safely parse an integer from a string
 */
var parseIntSafe = function (input) {
    var int = parseInt(input, 10);
    return Number.isNaN(int) ? 0 : int;
};
exports.parseIntSafe = parseIntSafe;
/**
 * Extract data from a filename
 */
var extractData = function (filename) {
    console.log(filename);
    var pattern = /^([a-z0-9-]+)_(\d+)x(\d+)_(\d{4})\.([a-z0-9-]+)$/i;
    var _a = filename.match(pattern), name = _a[1], width = _a[2], height = _a[3], year = _a[4], extension = _a[5];
    return {
        name: (0, exports.sanitize)(name),
        width: (0, exports.parseIntSafe)(width),
        height: (0, exports.parseIntSafe)(height),
        year: (0, exports.parseIntSafe)(year)
    };
};
exports.extractData = extractData;
/**
 * Generate a random filename
 */
var generateRandomFilename = function () {
    var name = generateRandomString(5);
    var _a = generateRandomDimensions(), width = _a.width, height = _a.height;
    var year = generateRandomInteger(2000, 2023);
    var extension = generateRandomString(3);
    return {
        full: "".concat(name, "_").concat(width, "x").concat(height, "_").concat(year, ".").concat(extension),
        name: name,
        width: width,
        height: height,
        year: year,
        extension: extension
    };
};
/**
 * Generate a random string
 */
var generateRandomString = function (randomStringLength) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789-";
    for (var i = 0; i < randomStringLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
/**
 * Generate random dimensions
 */
var generateRandomDimensions = function () { return ({
    width: generateRandomInteger(100, 1000),
    height: generateRandomInteger(100, 1000)
}); };
/**
 * Generate a random integer
 */
var generateRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * Generate test data
 */
var generateTestData = function (count) {
    return Array.from({ length: count }).map(function () { return generateRandomFilename(); });
};
/**
 * Test extractData
 */
var testExportData = function (numberOfTests) {
    var data = generateTestData(numberOfTests);
    data.forEach(function (_a) {
        var full = _a.full, name = _a.name, width = _a.width, height = _a.height, year = _a.year;
        var extractedData = (0, exports.extractData)(full);
        var isNameValid = extractedData.name === name;
        var isHeightValid = extractedData.height === height;
        var isWidthValid = extractedData.width === width;
        var isYearValid = extractedData.year === year;
        if (!isNameValid || !isHeightValid || !isWidthValid || !isYearValid) {
            throw new Error("Invalid data");
        }
    });
    return "Valid data";
};
exports.testExportData = testExportData;
console.log((0, exports.testExportData)(600));
