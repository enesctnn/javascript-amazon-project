import { cart, removeFromCart } from '../data/cart.js';
import { getItemFromPorduct } from './utils/cart-product.js';
import { calculateTaxFromPriceCents, calculateTotalFromPriceCents, formatPrice } from './utils/money.js';
import { updateCartQuantity } from './utils/quantity.js';

let totalPriceCents = 0;

function displayCart() {
  const orderElement = document.querySelector('.js-order-summary');
  orderElement.innerHTML = '';
  cart.forEach((cartItem) => {
    const { productId, quantity } = cartItem;
    const { image, name, priceCents } = getItemFromPorduct(productId);
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
          $${formatPrice(priceCents)}
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
    totalPriceCents += priceCents * quantity;
    displayPayment();
  });

  document.querySelectorAll(`.js-delete-quantity`)
    .forEach((link) => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset;
        const container = document.querySelector(`
        .js-cart-item-container-${productId}
        `);
        container.remove();
        removeFromCart(productId);
        totalPriceCents = 0;
        displayCart();
        displayPayment();
      });
    });
}




function displayPayment() {
  const cartQuantity = updateCartQuantity();
  const paymentElement = document.querySelector('.js-payment-summary')
  paymentElement.innerHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>
  
  <div class="payment-summary-row">
    <div>Items (${cartQuantity}):</div>
    <div class="payment-summary-money">$${formatPrice(totalPriceCents)}</div>
  </div>
  
  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$4.99</div>
  </div>
  
  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatPrice(totalPriceCents + 499)}</div>
  </div>
  
  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${(calculateTaxFromPriceCents(totalPriceCents))}</div>
  </div>
  
  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${calculateTotalFromPriceCents(totalPriceCents)}</div>
  </div>
  
  <button class="place-order-button button-primary">
    Place your order
  </button>
  </div>
  </div>`;
}

displayPayment();
displayCart();
