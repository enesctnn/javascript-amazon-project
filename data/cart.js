export let cart = JSON.parse(localStorage.getItem('cart1'))
  || [];

function saveToStorage() {
  localStorage.setItem('cart1', JSON.stringify(cart));
}

export function addToCart(productId, selectedValue) {
  let matchingItem;

  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += selectedValue;
  } else {
    cart.push({
      productId,
      quantity: selectedValue
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {

  let newCart = [];
  cart.forEach(cartItem => {
    if (productId !== cartItem.productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}