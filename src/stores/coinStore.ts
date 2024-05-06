import { acceptHMRUpdate, defineStore } from "pinia";

export const useCoinStore = defineStore('CoinStore', {
    state: () => {
        return {
            
        }
    },
    getters: {},
    actions: {},
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCoinStore, import.meta.hot));
}