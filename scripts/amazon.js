import { cart } from '../data/cart-class.js';
import { products, loadProductsFetch } from '../data/products.js';

let productsHTML = '';

async function renderProductsGrid() {
  await loadProductsFetch();
  
  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;
  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach(keyword => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword || product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  filteredProducts.forEach((product) => {
    productsHTML += `<div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>
      
      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>
  
      <div class="product-rating-container">
        <img class="product-rating-stars" src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>
      
      <div class="product-price">
        ${product.getPrice()}
      </div>
      
      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          </select>
      </div>
  
      ${product.extraInfoHTML()}
          
      <div class="product-spacer"></div>
  
      <div class="added-to-cart js-added-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>
  
      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  updateCartQuantity();

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    let timeoutId;
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      cart.addToCart(productId);
      updateCartQuantity();

      const addedMessageElement = document.querySelector(`.js-added-${productId}`);
      addedMessageElement.classList.add('show-added-to-cart');

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        addedMessageElement.classList.remove('show-added-to-cart');
      }, 2000);
    });
  });

  document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const searchElement = document.querySelector('.js-search-bar');
      const searchValue = searchElement.value;
      searchElement.value = '';
      window.location.href = `amazon.html?search=${searchValue}`;
    });

  document.querySelector('.js-search-bar')
    .addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        document.querySelector('.js-search-button').click();
      }
    });
}

renderProductsGrid();

function updateCartQuantity() {
  document.querySelector('.js-cart-quantity')
    .innerHTML = cart.calculateCartQuantity() || null;
}