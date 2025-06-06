export const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');
export const setCart = (cart: any) => localStorage.setItem('cart', JSON.stringify(cart));
export const getAuth = () => JSON.parse(sessionStorage.getItem('auth') || 'null');
export const setAuth = (a: any) => sessionStorage.setItem('auth', JSON.stringify(a));
export const clearAuth = () => sessionStorage.removeItem('auth');
