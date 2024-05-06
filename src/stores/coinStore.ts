import { acceptHMRUpdate, defineStore } from "pinia";
import { AvailablePairs } from "@/types/coins.ts";
import axios from "axios";
import { IChangeLogItem } from "@/types/IChangeLogItem.ts";
import { getCurrentDate } from "@/utils/helper.ts";

export const useCoinStore = defineStore('coinStore', {
    state: () => ({
        activePair: <AvailablePairs>'BTCUSDT',
        changeLog: <IChangeLogItem[]>[],
    }),
    getters: {},
    actions: {
        setActivePair(pair: AvailablePairs)  {
            const changeItem: IChangeLogItem = {
                from: this.activePair,
                to: pair,
                date: getCurrentDate(),
            };
            this.changeLog.push(changeItem);
            this.activePair = pair;
            // axios.get(`https://api.binance.com/api/v3/exchangeInfo?symbol=${pair}`)
            // .then((response) => {
            //     console.log(response);// @TODO DudnikES
            //
            //     
            //     
            // })
        }
    },
    
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCoinStore, import.meta.hot));
}