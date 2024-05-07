import { IServerData } from "@/types/IServerResponse.ts";
import { IOrderBookItem } from "@/types/IOrderBookItem.ts";
import { IWSData } from "@/types/IWSResponse.ts";

export function getCurrentDate() {
    let date = new Date();
    return (
        [
            padTwoDigits(date.getHours()),
            padTwoDigits(date.getMinutes()),
            padTwoDigits(date.getSeconds()),
        ].join(":") + " " +
        [
            padTwoDigits(date.getDate()),
            padTwoDigits(date.getMonth() + 1),
            date.getFullYear(),
        ].join("/")
    );
}

export function getOrderBookItem(data: IServerData | IWSData): {[key: string]: IOrderBookItem} {
    let ask: IOrderBookItem | null = null;
    let bid: IOrderBookItem| null = null
    if ('symbol' in data) {
        ask = {
            symbol: data.symbol,
            price: parseToNumber(data.askPrice),
            qty: parseToNumber(data.askQty),
        };

        bid = {
            symbol: data.symbol,
            price: parseToNumber(data.bidPrice),
            qty: parseToNumber(data.bidQty),
        }
    } else {
        ask  = {
            symbol: data.s,
            price: parseToNumber(data.a),
            qty: parseToNumber(data.A),
        };

        bid = {
            symbol: data.s,
            price: parseToNumber(data.b),
            qty: parseToNumber(data.B),
        }
    }
    
    return {
        ask,
        bid
    };
}

export const getWSUrl = (coinsPair: string) => `wss://stream.binance.com:9443/ws/${coinsPair.toLocaleLowerCase()}@bookTicker`;

function padTwoDigits(num: number) {
    return num.toString().padStart(2, "0");
}

function parseToNumber(str: string) {
    return + parseFloat(str).toFixed(2);
}