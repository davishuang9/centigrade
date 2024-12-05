import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <img
        src={product.image}
        alt={product.title}
        className="object-contain mb-4 w-full h-48"
      />
      <h3 className="mb-2 text-lg font-semibold truncate">{product.title}</h3>
      <p className="mb-2 text-gray-600 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">${product.price}</span>
        <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
