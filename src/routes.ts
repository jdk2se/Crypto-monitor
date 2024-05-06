import Home from "@/pages/Home.vue";
import Settings from "@/pages/Settings.vue";
import OrderBook from "@/pages/OrderBook.vue";
import NotFound from "@/pages/NotFound.vue";

export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/settings',
        component: Settings,
    },
    {
        path: '/order-book',
        component: OrderBook,
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: NotFound,
    }
];