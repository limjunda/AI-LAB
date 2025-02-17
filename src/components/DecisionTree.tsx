import React, { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Decision {
  id: string;
  text: string;
  options?: {
    text: string;
    nextId?: string;
  }[];
}

interface NodePosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const initialDecisions: Record<string, Decision> = {
  start: {
    id: "start",
    text: "AI Taxonomy Drill Down - PII data & LBU Data Residency Considerations",
    options: [
      { text: "Strict", nextId: "strict" },
      { text: "Flexible", nextId: "flexible" },
    ],
  },
  strict: {
    id: "strict",
    text: "Solutions that need group tenancy deployment for central management and local compliance",
    options: [
      { text: "Native Hosting", nextId: "native_hosting" },
      { text: "Cross Secured Connection", nextId: "cross_secure" },
      { text: "Decouple Data & AI Workload", nextId: "decouple" },
    ],
  },
  native_hosting: {
    id: "native_hosting",
    text: "Cloud & AI services in native region",
    options: [
      { text: "Available in region", nextId: "cloud_services" },
      { text: "Not available - Follow Decouple route", nextId: "decouple" },
    ],
  },
  cross_secure: {
    id: "cross_secure",
    text: "Subject to approvals, data and info security measures apply",
    options: [
      { text: "Data Server in LBU", nextId: "data_masking" },
      { text: "Take Flexible route", nextId: "flexible" },
    ],
  },
  data_masking: {
    id: "data_masking",
    text: "Data Masking",
    options: [
      { text: "Configure data masking" },
      { text: "Set up security policies" },
    ],
  },
  flexible: {
    id: "flexible",
    text: "Cross region secured Connection",
    options: [
      { text: "Encryption & Caching Considerations", nextId: "encryption" },
      { text: "Data Server in LBU", nextId: "data_server" },
    ],
  },
  decouple: {
    id: "decouple",
    text: "Decouple Data & AI Workload (South East Asia / US East)",
    options: [
      { text: "AI Services", nextId: "ai_endpoints" },
      { text: "Data Services", nextId: "data_services" },
      { text: "OSS Model Containers", nextId: "oss_containers" },
    ],
  },
  ai_endpoints: {
    id: "ai_endpoints",
    text: "AI Endpoints",
    options: [{ text: "Foundation Model APIs", nextId: "foundation_apis" }],
  },
  data_services: {
    id: "data_services",
    text: "Data Services",
    options: [
      { text: "UDP data pipeline", nextId: "udp_pipeline" },
      { text: "Cloud Storage", nextId: "cloud_storage" },
    ],
  },
  oss_containers: {
    id: "oss_containers",
    text: "OSS Model Containers",
    options: [
      { text: "Human-AI Interaction", nextId: "human_ai" },
      { text: "No Human-AI Interaction", nextId: "backend_integration" },
    ],
  },
  human_ai: {
    id: "human_ai",
    text: "Front End UI",
    options: [
      { text: "Backend Integration" },
      { text: "UI Components (Node, Java)" },
    ],
  },
  backend_integration: {
    id: "backend_integration",
    text: "Backend Integration",
    options: [{ text: "API Integration" }, { text: "Service Integration" }],
  },
  encryption: {
    id: "encryption",
    text: "Encryption & Caching Considerations",
    options: [
      { text: "Configure encryption" },
      { text: "Set up caching policies" },
    ],
  },
  data_server: {
    id: "data_server",
    text: "Data Server in LBU",
    options: [
      { text: "Configure data server" },
      { text: "Set up security measures" },
    ],
  },
  foundation_apis: {
    id: "foundation_apis",
    text: "Foundation Model APIs",
    options: [{ text: "Configure API access" }, { text: "Set up monitoring" }],
  },
  udp_pipeline: {
    id: "udp_pipeline",
    text: "UDP Data Pipeline",
    options: [{ text: "Configure pipeline" }, { text: "Set up monitoring" }],
  },
  cloud_storage: {
    id: "cloud_storage",
    text: "Cloud Storage",
    options: [{ text: "Configure storage" }, { text: "Set up backup" }],
  },
  cloud_services: {
    id: "cloud_services",
    text: "Cloud Services Available in Region",
    options: [
      { text: "Configure cloud services" },
      { text: "Set up monitoring" },
    ],
  },
};

export default function DecisionTree() {
  const [selectedPath, setSelectedPath] = useState<string[]>(["start"]);
  const [nodePositions, setNodePositions] = useState<NodePosition[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const renderedNodes = useRef(new Set<string>());

  const handleNodeClick = (nodeId: string) => {
    const index = selectedPath.indexOf(nodeId);
    if (index === -1) {
      setSelectedPath((prev) => [...prev, nodeId]);
    } else {
      setSelectedPath((prev) => prev.slice(0, index + 1));
    }
  };

  const handleReset = () => {
    setSelectedPath(["start"]);
    renderedNodes.current.clear();
  };

  useEffect(() => {
    // Reset node positions when path changes
    setNodePositions([]);
    renderedNodes.current.clear();
  }, [selectedPath]);

  const updateNodePosition = (nodeId: string, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const container = element.closest(".tree-container");
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const position = {
      id: nodeId,
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top + rect.height / 2,
      width: rect.width,
      height: rect.height,
    };

    setNodePositions((prev) => {
      const existing = prev.findIndex((p) => p.id === nodeId);
      if (existing >= 0) {
        const newPositions = [...prev];
        newPositions[existing] = position;
        return newPositions;
      }
      return [...prev, position];
    });
  };

  const renderNode = (nodeId: string, level: number) => {
    const node = initialDecisions[nodeId];
    if (!node) return null;

    const isSelected = selectedPath.includes(nodeId);
    const isLast = selectedPath[selectedPath.length - 1] === nodeId;
    const hasBeenRendered = renderedNodes.current.has(nodeId);

    if (hasBeenRendered) {
      return (
        <div
          key={`${nodeId}-${level}`}
          className={cn("flex flex-col items-center", level > 0 && "mt-4")}
        >
          <Card
            className={cn(
              "p-4 cursor-pointer transition-all w-[300px] border-dashed",
              isSelected ? "border-red-500 shadow-lg" : "hover:border-red-200",
              isLast && "ring-2 ring-red-500",
            )}
            onClick={() => handleNodeClick(nodeId)}
          >
            <h4 className="font-medium text-center text-gray-500">
              Reference: {node.text}
            </h4>
          </Card>
        </div>
      );
    }

    renderedNodes.current.add(nodeId);

    return (
      <div
        key={`${nodeId}-${level}`}
        className={cn("flex flex-col items-center", level > 0 && "mt-4")}
        ref={(el) => el && updateNodePosition(nodeId, el)}
      >
        <Card
          className={cn(
            "p-4 cursor-pointer transition-all w-[300px]",
            isSelected ? "border-red-500 shadow-lg" : "hover:border-red-200",
            isLast && "ring-2 ring-red-500",
          )}
          onClick={() => handleNodeClick(nodeId)}
        >
          <h4 className="font-medium text-center">{node.text}</h4>
        </Card>

        {isSelected && node.options && (
          <div
            className={cn(
              "mt-4 grid gap-4",
              "grid-cols-1",
              node.options.length > 2 && "md:grid-cols-3",
              node.options.length === 2 && "md:grid-cols-2",
            )}
          >
            {node.options.map(
              (option) => option.nextId && renderNode(option.nextId, level + 1),
            )}
          </div>
        )}
      </div>
    );
  };

  const renderConnections = () => {
    return selectedPath.map((nodeId, index) => {
      if (index === 0) return null;
      const fromNode = nodePositions.find(
        (p) => p.id === selectedPath[index - 1],
      );
      const toNode = nodePositions.find((p) => p.id === nodeId);

      if (!fromNode || !toNode) return null;

      return (
        <line
          key={`${fromNode.id}-${toNode.id}`}
          x1={fromNode.x}
          y1={fromNode.y + fromNode.height / 2}
          x2={toNode.x}
          y2={toNode.y - toNode.height / 2}
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="4"
        />
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-red-900">
            AI Model Deployment Decision Tree
          </h2>
          <Button
            variant="outline"
            onClick={handleReset}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Reset
          </Button>
        </div>
        <p className="text-gray-600 mt-2">
          Click on nodes to explore different deployment paths and options.
        </p>
      </div>

      <div className="overflow-x-auto pb-8">
        <div className="min-w-[800px] relative tree-container">
          <svg
            ref={svgRef}
            className="absolute inset-0 pointer-events-none"
            style={{ width: "100%", height: "100%" }}
          >
            {renderConnections()}
          </svg>
          {renderNode("start", 0)}
        </div>
      </div>
    </div>
  );
}
