function formatValue(value:number):string {
    return value.toFixed(2);
}

function formatConversionRate(value:number):string {
    return value.toFixed(6);
}

export { formatValue, formatConversionRate };