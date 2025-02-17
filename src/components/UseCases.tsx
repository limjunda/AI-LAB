import React, { useState, useEffect } from "react";
import { fetchLatestAIUseCases } from "@/lib/api";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface UseCase {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  aiTypes: string[];
  image: string;
  source?: string;
}

// Simulated web scraping results
const scrapedResults: UseCase[][] = [
  [
    {
      id: 1,
      title: "AI-Powered Medical Diagnosis Assistant",
      description:
        "Deep learning system that analyzes medical images to assist in early disease detection and diagnosis",
      techStack: ["Python", "TensorFlow", "Docker", "Flask", "PostgreSQL"],
      aiTypes: ["Computer Vision", "Deep Learning", "CNN"],
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format",
      source: "healthcare-ai.com",
    },
    {
      id: 2,
      title: "Real-time Language Translation Platform",
      description:
        "Multilingual translation system using transformer models for real-time communication",
      techStack: ["PyTorch", "FastAPI", "Redis", "React", "WebSocket"],
      aiTypes: ["NLP", "Transformer Models", "BERT"],
      image:
        "https://images.unsplash.com/photo-1545987796-200677ee1011?w=500&auto=format",
      source: "ai-trends.org",
    },
    {
      id: 3,
      title: "Autonomous Drone Navigation System",
      description:
        "AI-powered system for autonomous drone navigation and obstacle avoidance",
      techStack: ["ROS", "Python", "C++", "CUDA", "OpenCV"],
      aiTypes: ["Reinforcement Learning", "Computer Vision", "SLAM"],
      image:
        "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&auto=format",
      source: "robotics-weekly.com",
    },
    {
      id: 4,
      title: "Predictive Manufacturing Maintenance",
      description:
        "IoT and AI system for predicting equipment failures and maintenance needs",
      techStack: ["Python", "TensorFlow", "Apache Kafka", "MongoDB", "Node.js"],
      aiTypes: [
        "Time Series Analysis",
        "Anomaly Detection",
        "Machine Learning",
      ],
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=500&auto=format",
      source: "industry4-news.com",
    },
    {
      id: 5,
      title: "AI-Enhanced Customer Service Bot",
      description:
        "Advanced chatbot using LLMs for natural conversation and customer support",
      techStack: ["Python", "LangChain", "OpenAI API", "Node.js", "MongoDB"],
      aiTypes: ["NLP", "LLM", "Sentiment Analysis"],
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&auto=format",
      source: "ai-business.com",
    },
    {
      id: 6,
      title: "Smart Energy Grid Optimizer",
      description:
        "AI system for optimizing energy distribution and consumption in smart grids",
      techStack: [
        "Python",
        "Scikit-learn",
        "Apache Spark",
        "TimescaleDB",
        "GraphQL",
      ],
      aiTypes: [
        "Reinforcement Learning",
        "Time Series Forecasting",
        "Optimization",
      ],
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&auto=format",
      source: "energy-ai.net",
    },
  ],
  [
    {
      id: 7,
      title: "AI-Driven Financial Fraud Detection",
      description:
        "Real-time fraud detection system using advanced machine learning algorithms",
      techStack: ["Python", "TensorFlow", "Kafka", "Elasticsearch", "FastAPI"],
      aiTypes: ["Anomaly Detection", "Deep Learning", "Real-time Processing"],
      image:
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&auto=format",
      source: "fintech-ai.com",
    },
    {
      id: 8,
      title: "Autonomous Vehicle Vision System",
      description:
        "Multi-modal perception system for autonomous vehicles using sensor fusion",
      techStack: ["C++", "CUDA", "ROS2", "PyTorch", "OpenCV"],
      aiTypes: [
        "Computer Vision",
        "Sensor Fusion",
        "Real-time Object Detection",
      ],
      image:
        "https://images.unsplash.com/photo-1557411732-1797a9171fcf?w=500&auto=format",
      source: "autonomous-weekly.com",
    },
    {
      id: 9,
      title: "AI Content Recommendation Engine",
      description:
        "Personalized content recommendation system using collaborative filtering",
      techStack: ["Python", "PyTorch", "Redis", "FastAPI", "PostgreSQL"],
      aiTypes: [
        "Recommendation Systems",
        "Matrix Factorization",
        "Deep Learning",
      ],
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format",
      source: "recommender-systems.org",
    },
    {
      id: 10,
      title: "Smart Agriculture Monitoring",
      description:
        "AI-powered system for crop health monitoring and yield prediction",
      techStack: ["Python", "TensorFlow", "IoT Sensors", "MongoDB", "FastAPI"],
      aiTypes: ["Computer Vision", "Time Series Analysis", "IoT Analytics"],
      image:
        "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=500&auto=format",
      source: "agritech-news.com",
    },
    {
      id: 11,
      title: "AI Code Assistant Pro",
      description:
        "Advanced code completion and generation using latest LLM models",
      techStack: ["Python", "PyTorch", "FastAPI", "Redis", "PostgreSQL"],
      aiTypes: ["NLP", "Code Generation", "Transformer Models"],
      image:
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format",
      source: "dev-ai-tools.com",
    },
    {
      id: 12,
      title: "Healthcare Patient Flow Optimizer",
      description:
        "AI system for optimizing hospital patient flow and resource allocation",
      techStack: [
        "Python",
        "OptaPlanner",
        "Spring Boot",
        "PostgreSQL",
        "React",
      ],
      aiTypes: ["Optimization", "Predictive Analytics", "Resource Planning"],
      image:
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500&auto=format",
      source: "health-tech-daily.com",
    },
  ],
];

export default function UseCases() {
  const [loading, setLoading] = useState(false);
  const [currentSet, setCurrentSet] = useState(0);
  const [useCases, setUseCases] = useState<UseCase[]>(scrapedResults[0]);

  const fetchNewUseCases = async () => {
    setLoading(true);
    try {
      const newUseCases = await fetchLatestAIUseCases();
      setUseCases(newUseCases);
    } catch (error) {
      console.error("Error fetching use cases:", error);
      // Fallback to static data if API fails
      const nextSet = (currentSet + 1) % scrapedResults.length;
      setCurrentSet(nextSet);
      setUseCases(scrapedResults[nextSet]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-red-900">
              Latest AI Use Cases
            </h2>
            <p className="text-gray-600 mt-2">
              Real-time AI applications and implementation requirements from
              across the web
            </p>
          </div>
          <Button
            onClick={fetchNewUseCases}
            disabled={loading}
            variant="outline"
            className="flex items-center gap-2 text-red-600 border-red-600 hover:bg-red-50"
          >
            <RotateCw className={cn("h-4 w-4", loading && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((useCase) => (
          <Card key={useCase.id} className="overflow-hidden flex flex-col">
            <img
              src={useCase.image}
              alt={useCase.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {useCase.description}
                </p>
                {useCase.source && (
                  <p className="text-xs text-gray-400 mb-4">
                    Source: {useCase.source}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {useCase.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="bg-blue-50"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">AI Types:</h4>
                  <div className="flex flex-wrap gap-2">
                    {useCase.aiTypes.map((type) => (
                      <Badge
                        key={type}
                        variant="outline"
                        className="bg-green-50"
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
