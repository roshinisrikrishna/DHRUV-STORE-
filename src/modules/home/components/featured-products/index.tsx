"use client";

import { ProductCollection } from "@medusajs/medusa"
import ProductRail from "./product-rail"
import CollectionList from "./collection-list"
import Medusa from "@medusajs/medusa-js";
import React, { useState, useEffect} from "react";
import { MEDUSA_BACKEND_URL } from "@lib/config";


const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries:   3 });

type Product = {
  id: string;
  title: string;
  subtitle: string; // Add subtitle property
  thumbnail: string; // Add thumbnail property
};


const FeaturedProducts = () => {
  const [collections, setCollections] = useState<ProductCollection[]>([]);
  const [products, setProducts] = useState<Record<string, Product[]>>({});
// Define firstCollectionProducts with an explicit type

useEffect(() => {
  // Fetch collections
  medusa.collections.list().then(({ collections }) => {
    setCollections(collections);

    // Fetch products for each collection
    const productPromises = collections.map(collection =>
      medusa.products.list({ collection_id: [collection.id] }).then(response => ({
        collectionId: collection.id,
        products: response.products.map(product => {
          // Check and modify the thumbnail URL if it matches one of the specified conditions
          let thumbnail = product.thumbnail;
          const localhostBaseUrl = "http://localhost:9000/uploads/";
          const remoteBaseUrl = "http://195.35.20.220:9000/uploads/";
          const newBaseUrl = "https://dhruvcraftshouse.com/backend/uploads/";
    
          if (thumbnail?.startsWith(localhostBaseUrl)) {
            thumbnail = thumbnail.replace(localhostBaseUrl, newBaseUrl);
          } else if (thumbnail?.startsWith(remoteBaseUrl)) {
            thumbnail = thumbnail.replace(remoteBaseUrl, newBaseUrl);
          }
    
          return {
            id: product.id,
            title: product.title,
            subtitle: product.subtitle,
            thumbnail: thumbnail // Use the potentially modified thumbnail URL
          }
        })
      }))
    );
    

    Promise.all(productPromises).then(data => {
      const productsByCollection = data.reduce((acc, curr) => {
        acc[curr.collectionId] = curr.products;
        return acc;
      }, {});
      setProducts(productsByCollection);
    });
  });
}, []);

 let firstCollectionProducts: Product[] = [];
 let secondCollectionProducts: Product[] = [];


 // Update firstCollectionProducts with the actual products once they are fetched
 useEffect(() => {
   if (collections.length>0 && Object.keys(products).length >   0) {
     firstCollectionProducts = products[collections[0].id] || [];
    //  console.log('firstCollectionProducts', firstCollectionProducts)
   }
 }, [collections, products]);

 if (collections.length>0 && Object.keys(products).length >   0) {
  // Get the first collection's ID
  const firstCollectionId = collections[0].id;

  // Get the products for the first collection
  const allProductsOfFirstCollection = products[firstCollectionId] || [];

  // Assign only the first four products to firstCollectionProducts
  firstCollectionProducts = allProductsOfFirstCollection.slice(0,  4);

  // console.log('First Collection Products:', firstCollectionProducts);
}

// Update firstCollectionProducts with the actual products once they are fetched
useEffect(() => {
  if (collections && collections.length>0 && Object.keys(products).length > 0) {
    secondCollectionProducts = products[collections[0].id] || [];
    // console.log('secondCollectionProducts', secondCollectionProducts)
  }
}, [collections, products]);

if (collections && collections.length >0 && Object.keys(products).length > 0 && collections[1]) {
 // Get the first collection's ID
 const secondCollectionId = collections[1].id;

 // Get the products for the first collection
 const allProductsOfSecondCollection = products[secondCollectionId] || [];

 // Assign only the Second four products to secondCollectionProducts
 secondCollectionProducts = allProductsOfSecondCollection.slice(0,  4);

//  console.log('Second Collection Products:', secondCollectionProducts);
}
// Determine if there are products to display for the first two collections
const hasProductsForFirstCollection = collections.length > 0 && products[collections[0]?.id]?.length > 0;
const hasProductsForSecondCollection = collections.length > 1 && products[collections[1]?.id]?.length > 0;

return (
  <div className="mt-8">
    <div>
      {hasProductsForFirstCollection || hasProductsForSecondCollection ? (
        <>
          {/* Conditionally render ProductRail for the first collection if products are available */}
          {hasProductsForFirstCollection && (
            <ProductRail products={products[collections[0].id]} />
          )}

          {/* Conditionally render CollectionList for the second collection if products are available */}
          {hasProductsForSecondCollection && (
            <CollectionList products={products[collections[1].id]} />
          )}
        </>
      ) : (
        // Display message when there are no products in the first two collections
        <p>No Products in the Collection</p>
      )}
    </div>
  </div>
);
};

export default FeaturedProducts
