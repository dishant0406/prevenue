import { COMPANY_INFO } from "./company";

export const STATS = [
    {
        title: "Revenue Recovered",
        value: COMPANY_INFO.metrics.revenueRecovered,
        icon: "/icons/moon.svg"
    },
    {
        title: "No-Show Reduction Rate",
        value: COMPANY_INFO.metrics.noShowReduction,
        icon: "/icons/stars.svg"
    },
    {
        title: "Practices Protected",
        value: COMPANY_INFO.metrics.practicesServed,
        icon: "/icons/edit.svg"
    }
];
