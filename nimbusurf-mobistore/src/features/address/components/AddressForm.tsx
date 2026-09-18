import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import type {
  AddressFormErrors,
  AddressFormValues,
} from "../hooks/useAddressForm";

type AddressFormProps = {
  values: AddressFormValues;
  errors: AddressFormErrors;
  onChange: (field: keyof AddressFormValues, text: string) => void;
  onSubmit: () => void;
  isDefault: boolean;
  onToggleDefault: () => void;
};

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <Text style={styles.error}>{message}</Text>;
}

export default function AddressForm({
  values,
  errors,
  onChange,
  onSubmit,
  isDefault,
  onToggleDefault,
}: AddressFormProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>First Name*</Text>

          <TextInput
            style={styles.input}
            value={values.firstName}
            onChangeText={(text) => onChange("firstName", text)}
            placeholder="First name"
            placeholderTextColor="#94A3B8"
          />

          <FieldError message={errors.firstName} />
        </View>

        <View style={styles.halfInput}>
          <Text style={styles.label}>Last Name*</Text>

          <TextInput
            style={styles.input}
            value={values.lastName}
            onChangeText={(text) => onChange("lastName", text)}
            placeholder="Last name"
            placeholderTextColor="#94A3B8"
          />

          <FieldError message={errors.lastName} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Phone Number*</Text>

          <TextInput
            style={styles.input}
            value={values.phone}
            onChangeText={(text) => onChange("phone", text)}
            placeholder="10-digit mobile number"
            placeholderTextColor="#94A3B8"
            keyboardType="number-pad"
            maxLength={10}
          />

          <FieldError message={errors.phone} />
        </View>

        <View style={styles.halfInput}>
          <Text style={styles.label}>PIN Code*</Text>

          <TextInput
            style={styles.input}
            value={values.pincode}
            onChangeText={(text) => onChange("pincode", text)}
            placeholder="6-digit PIN code"
            placeholderTextColor="#94A3B8"
            keyboardType="number-pad"
            maxLength={6}
          />

          <FieldError message={errors.pincode} />
        </View>
      </View>

      <Text style={styles.label}>Address*</Text>

      <TextInput
        style={[styles.input, styles.addressInput]}
        value={values.line1}
        onChangeText={(text) => onChange("line1", text)}
        placeholder="House number, street, area"
        placeholderTextColor="#94A3B8"
        multiline
        numberOfLines={4}
        maxLength={120}
      />

      <FieldError message={errors.line1} />

      <Text style={styles.label}>Landmark*</Text>

      <TextInput
        style={styles.input}
        value={values.landmark}
        onChangeText={(text) => onChange("landmark", text)}
        placeholder="Near mall, temple, school, etc."
        placeholderTextColor="#94A3B8"
      />

      <FieldError message={errors.landmark} />

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>City*</Text>

          <TextInput
            style={styles.input}
            value={values.city}
            onChangeText={(text) => onChange("city", text)}
            placeholder="City"
            placeholderTextColor="#94A3B8"
          />

          <FieldError message={errors.city} />
        </View>

        <View style={styles.halfInput}>
          <Text style={styles.label}>State*</Text>

          <TextInput
            style={styles.input}
            value={values.state}
            onChangeText={(text) => onChange("state", text)}
            placeholder="State"
            placeholderTextColor="#94A3B8"
          />

          <FieldError message={errors.state} />
        </View>
      </View>

      <Pressable style={styles.defaultRow} onPress={onToggleDefault}>
        <View
          style={[
            styles.checkbox,
            isDefault ? styles.checkboxSelected : null,
          ]}
        />

        <Text style={styles.defaultText}>
          Make this my default address
        </Text>
      </Pressable>

      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Save Address</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#F8FAFC",
  },

  row: {
    flexDirection: "row",
    marginBottom: 12,
  },

  halfInput: {
    flex: 1,
    marginRight: 12,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 6,
  },

  input: {
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    color: "#0F172A",
  },

  addressInput: {
    minHeight: 96,
    textAlignVertical: "top",
    paddingTop: 12,
    marginBottom: 6,
  },

  error: {
    marginTop: 6,
    fontSize: 12,
    color: "#EF4444",
  },

  defaultRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 18,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#94A3B8",
    marginRight: 10,
  },

  checkboxSelected: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },

  defaultText: {
    fontSize: 14,
    color: "#334155",
  },

  submitButton: {
    backgroundColor: "#7C3AED",
    borderRadius: 14,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
