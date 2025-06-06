import React, { useEffect, useState } from 'react';
import { getProducts, Product } from '../api/product';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const perPage = 6;

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(res => {
        setProducts(res.data.slice(0, 20));
        const uniqueCategories = Array.from(new Set(res.data.map((p: Product) => p.category)));
        setCategories(uniqueCategories as string[]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const total = filteredProducts.length;
  const displayed = filteredProducts.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="main-content">
      <div className="container">
        <div className="shop-header">
          <h1>Notre Catalogue</h1>
          <div className="shop-filters">
            <div className="category-filter">
              <label htmlFor="category-select">Filtrer par catégorie</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1); 
                }}
                className="form-control"
              >
                <option value="">Toutes les catégories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="results-count">
              {total} produit{total > 1 ? 's' : ''} trouvé{total > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement des produits...</p>
          </div>
        ) : displayed.length > 0 ? (
          <>
            <div className="grid">
              {displayed.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              totalItems={total}
              itemsPerPage={perPage}
              currentPage={page}
              onPageChange={setPage}
            />
          </>
        ) : (
          <div className="empty-results">
            <p>Aucun produit ne correspond à votre recherche.</p>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory('')}
                className="btn-outline"
              >
                Voir tous les produits
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
