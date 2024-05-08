import { defineStore } from "pinia";
import { IOrderBookItem } from "@/types/IOrderBookItem.ts";
import { getOrderBookItem, getWSUrl } from "@/utils/helper.ts";
import { IWSData, IWSResponse } from "@/types/IWSResponse.ts";

export const useOrderBookStore = defineStore('orderBookStore', {
    state: () => ({
        askItems: <IOrderBookItem[]>[],
        bidItems: <IOrderBookItem[]>[],
        askLimit: 100,
        bidLimit: 100,
        WSClient: <WebSocket | null>null,
    }),
    getters: {
        hasOrderBook: (state) => state.askItems.length > 0,
        getAskItems: (state) => state.askItems.slice(0, state.askLimit),
        getBidItems: (state) => state.bidItems.slice(0, state.bidLimit),
    },
    actions: {
        clearData() {
            this.askItems = [];
            this.bidItems = [];
        },
        setAskLimit(limit: number) {
            this.askLimit = limit;
        },
        setBidLimit(limit: number) {
            this.bidLimit = limit;
        },
        addItem(type: string, item: IOrderBookItem){
            if (type === 'ask') {
                this.askItems.unshift(item);
            }
            
            if (type === 'bid') {
                this.bidItems.unshift(item);
            }
        },
        subscribe(activePair: string) {
            if (this.WSClient) {
                this.WSClient.close();
            }

            this.WSClient = new WebSocket(getWSUrl(activePair));
            this.WSClient.onmessage = (event: IWSResponse) => {
                const data: IWSData = JSON.parse(event.data);
                const orderBookItems = getOrderBookItem(data);

                this.addItem('ask', orderBookItems.ask);
                this.addItem('bid', orderBookItems.bid);

                if (this.askItems.length > this.askLimit) {
                    this.askItems.length = this.askLimit;
                }
                if (this.bidItems.length > this.bidLimit) {
                    this.bidItems.length = this.bidLimit;
                }
            }
        }
    }
});