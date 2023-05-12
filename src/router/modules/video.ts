import type { AppRouteType } from "@/router/types";

const abnorm: AppRouteType[] = [
    {
        path: "/video",
        name: "video",
        component: () => import("@/layouts/index.vue"),
        redirect: "/video/video",
        meta: {
            title: "受电弓",
            icon: "svg-nested",
            sort: 2,
            permission: "admin_system"
        },
        children: [
            {
                path: "video",
                name: "Video",
                component: () => import("@/views/videos/index.vue"),
                meta: {
                    title: "受电弓实时视频",
                    sort: 0,
                    icon: "",
                    permission: "admin_system_user"
                }
            }
        ]
    }
];

export default abnorm;
