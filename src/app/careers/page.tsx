import { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Join Our Expert Team | HVAC Careers in the GTA",
  description: "Explore career opportunities at RBZ Climate Solutions. We're looking for dedicated HVAC technicians, installers, and professionals in the GTA.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
