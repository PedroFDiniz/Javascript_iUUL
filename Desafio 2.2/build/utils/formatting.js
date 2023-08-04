"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatConversionRate = exports.formatValue = void 0;
function formatValue(value) {
    return value.toFixed(2);
}
exports.formatValue = formatValue;
function formatConversionRate(value) {
    return value.toFixed(6);
}
exports.formatConversionRate = formatConversionRate;
