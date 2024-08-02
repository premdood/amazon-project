import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
// import '../data/car.js';
// import '../data/backend-practice.js';
import { loadProducts } from '../data/products.js';
import { cart } from '../data/cart-class.js';

Promise.all([
  new Promise((resolve) => {
    loadProducts(resolve);
  }),

  new Promise((resolve) => {
    cart.loadCart(resolve);
  })

]).then((result) => {
  console.log(result);

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

/* 
new Promise((resolve) => {
  loadProducts(resolve);

}).then(() => {
  return new Promise((resolve) => {
    cart.loadCart(resolve);
  });

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/* 
loadProducts(() => {
  cart.loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/