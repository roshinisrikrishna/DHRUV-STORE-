// Import necessary hooks, components, and libraries
import { Popover, Transition } from "@headlessui/react"
import { useStore } from "@lib/context/store-context"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import Link from "next/link"
import SearchIcon from "@modules/common/icons/search"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import React, { useState, useEffect, useRef } from 'react';
import { ProductCollection } from "@medusajs/medusa"
import Medusa from "@medusajs/medusa-js"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import LoadingSpinner from '@modules/loader'; // Ensure this path matches where your LoadingSpinner component is located.
import { usePathname, useSearchParams } from 'next/navigation'
import { MEDUSA_BACKEND_URL } from "@lib/config"

// Define the ThumbnailProps type
type ThumbnailProps = {
    src: string;
    alt: string;
};


const medusa = new Medusa({
    baseUrl: MEDUSA_BACKEND_URL,
    maxRetries: 3,
});
interface SearchComponentProps {
    isSideMenuOpen: boolean;
  }
  
  const SearchComponent: React.FC<SearchComponentProps> = ({ isSideMenuOpen }) => {
    const [searchText, setSearchText] = useState("");
    const [isInputVisible, setIsInputVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [collections, setCollections] = useState<ProductCollection[]>([]);
    const [products, setProducts] = useState<PricedProduct[]>([]);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State to track whether the popover is open

    // Create the Intl.NumberFormat formatter with the desired currency options
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR', // Replace 'USD' with the appropriate currency code from your order object
});

useEffect(() => {
  medusa.products
      .list()
      .then(({ products }) => {
          setProducts(products.map(product => {
              // Check if the product has a thumbnail
              if (product.thumbnail) {
                  // Replace the base URL of the thumbnail
                  const newThumbnailUrl = product.thumbnail.replace(
                      'http://localhost:9000',
                      'https://dhruvcraftshouse.com/backend'
                  );
                  console.log(newThumbnailUrl); // Log the new thumbnail URL to the console
                  return { ...product, thumbnail: newThumbnailUrl };
              }
              return product;
          }));
      })
      .catch((error) => {
          console.error("Error fetching products:", error);
      });

  medusa.collections
      .list()
      .then(({ collections }) => {
          setCollections(collections);
      })
      .catch((error) => {
          console.error("Error fetching collections:", error);
      });
}, []);



    // console.log("products search", products)
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleIconClick = () => {
        setIsPopoverOpen(true);
        setIsInputVisible(true);
    };

    const handleOverlayClick = () => {
        setIsPopoverOpen(false);
        setSearchText("");
    };

    const handleCloseClick = () => {
        setIsPopoverOpen(false);
        setSearchText("");
    };

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
        
        <div className="relative z-50" style={{ }}>
            {isPopoverOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-40"
                    onClick={handleOverlayClick}
                ></div>
            )}

            <Popover className="relative">
            <>                          {isNavigating && <LoadingSpinner />}

            <button className="" onClick={handleIconClick} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  {/* Adjust width and height as needed */}
  <SearchIcon width="12" height="12" />
  <span>{isSideMenuOpen ? "SEARCH" : "Search"}</span>
</button>


                <Popover.Panel
                    static
                    ref={panelRef}
                    className={`flex flex-col fixed right-0 h-full w-96 z-50 text-sm m-2 backdrop-blur-2xl ${isPopoverOpen ? "" : "hidden"
                        }`}
                >

                    <div className="flex flex-col  bg-[rgba(0,0,0,0.9)] justify-between p-9 text-white" style={{ color: "white", paddingBottom:"75%" }}>
                        <button
                            onClick={handleCloseClick}
                            className="absolute top-2 right-2 text-white cursor-pointer"
                        >
                        X
                        </button>
                        {/* <input
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value)
                                handleSearchChange(e)
                            }}
                            style={{
                                flexGrow: "2",
                                border: "none",
                                boxSizing: "border-box",
                                width: "100%",
                                padding: "9px 35px",
                                margin: "8px 0",
                                color: "white",
                                background: "black"
                            }}
                            placeholder="What are you looking for?"
                            id="input-id"
                            type="text"
                            ref={inputRef}
                            // onChange={}
                            // onClick={handleIconClick}
                            autoFocus
                        // onMouseEnter={() => setIsInputVisible(true)}
                        /> */}
                        {/* Title for search results */}

                     <form
                    style={{
                        // border: "1px solid #ccc",
                        display: "flex",
                        flexDirection: "row",
                        // padding: "1px",
                        // borderRadius: "10px",
                        boxSizing: "border-box"
                    }}
                     > 
                    {/* Search input field */}
                    <button  
                        style={{
                            padding: "8px 15px",
                            // color: "white",
                            // background: "linear-gradient(to right, black, gray)",
                            // borderTopRightRadius: "10px",
                            // borderBottomRightRadius: "10px",
                            // boxSizing: "border-box"
                        }}
                        >
                        <SearchIcon />
                    </button>
                      <input
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value)
                                handleSearchChange(e)
                            }}
                            style={{
                                flexGrow: "2",
                                border: "none",
                                boxSizing: "border-box",
                                width: "100%",
                                margin: "8px 0",
                                color: "white",
                                background: "black",
                                fontSize: "22px", // Adjust the font size as needed
                                fontFamily:"Klein, sans-serif",
                                fontWeight: 500
                            }}
                            placeholder="What are you looking for?"
                            id="input-id"
                            type="text"
                            ref={inputRef}
                            // onChange={}
                            // onClick={handleIconClick}
                            autoFocus
                        // onMouseEnter={() => setIsInputVisible(true)}
                        /> 
                    {/* Search button */}
                    
                </form>

                      
                <ul className="flex flex-wrap overflow-y-auto custom-scrollbar" style={{ listStyle: "none", maxHeight: "60vh" }}>
      {products
        .filter((product) => {
          const titleMatch = product.title?.toLowerCase().includes(searchText.toLowerCase());
          const tagMatch = product.tags?.some(tag => tag.value?.toLowerCase().includes(searchText.toLowerCase()));
          return titleMatch || tagMatch;
        })
        .slice(0, 5)
        .map((product) => (
          <li
            key={product.id}
            className="flex-grow-0 flex-shrink-0 w-1/2 px-4 py-4"
          >
            <Link
              href={`/products/${product.handle}`}
              onClick={() => handleLinkClick(`/products/${product.handle}`)}
              className="font-medium hover:text-primary transition duration-150 ease-in-out"
            >
              {product.thumbnail && (
                <img src={product.thumbnail} alt={product.title || 'Product'} width="100%" />
              )}
              <div>{product.title || 'Untitled Product'}</div>
              {product.variants && product.variants.length > 0 && product.variants[0].prices && product.variants[0].prices.length > 0 && (
                <div className="text-primary mt-1">
                  {currencyFormatter.format(product.variants[0].prices[0].amount / 100)}
                </div>
              )}
            </Link>
          </li>
        ))}
    </ul>
                        {/* )} */}
                    </div>
                </Popover.Panel>
                </>

            </Popover>
            <style>
                {`input:focus {
          outline: none;
        }
        /* Custom scrollbar styles */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px; /* Adjust scrollbar width */
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1); /* Adjust track background */
  border-radius: 10px; /* Rounded corners for the track */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: white; /* White scrollbar thumb */
  border-radius: 10px; /* Rounded corners for the thumb */
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #f0f0f0; /* Lighter color on hover */
}

        `}
            </style>

        </div>

    );
};

export default SearchComponent;