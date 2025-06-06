import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="container">
    <h1>404 – Page non trouvée</h1>
    <p>Retour à l’<Link to="/">accueil</Link></p>
  </div>
);

export default NotFound;