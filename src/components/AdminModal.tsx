import React, { useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface AdminModalProps {
  product: Product;
  onClose: () => void;
  onUpdate: (updatedProduct: Product) => void;
  onDelete: (id: number) => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ product, onClose, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState<Product>({ ...product });
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>Gestion du Produit</h2>
          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === 'edit' ? 'active' : ''}`}
              onClick={() => setActiveTab('edit')}
            >
              Modifier
            </button>
            <button
              className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              Aperçu
            </button>
          </div>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="admin-modal-content">
          {activeTab === 'edit' ? (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Titre du produit</label>
                  <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Prix (€)</label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Catégorie</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">URL de l'image</label>
                <input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
                <div className="image-preview">
                  <img src={formData.image} alt="Aperçu" />
                </div>
              </div>

              <div className="admin-modal-actions">
                <button type="submit" className="btn-success">
                  <i className="icon-save"></i> Enregistrer
                </button>
                {!confirmDelete ? (
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => setConfirmDelete(true)}
                  >
                    <i className="icon-trash"></i> Supprimer
                  </button>
                ) : (
                  <div className="delete-confirmation">
                    <span>Confirmer ?</span>
                    <button
                      type="button"
                      className="btn-danger"
                      onClick={() => onDelete(product.id)}
                    >
                      Oui
                    </button>
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={() => setConfirmDelete(false)}
                    >
                      Non
                    </button>
                  </div>
                )}
                <button type="button" className="btn-outline" onClick={onClose}>
                  Annuler
                </button>
              </div>
            </form>
          ) : (
            <div className="product-preview">
              <div className="preview-image">
                <img src={formData.image} alt={formData.title} />
              </div>
              <div className="preview-details">
                <h3>{formData.title}</h3>
                <div className="preview-category">{formData.category}</div>
                <div className="preview-price">{formData.price} €</div>
                <p className="preview-description">{formData.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
