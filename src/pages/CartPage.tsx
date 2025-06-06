import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, total, totalWithVAT, clearCart } = useCart();
  const [vat, setVat] = useState(20);

  return (
    <div className="container">
      <h1>Panier</h1>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          {cart.map(item => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
              image={item.image}
              onQuantityChange={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
          <div className="totals">
            <p>Total HT : {total.toFixed(2)} €</p>
            <label>
              TVA :
              <select value={vat} onChange={e => setVat(Number(e.target.value))}>
                <option value={5}>5 %</option>
                <option value={20}>20 %</option>
              </select>
            </label>
            <p>Total TTC : {totalWithVAT(vat).toFixed(2)} €</p>
          </div>
          <button onClick={clearCart}>Vider le panier</button>
        </>
      )}
    </div>
  );
};

export default CartPage;