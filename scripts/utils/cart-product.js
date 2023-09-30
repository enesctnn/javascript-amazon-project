import { products } from "../../data/products.js";

export function getItemFromPorduct(productId) {
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
