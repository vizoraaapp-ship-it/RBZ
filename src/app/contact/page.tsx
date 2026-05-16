import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact HVAC Experts Ontario | Book Furnace, AC & Heat Pump Service | RBZ",
  description: "Contact RBZ Climate Solutions for professional HVAC services in Ontario and the GTA. Book furnace repair, AC installation, heat pump service, or emergency HVAC repair in Toronto, Scarborough, Mississauga, Brampton, Vaughan, and Markham.",
  keywords: [
    "contact HVAC company Ontario", "book HVAC service Toronto",
    "HVAC near me GTA", "HVAC technicians near me Ontario",
    "emergency HVAC repair Toronto", "same day HVAC service GTA",
    "furnace repair booking Ontario", "AC installation quote Toronto",
    "heat pump installation contact GTA", "RBZ Climate Solutions contact"
  ],
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
