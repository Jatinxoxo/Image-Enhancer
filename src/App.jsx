import React from "react";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className=" mb-1 text-5xl font-bold text-gray-800">
          AI Image Enhancer {""}
        </h1>
        <p className="text-lg text-gray-500">
          {" "}
          Upload your Image and let AI enchance to you in seconds!
        </p>
      </div>
      <Home />

      <div className="text-lg text-gray-600 mt-6">Powered by @ReactAI</div>
    </div>
  );
};

export default App;
