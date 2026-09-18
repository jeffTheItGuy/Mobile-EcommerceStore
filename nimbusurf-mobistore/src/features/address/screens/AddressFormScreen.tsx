import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AddressForm from "../components/AddressForm";
import { useAddressForm } from "../hooks/useAddressForm";
import { useAddressStore } from "../store/addressStore";

import type { Address } from "../../../types/address";

export default function AddressFormScreen() {
  const navigation = useNavigation<any>();

  const [isDefault, setIsDefault] = useState(false);

  const { addAddress } = useAddressStore();

  const { values, errors, handleChange, handleSubmit } = useAddressForm(
    (formValues) => {
      const address: Address = {
        id: `${Date.now()}`,
        ...formValues,
        isDefault,
      };

      addAddress(address);

      navigation.goBack();
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <AddressForm
        values={values}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isDefault={isDefault}
        onToggleDefault={() => setIsDefault((previous) => !previous)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
});
