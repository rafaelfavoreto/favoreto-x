import { useState, useEffect } from 'react';
import Link from 'next/link';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {   
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://localhost:44394/api/Product');
        if (response.ok) {
          const data = await response.json();
          console.log('Data received:', data); // Verifique os dados recebidos
          setProducts(data);
        } else {
          console.error('Error when searching for products:', response.statusText);
        }
      } catch (error) {
        console.error('Error when searching for products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>List of Products</h1>
      <p>List all your products.</p>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              <a>{product.name}</a>
            </Link>
            <span> - R$ {product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <Link href="/">
        Return
      </Link>
    </div>
  );
};

export default ProductsPage;
