import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About RBZ Climate Solutions | Trusted HVAC Company Ontario & GTA",
  description: "RBZ Climate Solutions is a licensed HVAC company in Ontario with over 10 years of experience. We provide trusted heating and cooling services across Toronto, Scarborough, GTA, and surrounding areas. Certified, insured, and committed to your comfort.",
  keywords: [
    "trusted HVAC company Toronto", "best HVAC company Ontario",
    "licensed HVAC contractor Canada", "HVAC company GTA",
    "RBZ Climate Solutions Ontario", "heating and cooling company GTA",
    "professional HVAC technicians Ontario", "HVAC experts Scarborough"
  ],
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
