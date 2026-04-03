import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const fetchCart = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const { data } = await api.get('/cart');
            setCart(data);
        } catch (err) {
            console.error('Error fetching cart:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart({ items: [] });
        }
    }, [user]);

    const addToCart = async (productId, quantity = 1) => {
        if (!user) {
            // Logic for guest cart could go here (localStorage)
            return;
        }
        try {
            const { data } = await api.post('/cart/add', { productId, quantity });
            setCart(data);
        } catch (err) {
            console.error('Error adding to cart:', err);
        }
    };

    const removeFromCart = async (productId) => {
        if (!user) return;
        try {
            const { data } = await api.delete(`/cart/${productId}`);
            setCart(data);
        } catch (err) {
            console.error('Error removing from cart:', err);
        }
    };

    const clearCart = async () => {
        if (!user) return;
        try {
            await api.delete('/cart');
            setCart({ items: [] });
        } catch (err) {
            console.error('Error clearing cart:', err);
        }
    };

    const cartTotal = cart.items.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
