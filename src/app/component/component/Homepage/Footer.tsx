import SVGAssets from "@/assets/assets/svg";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaTiktok } from "react-icons/fa6";
import DeviceDownloadButtons from "@/app/DeviceDownloadButtons";
const FooterLinksOne = [
  { id: 1, href: "", name: "Home" },
  { id: 2, href: "#about", name: "About Us" },
  { id: 3, href: "/contact-us", name: "Contact Us" },
  { id: 4, href: "#faq", name: "FAQs" },
];

const FooterLinksTwo = [
  { id: 1, href: "/privacy-policy", name: "Privacy Policy" },
  { id: 2, href: "/cookie-policy", name: "Cookie Policy" },
  { id: 3, href: "/terms-of-use", name: "Terms Of Use" },
  { id: 4, href: "/community-guideline", name: "Community Guideline" },
];

const FooterSocialMediaLinks = [
  { id: 1, href: "https://www.facebook.com/appwaddle", name: FaFacebook },
  { id: 2, href: "https://www.tiktok.com/@waddle.app", name: FaTiktok },
  { id: 3, href: "https://www.instagram.com/app_waddle", name: FaInstagram },
];

const Footer = () => {
  return (
    <footer className="flex flex-col gap-10 w-full">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Logo & Contact */}
        <div className="flex flex-col gap-6">
          <Link href="/">
            <Image
              src={SVGAssets.HomeLogo}
              alt="Home Logo"
              className="h-16 w-16"
            />
          </Link>

          {/* App Buttons */}
          <div className="flex items-center gap-4">
            <DeviceDownloadButtons />
          </div>

          {/* Contact */}
          <p className="flex items-center gap-2 text-[#303237] text-[16px] font-normal">
            <IoMdMail className="h-5 w-6 text-[#2853A6]" />
            hello@waddleapp.io
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-6">
          {FooterLinksOne.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-[#303237] text-[16px] font-normal hover:text-[#2853A6] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {FooterLinksTwo.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-[#303237] text-[16px] font-normal hover:text-[#2853A6] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-t pt-6 w-full">
        <div className="flex items-center gap-4">
          {FooterSocialMediaLinks.map((item) => {
            const IconComponent = item.name;

            return (
              <Link
                key={item.id}
                href={item.href}
                className="bg-[#2853A6] p-2 rounded-full text-white hover:bg-[#fdfdfd] hover:text-[#2853A6] hover:border hover:border-[#2853A6] transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconComponent className="h-[18px] w-[18px]" />
              </Link>
            );
          })}
        </div>

        <p className="text-[14px] sm:text-[16px] text-[#303237] font-normal text-left w-full sm:w-auto">
          © Waddle 2025. All rights reserved.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
