import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Heating & Cooling Services Ontario | HVAC Experts GTA",
  description: "Complete HVAC services including furnace, AC, heat pumps, ductwork, and water heaters in Ontario.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
