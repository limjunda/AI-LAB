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
    items: [
      "udp_storage",
      "udp_storage_flex",
      "native_hosting",
      "cross_secure",
      "data_server_lbu",
    ],
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

const TechnologyIcons: React.FC<TechnologyIconsProps> = ({ activeItems }) => {
  return (
    <div className="mt-8 p-4 bg-white rounded-lg border border-red-100">
      <h3 className="text-lg font-semibold text-red-900 mb-4 text-center">
        Technology Stack
      </h3>
      <div className="flex justify-center gap-8 flex-wrap">
        {iconMappings.map((mapping) => {
          const isActive = Array.from(activeItems).some((item) =>
            mapping.items.includes(item),
          );
          return (
            <div
              key={mapping.id}
              className={cn(
                "w-24 h-24 p-4 rounded-lg transition-all duration-200",
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
  );
};

export default TechnologyIcons;
