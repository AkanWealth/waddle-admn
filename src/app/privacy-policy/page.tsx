import React from "react";
import Header from "../component/Headers/Headers";
import Footer from "../component/Homepage/Footer";
import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
    <section className="bg-white min-h-screen">
      <Header usedFor="download" />
      <section className="bg-white flex justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto bg-white rounded-lg  flex flex-col lg:flex-row overflow-hidden">
          <aside className="w-full lg:w-64  p-6">
            <nav className="flex lg:flex-col space-x-6 lg:space-x-0 lg:space-y-4">
              <Link
                href="/privacy-policy"
                className="text-lg font-semibold text-[#2853A6] hover:text-blue-700"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookie-policy"
                className="text-lg font-semibold text-gray-500 hover:text-gray-700"
              >
                Cookies Policy
              </Link>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-6 sm:p-8 lg:p-12">
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2853A6] mb-6">
                PRIVACY POLICY & COOKIES POLICY
              </h1>
              <p className="text-base text-gray-700 mb-1">
                <strong>Effective Date:</strong> 13 March 2025
              </p>
              <p className="text-base text-gray-700">
                <strong>Company:</strong> Weddle App Ltd
              </p>
            </header>

            {/* Policy Content */}
            <section className="space-y-12">
              {/* 1. Privacy Policy */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  1. PRIVACY POLICY
                </h2>

                {/* 1.1 Introduction */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    1.1 Introduction
                  </h3>
                  <p className="text-gray-700 mb-2">
                    This Privacy Policy applies between you, the User of this
                    Website, and <strong>Weddle App Ltd</strong>, the owner and
                    provider of this Website. <strong>Weddle App Ltd</strong>{" "}
                    takes the privacy of your information very seriously. This
                    Privacy Policy applies to any data collected by us or
                    provided by you when using the Website.
                  </p>
                  <p className="text-gray-700">
                    Please read this Privacy Policy carefully.
                  </p>
                </div>

                {/* 1.2 Definitions */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    1.2 Definitions & Interpretation
                  </h3>
                  <ul className="text-gray-700 space-y-2 list-disc list-inside">
                    <li>
                      <strong>Data:</strong> any information submitted to Weddle
                      App Ltd via the Website, including personal data
                    </li>
                    <li>
                      <strong>Cookies:</strong> small text files placed on your
                      device by the Website
                    </li>
                    <li>
                      <strong>Data Protection Laws:</strong> applicable law
                      relating to Personal Data and privacy
                    </li>
                    <li>
                      <strong>GDPR:</strong> the UK General Data Protection
                      Regulation
                    </li>
                    <li>
                      <strong>UK GDPR:</strong> Data Protection Act 2018 and
                      amendments
                    </li>
                    <li>
                      <strong>User:</strong> any person using the Website
                    </li>
                    <li>
                      <strong>Website:</strong> the website you’re currently
                      using
                    </li>
                  </ul>
                </div>

                {/* 1.3 Scope */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    1.3 Scope of This Privacy Policy
                  </h3>
                  <p className="text-gray-700 mb-2">
                    This applies only to Weddle App Ltd and Users regarding this
                    Website. It does not extend to any other websites linked.
                  </p>
                  <p className="text-gray-700">
                    Weddle App Ltd is the &quot;data controller&quot; for applicable Data
                    Protection Laws.
                  </p>
                </div>

                {/* 1.4 Data We Collect */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    1.4 Data We Collect
                  </h3>
                  <ul className="text-gray-700 list-disc list-inside space-y-1">
                    <li>Name, date of birth, and gender</li>
                    <li>Contact details (email, phone number)</li>
                    <li>IP address</li>
                    <li>Children&apos;s age bracket</li>
                    <li>Location data</li>
                    <li>Website interactions</li>
                  </ul>
                </div>

                {/* 1.5 How We Collect Data */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    1.5 How We Collect Data
                  </h3>
                  <ul className="text-gray-700 list-disc list-inside space-y-1">
                    <li>Contact through email, phone, or Website</li>
                    <li>Account registration</li>
                    <li>Surveys, payments</li>
                    <li>Marketing opt-ins</li>
                    <li>Cookies and tracking</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    We process data under &quot;legitimate interests&quot; or as needed
                    for contracts.
                  </p>
                </div>

                {/* 1.6 How We Use Data */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    1.6 How We Use Your Data
                  </h3>
                  <ul className="text-gray-700 list-disc list-inside space-y-1">
                    <li>Record keeping</li>
                    <li>Improving services</li>
                    <li>Market research</li>
                    <li>Personalization & advertising</li>
                  </ul>
                </div>

                {/* 1.7 Sharing Data */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    1.7 Who We Share Data With
                  </h3>
                  <p className="text-gray-700">
                    Employees, agents, and advisors to provide support and
                    services.
                  </p>
                </div>

                {/* 1.8 Security */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    1.8 Keeping Data Secure
                  </h3>
                  <ul className="text-gray-700 list-disc list-inside space-y-1">
                    <li>Password-protected accounts</li>
                    <li>Secure servers</li>
                    <li>Security audits</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    Report any suspected misuse to hello@weddleapp.io.
                  </p>
                </div>

                {/* 1.9 Retention */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    1.9 Data Retention
                  </h3>
                  <p className="text-gray-700">
                    Data is retained as needed for legal or business needs, even
                    after deletion from live systems.
                  </p>
                </div>

                {/* 1.10 Your Rights */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    1.10 Your Rights
                  </h3>
                  <ul className="text-gray-700 list-disc list-inside space-y-1">
                    <li>Access or correct your data</li>
                    <li>Request deletion or restriction</li>
                    <li>Object to processing</li>
                    <li>Data portability</li>
                    <li>Withdraw consent</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    Contact{" "}
                    <a
                      href="mailto:hello@weddleapp.io"
                      className="text-[#2853A6] underline"
                    >
                      hello@weddleapp.io
                    </a>{" "}
                    or the UK ICO to exercise your rights.
                  </p>
                </div>

                {/* 1.11 Ownership Change */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    1.11 Changes in Business Ownership
                  </h3>
                  <p className="text-gray-700">
                    If ownership changes, your data may transfer under the same
                    privacy terms.
                  </p>
                </div>
              </div>

              {/* Changes to Policy */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  CHANGES TO THIS POLICY
                </h2>
                <p className="text-gray-700 mb-2">
                  Weddle App Ltd may change this Privacy & Cookies Policy.
                  Updates will be posted here.
                </p>
                <p className="text-gray-700">
                  Contact:{" "}
                  <a
                    href="mailto:hello@weddleapp.io"
                    className="text-[#2853A6] underline"
                  >
                    hello@weddleapp.io
                  </a>
                </p>
              </div>
            </section>
          </main>
        </div>
      </section>

      {/* Main Content */}

      {/* Footer */}
      <section className="bg-[#EAEEF6] py-[70px] px-4 sm:px-6 lg:px-[80px]">
        <Footer />
      </section>
    </section>
  );
};

export default PrivacyPolicyPage;
