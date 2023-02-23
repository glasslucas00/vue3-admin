import type { AppRouteType } from "@/router/types";
import LAYOUT from "@/layouts/index.vue";

const func: AppRouteType[] = [
    {
        path: "/func",
        name: "func",
        component: LAYOUT,
        redirect: "/func/draggable",
        meta: {
            title: "功能",
            icon: "svg-func",
            sort: 3,
            permission: "admin_func"
        },
        children: [
            {
                path: "draggable",
                name: "Draggable",
                component: () => import("@/views/func/draggable/index.vue"),
                meta: {
                    title: "拖拽",
                    sort: 1,
                    permission: "admin_func_draggable",
                    icon: ""
                }
            },
            {
                path: "darg-resize",
                name: "DragResize",
                component: () => import("@/views/func/drag-resize/index.vue"),
                meta: {
                    title: "拖拽缩放",
                    sort: 2,
                    permission: "admin_func_drag_resize",
                    icon: ""
                }
            },
            {
                path: "watermark",
                name: "Watermark",
                component: () => import("@/views/func/watermark/index.vue"),
                meta: {
                    title: "水印",
                    sort: 3,
                    permission: "admin_func_watermark",
                    icon: ""
                }
            },
            {
                path: "message",
                name: "Message",
                component: () => import("@/views/func/message/index.vue"),
                meta: {
                    title: "Message",
                    sort: 4,
                    permission: "admin_func_message",
                    icon: ""
                }
            },
            {
                path: "axios",
                name: "Axios",
                component: () => import("@/views/func/axios/index.vue"),
                meta: {
                    title: "Axios",
                    sort: 5,
                    permission: "admin_func_axios",
                    icon: ""
                }
            }
        ]
    }
];

export default func;
