"use client";

import React, { useState, useEffect, useRef } from "react";
import { Text } from "@medusajs/ui";
import "./ProductRail.css";
import Medusa from "@medusajs/medusa-js";
import { useInView } from "react-intersection-observer";


type ProductItemProps = {
  thumbnail: string;
  title: string;
  subtitle?: string; // Make subtitle optional
  style: React.CSSProperties;
};

const ProductItem = ({ thumbnail, title, subtitle, style }: ProductItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isSubTitleVisible, setIsSubTitleVisible] = useState(false);
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [lineWidth, setLineWidth] = useState('0%'); // State to control line width

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const [lineStyle, setLineStyle] = useState<React.CSSProperties>({});
  
  const isImageLeftAligned = style?.left !== undefined;

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
      setTimeout(() => setIsTitleVisible(true), 800);
      setTimeout(() => setIsSubTitleVisible(true), 1200);
      setTimeout(() => {
        setIsLineVisible(true);
        const initialLineState: React.CSSProperties = {
          border: "1px solid rgba(0,0,0,0.7)",
          position: "absolute",
          bottom: '0', // Adjust based on your layout
        };
        if (!isImageLeftAligned) {
          // Line grows from left to right
          setLineStyle({
            ...initialLineState,
            left: '23px', // Adjust based on your layout
            width: '0%',
            transition: 'width 0.4s ease-out',
          });
          setTimeout(() => setLineStyle(prev => ({ ...prev, width: "40%" })), 10); // Delay to trigger transition
        } else {
          // Line grows from right to left
          setLineStyle({
            ...initialLineState,
            right: '23px', // Adjust based on your layout
            width: '0%',
            transition: 'width 0.4s ease-out',
          });
          setTimeout(() => setLineStyle(prev => ({ ...prev, width: "35%" })), 10); // Delay to trigger transition
        }
      }, 1400);
    }
  }, [inView, isImageLeftAligned]);

  // console.log('isVisible', isVisible,'title ',title)
  const imgRef = useRef<HTMLImageElement>(null); // Ref for the image element

  // Intersection Observer callback function
  const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true); // Set image as visible
        observer.unobserve(entry.target); // Stop observing the current target
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1, // Adjust threshold according to your needs
    });
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [imgRef]);
  const containerAnimationClass = isVisible ? 'container-grow-animation' : '';

  const containerStyle: React.CSSProperties = {
    ...style,
    display: 'flex',
    flexDirection: isImageLeftAligned ? 'row' : 'row-reverse',
    alignItems: 'flex-start', // Adjust to align items at the start
  };

  const titleStyle: React.CSSProperties = {
    marginLeft: isImageLeftAligned ? '260px' : '0',
    marginRight: isImageLeftAligned ? '0' : '260px',
    marginTop: '10px', // Add this line to move the title down
    fontFamily: 'Avenir Next LT W02 Regular',
    // textTransform: "capitalize",
    fontSize: '24px',
    whiteSpace: 'normal', // Allow text to wrap onto the next line
    width: '200px', // Set a fixed width to control the wrapping
  };
  
  
  // Updated style for the subtitle
  const subtitleStyle: React.CSSProperties = {
    marginTop: '35px', // Add this line to move the subtitle down
    fontSize: '14px',
    marginLeft: isImageLeftAligned ? '280px' : '0',
    marginRight: isImageLeftAligned ? '0' : '250px',
    fontFamily: 'Avenir Next LT W02 Regular',
    // textTransform: "capitalize",
    color: '#000', // Ensure text color is black for visibility
    whiteSpace: 'pre-wrap', // Wrap text onto the next line
    wordWrap: 'break-word', // Break words if necessary to prevent overflow
    textAlign: isImageLeftAligned ? 'left' : 'right',
    width: isImageLeftAligned ? "40%" : '30%'
  };
// const lineStyle: React.CSSProperties = {
//     marginLeft: style?.left !== undefined ? '280px' : '23px',
//     border: "1px solid rgba(0,0,0,0.7)",
//     width: lineWidth, // Use dynamic width for the animation
//     maxWidth: style?.left !== undefined ? "40%" : "35%", // Set maximum width based on alignment
//     position: "absolute",
//     transition: 'width 0.4s ease-out', // Smooth out the animation
//   };

  
    // Adjust containerStyle to potentially include other necessary styles for animation
    const imageContainerStyle: React.CSSProperties = {
      background: "#e3e4e6",
      padding: "10%",
      width: "300px",
      height: "auto", // Ensure container can grow in height
      overflow: "hidden", // Optional, to ensure content fits within animated dimensions
    };
  

  return (
    <div className="product-item" ref={ref} style={containerStyle}>
  <div
        className={containerAnimationClass} // Apply the animation class to this div
        style={imageContainerStyle}
      >
        <img
          ref={imgRef} // Attach the ref to the image
          src={thumbnail}
          alt={title}
          style={{ width: "200px", height: "auto" }} // You might adjust this depending on animation needs
        />
      </div>
        <div style={{ marginTop: "12%", marginRight: "", position: "absolute" }}>
        {isTitleVisible && (

        <Text className="product-label" style={titleStyle}>
          {title}
        </Text>
              )}

        {subtitle && (
          <div>
                    {isSubTitleVisible && (

            <Text className="product-subtitle" style={subtitleStyle}>
              {subtitle || "Test Subtitle"}
            </Text>
                    )}
                    {(isLineVisible && (
            <div style={lineStyle}></div>

                    ))}
          </div>
        )}
      </div>
            
    </div>
  );
};

const getStyle = (index: number): React.CSSProperties => {
  switch (index) {
    case   0:
      return { position: 'absolute', right: '10%', top: '5%' } as React.CSSProperties;
    case   1:
      return { position: 'absolute', left: '10%', top: '25%' } as React.CSSProperties;
    case   2:
      return { position: 'absolute', right: '10%', top: '45%' } as React.CSSProperties;
    case   3:
      return { position: 'absolute', left: '10%', top: '65%' } as React.CSSProperties;
    default:
      return {} as React.CSSProperties; // Default style if none of the cases match
  }
};

type Product = {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
};

type FirstCollectionProps = {
  products: Product[]; // Assuming Product is the type of individual products
};
// console.log('products', productsData)
// Update the ProductRail component
const ProductRail: React.FC<FirstCollectionProps> = ({ products }) => {
  // Map your product data to ProductItem components
 // Before mapping, check if 'products' is defined and is an array to prevent runtime errors.
 const productList = products && Array.isArray(products) ? products.map((product, index) => (
  <ProductItem key={index} thumbnail={product.thumbnail} title={product.title} subtitle={product.subtitle} style={getStyle(index)} />
)) : null;
  // Render the ProductRail component
  return (
    <div className="product-rail" style={{ position: "relative" }}>
      <div className="product-collection" style={{ width: "85%" }}>
        {productList}
      </div>
    </div>
  );
};

export default ProductRail;