import type { AppRouteType } from "@/router/types";

const abnorm: AppRouteType[] = [
    {
        path: "/abnorm",
        name: "abnorm",
        component: () => import("@/layouts/index.vue"),
        redirect: "/abnorm/table2",
        meta: {
            title: "异常数据",
            icon: "svg-nested",
            sort: 2
        },
        children: [
            {
                path: "table2",
                name: "Table2",
                component: () => import("@/views/abnorm/abnormSearch/index.vue"),
                meta: {
                    title: "异常数据表格",
                    sort: 0,
                    icon: "",
                    keepAlive: true
                }
            },
            {
                path: "chart2",
                name: "Chart2",
                component: () => import("@/views/abnorm/abnormChart/index.vue"),
                meta: {
                    title: "异常数据图表",
                    sort: 1,
                    icon: "",
                    keepAlive: true
                }
            },
            {
                path: "searchXG",
                name: "SearchXG",
                component: () => import("@/views/abnorm/abnormSearchXG/index.vue"),
                meta: {
                    title: "悬挂异常",
                    sort: 2,
                    icon: ""
                }
            }
        ]
    }
];

export default abnorm;
