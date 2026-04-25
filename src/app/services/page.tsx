import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Premium HVAC Services in the GTA | Heating, Cooling, & Air Quality",
  description: "Expert HVAC solutions including furnace repair, AC installation, heat pumps, and air quality systems across the GTA. Reliable 24/7 service.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
