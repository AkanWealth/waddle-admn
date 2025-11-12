import React from "react";
import Header from "../component/component/Headers/Headers";
import Footer from "../component/component/Homepage/Footer";
import Link from "next/link";

export const metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const TermsOfPolicyPage = () => {
  return (
    <section className="bg-white min-h-screen">
      <Header usedFor="started" />
      <section className="bg-white flex justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto bg-white rounded-lg flex flex-col lg:flex-row overflow-hidden">
          {/* Main Content Area */}
          <main className="flex-1 p-6 sm:p-8 lg:p-12">
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2853A6] mb-6">
                TERMS AND CONDITIONS
              </h1>
              <p className="text-base text-gray-700 mb-1">
                <strong>Last updated:</strong> 10th November 2025
              </p>
              <p className="text-base text-gray-700">
                <strong>Company:</strong> Waddle App Ltd
              </p>
            </header>

            {/* Policy Content */}
            <section className="space-y-12">
              <div>
                {/* 2.1 What Are Cookies */}
                <div className="mb-6 flex gap-4 flex-col">
                  <p className="text-gray-700">
                    These Terms and Conditions (“Terms”) govern your access to
                    and use of the Waddle mobile application and website
                    (collectively referred to as “Waddle” or the “App”),
                    operated by <b>Waddle App Ltd</b>, a company registered in
                    England and Wales (Company No. 15744910).
                  </p>
                  <p className="text-gray-700">
                    By accessing or using Waddle, you agree to be bound by these
                    Terms. If you do not agree, you must not use the App.
                  </p>
                </div>

                {/* 2.2 Types of Cookies */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    1. About Waddle
                  </h3>

                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Waddle is an online platform designed to help families
                      discover, book, and review local activities and events for
                      children. Waddle also allows providers of such activities
                      (“Providers”) to list, promote, and manage their services.
                      Waddle acts as an intermediary between users and
                      Providers. We do not own, operate, or manage any of the
                      activities listed unless otherwise stated.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    2. Eligibility
                  </h3>

                  <div className="space-y-4">
                    <p className="text-gray-700">
                      You must be at least 18 years old to create an account and
                      use the App. By using Waddle, you confirm that the
                      information you provide is accurate and that you have the
                      authority to enter into these Terms.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    3. Accounts and Access
                  </h3>

                  <div className="space-y-4">
                    <p className="text-gray-700">
                      You are responsible for maintaining the confidentiality of
                      your account credentials and for all activity under your
                      account. Waddle reserves the right to suspend or terminate
                      any account that breaches these Terms or engages in
                      fraudulent, abusive, or inappropriate conduct.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    4. Bookings and Payments
                  </h3>

                  <p className="text-gray-700 mb-4">
                    Waddle facilitates activity bookings through the App.
                    Payments are processed securely via Stripe, a third-party
                    payment processor. By making a booking:
                  </p>

                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li>
                      You agree to pay all fees associated with your selected
                      activity as displayed at the time of booking.
                    </li>
                    <li>
                      You authorise Stripe to process payments on your behalf.
                    </li>
                    <li>
                      Waddle App Ltd is not responsible for Stripe’s terms,
                      policies, or errors in processing.
                    </li>
                  </ul>

                  <p className="text-gray-700">
                    Providers agree that Stripe may deduct Waddle’s applicable
                    service or transaction fees before transferring the
                    remaining funds to their connected account. Cancellations
                    and refunds are subject to the Provider’s individual
                    cancellation policy. Waddle is not liable for disputes
                    regarding refunds between users and Providers.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    5. Provider Obligations
                  </h3>

                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Providers are responsible for ensuring all information
                      listed on Waddle is accurate, current, and lawful. They
                      must hold appropriate insurance, qualifications, and
                      safety certifications as required by UK law.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    6. Content and Intellectual Property
                  </h3>

                  <div className="space-y-4">
                    <p className="text-gray-700">
                      All content on Waddle, including text, graphics, logos,
                      and software, is the property of Waddle App Ltd or its
                      licensors. Users and Providers may upload certain content.
                      By doing so, you grant Waddle App Ltd a worldwide,
                      royalty-free licence to display, use, and reproduce that
                      content in connection with operating the App.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    7. Third-Party Services
                  </h3>

                  <div className="space-y-4">
                    <p className="text-gray-700">
                      All content on Waddle, including text, graphics, logos,
                      and software, is the property of Waddle App Ltd or its
                      licensors. Users and Providers may upload certain content.
                      By doing so, you grant Waddle App Ltd a worldwide,
                      royalty-free licence to display, use, and reproduce that
                      content in connection with operating the App.
                    </p>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    8. Privacy
                  </h3>

                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Your privacy is important to us. Please refer to our
                      <Link
                        href="/privacy-policy"
                        className="text-[#2853A6] underline hover:text-gray-600 ml-1"
                      >
                        Privacy Policy
                      </Link>{" "}
                      for details on how we collect, use, and protect your
                      personal information.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    9. Limitation of Liability
                  </h3>

                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Waddle App Ltd provides the App “as is” and makes no
                      guarantees about the accuracy or availability of listings.
                      We are not liable for any loss, injury, damage, or expense
                      arising from your use of the App. Nothing in these Terms
                      limits liability for death or personal injury caused by
                      negligence or other liability which cannot be excluded
                      under UK law.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    10. Suspension and Termination
                  </h3>

                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Waddle may suspend or terminate your account at any time
                      if you breach these Terms or use the App in a way that
                      could harm Waddle, its users, or its reputation.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    11. Governing Law
                  </h3>

                  <div className="space-y-4">
                    <p className="text-gray-700">
                      These Terms are governed by the laws of England and Wales.
                      You agree that any disputes will be subject to the
                      exclusive jurisdiction of the courts of England and Wales.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    12. Contact Us
                  </h3>

                  <div className="space-y-4">
                    <p className="text-gray-700">
                      If you have any questions about these Terms, please
                      contact:
                      <a
                        href="mailto:support@waddleapp.co.uk"
                        className="text-[#303237] font-bold hover:underline ml-1"
                      >
                        support@waddleapp.co.uk
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </section>
      <section className="bg-[#EAEEF6] py-[70px] px-4 sm:px-6 lg:px-[80px]">
        <Footer />
      </section>
    </section>
  );
};

export default TermsOfPolicyPage;
