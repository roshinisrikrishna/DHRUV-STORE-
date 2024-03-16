"use client"

// Import necessary hooks, components, and libraries
import React, { useState, useEffect } from 'react';
import { Button } from "@medusajs/ui";
import Medusa from "@medusajs/medusa-js";
import { useMobileMenu } from "@lib/context/mobile-menu-context";
import useToggleState from "@lib/hooks/use-toggle-state";
import Hamburger from "@modules/common/components/hamburger";
import CartDropdown from "@modules/layout/components/cart-dropdown";
import WishlistDropdown from "@modules/layout/components/wishlist-dropdown";
import AccountDropdown from '@modules/layout/components/account-dropdown';
import SearchComponent from "@modules/layout/components/search-component";
import SideMenu from "@modules/layout/components/side-menu";
import MobileMenu from "@modules/mobile-menu/templates";
import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation'
import { useMeCustomer } from 'medusa-react';
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context";  // Importing context for login view and account
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '@modules/loader';
import { MEDUSA_BACKEND_URL } from '@lib/config';
import './NavStyles.css'
import axios from 'axios';

interface Product {
  id: string;
  title: string;
  description: string;
  // Add other properties as needed
}
const medusa = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 3,
});

const Nav = () => {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get(`${MEDUSA_BACKEND_URL}/store/products`, { withCredentials: true })
    .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const { toggle } = useMobileMenu();
  const { state: searchModalState, open: searchModalOpen } = useToggleState();

  const { loginView, refetchCustomer } = useAccount();  // Destructuring login view and refetchCustomer from useAccount hook
  const [_, setCurrentView] = loginView;  // Ignoring the first element of loginView and using setCurrentView for changing view
  
  const [showDropdown, setShowDropdown] = useState(false);
  const handleMouseEnter = () => {
    setShowDropdown(true);
   };
   
   const handleMouseLeave = () => {
    setShowDropdown(false);
   };
   
  // const { customer, isLoading } = useMeCustomer()
  // console.log(" customer ",customer)
 

const { customer } = useAccount();

const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

const handleSideMenuOpenChange = (isOpen: boolean) => {
  setIsSideMenuOpen(isOpen);
  // console.log('SideMenu open state now:', isOpen); // Correctly reflects the action
};
useEffect(() => {
  // console.log('isSideMenuOpen has changed:', isSideMenuOpen);
}, [isSideMenuOpen]);

const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [clickedPath, setClickedPath] = useState('');

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

  // Define your special paths
  const specialPaths = [
    '/privacypolicy',
    '/shippinganddelivery',
    '/refundandcancellation',
    '/contact',
    '/termsandconditions'
  ];

  const [navStyle, setNavStyle] = useState({ fontFamily: "Avenir Next LT W02 Regular", background: "#F5F6FA", color:"black" });

  // Adjust the updateNavStyle function to use the pathname from the hook
  const updateNavStyle = () => {
    const isSpecialPath = specialPaths.includes(pathname);
    const isScrolled = window.pageYOffset > 0;

    if (isSpecialPath && isScrolled) {
      setNavStyle({ fontFamily: "Avenir Next LT W02 Regular", background: "#FFFFFF", color:"black" });
    } else if (isSpecialPath) {
      setNavStyle({ fontFamily: "Avenir Next LT W02 Regular", background: "rgba(0,0,0,0.4)", color:"white" });
    } else {
      setNavStyle({ fontFamily: "Avenir Next LT W02 Regular", background: "#F5F6FA", color:"black" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", updateNavStyle);
    updateNavStyle(); // Call updateNavStyle to set the initial style based on the pathname

    return () => {
      window.removeEventListener("scroll", updateNavStyle);
    };
  }, [pathname]); // Add pathname as a dependency to re-run the effect when the path changes

  // Render the navigation bar
  return (
    <>
      {isNavigating && <LoadingSpinner />}
    <div className="sticky top-0 inset-x-0 z-50 group" style={navStyle}>
      <header className="relative h-16 px-8 mx-auto border-b duration-200  border-ui-border-base">
        <nav className="txt-xsmall-plus flex items-center justify-between w-full h-full text-small-regular pt-4">
        <div className="flex-1 basis-0 h-full flex items-center space-x-5"> {/* Adjusted spacing here */}
  <div className="block small:hidden">
    <Hamburger setOpen={toggle} />
  </div>
  <div className="hidden small:block h-full">
  <SideMenu
  navBackground={navStyle.background} // Add this line
  searchModalOpen={searchModalOpen}
  onOpenChange={handleSideMenuOpenChange}
/>
  </div>
  <div className="" style={{ fontFamily: "Avenir Next LT W02 Regular",  }}>
    (+91) 7259533331
  </div>
  <div className="flex items-center space-x-2"> {/* Adjust the spacing here if needed */}
  <img 
    src={navStyle.background === "rgba(0,0,0,0.4)" ? "/locationicon_white.png" : "/locationicon.png"} 
    alt="Location" 
    className="inline-block" 
    style={{width:"20%"}} 
  />
  <span style={{ fontFamily: "Avenir Next LT W02 Regular" }}>Coimbatore</span>
</div>
</div>


          <div className="flex items-center h-full" style={{background:"", textAlign:"center",display:"flex",justifyContent:'center',alignItems:"center"}}>
 <Link
   href="/"
   className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
   onClick={() => handleLinkClick('/')}>
      <img src="/transdhruv.png" alt="Location" className="inline-block" style={{width:"35%"}} />

 </Link>
 {/* <SearchComponent /> */}
 
</div>


<div
  className="flex items-center gap-x-5 h-full flex-1 basis-0"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: isSideMenuOpen? "600" : "400",
    letterSpacing: "0.2em",
    // background:"red",
    fontFamily: isSideMenuOpen ? "Avenir Next LT W02 Regular" : "Avenir Next LT W02 Regular", // Conditional fontFamily
  }}
>
<SearchComponent isSideMenuOpen={isSideMenuOpen} />
<WishlistDropdown isSideMenuOpen={isSideMenuOpen} />
<AccountDropdown />

  <CartDropdown />


</div>

        </nav>
        <MobileMenu />
      </header>
    </div>
    </>
  )
}

export default Nav
