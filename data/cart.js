import { isValidDeliveryOption } from './deliveryOptions.js';

class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    const selectElement = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = selectElement ? Number(selectElement.value) : 1;

    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId)
        matchingItem = cartItem;
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    }
    else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => cartQuantity += cartItem.quantity);
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    if (!isValidDeliveryOption(deliveryOptionId)) {
      return;
    }

    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId)
        matchingItem = cartItem;
    });

    if (!matchingItem) {
      return;
    }

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }

  loadCart(fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      console.log(xhr.response);
      fun();
    });

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  }

  async loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    const text = await response.text();
    console.log(text);
    return text;
  }

  resetCart() {
    cart.cartItems = [];
    this.saveToStorage();
  }
}

export const cart = new Cart('cart');
