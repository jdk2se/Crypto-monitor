import { acceptHMRUpdate, defineStore } from "pinia";
import { AvailablePairs } from "@/types/coins.ts";
import axios from "axios";
import { IChangeLogItem } from "@/types/IChangeLogItem.ts";
import { getCurrentDate, getOrderBookItem, getWSUrl } from "@/utils/helper.ts";
import { IServerResponse } from "@/types/IServerResponse.ts";
import { IOrderBookItem } from "@/types/IOrderBookItem.ts";
import { IWSData, IWSResponse } from "@/types/IWSResponse.ts";

export const useCoinStore = defineStore('coinStore', {
    state: () => ({
        activePair: <AvailablePairs>'BTCUSDT',
        changeLog: <IChangeLogItem[]>[],
        isLoading: false, 
        askItems: <IOrderBookItem[]>[],
        bidItems: <IOrderBookItem[]>[],
        askLimit: 100,
        bidLimit: 100,
        WSClient: <WebSocket | null>null,
    }),
    getters: {
        getLogs: (state) => state.changeLog,
        hasLogs: (state) => state.changeLog.length > 0,
        hasOrderBook: (state) => state.askItems.length > 0,
        getAskItems: (state) => state.askItems.slice(0, state.askLimit),
        getBidItems: (state) => state.bidItems.slice(0, state.bidLimit),
    },
    actions: {
        setActivePair(pair: AvailablePairs)  {
            const changeItem: IChangeLogItem = {
                from: this.activePair,
                to: pair,
                date: getCurrentDate(),
            };
            this.changeLog.unshift(changeItem);
            this.activePair = pair;
            this.askItems = [];
            this.bidItems = [];
        },
        getPairData() {            
            axios.get(`https://api.binance.com/api/v3/ticker/bookTicker?symbol=${this.activePair}`)
                .then((response: IServerResponse) => {
                    const { data } = response;
                    const orderBookItems = getOrderBookItem(data);

                    this.askItems.unshift(orderBookItems.ask);
                    this.bidItems.unshift(orderBookItems.bid);
                    this.subscribe(); 
                })
                .catch((e) => {
                    console.error(e);
                })
                .finally(() => {
                    this.isLoading = false;
                })
            ;
        },
        setAskLimit(limit: number) {
            this.askLimit = limit;
        },
        setBidLimit(limit: number) {
            this.bidLimit = limit;
        },
        subscribe() {
            if (this.WSClient) {
                this.WSClient.close();
            }
            
            this.WSClient = new WebSocket(getWSUrl(this.activePair));
            this.WSClient.onmessage = (event: IWSResponse) => {
                const data: IWSData = JSON.parse(event.data);        
                const orderBookItems = getOrderBookItem(data);
                
                this.askItems.unshift(orderBookItems.ask);
                this.bidItems.unshift(orderBookItems.bid);
                
                if (this.askItems.length > this.askLimit) {
                    this.askItems.pop();
                }
                if (this.bidItems.length > this.bidLimit) {
                    this.bidItems.pop();
                }
            }
        }
    },
    
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCoinStore, import.meta.hot));
}