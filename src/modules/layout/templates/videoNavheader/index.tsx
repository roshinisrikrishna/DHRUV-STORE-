"use client";

import { Button, Heading } from "@medusajs/ui";
import InteractiveLink from "@modules/common/components/interactive-link";
import { Github } from "@medusajs/icons";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'


const VideoNavHeader = () => {

  const params = useParams();
  // console.log("params ",params);
  const [men, setMen] = useState(false);
  const [women, setWomen] = useState(false);
  const [homePath, setHomePath] = useState(false);
  
  

  useEffect(() => {
    // Check if params is an empty object
    const isParamsEmpty = Object.keys(params).length === 0;
  
    // Set homePath to true only if params is an empty object
    // setHomePath(isParamsEmpty);
  
    // If params is not empty, check for 'category'
    if (!isParamsEmpty && params.category) {
      const category = params.category.length > 0 ? params.category[0] : null;
      setMen(category === 'men');
      setWomen(category === 'women');
    } else {
      // Reset men and women states if params is empty or doesn't have 'category'
      setMen(false);
      setWomen(false);
    }
  
    // console.log("Params:", params);
  }, [params]);
  
  // Function to handle navigation
  
  // let currentPathname;

  useEffect(() => {
    if (location && location.pathname) {
      const currentPathname = location.pathname;
      // console.log('currentPathname', currentPathname);
  
      // Update navBackground based on currentPathnameac
      const homebool =  currentPathname.trim() === '/' ;
      setHomePath(homebool);
  
      
      // console.log('navBackground', homebool); // Print the updated value
    }
  }, [location.pathname]);

 

// console.log('men', men)
  return (
    <>
    <div className="h-[75vh] w-full border-b border-ui-border-base relative top-0" style={{background:"", minHeight:"850px", marginTop:"-5.4%"}}>
      {/* Background Video */}
    
      {men && (
        <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ marginTop: "-5%" }}
      >
        
        <source src="/man-pose.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      )}
      {women && (
        <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ marginTop: "-5%" }}
      >
        
        <source src="/women-pose.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      )}
      {homePath && (
        <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ marginTop: "-5%" }}
      >
        
        <source src="/group-pose.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      )}
      

      {/* Overlay Content */}
      {/* Other content goes here */}
    </div>
    </>
  );
};

export default VideoNavHeader;
