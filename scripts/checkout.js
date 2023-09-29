import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';

function getItemFromPorduct(productId) {
  let matchingItem;
  products.forEach(product => {
    if (product.id === productId) {
      const { image, name, priceCents } = product;
      matchingItem = {
        image,
        name,
        priceCents
      }
    }
  });
  return matchingItem;
}

cart.forEach((product) => {
  const { productId, quantity } = product;
  const { image, name, priceCents } = getItemFromPorduct(productId);
  const orderElement = document.querySelector('.js-order-summary');
  orderElement.innerHTML += `
  <div class="cart-item-container js-cart-item-container-${productId}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image" src="${image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${name}
        </div>
        <div class="product-price">
          $${(priceCents / 100).toFixed(2)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${productId}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked class="delivery-option-input" name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input" name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input" name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
});

document.querySelectorAll(`.js-delete-quantity`)
  .forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      
      removeFromCart(productId);
      const container = document.querySelector(`
    .js-cart-item-container-${productId}
    `);
      container.remove();
    });
  });