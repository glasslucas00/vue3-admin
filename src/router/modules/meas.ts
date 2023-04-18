import type { AppRouteType } from "@/router/types";

const meas: AppRouteType[] = [
    {
        path: "/meas",
        name: "Meas",
        component: () => import("@/layouts/index.vue"),
        redirect: "/meas/filter",
        meta: {
            icon: "svg-dashboard",
            title: "测量数据",
            sort: 1
        },
        children: [
            {
                path: "table",
                name: "Table",
                component: () => import("@/views/meas/MeasSearch/index.vue"),
                meta: {
                    title: "测量数据表格",
                    sort: 0,
                    icon: "",
                    keepAlive: true,
                    hidden: true
                }
            },
            {
                path: "chart",
                name: "Chart",
                component: () => import("@/views/meas/MeasChart/index.vue"),
                meta: {
                    title: "测量数据图表",
                    sort: 2,
                    icon: "",
                    keepAlive: true
                }
            },
            {
                path: "filter",
                name: "Filter",
                component: () => import("@/views/meas/MeasFilter/index.vue"),
                meta: {
                    title: "测量数据查询",
                    sort: 1,
                    icon: "",
                    keepAlive: true
                }
            }
        ]
    }
];

export default meas;
