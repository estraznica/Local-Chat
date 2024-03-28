export const getUserName = () => {
  const username = String(sessionStorage.key(0));
  return username;
};
