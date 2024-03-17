import { Heading } from "@medusajs/ui";
import React, { CSSProperties } from 'react';

const HeadingPage = () => {
  // Define the background style with the image using CSSProperties
  const backgroundStyle: CSSProperties = {
    backgroundImage: 'url("/bgwave1.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '80vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Define the style for the top left corner text
  const topLeftTextStyle: CSSProperties = {
    position: 'absolute',
    top: '75px',
    left: '35px',
    padding: '1rem',
    fontFamily: "Avenir Next LT W02 Regular",
    textTransform: 'uppercase',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: "0.18em"
  };

  // Define the style for the "HOME >" text
  const homeStyle: CSSProperties = {
    color: 'rgba(0,0,0,0.4)'
  };

  // Define the style for the "PAYMENT AND DELIVERY" text
  const paymentDeliveryStyle: CSSProperties = {
    color: 'rgba(0,0,0,0.8)',
    paddingLeft:"8px"
  };

  return (
    <div style={{ fontFamily: "Avenir Next LT W02 Regular", marginTop: "-5%", position: 'relative' }}>
      {/* Text in top left corner */}
      <div style={topLeftTextStyle}>
        <span style={homeStyle}>HOME {'>'}</span>
        <span style={paymentDeliveryStyle}> SHIPPING AND DELIVERY</span>
      </div>
      
      {/* Background and Warranty Info with background image */}
      <div className="text-center" style={backgroundStyle}>
        <Heading level="h1" className="text-4xl mb-4" style={{ fontFamily: "Times New Roman,serif", fontStyle: "italic", fontWeight: 500, color: "white", textTransform: "uppercase" }}>
          Shipping And Delivery
        </Heading>
      </div>
    </div>
  );
};

export default HeadingPage;
