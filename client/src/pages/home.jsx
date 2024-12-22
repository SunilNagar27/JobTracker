import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Features from "@/components/features";
import HowItWorks from "@/components/howitworks";
import Testimonial from "./testimonial";

const Home = () => {
  return (
    <>
    <div className="mb-20">
      <Header />
      <Features />
      <HowItWorks />


    </div>
    <Testimonial/>
    </>
  );
};

export default Home;