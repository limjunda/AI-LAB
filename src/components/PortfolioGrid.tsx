import React, { useState } from "react";
import TaxonomyColumn from "./TaxonomyColumn";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";

interface TaxonomyItem {
  id: string;
  label: string;
  description?: string;
  connections?: string[];
}

interface PortfolioGridProps {
  data?: {
    engineeringStack?: TaxonomyItem[];
    businessUnits?: TaxonomyItem[];
    humanAiInteraction?: TaxonomyItem[];
    cloudServices?: TaxonomyItem[];
    aiCapabilities?: TaxonomyItem[];
    aiTasks?: TaxonomyItem[];
    useCases?: TaxonomyItem[];
  };
}

const defaultData = {
  engineeringStack: [
    {
      id: "es1",
      label:
        "Orchestration: GKE, AKS & CI/CD: Cloud Build, Jenkins, GitHub Action",
      connections: ["uc3", "uc5", "uc6", "uc7", "uc8", "uc9", "uc10"],
    },
    {
      id: "es2",
      label: "Notebook deployments, Databricks",
      connections: ["uc7", "uc8"],
    },
    {
      id: "es3",
      label:
        "Front End: Angular, Vue.js, Flutter & Backend: Node.js, Django, Flask & Hosting: Firebase, GKE, AKS",
      connections: ["uc1", "uc2", "uc4", "uc9", "uc10"],
    },
    {
      id: "es4",
      label: "Serverless: Cloud Run, Cloud Functions, Azure Functions",
    },
  ],
  businessUnits: [
    { id: "bu1", label: "GROUP", connections: ["uc2"] },
    { id: "bu2", label: "PACS", connections: ["uc1", "uc4", "uc9"] },
    { id: "bu3", label: "PHKL", connections: ["uc1", "uc7", "uc8"] },
    { id: "bu4", label: "PLAI", connections: ["uc3", "uc5", "uc6"] },
    { id: "bu5", label: "PAMB", connections: ["uc5", "uc7", "uc8"] },
    { id: "bu6", label: "PBTB", connections: ["uc9", "uc10"] },
  ],
  humanAiInteraction: [
    {
      id: "hai1",
      label: "Interactive Web UI",
      connections: ["uc1", "uc2", "uc4", "uc6", "uc9", "uc10"],
    },
    { id: "hai2", label: "Conversational Interfaces", connections: ["uc2"] },
    { id: "hai3", label: "Backend Automation" },
    {
      id: "hai4",
      label: "REST API services",
      connections: ["uc5", "uc7", "uc8", "uc9", "uc10"],
    },
    { id: "hai5", label: "Batch Processing", connections: ["uc3"] },
  ],
  cloudServices: [
    {
      id: "cs1",
      label: "GCP: Doc AI, Az: Doc Intelligence",
      connections: ["uc5", "uc6", "uc7", "uc8", "uc9", "uc10"],
    },
    {
      id: "cs2",
      label: "GCP: Gemini, Az: Openai4o",
      connections: [
        "uc1",
        "uc2",
        "uc3",
        "uc4",
        "uc5",
        "uc6",
        "uc7",
        "uc8",
        "uc9",
        "uc10",
      ],
    },
    { id: "cs3", label: "Model Garden, Azure AI Foundry" },
    { id: "cs4", label: "Distillation, Lora" },
    {
      id: "cs5",
      label: "GCP: MedLM, Az: Healthcare",
      connections: ["uc6", "uc7", "uc8"],
    },
    { id: "cs6", label: "GCP: Chirp, Az: Whisper" },
    {
      id: "cs7",
      label: "GCP: ImageGen, Az: Dalle3",
      connections: ["uc1", "uc4"],
    },
    { id: "cs8", label: "GCP: Vertex AI search", connections: ["uc6"] },
    {
      id: "cs9",
      label: "GCP: Agent builder, Az: AutoGen",
      connections: ["uc6", "uc9", "uc10"],
    },
    {
      id: "cs10",
      label: "GCP: AutoML, Az: AutoML",
      connections: ["uc6", "uc7", "uc8", "uc9", "uc10"],
    },
    { id: "cs11", label: "Meta models", connections: ["uc2", "uc3"] },
    {
      id: "cs12",
      label: "Hugging Face models",
      connections: ["uc3", "uc9", "uc10"],
    },
    { id: "cs13", label: "CrewAI, AutoGPT", connections: ["uc6", "uc10"] },
    { id: "cs14", label: "LLamaIndex, Langchain", connections: ["uc2", "uc9"] },
  ],
  aiCapabilities: [
    {
      id: "ai1",
      label: "Document Intelligence",
      connections: ["uc5", "uc6", "uc7", "uc8", "uc9", "uc10"],
    },
    {
      id: "ai2",
      label: "RAG Frameworks",
      connections: ["uc2", "uc6", "uc9", "uc10"],
    },
    {
      id: "ai3",
      label: "LLMs",
      connections: ["uc1", "uc2", "uc3", "uc4", "uc7", "uc9", "uc10"],
    },
    { id: "ai4", label: "Fine-tuned LLMs", connections: ["uc2"] },
    { id: "ai5", label: "Multimodal LLMs", connections: ["uc1", "uc6"] },
    { id: "ai6", label: "Medical LLMs", connections: ["uc6", "uc7", "uc8"] },
    { id: "ai7", label: "Transcription STT/TTS", connections: ["uc3"] },
    {
      id: "ai8",
      label: "Predictive AI",
      connections: ["uc6", "uc7", "uc8", "uc9", "uc10"],
    },
    { id: "ai9", label: "Image LMs", connections: ["uc1", "uc4"] },
    { id: "ai10", label: "Video Models" },
    { id: "ai11", label: "Agentic Framework", connections: ["uc6", "uc10"] },
  ],
  aiTasks: [
    { id: "at1", label: "Forecasting", connections: ["uc6"] },
    {
      id: "at2",
      label: "Decision Making",
      connections: ["uc3", "uc6", "uc7", "uc8", "uc9", "uc10"],
    },
    { id: "at3", label: "Transcription", connections: ["uc3"] },
    {
      id: "at4",
      label: "Translation",
      connections: ["uc1", "uc6", "uc9", "uc10"],
    },
    {
      id: "at5",
      label: "Summarization",
      connections: ["uc2", "uc6", "uc7", "uc9", "uc10"],
    },
    {
      id: "at6",
      label: "Search Engine / Q&A",
      connections: ["uc2", "uc6", "uc9", "uc10"],
    },
    { id: "at7", label: "Chatbot", connections: ["uc2"] },
    {
      id: "at8",
      label: "Text Generation",
      connections: ["uc1", "uc4", "uc6", "uc9", "uc10"],
    },
    {
      id: "at9",
      label: "Text Extraction",
      connections: ["uc5", "uc6", "uc7", "uc8", "uc9", "uc10"],
    },
    { id: "at10", label: "Image Generation", connections: ["uc1", "uc4"] },
    { id: "at11", label: "Video Generation" },
    { id: "at12", label: "UDP", connections: ["uc7", "uc8", "uc9", "uc10"] },
    { id: "at13", label: "Web crawling", connections: ["uc6", "uc10"] },
    {
      id: "at14",
      label: "REST APIs",
      connections: ["uc7", "uc8", "uc9", "uc10"],
    },
    { id: "at15", label: "Data Copy & Querying" },
    {
      id: "at16",
      label: "File store connections",
      connections: ["uc3", "uc5"],
    },
  ],
  useCases: [
    { id: "uc1", label: "Marketing Content Gen AI" },
    { id: "uc2", label: "ReInsight AI" },
    { id: "uc3", label: "Onboarding Call Audit AI" },
    { id: "uc4", label: "Video Gen AI" },
    { id: "uc5", label: "Digitalization of Claims" },
    { id: "uc6", label: "Customer Health Risks" },
    { id: "uc7", label: "Fraud Detection" },
    { id: "uc8", label: "Claim Adjudication" },
    { id: "uc9", label: "Product Recommendation" },
    { id: "uc10", label: "Market Research" },
  ],
};

