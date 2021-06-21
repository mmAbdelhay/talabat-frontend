const [isLoggedIn, token] = checkIfLoggedIn();
if (isLoggedIn) {
  let decode = jwt_decode(token);
  if (parseInt(Date.now().toString().slice(0, -3)) > parseInt(decode.exp)) {
    localStorage.clear();
  } else {
    setStatus(isLoggedIn);
    setRole(checkRole());
  }
}
