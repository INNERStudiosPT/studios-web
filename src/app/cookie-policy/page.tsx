import React from "react";
import { Metadata } from 'next';
import Navbar from "../../components/Navbar";

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Our Cookie Policy explains how Inner Studios uses cookies and other tracking technologies on our website.',
  alternates: {
    canonical: '/cookie-policy',
  },
};

export default function CookiePolicyPage() {
  const lastUpdated = "June 6, 2026";

  const sections = [
    { id: "what-are-cookies", title: "1. What Are Cookies" },
    { id: "how-we-use-cookies", title: "2. How We Use Cookies" },
    { id: "types-of-cookies", title: "3. Types of Cookies We Use" },
    { id: "managing-cookies", title: "4. Managing Cookie Preferences" },
    { id: "changes-to-policy", title: "5. Changes to This Policy" },
    { id: "contact-us", title: "6. Contact Us" }
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
            Cookie Policy
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            This Cookie Policy explains how Inner Studios uses cookies and similar technologies to recognize, track, and personalize your experience on our website.
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
          
          <section id="what-are-cookies" className="scroll-mt-32">
            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are stored on your device (computer, tablet, or smartphone) when you visit a website. They are widely used to make websites work or perform more efficiently, as well as to provide reporting and customization information.
            </p>
            <p>
              Cookies set by the website owner (in this case, Inner Studios) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (such as interactive forms, analytics, and advertising).
            </p>
          </section>

          <section id="how-we-use-cookies" className="scroll-mt-32">
            <h2>2. How We Use Cookies</h2>
            <p>
              We use cookies for several reasons. Some cookies are required for technical reasons for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our Website (such as PostHog adaptive personalization and profiling).
            </p>
          </section>

          <section id="types-of-cookies" className="scroll-mt-32">
            <h2>3. Types of Cookies We Use</h2>
            <p>
              The specific types of first-party and third-party cookies served through our Website and the purposes they perform are described below:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as secure forms and Cloudflare Turnstile bot verification.</li>
              <li><strong>Analytics and Personalization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you (e.g. PostHog profiling and Microsoft Clarity analytics).</li>
              <li><strong>Functional Cookies:</strong> These cookies allow us to remember choices you make on our website (such as cookie banners acceptance state or theme choices).</li>
            </ul>
          </section>

          <section id="managing-cookies" className="scroll-mt-32">
            <h2>4. Managing Cookie Preferences</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can manage your preferences through our Cookie Banner by clicking "Accept All" or "Decline". 
            </p>
            <p>
              In addition, you can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
            </p>
          </section>

          <section id="changes-to-policy" className="scroll-mt-32">
            <h2>5. Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
          </section>

          <section id="contact-us" className="scroll-mt-32">
            <h2>6. Contact Us</h2>
            <p>
              If you have questions or comments about this Cookie Policy, you may email us at <strong>privacy@innerstudios.pt</strong>.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
