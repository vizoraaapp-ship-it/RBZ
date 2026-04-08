import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with RBZ Climate Solutions for expert HVAC services in Ontario. We offer 24/7 support for furnace, AC, and heat pump repairs.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
