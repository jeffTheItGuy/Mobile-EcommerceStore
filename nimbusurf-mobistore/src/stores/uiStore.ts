import { create } from "zustand";

export type UiModalName =
  | "cart"
  | "checkout"
  | "address"
  | "login"
  | null;

export type UiState = {
  isDrawerOpen: boolean;
  searchQuery: string;
  activeModal: UiModalName;

  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;

  setSearchQuery: (query: string) => void;

  openModal: (modal: Exclude<UiModalName, null>) => void;
  closeModal: () => void;
};

export const useUiStore = create<UiState>()((set) => ({
  isDrawerOpen: false,
  searchQuery: "",
  activeModal: null,

  openDrawer: () =>
    set({
      isDrawerOpen: true,
    }),

  closeDrawer: () =>
    set({
      isDrawerOpen: false,
    }),

  toggleDrawer: () =>
    set((state) => ({
      isDrawerOpen: !state.isDrawerOpen,
    })),

  setDrawerOpen: (open) =>
    set({
      isDrawerOpen: open,
    }),

  setSearchQuery: (query) =>
    set({
      searchQuery: query,
    }),

  openModal: (modal) =>
    set({
      activeModal: modal,
    }),

  closeModal: () =>
    set({
      activeModal: null,
    }),
}));
