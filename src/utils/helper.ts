import { IServerData } from "@/types/IServerResponse.ts";
import { IOrderBookItem } from "@/types/IOrderBookItem.ts";

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

export function getOrderBookItem(data: IServerData): {[key: string]: IOrderBookItem} {
    const ask: IOrderBookItem = {
        symbol: data.symbol,
        price: parseToNumber(data.askPrice),
        qty: parseToNumber(data.askQty),        
    };
    
    const bid: IOrderBookItem = {
        symbol: data.symbol,
        price: parseToNumber(data.bidPrice),
        qty: parseToNumber(data.bidQty),
    }
    
    return {
        ask,
        bid
    };
}

function padTwoDigits(num: number) {
    return num.toString().padStart(2, "0");
}

function parseToNumber(str: string) {
    return + parseFloat(str).toFixed(2);
}