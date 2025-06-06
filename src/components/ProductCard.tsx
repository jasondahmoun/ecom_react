import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import AdminModal from './AdminModal';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAdminUpdate?: (updatedProduct: Product) => void;
  onAdminDelete?: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdminUpdate, onAdminDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isAdmin && <span className="product-badge">Admin</span>}
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
      </Link>
      <div className="card-content">
        <div className="category">{product.category}</div>
        <h3 title={product.title}>{product.title}</h3>
        <div className="price">{product.price.toFixed(2)} €</div>

        <div className="card-actions">
          <Link to={`/product/${product.id}`} className="btn-outline btn-sm">
            Voir détail
          </Link>
          <button
            onClick={handleAddToCart}
            className="btn-accent btn-sm"
          >
            Ajouter
          </button>
        </div>

        {isAdmin && isHovered && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary btn-sm admin-edit-btn"
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              zIndex: 5
            }}
          >
            Éditer
          </button>
        )}
      </div>

      {isModalOpen && (
        <AdminModal
          product={product}
          onClose={() => setIsModalOpen(false)}
          onUpdate={onAdminUpdate || (() => { })}
          onDelete={onAdminDelete || (() => { })}
        />
      )}
    </div>
  );
};

export default ProductCard;