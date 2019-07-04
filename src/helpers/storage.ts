export default {
  setItem: (name, data) => localStorage.setItem(name, data),
  getItem: name => localStorage.getItem(name),
  clear: () => localStorage.clear(),
};
