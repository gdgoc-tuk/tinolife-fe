import { create } from "zustand";

interface User {
  id: number;
  access_token: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  updateToken: (access_token: string) => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateToken: (access_token) =>
    set((state) => {
      if (!state.user) return state;
      return { user: { ...state.user, access_token } };
    }),
  reset: () => set({ user: null }),
}));
