import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Address, AddressInput } from "./types";

export type AddressState = {
  addresses: Address[];
  selectedAddressId: string | null;

  addAddress: (address: AddressInput) => Address;
  updateAddress: (id: string, updates: Partial<AddressInput>) => void;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  clearAddresses: () => void;
};

export const ADDRESS_STORAGE_KEY = "nimbusurf.addresses";

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],
      selectedAddressId: null,

      addAddress: (input) => {
        const state = get();

        const id = input.id ?? `address_${Date.now()}`;
        const shouldDefault =
          input.isDefault ?? state.addresses.length === 0;

        const address: Address = {
          ...input,
          id,
          isDefault: shouldDefault,
        };

        set((currentState) => {
          const exists = currentState.addresses.some(
            (item) => item.id === id
          );

          let addresses = exists
            ? currentState.addresses.map((item) =>
                item.id === id ? address : item
              )
            : [address, ...currentState.addresses];

          if (address.isDefault) {
            addresses = addresses.map((item) =>
              item.id === id
                ? item
                : {
                    ...item,
                    isDefault: false,
                  }
            );
          }

          return {
            addresses,
            selectedAddressId: address.isDefault
              ? id
              : currentState.selectedAddressId ?? id,
          };
        });

        return address;
      },

      updateAddress: (id, updates) =>
        set((state) => {
          const exists = state.addresses.some(
            (address) => address.id === id
          );

          if (!exists) {
            return state;
          }

          let addresses = state.addresses.map((address) =>
            address.id === id
              ? {
                  ...address,
                  ...updates,
                  id,
                }
              : address
          );

          if (updates.isDefault) {
            addresses = addresses.map((address) =>
              address.id === id
                ? address
                : {
                    ...address,
                    isDefault: false,
                  }
            );
          }

          return {
            addresses,
            selectedAddressId: updates.isDefault
              ? id
              : state.selectedAddressId,
          };
        }),

      removeAddress: (id) =>
        set((state) => {
          const addresses = state.addresses.filter(
            (address) => address.id !== id
          );

          const selectedAddressId =
            state.selectedAddressId === id
              ? addresses.find((address) => address.isDefault)?.id ??
                addresses[0]?.id ??
                null
              : state.selectedAddressId;

          return {
            addresses,
            selectedAddressId,
          };
        }),

      selectAddress: (id) =>
        set({
          selectedAddressId: id,
        }),

      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((address) => ({
            ...address,
            isDefault: address.id === id,
          })),
          selectedAddressId: id,
        })),

      clearAddresses: () =>
        set({
          addresses: [],
          selectedAddressId: null,
        }),
    }),
    {
      name: ADDRESS_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const selectAddresses = (state: AddressState) => state.addresses;

export const selectSelectedAddressId = (state: AddressState) =>
  state.selectedAddressId;

export const selectDefaultAddress = (state: AddressState) =>
  state.addresses.find((address) => address.isDefault) ??
  state.addresses[0] ??
  null;

export const selectSelectedAddress = (state: AddressState) =>
  state.addresses.find(
    (address) => address.id === state.selectedAddressId
  ) ?? selectDefaultAddress(state);

export function useSelectedAddress() {
  return useAddressStore(selectSelectedAddress);
}
