import type { Metadata } from "next";
import ServicesHubClient from "./ServicesHubClient";

export const metadata: Metadata = {
  title: "Services — Woodex Interior, Lahore",
  description:
    "12 interior practices, one Friday-report delivery system. PKR 2,200–9,000/sqft, 98% on-time handover, 48-hour budget ranges.",
};

export default function ServicesPage() {
  return <ServicesHubClient />;
}
