'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PrivacyPolicy = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-[104px] md:pt-[156px] pb-20">
        <Section background="surface">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <button 
                onClick={() => router.back()}
                className="group flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-8 hover:text-secondary transition-colors"
              >
                <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
                Back
              </button>
              <h1 className="text-4xl md:text-6xl font-black text-primary mb-8 tracking-tight">Privacy Policy</h1>
              <div className="prose prose-lg max-w-none text-on-surface-variant font-medium leading-relaxed space-y-6">
                <p>
                  <strong>RBZ Climate Solutions Inc.</strong> (“we”, “our”, or “us”) is committed to protecting your personal information in accordance with applicable Canadian privacy laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA).
                </p>

                <h2 className="text-2xl font-black text-primary mt-8">1. Information We Collect</h2>
                <p>We may collect personal information necessary to operate our HVAC business, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact details (name, phone, email, service/property address)</li>
                  <li>Billing and payment information</li>
                  <li>Equipment details, service history, and property-related information</li>
                  <li>Identification details where required for financing or agreements</li>
                  <li>Any information you provide directly to us</li>
                </ul>

                <h2 className="text-2xl font-black text-primary mt-8">2. Purpose of Collection</h2>
                <p>We collect and use your information for legitimate business purposes, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Providing HVAC installation, repair, maintenance, and emergency services</li>
                  <li>Managing service agreements, rentals, and maintenance contracts</li>
                  <li>Processing payments, financing applications, and credit-related services</li>
                  <li>Communicating appointments, estimates, and service updates</li>
                  <li>Complying with legal, regulatory, and safety requirements</li>
                </ul>
                <p>Your consent is obtained where required, and you may withdraw consent subject to legal or contractual limitations.</p>

                <h2 className="text-2xl font-black text-primary mt-8">3. HVAC Financing, Rentals & Contracts</h2>
                <p>Where you enter into financing, rental, or maintenance agreements:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Additional personal and financial information may be collected to assess eligibility</li>
                  <li>Information may be shared with third-party financing providers or payment processors</li>
                  <li>Contract performance, billing, and service records will be maintained for operational and legal purposes</li>
                </ul>

                <h2 className="text-2xl font-black text-primary mt-8">4. Disclosure of Information</h2>
                <p>We do not sell personal information. We may disclose it only when necessary to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Authorized employees, contractors, and service partners</li>
                  <li>Financing institutions and payment processors</li>
                  <li>Legal authorities where required by law or to protect our rights</li>
                </ul>
                <p>Information may be processed or stored outside Ontario or Canada, and may be subject to foreign laws.</p>

                <h2 className="text-2xl font-black text-primary mt-8">5. Cookies & Website Use</h2>
                <p>Our website uses cookies and similar technologies to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Analyze website traffic and performance</li>
                  <li>Improve user experience and functionality</li>
                  <li>Support marketing and advertising efforts</li>
                </ul>
                <p>By using our website, you consent to the use of cookies. You may manage or disable cookies through your browser settings; however, this may affect website functionality.</p>

                <h2 className="text-2xl font-black text-primary mt-8">6. Data Protection & Retention</h2>
                <p>We implement reasonable physical, technical, and administrative safeguards to protect personal information. Information is retained only as long as necessary for business or legal purposes and is securely destroyed when no longer required.</p>

                <h2 className="text-2xl font-black text-primary mt-8">7. Your Rights</h2>
                <p>Under PIPEDA, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Request access to your personal information</li>
                  <li>Request corrections if information is inaccurate</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
                <p>Requests must be submitted in writing, and identity verification may be required.</p>

                <h2 className="text-2xl font-black text-primary mt-8">8. Limitation of Liability</h2>
                <p>While we take reasonable measures to safeguard your personal information, RBZ Climate Solutions Inc. cannot guarantee absolute security. To the fullest extent permitted by law, we are not liable for any unauthorized access, loss, or misuse of personal information resulting from circumstances beyond our control, including cyber incidents, third-party breaches, or system failures.</p>

                <h2 className="text-2xl font-black text-primary mt-8">9. Updates to This Policy</h2>
                <p>We may update this Privacy Policy periodically. The latest version will always be posted on our website.</p>

                <h2 className="text-2xl font-black text-primary mt-8">10. Contact Information</h2>
                <p>For privacy-related inquiries or requests:</p>
                <p>
                  <strong>RBZ Climate Solutions Inc.</strong><br />
                  Email: <a href="mailto:info@rbzclimatesolutions.com" className="text-primary hover:underline">info@rbzclimatesolutions.com</a>
                </p>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
