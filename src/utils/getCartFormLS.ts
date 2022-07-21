import { CartItem } from "../redux/slices/cartSlice";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFormLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) as CartItem[] : [];
  const totalPrice = calcTotalPrice(items);
  return {
    items,
    totalPrice,
  };
};
