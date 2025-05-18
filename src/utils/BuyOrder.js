// utils/orderHandler.js
import { ref, push } from 'firebase/database';
import { auth, database } from '../firebase';

export const handleBuy = (product) => {
  const user = auth.currentUser;
  if (!user) {
    alert("Please log in to place an order.");
    return;
  }

  const orderRef = ref(database, 'orders/' + user.uid);
  push(orderRef, {
    productName: product.name,
    price: product.price,
    timestamp: Date.now()
  }).then(() => {
    alert("Order placed successfully!");
  }).catch((error) => {
    console.error("Order failed: ", error);
    alert("Something went wrong. Please try again.");
  });
};
