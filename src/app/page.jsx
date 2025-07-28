// 'use client';

import Image from "next/image";
import Header from "../../src/app/component/component/Headers/Headers";
import { CircleCheck, MapPinCheckInside, Star } from "lucide-react";
import { ParentsLoveWaddleDetails } from "@/lib/data";
import { FaStar } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FAQSection } from "../../src/app/component/component/Homepage/Faq";
import Footer from "../../src/app/component/component/Homepage/Footer";
import SVGAssets from "@/assets/assets/svg";
import ImageFiles from "@/assets/assets/images";

const exampleFAQs = [
  {
    id: "what-is-waddle",
    question: "What is Waddle?",
    answer:
      "Waddle is the UK’s first all-in-one app made by parents, for parents – to help you find, review, and book brilliant child-friendly activities near you. No more trawling Facebook groups or outdated websites – just honest recommendations and local gems, all in one place.",
    isExpanded: true,
  },
  {
    id: "is-it-free",
    question: "Is it free to use?",
    answer:
      "Yes! You get your first month completely free to try Waddle out. After that, there’s a small monthly subscription to unlock all features. It helps keep Waddle running and full of genuinely useful tools – plus, you can cancel anytime.",
    isExpanded: false,
  },
  {
    id: "subscription-benefits",
    question: "What do I get with the subscription?",
    answer:
      "Your subscription gives you full access to: Smart search filters, Personalised suggestions based on your preferences, The ability to save and organise favourite spots, Exclusive features like holiday club booking and planning tools",
    isExpanded: false,
  },
  {
    id: "who-is-waddle-for",
    question: "Who is Waddle for?",
    answer:
      "Anyone looking after kids! Whether you’re a parent, grandparent, carer, or planning a day out, Waddle makes it easy to find family-friendly activities that actually work for you.",
    isExpanded: false,
  },
  {
    id: "what-makes-different",
    question: "What makes Waddle different?",
    answer:
      "Waddle isn’t just a listings page. It’s built around real parent reviews and tailored suggestions based on your family’s interests. Plus, you can book activities directly through the app – no faff, no fuss.",
    isExpanded: false,
  },
  {
    id: "activities-types",
    question: "What kind of activities can I find on Waddle?",
    answer:
      "Think soft play spots, playgrounds, outdoor trails, family-friendly cafés, local events, holiday clubs, and all the hidden gems parents usually swap in WhatsApp chats. Now, it’s all in one place.",
    isExpanded: false,
  },
  {
    id: "add-reviews",
    question: "Can I add my own reviews?",
    answer:
      "Yes, please! Waddle relies on real parent insights – the kind of info you won’t get from generic star ratings. You’ll even earn fun badges for contributing. Honest tips, helpful heads-ups, and small wins that make a big difference to other families.",
    isExpanded: false,
  },
  {
    id: "where-available",
    question: "Where is Waddle available?",
    answer:
      "We’re starting in Colchester (our hometown!) and testing everything here first. But we’re planning to expand to more UK towns and cities soon – so stay tuned!",
    isExpanded: false,
  },
  {
    id: "how-booking-works",
    question: "How does booking work?",
    answer:
      "For bookable activities, you can secure your spot directly through the app. Whether it’s a toddler class or a holiday club, Waddle makes booking quick and hassle-free.",
    isExpanded: false,
  },
  {
    id: "mobile-compatibility",
    question: "Will it work on my phone?",
    answer: "Absolutely! Waddle is available on both iOS and Android.",
    isExpanded: false,
  },
  {
    id: "business-listing",
    question: "I'm a local business – can I be listed on Waddle?",
    answer:
      "Yes! We love supporting local, family-friendly businesses. If you run a venue, group, or service that families would love, get in touch – we’d be happy to chat about getting you featured on the app.",
    isExpanded: false,
  },
];

