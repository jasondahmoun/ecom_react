import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { AppRoutes } from './routes/AppRoutes';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Navbar />
            <main>
              <div className="container">
                <AppRoutes />
              </div>
            </main>
            <footer>
              <div className="container">
                <p>&copy; {new Date().getFullYear()} - Site E-commerce</p>
              </div>
            </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
