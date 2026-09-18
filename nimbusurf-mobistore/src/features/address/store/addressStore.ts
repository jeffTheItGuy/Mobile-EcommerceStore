import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Address } from "../../../types/address";

type AddressState = {
  addresses: Address[];
  selectedAddressId: string | null;

  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  setSelectedAddress: (id: string) => void;
};

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      addresses: [],
      selectedAddressId: null,

      addAddress: (address) =>
        set((state) => {
          const cleanedAddresses = address.isDefault
            ? state.addresses.map((item) => ({
                ...item,
                isDefault: false,
              }))
            : state.addresses;

          const nextAddresses = [
            address,
            ...cleanedAddresses.filter((item) => item.id !== address.id),
          ];

          return {
            addresses: nextAddresses,
            selectedAddressId: address.isDefault
              ? address.id
              : state.selectedAddressId || address.id,
          };
        }),

      removeAddress: (id) =>
        set((state) => {
          const nextAddresses = state.addresses.filter(
            (address) => address.id !== id
          );

          const nextSelectedAddressId =
            state.selectedAddressId === id
              ? nextAddresses[0]?.id || null
              : state.selectedAddressId;

          return {
            addresses: nextAddresses,
            selectedAddressId: nextSelectedAddressId,
          };
        }),

      setSelectedAddress: (id) =>
        set(() => ({
          selectedAddressId: id,
        })),
    }),
    {
      name: "nimbusurf-address-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
