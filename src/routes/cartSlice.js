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
         state.cart.push(item.payload);
         sessionStorage.setItem("cart", JSON.stringify(state.cart));
      },

      removeFromCart: (state, item) => {
         let sessionCart = JSON.parse(sessionStorage.getItem("cart"));
         sessionCart?.map((i, index) => {
            if (i.id === item.payload.id) {
               sessionCart.splice(index, 1);
            }
         });
         state.cart = sessionCart;
         sessionStorage.setItem("cart", JSON.stringify(sessionCart));
      },
   },
});
export const { addToCart, removeFromCart, defineProviderId } = cartSlice.actions;

export default cartSlice.reducer;
