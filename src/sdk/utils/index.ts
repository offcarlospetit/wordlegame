import jsonata from "jsonata";

// TODO: Test me
export function jsonataResponseAdapter<T, V>(
    rawRes: T,
    adapterExpression: string,
): V {
    const expression = jsonata(adapterExpression);
    return expression.evaluate(rawRes) as V;
}
