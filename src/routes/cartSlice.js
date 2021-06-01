import { createSlice } from "@reduxjs/toolkit";

const cartService = () => {
   if (sessionStorage.getItem("cart")) {
      return JSON.parse(sessionStorage.getItem("cart"));
   } else {
      return [];
   }
};

const providerIdService = () => {
   if (sessionStorage.getItem("providerId")) {
      return sessionStorage.getItem("providerId");
   } else {
      return "";
   }
};

export const cartSlice = createSlice({
   name: "cart",
   initialState: {
      cart: cartService(),
      providerId: providerIdService(),
   },
   reducers: {
      defineProviderId: (state, providerId) => {
         if (state.providerId !== providerId.payload) {
            state.providerId = providerId.payload;
            sessionStorage.setItem("providerId", providerId.payload);
            state.cart = [];
         }
      },
      addToCart: (state, item) => {
         if (state.cart.some((itemsInCart) => itemsInCart.id === item.payload.id)) {
            state.cart.map((i) => {
               if (i.id === item.payload.id) {
                  i.quantity += 1;
                  i.price = +i.price + +item.payload.price;
               }
            });
         } else {
            state.cart.push(item.payload);
         }
         sessionStorage.setItem("cart", JSON.stringify(state.cart));
      },
      removeFromCart: (state) => {
         console.log("REMOVED FROM CART", state);
      },
   },
});
export const { addToCart, removeFromCart, defineProviderId } = cartSlice.actions;

export default cartSlice.reducer;
