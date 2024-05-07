export interface IWSResponse {
    data: string;
}

export interface IWSData {
    A: string; // best ask qty
    B: string; // best bid qty
    a: string; // best ask price
    b: string; // best bid price
    s: string; // symbol
    u: number; // order book updateId
}