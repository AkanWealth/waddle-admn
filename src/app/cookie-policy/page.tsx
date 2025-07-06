import React from "react";
import Link from "next/link";
import Header from "../component/Headers/Headers";
import Footer from "../component/Homepage/Footer";

const CookiePolicyPage = () => {
  return (
    <section className="bg-white min-h-screen">
      <Header usedFor="download" />
      <section className="bg-white flex justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto bg-white rounded-lg flex flex-col lg:flex-row overflow-hidden">
          <aside className="w-full lg:w-64 p-6">
            <nav className="flex lg:flex-col space-x-6 lg:space-x-0 lg:space-y-4">
              <Link
                href="/privacy-policy"
                className="text-lg font-semibold text-gray-500 hover:text-gray-700"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookie-policy"
                className="text-lg font-semibold text-[#2853A6] hover:text-blue-700"
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
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  2. COOKIES POLICY
                </h2>

                {/* 2.1 What Are Cookies */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    2.1 What Are Cookies?
                  </h3>
                  <p className="text-gray-700">
                    Cookies are small text files placed on your device when you
                    visit this Website. We use cookies to enhance user
                    experience, analyze traffic, and provide personalized
                    content.
                  </p>
                </div>

                {/* 2.2 Types of Cookies */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    2.2 Types of Cookies We Use
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        1. Strictly Necessary Cookies
                      </h4>
                      <ul className="text-gray-700 list-disc list-inside space-y-1 ml-4">
                        <li>Required for the Website to function properly.</li>
                        <li>
                          Enable login, authentication, and session security.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        2. Functionality Cookies
                      </h4>
                      <ul className="text-gray-700 list-disc list-inside space-y-1 ml-4">
                        <li>
                          Remember user preferences (e.g., language, location
                          settings).
                        </li>
                        <li>Improve user experience by saving preferences</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        3. Analytical/Performance Cookies
                      </h4>
                      <ul className="text-gray-700 list-disc list-inside space-y-1 ml-4">
                        <li>
                          Collect anonymous usage data to improve Website
                          functionality.
                        </li>
                        <li>Track user behavior and engagement.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        4. Targeting Cookies
                      </h4>
                      <ul className="text-gray-700 list-disc list-inside space-y-1 ml-4">
                        <li>
                          Track browsing habits to deliver relevant
                          advertisements.
                        </li>
                        <li>
                          May be set by third-party services (e.g., Google Ads,
                          Stripe, social media integrations).
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2.3 Managing Cookies */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    2.3 Managing Cookies
                  </h3>
                  <ul className="text-gray-700 list-disc list-inside space-y-1">
                    <li>
                      You can enable/disable cookies in your browser settings.
                    </li>
                    <li>
                      Most browsers allow you to delete cookies at any time.
                    </li>
                    <li>
                      Restricting cookies may impact certain Website functions.
                    </li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    For more details on cookies, visit{" "}
                    <Link
                      href="https://www.aboutcookies.org"
                      className="text-[#2853A6] underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.aboutcookies.org
                    </Link>
                  </p>
                </div>
              </div>

              {/* Changes to Policy */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  CHANGES TO THIS POLICY
                </h2>
                <p className="text-gray-700 mb-2">
                  Weddle App Ltd reserves the right to update this Privacy &
                  Cookies Policy from time to time. Any changes will be posted
                  on this page, and continued use of the Website will be deemed
                  acceptance of the updated terms.
                </p>
                <p className="text-gray-700">
                  For any inquiries, contact us at{" "}
                  <Link
                    href="mailto:hello@weddleapp.io"
                    className="text-[#303237] font-semibold"
                  >
                    hello@weddleapp.io
                  </Link>
                </p>
              </div>
            </section>
          </main>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-[#EAEEF6] py-[70px] px-4 sm:px-6 lg:px-[80px]">
        <Footer />
      </section>
    </section>
  );
};

export default CookiePolicyPage;
