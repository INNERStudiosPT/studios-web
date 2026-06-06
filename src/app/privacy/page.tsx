import React from "react";
import { Metadata } from 'next';
import Navbar from "../../components/Navbar";

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy explains how Inner Studios collects, uses, and protects your personal information.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "June 4, 2026";

  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "information-we-collect", title: "2. Information We Collect" },
    { id: "how-we-use", title: "3. How We Use Your Information" },
    { id: "information-sharing", title: "4. Information Sharing and Disclosure" },
    { id: "data-security", title: "5. Data Security" },
    { id: "your-rights", title: "6. Your Privacy Rights" },
    { id: "changes", title: "7. Changes to This Policy" },
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
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            We are committed to protecting your personal information and your right to privacy. This policy explains what data we collect and how we use it.
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
              Thank you for choosing to be part of our community at Inner Studios ("Company", "we", "us", "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.
            </p>
            <p>
              When you visit our website and more generally, use any of our services (the "Services", which include the Website), we appreciate that you are trusting us with your personal information. We take your privacy very seriously.
            </p>
          </section>

          <section id="information-we-collect" className="scroll-mt-32">
            <h2>2. Information We Collect</h2>
            <p>
              <strong>Personal information you disclose to us:</strong> We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.
            </p>
            <ul>
              <li><strong>Personal Information Provided by You:</strong> We collect names; phone numbers; email addresses; mailing addresses; job titles; contact preferences; billing addresses; debit/credit card numbers; and other similar information.</li>
              <li><strong>Payment Data:</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number, and the security code associated with your payment instrument.</li>
            </ul>
          </section>

          <section id="how-we-use" className="scroll-mt-32">
            <h2>3. How We Use Your Information</h2>
            <p>
              We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>
            <ul>
              <li>To facilitate account creation and logon process.</li>
              <li>To fulfill and manage your orders.</li>
              <li>To send administrative information to you.</li>
              <li>To protect our Services.</li>
              <li>To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.</li>
            </ul>
          </section>

          <section id="information-sharing" className="scroll-mt-32">
            <h2>4. Information Sharing and Disclosure</h2>
            <p>
              We may process or share your data that we hold based on the following legal basis:
            </p>
            <ul>
              <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information in a specific purpose.</li>
              <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
              <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
            </ul>
          </section>

          <section id="data-security" className="scroll-mt-32">
            <h2>5. Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>
            <p>
              Although we will do our best to protect your personal information, transmission of personal information to and from our Website is at your own risk. You should only access the Website within a secure environment.
            </p>
          </section>

          <section id="your-rights" className="scroll-mt-32">
            <h2>6. Your Privacy Rights</h2>
            <p>
              In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.
            </p>
            <p>
              To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.
            </p>
          </section>

          <section id="changes" className="scroll-mt-32">
            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.
            </p>
          </section>

          <section id="contact" className="scroll-mt-32">
            <h2>8. Contact Us</h2>
            <p>
              If you have questions or comments about this notice, you may email us at <strong>privacy@innerstudios.com</strong> or by post to:
            </p>
            <address className="not-italic text-slate-500 mt-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <strong>Inner Studios, Inc.</strong><br/>
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
