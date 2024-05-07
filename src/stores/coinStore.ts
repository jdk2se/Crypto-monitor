import { acceptHMRUpdate, defineStore } from "pinia";
import { AvailablePairs } from "@/types/coins.ts";
import axios from "axios";
import { IChangeLogItem } from "@/types/IChangeLogItem.ts";
import { getCurrentDate, getOrderBookItem } from "@/utils/helper.ts";
import { IServerResponse } from "@/types/IServerResponse.ts";
import { IOrderBookItem } from "@/types/IOrderBookItem.ts";

export const useCoinStore = defineStore('coinStore', {
    state: () => ({
        activePair: <AvailablePairs>'BTCUSDT',
        changeLog: <IChangeLogItem[]>[],
        isLoading: false, // @TODO DudnikES preloader
        askItems: <IOrderBookItem[]>[],
        bidItems: <IOrderBookItem[]>[],
    }),
    getters: {
        getLogs: (state) => state.changeLog,
        hasLogs: (state) => state.changeLog.length > 0,
        hasOrderBook: (state) => state.askItems.length > 0,
        getAskItems: (state) => {
            return (limit = 100) => state.askItems.slice(0, limit)
        },
        getBidItems: (state) => {
            return (limit = 100) => state.bidItems.slice(0, limit)
        },
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
            this.getPairData();           
        },
        getPairData() {
            axios.get(`https://api.binance.com/api/v3/ticker/bookTicker?symbol=${this.activePair}`)
                .then((response: IServerResponse) => {
                    const { data } = response;
                    const orderBookItems = getOrderBookItem(data);

                    this.askItems.push(orderBookItems.ask);
                    this.bidItems.push(orderBookItems.bid);
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    },
    
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCoinStore, import.meta.hot));
}