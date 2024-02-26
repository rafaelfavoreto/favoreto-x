import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {        
        const response = await fetch(`https://localhost:44394/api/Product/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error('Error fetching product details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
   
    if (id) {
      fetchProduct();
    }
  }, [id]);

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {id}</p>
      {product && (
        <div>
          <p>Name: {product.name}</p>
          <p>Price: ${product.price.toFixed(2)}</p>          
        </div>
      )}
    </div>
  );
};

export default Product;
