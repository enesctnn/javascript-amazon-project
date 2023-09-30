import { cart } from "../../data/cart.js";

export let cartQuantity = 0;

cart.forEach(cartItem => cartQuantity += cartItem.quantity);