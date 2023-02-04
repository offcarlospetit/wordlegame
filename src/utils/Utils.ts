export const parseNumberWithDecimal = (number: number) => {
    return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(number);
};