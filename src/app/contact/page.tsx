import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact HVAC Experts in Ontario | RBZ Climate Solutions",
  description: "Contact RBZ Climate Solutions for reliable HVAC services in Ontario. Call or book your service today.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
