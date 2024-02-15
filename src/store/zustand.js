import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const initialState = {
    loginData: {},
    userData: {},
};

const store = (set) => ({
    ...initialState,
    setLoginData: (data) =>
        set((state) => ({
            loginData: data,
        })),
    setUserData: (data) =>
        set((state) => ({
            userData: data,
        })),
    cleanup: () => set(initialState),
});

const useAuthStore = create(persist(devtools(store), { name: 'globalStore' }));

export default useAuthStore;
