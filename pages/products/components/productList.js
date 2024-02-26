import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {        
        const response = await fetch('https://localhost:44394/api/Product');
        if (response.ok) {
          const data = await response.json();
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
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              <a>{product.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/products/add">
        <a>Adicionar Novo Produto</a>
      </Link>
    </div>
  );
};

export default ProductsList;
