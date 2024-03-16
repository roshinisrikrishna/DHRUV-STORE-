"use client";

import React, { useState } from "react";
import { Button, Heading } from "@medusajs/ui";
import InteractiveLink from "@modules/common/components/interactive-link";
import { Github } from "@medusajs/icons";

const features = [
  {
    imageSrc: "/ganeshaback.png",
    description: "Feature 1 Description",
  },
  {
    imageSrc: "/violinman.png",
    description: "Feature 2 Description",
  },
  {
    imageSrc: "/circleman.png",
    description: "Feature 3 Description",
  },
];

const Hero = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="h-auto w-full border-b border-ui-border-base relative flex flex-col pt-9" style={{ fontFamily: "Avenir Next LT W02 Regular", background: "#F5F6FA" }}>
      <div className="flex flex-row h-[75vh]">
        <div className="flex-1 flex flex-col justify-center items-start text-left p-32 gap-6">
          <Heading level="h2" className="text-2xl-semi mb-4 drop-shadow-md shadow-black" style={{ fontFamily: "Futura LT W01 Medium", fontSize: "78px",lineHeight:"1.2em" }}>
            EXPERIENCE SERENITY
          </Heading>
          <Heading level="h3" className="text-base-regular max-w-[32rem] mb-6 drop-shadow-md shadow-black" style={{ fontFamily: "Avenir Next LT W02 Regular", fontSize: "26px", lineHeight: "1.2em" }}>
            Our crafts brings you home divinity, tranquility and happiness
          </Heading>
          {/* Additional divs row below Heading with unique content */}
          <div className="flex w-full gap-7">
          {features.map((feature, index) => (
  <div
    key={index}
    className="flex-1 flex"
    onMouseEnter={() => setHoveredIndex(index)}
    onMouseLeave={() => setHoveredIndex(null)}
    style={{ position: 'relative', transition: 'transform 0.3s ease' }}
  >
    <div className="w-1/2" style={{ transform: hoveredIndex === index ? 'translateY(-10%)' : 'translateY(0)' }}>
      <img src={feature.imageSrc} alt={`Feature ${index + 1}`} style={{ width: "65%" }} />
    </div>
    <div className="w-1/2 flex flex-col justify-center relative" style={{ transform: hoveredIndex === index ? 'translateY(-10%)' : 'translateY(0)' }}>
      <p>{feature.description}</p>
      {hoveredIndex === index && (
        <div className={`border-b border-black absolute bottom-0 left-0 w-full transition-transform transform translate-y-[-5px] ${hoveredIndex === index ? "border-animation" : ""}`}></div>
      )}
    </div>
  </div>
))}

          </div>
        </div>
        {/* Image Column (Right Half of Screen) */}
        <div className="flex-1">
          <img src="/dhruvganeshafront.png" alt="Summer Styles" style={{ width: "60%" }} />
        </div>
      </div>
      <style>
        {`
        /* Add this to your CSS file */
        @keyframes slideInFromLeft {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        
        .border-animation {
          animation: slideInFromLeft 0.5s ease-out forwards;
        }
        `}
      </style>
    </div>
  );
};

export default Hero;