const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  data = defaultData,
}) => {
  const [highlightedItems, setHighlightedItems] = useState<Set<string>>(
    new Set(),
  );

  const handleItemClick = (item: TaxonomyItem) => {
    const newHighlightedItems = new Set<string>();

    if (!highlightedItems.has(item.id)) {
      newHighlightedItems.add(item.id);
      item.connections?.forEach((id) => newHighlightedItems.add(id));

      // Add reverse connections
      Object.values(data).forEach((category) => {
        category?.forEach((otherItem) => {
          if (otherItem.connections?.includes(item.id)) {
            newHighlightedItems.add(otherItem.id);
          }
        });
      });

      setHighlightedItems(newHighlightedItems);
    } else {
      setHighlightedItems(new Set());
    }
  };

  const handleReset = () => {
    setHighlightedItems(new Set());
  };

  return (
    <div className="bg-white p-6 h-full w-full">
      <div className="mb-4 flex justify-end">
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-4 h-[calc(100%-60px)]">
        <TaxonomyColumn
          title="Engineering Stack"
          items={data.engineeringStack}
          onItemClick={handleItemClick}
          highlightedItems={highlightedItems}
        />
        <TaxonomyColumn
          title="Business Units"
          items={data.businessUnits}
          onItemClick={handleItemClick}
          highlightedItems={highlightedItems}
        />
        <TaxonomyColumn
          title="Human-AI Interaction"
          items={data.humanAiInteraction}
          onItemClick={handleItemClick}
          highlightedItems={highlightedItems}
        />
        <TaxonomyColumn
          title="Cloud Services"
          items={data.cloudServices}
          onItemClick={handleItemClick}
          highlightedItems={highlightedItems}
        />
        <TaxonomyColumn
          title="AI Capabilities"
          items={data.aiCapabilities}
          onItemClick={handleItemClick}
          highlightedItems={highlightedItems}
        />
        <TaxonomyColumn
          title="AI Tasks"
          items={data.aiTasks}
          onItemClick={handleItemClick}
          highlightedItems={highlightedItems}
        />
        <TaxonomyColumn
          title="Use Cases"
          items={data.useCases}
          onItemClick={handleItemClick}
          highlightedItems={highlightedItems}
        />
      </div>
    </div>
  );
};

export default PortfolioGrid;
