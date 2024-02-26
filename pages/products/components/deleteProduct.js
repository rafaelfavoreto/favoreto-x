import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const DeleteProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {       
        const response = await fetch(`https://localhost:44394/api/Product${id}`);
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
  
  const handleDelete = async () => {
    try {      
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Product deleted successfully!');
        router.push('/products');
      } else {
        console.error('Failed to delete product:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div>
      <h1>Delete Product</h1>
      <p>Product ID: {id}</p>
      {product && (
        <div>
          <p>Name: {product.name}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <button onClick={handleDelete}>Delete Product</button>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
