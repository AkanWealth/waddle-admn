import React from "react";
import Header from "../component/Headers/Headers";
import Footer from "../component/Homepage/Footer";

const TermsOfPolicyPage = () => {
  return (
    <section className="bg-white min-h-screen">
      <Header usedFor="started" />
      <section className="bg-[#EAEEF6] py-[70px] px-4 sm:px-6 lg:px-[80px]">
        <Footer />
      </section>
    </section>
  );
};

export default TermsOfPolicyPage;
