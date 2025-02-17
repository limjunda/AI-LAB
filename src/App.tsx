import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import HorizontalDecisionTree from "./components/HorizontalDecisionTree";
import Navigation from "./components/Navigation";
import UseCases from "./components/UseCases";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      <div className="flex-1">
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/horizontal-tree"
              element={<HorizontalDecisionTree />}
            />
            <Route path="/use-cases" element={<UseCases />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
