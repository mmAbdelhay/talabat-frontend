export const checkIfLoggedIn = () => {
  const tokenKey =
    localStorage.getItem("token") != null ? localStorage.getItem("token") : "";
  return tokenKey ? [true, tokenKey] : [false, ""];
};
