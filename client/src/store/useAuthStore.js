import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,

  login: (userData) =>
    set(() => ({
      isLoggedIn: userData,
    })),
  setUser: (userData) =>
  set(() => ({
    user: userData,
  })),
  logout: () =>
    set(() => ({
      user: null,
      isLoggedIn: false,
    })),
}));

export default useAuthStore;
