import { type CartProduct } from "@/src/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type StateStore = {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  removeFromCart: (id: CartProduct["id"]) => void;
  updateQuantity: (id: CartProduct["id"], quantity: number) => void;
  getTotalQuantity: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    quantityProducts: number;
    igv: number;
    envio: number;
    total: number;
  };
  cleanCart: () => void;
};

export const useCartStore = create<StateStore>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        getTotalQuantity: () => {
          const { cart } = get();
          return cart.reduce((acc, item) => acc + item.quantity, 0);
        },
        addProductToCart: (product) => {
          const { cart } = get();
          // validacion si el producto se agrego al carrito
          const isProductInCart = cart.some((item) => item.id === product.id);

          if (isProductInCart) {
            const updateCart = cart.map((item) => {
              if (item.id === product.id && item.size === product.size) {
                return { ...item, quantity: item.quantity + product.quantity };
              }
              return item;
            });
            set({ cart: updateCart });
          } else {
            set({ cart: [...cart, product] });
          }
        },
        updateQuantity: (id, quantity) => {
          const { cart } = get();

          const updateCart = cart.map((item) => {
            if (item.id === id) {
              return { ...item, quantity };
            }
            return item;
          });
          set({ cart: updateCart });
        },
        removeFromCart: (id) => {
          const { cart } = get();
          if (!confirm("Desea eliminar el producto del carrito?")) return;
          const updateCart = cart.filter((item) => item.id !== id);
          set({ cart: updateCart });
        },
        getSummaryInformation: () => {
          const { cart, getTotalQuantity } = get();

          const subTotal = cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          const quantityProducts = getTotalQuantity();
          const igv = subTotal * 0.18;
          const envio = 4.99;
          const total = subTotal + igv + envio;

          return { subTotal, quantityProducts, igv, envio, total };
        },
        cleanCart: () => set({ cart: [] }),
      }),
      {
        name: "shopping-cart",
      }
    ),
    {
      name: "cart-store",
    }
  )
);