const HomePage = () => {
  return (
    <section className="bg-white min-h-screen">
      <header className="sticky top-0 z-50">
        <Header usedFor="started" />
      </header>
      <section className="bg-[#2853A6] flex flex-col lg:flex-row pt-20 pb-3 px-4 lg:px-20 justify-around items-center overflow-x-hidden">
        <section className="w-full lg:max-w-[559px] flex flex-col gap-5 text-white">
          <h3 className="text-[32px] sm:text-[40px] lg:text-[56px] font-bold leading-tight">
            Discover things to do with your kids
          </h3>
          <p className="text-base sm:text-lg">
            From exciting adventures to quiet moments, Waddle helps you find and
            book child-friendly experiences effortlessly, all in one easy-to-use
            app.
          </p>

          <section className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none">
            <button className="h-[60px] w-full sm:w-[200px]" type="button">
              <Image
                src={SVGAssets.DownloadViaApple}
                alt="Download via Apple"
                className="h-full w-full object-contain"
              />
            </button>
            <button className="h-[60px] w-full sm:w-[200px]" type="button">
              <Image
                src={SVGAssets.DownloadViaGoogle}
                alt="Download via Google"
                className="h-full w-full object-contain"
              />
            </button>
          </section>

          <section className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <MapPinCheckInside className="text-[#F7AB5C] h-[19px] w-[19px]" />
              <span>Local picks</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-[#F7AB5C] h-[19px] w-[19px]" />
              <span>Real reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheck className="text-[#F7AB5C] h-[19px] w-[19px]" />
              <span>Easy booking</span>
            </div>
          </section>
        </section>

        <section className="w-full max-w-[386px] h-auto mt-10 lg:mt-0">
          <Image
            src={ImageFiles.HeroImage}
            alt="Hero Image"
            className="w-full h-auto object-contain"
          />
        </section>
      </section>

      <section id="about" className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 px-4 lg:px-20 py-16">
        {/* Text Section */}
        <section  className="w-full lg:max-w-[512px] flex flex-col gap-5">
          <h3 className="text-[#303237] text-[28px] sm:text-[32px] lg:text-[40px] font-semibold">
            About Waddle
          </h3>
          <h4 className="text-[#565C69] text-[18px] sm:text-[20px] font-semibold">
            Making Family Outings Easier
          </h4>
          <p className="text-[#565C69] text-[15px] sm:text-[16px]">
            Waddle is your local parenting companion. We help you discover
            nearby kid-friendly things to do—like parks, cafés, activities, and
            events—without the endless scroll.
          </p>

          {/* Features List */}
          <section className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-4">
              <FaCheckCircle className="text-[#D45815] h-[20px] w-[20px]" />
              <span className="text-[#303237] text-[15px]">
                Built by parents, for parents.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <FaCheckCircle className="text-[#D45815] h-[20px] w-[20px]" />
              <span className="text-[#303237] text-[15px]">
                No ads. No faff. Just helpful stuff.
              </span>
            </div>
          </section>
        </section>

        {/* Image Section */}
        <section className="w-full max-w-[588px] h-auto">
          <Image
            src={ImageFiles.WaddleAbout}
            alt="About Waddle"
            className="w-full h-auto object-contain"
          />
        </section>
      </section>

      <section className="relative pb-10 flex flex-col gap-16 px-4 lg:px-20">
        {/* Section Heading */}
        <h3 className="text-[#303237] text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-center">
          Why Parents Love Waddle
        </h3>

        {/* Feature Cards */}
        <section className="flex items-center justify-center">
          <div className="grid w-full sm:w-[90%] gap-12 md:grid-cols-2 lg:grid-cols-3">
            {ParentsLoveWaddleDetails.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center min-w-[250px] gap-4 text-center px-4"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  className="h-[40px] w-[40px]"
                />
                <div className="flex flex-col gap-2">
                  <h4 className="text-[#303237] text-[18px] sm:text-[20px] font-semibold">
                    {item.title}
                  </h4>
                  <p className="text-[#565C69] text-[15px] sm:text-[16px] font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="w-full bg-white px-4 sm:px-6 lg:px-16 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-10 lg:gap-20">
          <div className="relative h-[300px] w-full max-w-[450px] flex-shrink-0">
            <Image
              src={ImageFiles.PersonOne}
              alt="Person"
              className="absolute top-1/2 left-0 transform -translate-y-1/2 h-[130px] sm:h-[150px] lg:h-[170px] w-[130px] sm:w-[150px] lg:w-[170px] rounded-full object-cover"
            />
            <Image
              src={ImageFiles.Gathering}
              alt="Gathering"
              className="absolute bottom-0 left-[160px] sm:left-[190px] lg:left-[210px] h-[70px] sm:h-[75px] lg:h-[80px] w-[70px] sm:w-[75px] lg:w-[80px] rounded-full object-cover"
            />
            <Image
              src={ImageFiles.Family}
              alt="Family"
              className="absolute top-0 right-0 h-[100px] sm:h-[110px] lg:h-[121px] w-[100px] sm:w-[110px] lg:w-[121px] rounded-full object-cover"
            />
          </div>

          <div className="relative bg-[#FFC2D3] w-full max-w-4xl p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm">
            <div className="absolute -top-4 -left-4 bg-red-500 px-2 py-1.5 rounded-[10px]">
              <FaStar className="h-[18px] w-[18px] text-white" />
            </div>

            <p className="text-[#303237] text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-relaxed mb-4">
              Waddle makes planning days out so much easier. I’ve discovered
              local gems I never knew existed—and my kids love every outing!
            </p>
            <h3 className="text-[#303237] text-[16px] sm:text-[18px] lg:text-[20px] font-semibold">
              — Jenna A., mum of two, London
            </h3>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#EAEEF6] py-16 px-4 sm:px-6 lg:px-20 flex flex-col gap-14">
        <h3 className="text-center text-[#303237] text-[32px] sm:text-[40px] lg:text-[48px] font-bold">
          Reach more families. Fill your events.
        </h3>

        <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-[120px]">
          <div className="w-full lg:w-1/2 max-w-[650px]">
            <Image
              src={SVGAssets.MoreFamilies}
              alt="More Families"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <p className="text-[#565C69] text-[16px] font-normal">
              Waddle connects you directly with engaged parents searching for
              new experiences. From kids’ workshops and activity clubs to
              family-friendly festivals and learning events, Waddle helps you:
            </p>

            <div className="flex flex-col gap-4">
              <p className="flex items-center gap-2 text-[16px] font-normal text-[#565C69]">
                <FaCheckCircle className="text-[#D45815] h-5 w-5" />
                Promote your events to the right audience
              </p>
              <p className="flex items-center gap-2 text-[16px] font-normal text-[#565C69]">
                <FaCheckCircle className="text-[#D45815] h-5 w-5" />
                Manage bookings easily
              </p>
              <p className="flex items-center gap-2 text-[16px] font-normal text-[#565C69]">
                <FaCheckCircle className="text-[#D45815] h-5 w-5" />
                Get discovered by local families
              </p>
            </div>

            <div>
              <button
                className="invisible bg-[#2853A6] px-6 py-3 rounded-[12px] text-white text-[14px] font-semibold hover:bg-[#1f4288] transition-colors"
                type="button"
              >
                Become an Organiser
              </button>
            </div>
          </div>
        </section>
      </section>

      <section id="faq" className="w-full bg-white px-4 sm:px-6 lg:px-20 py-12">
        <FAQSection faqs={exampleFAQs} />
      </section>

      <section className="bg-white flex justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2853A6] w-full max-w-screen-xl rounded-[32px] p-6 sm:p-10 lg:py-[34px] lg:px-[40px] flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Side Text */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h3 className="text-white font-semibold text-[28px] sm:text-[32px] lg:text-[40px] leading-snug">
              Download Waddle and let the adventures begin!
            </h3>
            <p className="text-white text-[16px] sm:text-[17px] font-normal">
              Join thousands of parents making days out easier and more fun.
            </p>
            <section className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <button className="h-[60px] w-[200px]" type="button">
                <Image
                  src={SVGAssets.DownloadViaApple}
                  alt="Download via Apple"
                  className="h-full w-full object-contain"
                />
              </button>
              <button className="h-[60px] w-[200px]" type="button">
                <Image
                  src={SVGAssets.DownloadViaGoogle}
                  alt="Download via Google"
                  className="h-full w-full object-contain"
                />
              </button>
            </section>
          </div>

          {/* Right Side Image */}
          <div className="w-full lg:w-[400px] h-[410px]">
            <Image
              src={ImageFiles.BottomImage}
              alt="Download Waddle"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#EAEEF6] py-[70px] px-4 sm:px-6 lg:px-[80px]">
        <Footer />
      </section>
    </section>
  );
};

export default HomePage;
