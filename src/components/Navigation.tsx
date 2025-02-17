import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const location = useLocation();

  const links = [
    { href: "/", label: "AI Portfolio" },
    { href: "/horizontal-tree", label: "Deployment Flow" },
    { href: "/use-cases", label: "AI Use Cases" },
  ];

  return (
    <nav className="bg-white border-b border-red-100 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium",
                location.pathname === link.href && "bg-red-50 text-red-600",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
