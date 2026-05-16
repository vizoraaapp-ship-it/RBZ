import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "HVAC Services Ontario | Furnace, AC, Heat Pump & Duct Cleaning | RBZ",
  description: "Expert HVAC services in Ontario — furnace repair & installation, AC repair, heat pump installation, duct cleaning, water heater services, and 24/7 emergency HVAC. Serving Toronto, Scarborough, Mississauga, Brampton, Vaughan, Markham, and all GTA areas. Licensed HVAC contractors.",
  keywords: [
    "HVAC repair services Ontario", "HVAC installation services Ontario",
    "residential HVAC services GTA", "commercial HVAC services Ontario",
    "furnace repair Ontario", "furnace installation GTA",
    "air conditioning installation Ontario", "AC repair Toronto",
    "heat pump installation Ontario", "ductless heat pump Ontario",
    "duct cleaning services Ontario", "air duct cleaning Toronto",
    "tankless water heater Canada", "water heater installation Ontario",
    "emergency HVAC services GTA", "24/7 HVAC repair Ontario",
    "licensed HVAC contractor Ontario", "local HVAC experts GTA",
    "HVAC services Toronto", "HVAC services Scarborough",
    "HVAC services Mississauga", "HVAC services Brampton"
  ],
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
