import React from "react";
import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-red-100 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-600">Email:</span>
            <a
              href="mailto:madhan.seduraman@prudential.com.sg"
              className="text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              madhan.seduraman@prudential.com.sg
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div>
            <a
              href="https://forms.office.com/Pages/ResponsePage.aspx?id=XjAHcGQma065pMTVzP0VJDMDsY879yBCvbAi-QkAdFJUOEtMN0FMSFVENFA5TVBMSlNEU0w3VENSSCQlQCN0PWcu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 flex items-center justify-center gap-1"
            >
              AI LAB Ideas Submission MS Forms
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div>
            <a
              href="https://collaborate.pruconnect.net/display/PACSAILAB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 flex items-center justify-center gap-1"
            >
              AI LAB Confluence Page
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
