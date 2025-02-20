import React from "react";
import { cn } from "@/lib/utils";

interface TechnologyIconsProps {
  activeItems: Set<string>;
}

interface IconMapping {
  id: string;
  icon: string;
  items: string[];
}

const iconMappings: IconMapping[] = [
  // Cloud & Infrastructure
  {
    id: "gcp",
    icon: "/Icon/google-cloud.svg",
    items: ["udp_storage", "udp_storage_flex"],
  },
  {
    id: "bigquery",
    icon: "/Icon/google_bigquery-ar21.svg",
    items: ["udp_storage", "udp_storage_flex"],
  },
  {
    id: "azure",
    icon: "/Icon/microsoft-azure.svg",
    items: ["foundation_apis_2", "foundation_apis_flex"],
  },
  {
    id: "gke",
    icon: "/Icon/google-gke-svgrepo-com.svg",
    items: ["orchestration_1", "orchestration_2"],
  },
  {
    id: "cloud-functions",
    icon: "/Icon/google-cloud-functions.svg",
    items: ["backend_integration_1", "backend_integration_2"],
  },
  {
    id: "cloud-run",
    icon: "/Icon/google-cloud-run.svg",
    items: ["backend_ui_1", "backend_ui_2"],
  },

  // AI & ML Platforms
  {
    id: "huggingface",
    icon: "/Icon/hugging-face-icon.svg",
    items: [
      "oss_model_containers",
      "oss_model_containers_flex",
      "foundation_apis_2",
      "foundation_apis_flex",
    ],
  },
  {
    id: "meta",
    icon: "/Icon/meta.svg",
    items: [
      "oss_model_containers",
      "oss_model_containers_flex",
      "foundation_apis_2",
      "foundation_apis_flex",
    ],
  },
  {
    id: "mistral",
    icon: "/Icon/mistral-ai-icon.svg",
    items: [
      "oss_model_containers",
      "oss_model_containers_flex",
      "foundation_apis_2",
      "foundation_apis_flex",
    ],
  },
  {
    id: "openai",
    icon: "/Icon/openai.svg",
    items: ["foundation_apis_2", "foundation_apis_flex"],
  },
  {
    id: "gemini",
    icon: "/Icon/google-gemini.svg",
    items: ["foundation_apis_2", "foundation_apis_flex"],
  },

  // Development Tools
  {
    id: "docker",
    icon: "/Icon/docker.svg",
    items: ["orchestration_1", "orchestration_2"],
  },
  {
    id: "firebase",
    icon: "/Icon/firebase.svg",
    items: ["frontend_ui_1", "frontend_ui_2"],
  },
  {
    id: "flask",
    icon: "/Icon/flask.svg",
    items: ["backend_ui_1", "backend_ui_2"],
  },
  {
    id: "java",
    icon: "/Icon/java.svg",
    items: ["backend_ui_1", "backend_ui_2"],
  },
  {
    id: "nodejs",
    icon: "/Icon/nodejs.svg",
    items: ["frontend_ui_1", "frontend_ui_2"],
  },
  {
    id: "react",
    icon: "/Icon/react.svg",
    items: ["frontend_ui_1", "frontend_ui_2"],
  },
];

const iconGroups = [
  {
    title: "Storage & Data",
    icons: ["gcp", "bigquery"],
  },
  {
    title: "LLM & AI Services",
    icons: ["huggingface", "meta", "mistral", "openai", "gemini"],
  },
  {
    title: "Orchestration & Containers",
    icons: ["docker", "gke"],
  },
  {
    title: "Backend Services",
    icons: ["cloud-functions", "cloud-run", "flask", "java"],
  },
  {
    title: "Frontend & Development",
    icons: ["firebase", "nodejs", "react"],
  },
];

const TechnologyIcons: React.FC<TechnologyIconsProps> = ({ activeItems }) => {
  return (
    <div className="mt-8 p-4 bg-white rounded-lg border border-red-100">
      <h3 className="text-lg font-semibold text-red-900 mb-4 text-center">
        Technology Stack
      </h3>
      <div className="grid grid-cols-5 gap-8">
        {iconGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <h4 className="text-sm font-medium text-gray-500 text-center bg-gray-50 py-2 rounded-md">
              {group.title}
            </h4>
            <div className="flex flex-col items-center gap-6">
              {iconMappings
                .filter((mapping) => group.icons.includes(mapping.id))
                .map((mapping) => {
                  const isActive = Array.from(activeItems).some((item) =>
                    mapping.items.includes(item),
                  );
                  return (
                    <div
                      key={mapping.id}
                      className={cn(
                        "w-16 h-16 p-2 rounded-lg transition-all duration-200",
                        isActive ? "opacity-100" : "opacity-30",
                      )}
                    >
                      <img
                        src={mapping.icon}
                        alt={mapping.id}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyIcons;
