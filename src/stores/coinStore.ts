import { acceptHMRUpdate, defineStore } from "pinia";
import { AvailablePairs } from "@/types/coins.ts";
import axios from "axios";
import { IChangeLogItem } from "@/types/IChangeLogItem.ts";
import { getCurrentDate, getOrderBookItem } from "@/utils/helper.ts";
import { IServerResponse } from "@/types/IServerResponse.ts";
import { useOrderBookStore } from "@/stores/orderBookStore.ts";

export const useCoinStore = defineStore('coinStore', {
    state: () => ({
        activePair: <AvailablePairs>'BTCUSDT',
        changeLog: <IChangeLogItem[]>[],
        isLoading: false,
    }),
    getters: {
        getLogs: (state) => state.changeLog,
        hasLogs: (state) => state.changeLog.length > 0,
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
            this.getPairData();
        },
        getPairData() {
            this.isLoading = true;
            const orderBookStore = useOrderBookStore();
            orderBookStore.clearData();
            axios.get(`https://api.binance.com/api/v3/ticker/bookTicker?symbol=${this.activePair}`)
                .then((response: IServerResponse) => {
                    const { data } = response;
                    const orderBookItems = getOrderBookItem(data);

                    orderBookStore.addItem('ask', orderBookItems.ask);
                    orderBookStore.addItem('bid', orderBookItems.bid);
                    orderBookStore.subscribe(this.activePair); 
                })
                .catch((e) => {
                    console.error(e);
                })
                .finally(() => {
                    this.isLoading = false;
                })
            ;
        },
    },
    
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCoinStore, import.meta.hot));
}