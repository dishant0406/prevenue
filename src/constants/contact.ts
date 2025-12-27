import { MailIcon, MapPinIcon } from "lucide-react";
import { COMPANY_INFO } from "./company";

export const CONTACT_CARDS = [
    {
        title: `${COMPANY_INFO.name} Address`,
        value: "Bangalore, India",
        icon: MapPinIcon
    },
    {
        title: "Email Address",
        value: COMPANY_INFO.email.hello,
        icon: MailIcon
    }
] as const;
