import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addToCart, removeFromCart, updateQuantity, clearCart, loadCartFromStorage } from '../store/slices/cartSlice';
import { Product } from '../types';
import { toast } from 'react-toastify';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, total, itemCount } = useSelector((state: RootState) => state.cart);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch(loadCartFromStorage(cartItems));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, [dispatch]);

  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addProductToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const removeProductFromCart = (productId: string) => {
    const item = items.find(item => item.product.id === productId);
    if (item) {
      dispatch(removeFromCart(productId));
      toast.info(`${item.product.name} removed from cart`);
    }
  };

  const updateProductQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const clearCartItems = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  return {
    items,
    total,
    itemCount,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    clearCartItems,
  };
};