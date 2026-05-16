import { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "HVAC Careers in Ontario | HVAC Technician Jobs GTA | RBZ Climate Solutions",
  description: "Join RBZ Climate Solutions — a leading HVAC company in Ontario. We're hiring certified HVAC technicians, installers, and service professionals in Toronto, Scarborough, Mississauga, and across the GTA. Apply for heating and cooling careers today.",
  keywords: [
    "HVAC jobs Ontario", "HVAC technician jobs Toronto",
    "HVAC careers GTA", "heating and cooling jobs Ontario",
    "HVAC installer jobs Canada", "HVAC service technician GTA",
    "HVAC company hiring Ontario", "RBZ Climate Solutions careers"
  ],
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
