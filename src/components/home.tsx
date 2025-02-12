import React from "react";
import PortfolioGrid from "./PortfolioGrid";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <Header />
      <div className="flex-1 p-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-red-900">
            AI Solutions Portfolio
          </h2>
          <p className="mt-2 text-gray-600">
            Explore the relationships between AI solutions, technologies, and
            business units
          </p>
        </div>

        <div className="h-[800px] w-full rounded-lg border border-red-100 bg-white shadow-sm mb-8">
          <PortfolioGrid />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
