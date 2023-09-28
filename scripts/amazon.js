products.forEach((product) => {
  const { image, name, rating, priceCents, id } = product;
  const { stars, count } = rating;
  document.querySelector('.js-products-grid')
    .innerHTML += `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src=${image}>
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${count}
      </div>
    </div>

    <div class="product-price">
      $${(priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select>
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

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart-button"
    data-product-id="${id}">
      Add to Cart
    </button>
  </div>`;
});


document.querySelectorAll('.js-add-to-cart-button')
  .forEach(button => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;

      let matchingItem;

      cart.forEach((value) => {
        if (value.productId === productId) {
          matchingItem = value;
        }
      });

      if (matchingItem) {
        matchingItem.quantity++;
      } else {
        cart.push({
          productId,
          quantity: 1
        });
      }
      let cartQuantity = 0;

      console.log(cart);
      cart.forEach((value) => {
        cartQuantity += value.quantity;
      });
      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
    });
  });

