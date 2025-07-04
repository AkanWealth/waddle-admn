import SVGAssets from "@/assets/svg"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header className="flex items-center justify-between mx-7 py-3.5">
        <Image src={SVGAssets.HomeLogo} alt="Home Logo"  className="h-16 w-16 "/>
        <nav className="flex items-center justify-between w-1/2  gap-[8px]">
            <nav className="flex items-center gap-4 text-[16px]">
                <Link href="/" className="font-normal text-[#303237]">
                    Home
                </Link>
                <Link href="/" className="font-normal text-[#303237]">
                    About us
                </Link>
                <Link href="/" className="font-normal text-[#303237]">
                    FAQs
                </Link>
                <Link href="/" className="font-normal text-[#303237]">
                    Contact us
                </Link>
            </nav>
            <nav className="flex items-center gap-[24px] font-semibold">
                <button className="text-[#2853A6] fonnt border border-[#2853A6] px-[12px] py-[10px] rounded-[12px]" type="button">Login</button>
                <button className="bg-[#2853A6] flex items-center gap-3  px-[12px] py-[10px] rounded-[12px] text-white" type="button"> <span className="">Get Started</span><ArrowRight /> </button>
            </nav>
        </nav>
    </header>
  )
}

export default Header        