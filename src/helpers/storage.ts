export default {
  setItem: (name: string, data: string) => localStorage.setItem(name, data),
  getItem: (name: string) => localStorage.getItem(name),
  removeItem: (name: string) => localStorage.removeItem(name),
  clear: () => localStorage.clear(),
};
