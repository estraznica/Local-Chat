export const getRoom = () => {
  const username = String(sessionStorage.key(0));
  const room = String(sessionStorage.getItem(String(username)));
  return room;
};
