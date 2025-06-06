import React from 'react';

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, qty: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  quantity,
  image,
  onRemove,
  onQuantityChange
}) => {
  return (
    <div className="card mb-3">
      <div className="flex">
        <div className="mr-3">
          <img src={image} alt={title} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
        </div>
        <div className="flex-column" style={{ flex: 1 }}>
          <h4 className="mb-1">{title}</h4>
          <p className="mb-1">Prix unitaire : <span className="text-primary">{price.toFixed(2)} €</span></p>
          <div className="flex-between mb-2">
            <div className="flex">
              <label htmlFor={`qty-${id}`} className="mr-2">Quantité : </label>
              <input
                id={`qty-${id}`}
                type="number"
                value={quantity}
                min={1}
                style={{ width: '60px' }}
                onChange={(e) => onQuantityChange(id, parseInt(e.target.value))}
              />
            </div>
            <p><strong>Total : {(price * quantity).toFixed(2)} €</strong></p>
          </div>
          <button onClick={() => onRemove(id)} className="btn-danger btn-sm">Supprimer</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;