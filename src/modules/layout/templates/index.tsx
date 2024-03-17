import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import VideoNavHeader from "./videoNavheader"
import React from "react"
import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'


const Layout: React.FC = ({ children }) => {
  const [navBackground, setNavBackground] = useState(true);

  const params = useParams();

  useEffect(() => {
    // Extracting the category value from params
    const category = params.category && params.category.length > 0 ? params.category[0] : null;

    // Set navBackground based on category
    setNavBackground(category === 'men' || category === 'women' || category === null);

    // console.log("Category from params:", category);
  }, [params.category]); // Depend on params.category
  return (
    <div>
{!navBackground &&(
      <VideoNavHeader />

       )} 
      <Nav />

      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
