import { cart } from '../../data/cart.js';

export function updateCartQuantityOnPage() {
  document.querySelector('.js-cart-quantity')
    .innerHTML = cart.calculateCartQuantity() || null;
}