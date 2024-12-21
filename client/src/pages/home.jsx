import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Features from "@/components/features";
import HowItWorks from "@/components/howitworks";

const Home = () => {
  return (
    <div className="mb-20">
      <Header />
      <Features />
      <HowItWorks />

    </div>
  );
};

export default Home;