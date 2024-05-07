export interface IServerResponse {
    data: IServerData;   
}

export interface IServerData {
    askPrice: string;
    askQty: string;
    bidPrice: string;
    bidQty: string;
    symbol: string;
}