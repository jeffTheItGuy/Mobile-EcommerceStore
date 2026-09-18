import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type AddressForm = {
  firstName: string;
  lastName: string;
  phone: string;
  pincode: string;
  line1: string;
  landmark: string;
  city: string;
  state: string;
};

type AddressErrors = Partial<Record<keyof AddressForm, string>>;

const initialForm: AddressForm = {
  firstName: "",
  lastName: "",
  phone: "",
  pincode: "",
  line1: "",
  landmark: "",
  city: "",
  state: "",
};

export default function AddressFormScreen({ navigation }: any) {
  const [form, setForm] = useState<AddressForm>(initialForm);
  const [errors, setErrors] = useState<AddressErrors>({});
  const [isDefault, setIsDefault] = useState(false);

  const handleChange = (field: keyof AddressForm, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const validate = () => {
    const nextErrors: AddressErrors = {};

    if (form.firstName.trim().length < 2) {
      nextErrors.firstName = "Enter a valid first name.";
    }

    if (form.lastName.trim().length < 2) {
      nextErrors.lastName = "Enter a valid last name.";
    }

    if (form.phone.replace(/\D/g, "").length !== 10) {
      nextErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (form.pincode.replace(/\D/g, "").length !== 6) {
      nextErrors.pincode = "Enter a valid 6-digit PIN code.";
    }

    if (form.line1.trim().length < 5) {
      nextErrors.line1 = "Enter full address with house details.";
    }

    if (form.landmark.trim().length < 2) {
      nextErrors.landmark = "Enter a landmark.";
    }

    if (form.city.trim().length < 2) {
      nextErrors.city = "Enter a valid city.";
    }

    if (form.state.trim().length < 2) {
      nextErrors.state = "Enter a valid state.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }

    Alert.alert("Address Saved", "Your delivery address has been saved.");
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Add Address</Text>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>First Name*</Text>

            <TextInput
              style={styles.input}
              value={form.firstName}
              onChangeText={(value) => handleChange("firstName", value)}
              placeholder="First name"
              placeholderTextColor="#94A3B8"
            />

            {errors.firstName ? (
              <Text style={styles.error}>{errors.firstName}</Text>
            ) : null}
          </View>

          <View style={styles.halfField}>
            <Text style={styles.label}>Last Name*</Text>

            <TextInput
              style={styles.input}
              value={form.lastName}
              onChangeText={(value) => handleChange("lastName", value)}
              placeholder="Last name"
              placeholderTextColor="#94A3B8"
            />

            {errors.lastName ? (
              <Text style={styles.error}>{errors.lastName}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Phone Number*</Text>

            <TextInput
              style={styles.input}
              value={form.phone}
              onChangeText={(value) => handleChange("phone", value)}
              placeholder="Phone number"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              maxLength={10}
            />

            {errors.phone ? (
              <Text style={styles.error}>{errors.phone}</Text>
            ) : null}
          </View>

          <View style={styles.halfField}>
            <Text style={styles.label}>PIN Code*</Text>

            <TextInput
              style={styles.input}
              value={form.pincode}
              onChangeText={(value) => handleChange("pincode", value)}
              placeholder="PIN code"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              maxLength={6}
            />

            {errors.pincode ? (
              <Text style={styles.error}>{errors.pincode}</Text>
            ) : null}
          </View>
        </View>

        <Text style={styles.label}>Address*</Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          value={form.line1}
          onChangeText={(value) => handleChange("line1", value)}
          placeholder="House number, street, area"
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={4}
          maxLength={120}
        />

        {errors.line1 ? <Text style={styles.error}>{errors.line1}</Text> : null}

        <Text style={styles.label}>Landmark*</Text>

        <TextInput
          style={styles.input}
          value={form.landmark}
          onChangeText={(value) => handleChange("landmark", value)}
          placeholder="Near mall, temple, school, etc."
          placeholderTextColor="#94A3B8"
        />

        {errors.landmark ? (
          <Text style={styles.error}>{errors.landmark}</Text>
        ) : null}

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>City*</Text>

            <TextInput
              style={styles.input}
              value={form.city}
              onChangeText={(value) => handleChange("city", value)}
              placeholder="City"
              placeholderTextColor="#94A3B8"
            />

            {errors.city ? (
              <Text style={styles.error}>{errors.city}</Text>
            ) : null}
          </View>

          <View style={styles.halfField}>
            <Text style={styles.label}>State*</Text>

            <TextInput
              style={styles.input}
              value={form.state}
              onChangeText={(value) => handleChange("state", value)}
              placeholder="State"
              placeholderTextColor="#94A3B8"
            />

            {errors.state ? (
              <Text style={styles.error}>{errors.state}</Text>
            ) : null}
          </View>
        </View>

        <Pressable
          style={styles.defaultRow}
          onPress={() => setIsDefault((previous) => !previous)}
        >
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

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Address</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  halfField: {
    flex: 1,
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 8,
  },
  input: {
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    fontSize: 15,
    color: "#0F172A",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
    paddingTop: 12,
    marginBottom: 8,
  },
  error: {
    marginTop: 6,
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "600",
  },
  defaultRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
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
    fontWeight: "600",
  },
  saveButton: {
    borderRadius: 16,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
