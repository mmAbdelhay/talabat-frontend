export const checkRole = () => {
  const role =
    sessionStorage.getItem("role") != null
      ? sessionStorage.getItem("role")
      : "";
  return role ? role : "";
};
