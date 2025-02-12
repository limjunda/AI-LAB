import React from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface TaxonomyItem {
  id: string;
  label: string;
  description?: string;
  isHighlighted?: boolean;
}

interface TaxonomyColumnProps {
  title?: string;
  items?: TaxonomyItem[];
  onItemClick?: (item: TaxonomyItem) => void;
  highlightedItems?: Set<string>;
}

const defaultItems: TaxonomyItem[] = [
  { id: "1", label: "Sample Item 1", description: "Description for item 1" },
  { id: "2", label: "Sample Item 2", description: "Description for item 2" },
  { id: "3", label: "Sample Item 3", description: "Description for item 3" },
];

const TaxonomyColumn: React.FC<TaxonomyColumnProps> = ({
  title = "Column Title",
  items = defaultItems,
  onItemClick = () => {},
  highlightedItems = new Set(),
}) => {
  return (
    <Card className="w-[180px] bg-white p-4 flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-center text-white bg-red-600 py-2 rounded-md">
        {title}
      </h3>

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {items.map((item) => (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => onItemClick(item)}
                    className={`
                      p-2 rounded-md cursor-pointer transition-colors
                      ${
                        highlightedItems.has(item.id)
                          ? "bg-red-50 hover:bg-red-100"
                          : "hover:bg-red-50"
                      }
                    `}
                  >
                    <Badge
                      variant={
                        highlightedItems.has(item.id) ? "default" : "outline"
                      }
                      className="w-full justify-center text-sm"
                    >
                      {item.label}
                    </Badge>
                  </div>
                </TooltipTrigger>
                {item.description && (
                  <TooltipContent>
                    <p>{item.description}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default TaxonomyColumn;
