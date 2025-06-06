import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, updateProduct, deleteProduct, Product } from '../api/product';
import { useCart } from '../contexts/CartContext';
import AdminModal from '../components/AdminModal';
import { useAuth } from '../contexts/AuthContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProduct(parseInt(id))
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (updated: Product) => {
    updateProduct(updated).then(res => {
      setProduct(res);
      setShowModal(false);
    });
  };

  const handleDelete = (deletedId: number) => {
    deleteProduct(deletedId).then(() => {
      setShowModal(false);
      navigate('/');
    });
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement du produit...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="main-content">
        <div className="container">
          <div className="error-container">
            <h2>Produit non trouvé</h2>
            <p>Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Retour à la boutique
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-grid">
            <div className="product-image-container">
              <img src={product.image} alt={product.title} className="product-detail-image" />
            </div>

            <div className="product-info">
              <div className="product-category">{product.category}</div>
              <h1 className="product-title">{product.title}</h1>
              <div className="product-price">{product.price.toFixed(2)} €</div>

              <div className="product-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              <div className="product-actions">
                <div className="quantity-selector">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="btn-outline btn-sm"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="btn-outline btn-sm"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn-accent btn-lg add-to-cart-btn"
                >
                  Ajouter au panier
                </button>
              </div>

              {isAdmin && (
                <div className="admin-actions">
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn-primary"
                  >
                    Modifier/Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {showModal && (
          <AdminModal
            product={product}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;