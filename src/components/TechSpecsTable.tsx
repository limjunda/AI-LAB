import React from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface TechSpecsTableProps {
  selectedItems: Set<string>;
}

interface SpecSection {
  title: string;
  specs: Record<string, string | string[]>;
}

const getTechSpecs = (selectedItems: Set<string>): SpecSection[] => {
  // Base specifications that are always included
  const baseSpecs: SpecSection[] = [
    {
      title: "Front End Specifications",
      specs: {
        Framework: "ReactJS",
        Components: "Utilize existing library of React components",
        "State Management": "Redux or Context API",
        Routing: "React Router",
        Styling: "Tailwind CSS with CSS-in-JS (styled-components)",
        "Build Tool": "Vite",
      },
    },
    {
      title: "Hosting Specifications",
      specs: {
        Containerization: "Docker + Kubernetes",
        Dockerfile:
          "Create a Dockerfile to define the environment and dependencies",
        Orchestration:
          "Use Kubernetes for managing and scaling Docker containers",
      },
    },
  ];

  // Add backend specs based on selections
  const backendSpecs: SpecSection = {
    title: "Back End Specifications",
    specs: {},
  };

  if (selectedItems.has("backend_ui_1") || selectedItems.has("backend_ui_2")) {
    backendSpecs.specs["Framework"] = selectedItems.has("backend_ui_java")
      ? "Spring Boot"
      : "Express.js";
    backendSpecs.specs["Authentication"] = selectedItems.has("backend_ui_java")
      ? "Spring Security"
      : "JWT/OAuth";
  }

  // Add CI/CD specs
  const cicdSpecs: SpecSection = {
    title: "CI/CD and SCM",
    specs: {
      "Source Control": "GitHub",
      "CI/CD Pipelines": "GitHub Actions",
      "Container Registry": selectedItems.has("strict")
        ? "Private Container Registry"
        : "Public Container Registry",
    },
  };

  // Add monitoring specs
  const monitoringSpecs: SpecSection = {
    title: "Monitoring and Logging",
    specs: {
      "Application Monitoring": "Dynatrace",
      "Error Tracking": "Sentry",
      "Log Management": "Cloud Logging",
    },
  };

  // Add testing specs
  const testingSpecs: SpecSection = {
    title: "Testing Specifications",
    specs: {
      "Unit Testing": "Jest",
      "End-to-End Testing": "Cypress",
      "Integration Testing": "React Testing Library",
    },
  };

  // Add database specs based on selections
  const databaseSpecs: SpecSection = {
    title: "Database Specifications",
    specs: {
      "Relational Database": "PostgreSQL",
      ORM: "Prisma",
      "NoSQL Database":
        selectedItems.has("udp_storage") ||
        selectedItems.has("udp_storage_flex")
          ? "MongoDB"
          : "None",
      "NoSQL ORM":
        selectedItems.has("udp_storage") ||
        selectedItems.has("udp_storage_flex")
          ? "Mongoose"
          : "None",
    },
  };

  // Add documentation specs
  const documentationSpecs: SpecSection = {
    title: "Documentation",
    specs: {
      "API Documentation": "Swagger UI",
      "Component Documentation": "Storybook",
      "Repository Documentation": "README files and Architecture diagrams",
    },
  };

  return [
    ...baseSpecs,
    backendSpecs,
    cicdSpecs,
    monitoringSpecs,
    testingSpecs,
    databaseSpecs,
    documentationSpecs,
  ];
};

const TechSpecsTable: React.FC<TechSpecsTableProps> = ({ selectedItems }) => {
  const specs = getTechSpecs(selectedItems);

  return (
    <Card className="mt-8 p-6 bg-white">
      <h3 className="text-xl font-semibold text-red-900 mb-6">
        Technical Specifications
      </h3>
      <ScrollArea className="h-[600px]">
        <div className="space-y-8">
          {specs.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">
                {section.title}
              </h4>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(section.specs).map(([key, value], i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="py-2 px-4 border-r font-medium text-gray-600 w-1/3">
                          {key}
                        </td>
                        <td className="py-2 px-4 text-gray-800">
                          {Array.isArray(value) ? value.join(", ") : value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default TechSpecsTable;
