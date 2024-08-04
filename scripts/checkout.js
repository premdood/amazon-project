import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
// import '../data/car.js';
// import '../data/backend-practice.js';
import { loadProductsFetch } from '../data/products.js';
import { cart } from '../data/cart-class.js';

async function loadPage() {
  await loadProductsFetch();

  const value = await new Promise((resolve) => {
    cart.loadCart(() => {
      resolve('value3');
    });
  });

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/* Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    cart.loadCart(resolve);
  })

]).then((result) => {
  console.log(result);

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}); */

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