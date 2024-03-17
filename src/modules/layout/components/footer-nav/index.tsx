"use client"

import clsx from "clsx"
import { useCollections, useProductCategories } from "medusa-react"
import { Text } from "@medusajs/ui"
import Link from "next/link"
import MedusaCTA from "../medusa-cta"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faTelegram, faMailchimp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGooglePay,faApplePay, faCcMastercard,faCcVisa } from "@fortawesome/free-brands-svg-icons"
import LoadingSpinner from '@modules/loader'; // Ensure this path matches where your LoadingSpinner component is located.
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react';


const FooterNav = () => {
  const { collections } = useCollections()
  const { product_categories } = useProductCategories()

  const pathname = usePathname();
  // console.log('pathname', pathname)
  const [isNavigating, setIsNavigating] = useState(false);
  const [clickedPath, setClickedPath] = useState('');

  // console.log('clickedPath', clickedPath)
  // Initialize clickedPath with the current pathname when the component mounts
  useEffect(() => {
    setClickedPath(pathname);
  }, [pathname]);

  useEffect(() => {
    // Determine if navigation is occurring
    setIsNavigating(pathname !== clickedPath);
  }, [pathname, clickedPath]);

  // Function to handle link clicks
const handleLinkClick = (targetPath: string) => {
  console.log("Link clicked with path:", targetPath);
  setClickedPath(targetPath); // Update clickedPath to the target path
  setIsNavigating(true); // Assume navigation is starting
};
 
  return (
    <>
    {isNavigating && <LoadingSpinner />}
    
    <div className="border-t border-ui-border-base w-screen">
      <div className="content-container flex flex-col">
      <div className="flex flex-col gap-y-1 sm:gap-y-2 md:gap-y-4 xsmall:flex-row items-start justify-between py-10" style={{width:"88%", marginLeft:"4%",marginTop:"2%"}}>
          {/* Use gap-x-4 on larger screens if using flex-row, adjust py-10 for padding top and bottom */}
<div className="flex flex-col gap-y-5" style={{ fontSize: "12px", fontWeight: "bold",fontFamily:"Avenir Next LT W02 Regular",letterSpacing:"0.1em" }}>
            <Link href="/diamonds" className="txt-black"
                       onClick={ ()=> handleLinkClick('/diamonds') } 
>DIAMONDS</Link>
            <Link href="/decorations" className="txt-black"
                       onClick={ ()=> handleLinkClick('/decorations') } 
>DECORATIONS</Link>
            <Link href="/create-decoration" className="txt-black"
                       onClick={ ()=> handleLinkClick('/create-decoration') } 
>CREATE DECORATION</Link>
            <Link href="/gift-certificates" className="txt-black"
                       onClick={ ()=> handleLinkClick('/gift-certificates') } 
>GIFT CERTIFICATES</Link>
            <Link href="/exclusive" className="txt-black"
                       onClick={ ()=> handleLinkClick('/exclusive') } 
>EXCLUSIVE</Link>
            <Link href="/special-projects" className="txt-black"
                       onClick={ ()=> handleLinkClick('/special-projects') } 
>SPECIAL PROJECTS</Link>


            {/* Add more links or text here as needed */}
          </div>
          <div className="" style={{ fontSize: "12px", fontFamily:"Avenir Next LT W02 Regular",letterSpacing:"0.1em" }}>
            <h3 className="txt-black" style={{fontWeight:"bold"}}>JEWELRY CATEGORIES</h3>
            <ul className="list-none mt-3" style={{lineHeight:"3em", textTransform:"uppercase", fontSize:"10px"}}>
              {/* Replace with actual links or text */}
              <li>Rings</li>
              <li>Earrings</li>
              <li>Studs</li>
              <li>Bracelets</li>
              <li>PENDANTS</li>
              <li>BROOCHES</li>
              <li>NECKLACE</li>
              <li>MONO EARRINGS</li>
              <li>CHAINS</li>
              <li>CUFFS</li>
            </ul>
          </div>
          <div className="" style={{fontSize: "12px", fontFamily:"Avenir Next LT W02 Regular",letterSpacing:"0.1em" }}>
            <h3 className="txt-black" style={{ fontWeight: "bold"}}>FOR CLIENTS</h3>
            <ul className="list-none mt-3" style={{lineHeight:"3em", textTransform:"uppercase", fontSize:"10px"}}>
              {/* Replace with actual links or text */}
              <li>GUARANTEES</li>
              <li><Link href="/"
                         onClick={ ()=> handleLinkClick('/') } 
              >PAYMENT AND DELIVERY</Link></li>
              <li>FITTING</li>
              <li>CERTIFICATION</li>
              <li>PERSONALIZATION</li>
              <li>QUESTIONS AND ANSWERS</li>
              <li>FOR LEGAL ENTITIES</li>
              <li>BLOG</li>
              <li>ASK A QUESTION</li>
              
            </ul>
             </div>
          <div className="" style={{fontSize: "12px", fontFamily:"Avenir Next LT W02 Regular",letterSpacing:"0.1em" }}>
            <h3 className="txt-black"  style={{ fontWeight: "bold"}}>ABOUT COMPANY</h3>
            <ul className="list-none mt-3" style={{lineHeight:"3em", textTransform:"uppercase", fontSize:"10px"}}>
              {/* Replace with actual links or text */}
              <li>ABOUT ALROSA</li>
              <li>THE WAY OF THE DIAMOND</li>
              <li>RUSSIAN CUT</li>
              <li>KIMBERLEY PROCESS</li>
              <li>SOCIAL RESPONSIBILITY</li>
              <li>ENVIRONMENTAL RESPONSIBILITY</li>
            </ul>
                  </div>
          <div className="" style={{fontSize: "12px", fontFamily:"Avenir Next LT W02 Regular",letterSpacing:"0.1em" }}>
            <h3 className="txt-black" style={{ fontWeight: "bold",fontSize:"12px"}}>CONTACTS</h3>
            <div className="mt-4" style={{fontSize:"10px"}}>MAIN OFFICE</div>
            <div className="mt-1" style={{color:"#7F3F98", fontWeight: "bolder",letterSpacing:"0.2em", fontFamily:"Avenir Next LT W02 Regular", fontSize:"12px"}}> <span style={{fontWeight: 900}}>(+91) 7259533331</span></div>
            <div className="mt-4" style={{fontSize:"10px"}}>CUSTOMER SERVICE</div>
            <div className="mt-1"  style={{color:"#713787", fontWeight: "bolder",letterSpacing:"0.2em", fontFamily:"Avenir Next LT W02 Regular", fontSize:"12px", textTransform:"uppercase"}}>
              <a href="mailto:vikram@rflabs.in" >vikram@rflabs.in</a>
            </div>
            <div className="social-media-links mt-5" style={{ display: 'flex', gap: '30px' }}>
  <a href="mailto:example@email.com" aria-label="Email">
    <FontAwesomeIcon icon={faEnvelope} color="#713787" style={{width:"18px",height:"auto"}} />
  </a>
  <a href="https://instagram.com/yourprofile" aria-label="Instagram">
    <FontAwesomeIcon icon={faTelegram} color="#713787" style={{width:"18px",height:"auto"}} />
  </a>
  <a href="https://www.linkedin.com/in/yourprofile" aria-label="LinkedIn">
    <FontAwesomeIcon icon={faLinkedin} color="#713787" style={{width:"18px",height:"auto"}} />
  </a>
</div>

              </div>
        </div>
        <div style={{marginLeft:"4%",marginBottom:"4%"}}>
        <div className="flex justify-between items-center mb-4" style={{ fontSize: "9px", fontFamily: "Avenir Next LT W02 Regular", letterSpacing: "0.1em", fontWeight: 400 }}>
        <div style={{ width: "45%", background: '', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <p className="footer-paragraph">
  © 2023 by VNS Ventures. Powered and secured by RFLABS
    </p>
  <p className="footer-paragraph">
    PRIVACY POLICY
  </p>
  <p className="footer-paragraph">
    PUBLIC OFFER
  </p>
  <p className="footer-paragraph">
    SITE MAP
  </p>
  {/* MedusaCTA component or other content here */}
</div>

<div className="mr-9" style={{ width: "40%", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", gap: "10px" }}>
  <img src="/gpay.webp" alt="gpay" style={{ width: "28px", height: "auto" }} />
  <img src="/applepay.png" alt="applepay" style={{ width: "28px", height: "auto" }} />
  <img src="/samsungpay.png" alt="samsungpay" style={{ width: "28px", height: "auto", marginBottom:"1%" }} />
  <img src="/visa.png" alt="visa" style={{ width: "28px", height: "auto", marginBottom:"2%" }} />
  <img src="/mastercard.png" alt="mastercard" style={{ width: "28px", height: "auto" }} />
  <img src="/mnp.jpg" alt="mnp" style={{ width: "40px", height: "auto" }} />
  {/* MedusaCTA component or other content here */}
</div>

        </div>
 
<div className="flex mb-16 justify-between " style={{ fontSize: "9px", fontFamily: "Avenir Next LT W02 Regular", letterSpacing: "0.1em", fontWeight:  400, width:"70%" }}>
  <p className="footer-paragraph">
  THIS SITE IS PROTECTED BY RECAPTCHA AND THE GOOGLE PRIVACY POLICY AND TERMS OF SERVICE APPLY.
  </p>
  {/* MedusaCTA component or other content here */}
</div>
        </div>
     

      </div>
     
    </div>
    </>
  );
};

export default FooterNav
