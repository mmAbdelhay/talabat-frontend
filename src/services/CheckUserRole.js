export const checkRole = () => {
  const role =
    localStorage.getItem("role") != null ? localStorage.getItem("role") : "";
  return role ? role : "";
};
