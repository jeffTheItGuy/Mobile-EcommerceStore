import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import AddressForm from "../components/AddressForm";
import { useAddressForm } from "../hooks/useAddressForm";
import { useAddressStore } from "../../../stores/addressStore";
import type { AddressInput } from "../../../stores/types";

export default function AddressFormScreen() {
  const navigation = useNavigation<any>();
  const [isDefault, setIsDefault] = useState(false);
  const { addAddress } = useAddressStore();

  const { values, errors, handleChange, handleSubmit } = useAddressForm(
    (formValues) => {
      const addressInput: AddressInput = {
        ...formValues,
        isDefault,
      };

      addAddress(addressInput);
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