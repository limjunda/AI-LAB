import React, { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import TechnologyIcons from "./TechnologyIcons";

interface ItemGroup {
  title: string;
  items: {
    id: string;
    label: string;
    nextIds?: string[];
  }[];
}

interface Column {
  id: string;
  title: string;
  groups: ItemGroup[];
}

const columns: Column[] = [
  {
    id: "entry",
    title: "PII Data & LBU Data Residency Consideration",
    groups: [
      {
        title: "Strict Path",
        items: [
          {
            id: "strict",
            label: "Strict",
            nextIds: ["native_hosting", "cross_secure", "decouple"],
          },
        ],
      },
      {
        title: "Flexible Path",
        items: [
          {
            id: "flexible",
            label: "Flexible",
            nextIds: ["cross_region"],
          },
        ],
      },
    ],
  },
  {
    id: "hosting",
    title: "Hosting Strategy",
    groups: [
      {
        title: "Strict Path",
        items: [
          {
            id: "native_hosting",
            label: "Native Hosting",
            nextIds: ["data_server_lbu"],
          },
          {
            id: "cross_secure",
            label: "Cross Secured Connection",
            nextIds: ["data_server_lbu", "flexible_route"],
          },
          {
            id: "decouple",
            label: "Decouple Data & AI Workload",
            nextIds: ["data_server_lbu_2", "ai_services"],
          },
        ],
      },
      {
        title: "Flexible Path",
        items: [
          {
            id: "cross_region",
            label: "Cross Region Secured Connection",
            nextIds: ["encryption_caching"],
          },
        ],
      },
    ],
  },
  {
    id: "processing",
    title: "Data Processing",
    groups: [
      {
        title: "Strict Path",
        items: [
          {
            id: "data_server_lbu",
            label: "Data Servers in LBU",
            nextIds: ["data_masking"],
          },
          {
            id: "data_server_lbu_2",
            label: "Data Servers in LBU",
            nextIds: ["data_masking"],
          },
          {
            id: "ai_services",
            label: "AI Services",
            nextIds: ["ai_endpoints"],
          },
        ],
      },
      {
        title: "Flexible Path",
        items: [
          {
            id: "encryption_caching",
            label: "Encryption, Caching Considerations",
            nextIds: ["ai_data_services"],
          },
        ],
      },
    ],
  },
  {
    id: "services",
    title: "Services",
    groups: [
      {
        title: "Strict Path",
        items: [
          {
            id: "data_masking",
            label: "Data Masking Considerations",
            nextIds: ["udp_storage"],
          },
          {
            id: "ai_endpoints",
            label: "AI Endpoints",
            nextIds: ["oss_model_containers", "foundation_apis_2"],
          },
        ],
      },
      {
        title: "Flexible Path",
        items: [
          {
            id: "ai_data_services",
            label: "AI & Data Services",
            nextIds: [
              "udp_storage_flex",
              "oss_model_containers_flex",
              "foundation_apis_flex",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "storage_containers",
    title: "Storage & Containers",
    groups: [
      {
        title: "Strict Path",
        items: [
          {
            id: "udp_storage",
            label: "UDP / Cloud Storage",
            nextIds: ["orchestration_1"],
          },
          {
            id: "oss_model_containers",
            label: "OSS Model Containers",
            nextIds: ["orchestration_1"],
          },
          {
            id: "foundation_apis_2",
            label: "Foundation APIs",
            nextIds: ["orchestration_1"],
          },
        ],
      },
      {
        title: "Flexible Path",
        items: [
          {
            id: "udp_storage_flex",
            label: "UDP / Cloud Storage",
            nextIds: ["orchestration_2"],
          },
          {
            id: "oss_model_containers_flex",
            label: "OSS Model Containers",
            nextIds: ["orchestration_2"],
          },
          {
            id: "foundation_apis_flex",
            label: "Foundation APIs",
            nextIds: ["orchestration_2"],
          },
        ],
      },
    ],
  },
  {
    id: "integration",
    title: "Integration",
    groups: [
      {
        title: "Strict Path",
        items: [
          {
            id: "orchestration_1",
            label: "Orchestration Containers",
            nextIds: ["backend_integration_1", "frontend_ui_1", "backend_ui_1"],
          },
        ],
      },
      {
        title: "Flexible Path",
        items: [
          {
            id: "orchestration_2",
            label: "Orchestration Containers",
            nextIds: ["backend_integration_2", "frontend_ui_2", "backend_ui_2"],
          },
        ],
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend/Backend",
    groups: [
      {
        title: "Strict Path",
        items: [
          { id: "backend_integration_1", label: "Backend Integration" },
          { id: "frontend_ui_1", label: "Front End UI" },
          { id: "backend_ui_1", label: "Backend for UI" },
        ],
      },
      {
        title: "Flexible Path",
        items: [
          { id: "backend_integration_2", label: "Backend Integration" },
          { id: "frontend_ui_2", label: "Front End UI" },
          { id: "backend_ui_2", label: "Backend for UI" },
        ],
      },
    ],
  },
];

export default function HorizontalDecisionTree() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [activeConnections, setActiveConnections] = useState<Set<string>>(
    new Set(),
  );
  const [allConnections, setAllConnections] = useState<
    Array<{ from: string; to: string }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const connections: Array<{ from: string; to: string }> = [];
    columns.forEach((column) => {
      column.groups.forEach((group) => {
        group.items.forEach((item) => {
          if (item.nextIds) {
            item.nextIds.forEach((nextId) => {
              connections.push({ from: item.id, to: nextId });
            });
          }
        });
      });
    });
    setAllConnections(connections);

    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        setAllConnections([...connections]);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleItemClick = (itemId: string, nextIds?: string[]) => {
    const newSelected = new Set(selectedItems);
    const newActiveConnections = new Set(activeConnections);

    if (selectedItems.has(itemId)) {
      // Deselect item and its connections
      newSelected.delete(itemId);
      allConnections.forEach(({ from, to }) => {
        if (from === itemId || to === itemId) {
          newActiveConnections.delete(`${from}-${to}`);
        }
      });
    } else {
      // Select item
      newSelected.add(itemId);

      // Add connections only between selected items
      allConnections.forEach(({ from, to }) => {
        if (
          (from === itemId && newSelected.has(to)) ||
          (to === itemId && newSelected.has(from))
        ) {
          newActiveConnections.add(`${from}-${to}`);
        }
      });
    }

    setSelectedItems(newSelected);
    setActiveConnections(newActiveConnections);
  };

  const handleReset = () => {
    setSelectedItems(new Set());
    setActiveConnections(new Set());
  };

  const renderConnections = () => {
    if (!containerRef.current) return null;

    const containerRect = containerRef.current.getBoundingClientRect();
    const lines: JSX.Element[] = [];

    allConnections.forEach(({ from, to }) => {
      const fromElement = containerRef.current?.querySelector(
        `[data-item-id="${from}"]`,
      );
      const toElement = containerRef.current?.querySelector(
        `[data-item-id="${to}"]`,
      );

      if (fromElement && toElement) {
        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();

        const x1 = fromRect.right - containerRect.left;
        const y1 = fromRect.top - containerRect.top + fromRect.height / 2;
        const x2 = toRect.left - containerRect.left;
        const y2 = toRect.top - containerRect.top + toRect.height / 2;

        const dx = x2 - x1;
        const controlX = dx / 3;

        const isActive = activeConnections.has(`${from}-${to}`);

        lines.push(
          <g key={`${from}-${to}`}>
            <path
              d={`M ${x1} ${y1} C ${x1 + controlX} ${y1}, ${x2 - controlX} ${y2}, ${x2} ${y2}`}
              fill="none"
              stroke={isActive ? "#ef4444" : "#64748b"}
              strokeWidth="2"
              strokeDasharray={isActive ? "none" : "4"}
            />
          </g>,
        );
      }
    });

    return lines;
  };

  return (
    <div className="max-w-[1800px] mx-auto py-8 px-4 overflow-x-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-red-900">
            AI Model Deployment Flow
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
          Click on items to explore different deployment paths and options.
        </p>
      </div>

      <div className="relative" ref={containerRef}>
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: "100%", height: "100%" }}
        >
          {renderConnections()}
        </svg>

        <div className="grid grid-cols-7 gap-16">
          {columns.map((column) => (
            <div key={column.id} className="flex flex-col">
              <div className="h-20 flex items-center justify-center px-2 mb-2">
                <h3 className="text-lg font-semibold text-red-900 text-center leading-tight">
                  {column.title}
                </h3>
              </div>
              <div className="space-y-4">
                {column.groups.map((group, index) => (
                  <Card key={index} className="bg-white p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-4">
                      {group.title}
                    </h4>
                    <ScrollArea className="h-[250px]">
                      <div className="space-y-2">
                        {group.items.map((item) => (
                          <div
                            key={item.id}
                            data-item-id={item.id}
                            onClick={() =>
                              handleItemClick(item.id, item.nextIds)
                            }
                            style={{ cursor: "pointer" }}
                            className={cn(
                              "p-2 rounded-md cursor-pointer transition-colors",
                              selectedItems.has(item.id)
                                ? "bg-red-50 hover:bg-red-100"
                                : "hover:bg-red-50",
                            )}
                          >
                            <Badge
                              variant={
                                selectedItems.has(item.id)
                                  ? "default"
                                  : "outline"
                              }
                              className="w-full justify-center text-sm"
                            >
                              {item.label}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <TechnologyIcons activeItems={selectedItems} />
    </div>
  );
}
