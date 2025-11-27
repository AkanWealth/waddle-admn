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

const CommunityGuidelinePage = () => {
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
                WADDLE COMMUNITY GUIDELINES
              </h1>
              <p className="text-base text-gray-700 mb-1">
                <strong>Effective Date:</strong> 20th November 2025
              </p>
              <p className="text-base text-gray-700">
                <strong>Company:</strong> Waddle App Ltd
              </p>
            </header>

            {/* Policy Content */}
            <section className="space-y-12">
              <div>
                {/* 2.2 Types of Cookies */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    1. Purpose
                  </h3>

                  <div className="space-y-4">
                    <p className="text-gray-700">
                      These Community Guidelines exist to keep Waddle a safe,
                      trustworthy, and positive space for families and
                      providers. By using Waddle, you agree to follow these
                      Guidelines alongside our{" "}
                      <Link
                        className="underline text-[#2853A6]"
                        href="/terms-of-use"
                      >
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        className="underline text-[#2853A6]"
                        href="/privacy-policy"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    2. Who These Guidelines Apply To
                  </h3>

                  <p className="text-gray-700 mb-4">
                    These Guidelines apply to all users of the Waddle platform,
                    including:
                  </p>

                  <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                    <li>Parents, guardians, and caregivers</li>
                    <li>Providers and organisers listing activities</li>
                    <li>
                      Anyone posting reviews, comments, or recommendations
                    </li>
                  </ol>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    3. Our Community Principles
                  </h3>

                  <p className="text-gray-700 mb-4">We believe in:</p>

                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li>Respect</li>
                    <li>Honesty</li>
                    <li>Safety </li>
                    <li>Inclusivity</li>
                    <li>Constructive communication</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    4. What You Can and Cannot Post
                  </h3>

                  <div className="">
                    <h3 className="text-gray-700 font-semibold text-xl mb-4">
                      General Content Rules
                    </h3>

                    <div className="">
                      <p className="text-gray-700 mb-4">Content must be:</p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                        <li>Honest and based on personal experience</li>
                        <li>Respectful of others</li>
                        <li>
                          Free of private or identifying information about
                          others
                        </li>
                        <li>
                          Accurate, lawful, and appropriate for all audiences
                        </li>
                      </ul>
                    </div>

                    <div className="">
                      <p className="text-gray-700 mb-4">
                        Prohibited content includes:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                        <li>Hate speech, harassment, bullying, threats</li>
                        <li>False, misleading, or defamatory claims</li>
                        <li>Obscene, explicit, or violent material</li>
                        <li>Spam or unauthorised advertising</li>
                        <li>
                          Anything that infringes copyright, privacy, or data
                          protection
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="">
                    <h3 className="text-gray-700 font-semibold text-xl mb-4">
                      Reviews and Recommendations
                    </h3>

                    <div className="">
                      <p className="text-gray-700 mb-4">
                        Waddle aims to support families and local providers by
                        enabling helpful, constructive, and fair feedback. We
                        welcome honest reviews, but content must not:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                        <li>
                          Intentionally harm or “bring down” a local business
                        </li>
                        <li>Include malicious or exaggerated </li>
                        <li>
                          Be written in bad faith or with the intention to
                          discredit
                        </li>
                        <li>
                          Attack individuals personally rather than address the
                          actual experience
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="">
                    <h3 className="text-gray-700 font-semibold text-xl mb-4">
                      Waddle reserves the right to edit, hide, or delete any
                      review or recommendation that:
                    </h3>

                    <div className="">
                      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                        <li>
                          Appears suspicious, harmful, or intended to damage a
                          business unfairly
                        </li>
                        <li>Lacks constructive value or context</li>
                        <li>
                          Violates community standards of respect and fairness
                        </li>
                      </ul>
                      <p className="text-gray-700 mt-4">
                        Our reviews should lift the community up — not tear
                        others down.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    5. Reporting Content or Users
                  </h3>

                  <div className="">
                    <div className="">
                      <p className="text-gray-700 mb-4">Users can report:</p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                        <li>Provider-created events or listings</li>
                        <li>Parent-created recommendations</li>
                        <li>Comments or reviews</li>
                      </ul>
                    </div>

                    <div className="">
                      <p className="text-gray-700 mb-4">
                        Once a report is submitted:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                        <li>Waddle’s moderation team reviews it promptly</li>
                        <li>
                          Content may be removed or edited if it breaches
                          Guidelines
                        </li>
                        <li>
                          Repeated or serious breaches may result in account
                          restriction or removal
                        </li>
                      </ol>
                      <p className="text-gray-700 mt-4">
                        False or malicious reporting may lead to suspension.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    6. Blocking and Account Restrictions
                  </h3>

                  <div className="">
                    <div className="">
                      <p className="text-gray-700 mb-4">
                        Waddle may block or restrict users who:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                        <li>Post prohibited or harmful content</li>
                        <li>Harass others</li>
                        <li>Repeatedly receive verified complaints</li>
                        <li>Act in ways that harm the experience of others</li>
                      </ul>
                      <p className="text-gray-700 mt-4">
                        Users may also block other users through the App.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    7. Consequences for Violations
                  </h3>

                  <div className="">
                    <div className="">
                      <p className="text-gray-700 mb-4">
                        Depending on severity, consequences may include:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                        <li>Warning</li>
                        <li>Temporary suspension</li>
                        <li>Removal of content</li>
                        <li>Permanent account termination</li>
                        <li>Referral to authorities for unlawful activity</li>
                      </ul>
                      <p className="text-gray-700 mt-4">
                        Users may also block other users through the App.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    8. Appeals Process
                  </h3>

                  <div className="">
                    <div className="">
                      <p className="text-gray-700 mb-4">
                        Users may appeal within 14 days by emailing:
                      </p>
                      <ul className="list-none space-y-2 text-gray-700 mb-4">
                        <li className="font-semibold text-[1rem]">
                          support@waddleapp.co.uk
                        </li>
                        <li>Subject: “Appeal Review”</li>
                        <li>Appeals are reviewed within 10 working days.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    9. Changes to These Guidelines
                  </h3>

                  <div className="">
                    <div className="">
                      <p className="text-gray-700 mb-4">
                        Waddle may update these Guidelines from time to time.
                        Continued use of the App indicates acceptance of updated
                        terms.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    10. Contact
                  </h3>

                  <div className="">
                    <div className="">
                      <p className="text-gray-700 mb-4">
                        For moderation or reporting issues:
                      </p>
                      <ul className="list-none space-y-2 text-gray-700 mb-4">
                        <li className="font-semibold text-[1rem]">
                          support@waddleapp.co.uk
                        </li>
                        <li>Waddle App Ltd, United Kingdom</li>
                      </ul>
                    </div>
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

export default CommunityGuidelinePage;
