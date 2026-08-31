import React from "react";
import { Metadata } from 'next';
import Navbar from "../../components/Navbar";

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions that govern your use of stratacoms services and website.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = "June 4, 2026";

  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "use-of-services", title: "2. Use of Our Services" },
    { id: "account-terms", title: "3. Account Terms" },
    { id: "payment", title: "4. Payment and Fees" },
    { id: "intellectual-property", title: "5. Intellectual Property Rights" },
    { id: "termination", title: "6. Termination" },
    { id: "liability", title: "7. Limitation of Liability" },
    { id: "contact", title: "8. Contact Us" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-blue-100 selection:text-blue-900 pb-32">
      <Navbar />

      {/* Header Section */}
      <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 px-6 max-w-7xl mx-auto border-b border-slate-200">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-[11px] tracking-widest uppercase mb-6">
            Legal
          </div>
          <h1 className="font-heading font-extrabold text-[48px] md:text-[64px] leading-[1.05] tracking-tight text-slate-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Please read these terms and conditions carefully before using our Service.
          </p>
          <div className="mt-8 text-[13px] font-bold text-slate-400">
            LAST UPDATED: {lastUpdated}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 mt-16 flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Sticky Table of Contents */}
        <aside className="hidden lg:block w-[300px] shrink-0 sticky top-32">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
            <h4 className="font-bold text-[11px] tracking-widest text-slate-400 uppercase mb-4">Contents</h4>
            <nav className="flex flex-col gap-3">
              {sections.map((section) => (
                <a 
                  key={section.id} 
                  href={`#${section.id}`}
                  className="text-[14px] font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Text Content */}
        <main className="flex-1 max-w-3xl prose prose-slate prose-headings:font-heading prose-headings:font-bold prose-h2:text-[28px] prose-h2:text-slate-900 prose-h2:mt-12 prose-h2:mb-6 prose-p:text-[16px] prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
          
          <section id="introduction" className="scroll-mt-32">
            <h2>1. Introduction</h2>
            <p>
              These Terms of Service ("Terms") govern your access to and use of the stratacoms website, products, and services ("Services"). Please read these Terms carefully, and contact us if you have any questions. By accessing or using our Services, you agree to be bound by these Terms and by our Privacy Policy.
            </p>
          </section>

          <section id="use-of-services" className="scroll-mt-32">
            <h2>2. Use of Our Services</h2>
            <p>
              You may use our Services only if you can form a binding contract with stratacoms, and only in compliance with these Terms and all applicable laws. When you create your stratacoms account, you must provide us with accurate and complete information.
            </p>
          </section>

          <section id="account-terms" className="scroll-mt-32">
            <h2>3. Account Terms</h2>
            <p>
              You are responsible for safeguarding the password that you use to access the Services and for any activities or actions under your password, whether your password is with our Service or a third-party service. You agree not to disclose your password to any third party.
            </p>
          </section>

          <section id="payment" className="scroll-mt-32">
            <h2>4. Payment and Fees</h2>
            <p>
              Some of our Services are billed on a subscription basis ("Subscriptions"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.
            </p>
          </section>

          <section id="intellectual-property" className="scroll-mt-32">
            <h2>5. Intellectual Property Rights</h2>
            <p>
              The Service and its original content, features and functionality are and will remain the exclusive property of stratacoms and its licensors. The Service is protected by copyright, trademark, and other laws of both the United Kingdom and foreign countries.
            </p>
          </section>

          <section id="termination" className="scroll-mt-32">
            <h2>6. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section id="liability" className="scroll-mt-32">
            <h2>7. Limitation of Liability</h2>
            <p>
              In no event shall stratacoms, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section id="contact" className="scroll-mt-32">
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at <strong>legal@stratacoms.com</strong> or by post to:
            </p>
            <address className="not-italic text-slate-500 mt-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <strong>stratacoms, Inc.</strong><br/>
              123 Innovation Drive<br/>
              Tech District, London<br/>
              United Kingdom
            </address>
          </section>
        </main>
      </div>
    </div>
  );
}
