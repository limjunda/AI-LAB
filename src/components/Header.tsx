import React from "react";

const Header = () => {
  return (
    <div className="bg-white p-8 border-b border-red-100">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <img src="/Logo.png" alt="AI LAB Logo" className="h-16" />
          <div>
            <h1 className="text-2xl font-bold text-red-900">AI LAB</h1>
            <p className="text-red-700">Empowering you to think big</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-800 mb-4">
            The Prudential AI Lab is a new program that will help us develop
            AI-powered products and applications.
          </p>
          <div className="space-y-2 text-gray-700">
            <p>
              • Rapid development of AI solutions for tangible business impact
            </p>
            <p>
              • Establish structured bottoms-up AI product acceleration process
              to enable LBUs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
