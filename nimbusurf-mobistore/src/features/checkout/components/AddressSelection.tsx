import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { Address } from "../../../types/address";

type AddressSelectionProps = {
  address: Address | null;
  onAddAddress: () => void;
};

export default function AddressSelection({
  address,
  onAddAddress,
}: AddressSelectionProps) {
  if (!address) {
    return (
      <Pressable style={styles.emptyCard} onPress={onAddAddress}>
        <Text style={styles.emptyTitle}>
          No delivery address selected
        </Text>

        <Text style={styles.emptyAction}>Add Address</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.name}>
        {address.firstName} {address.lastName}
      </Text>

      <Text style={styles.line}>{address.line1}</Text>

      <Text style={styles.line}>
        {address.landmark ? `${address.landmark}, ` : ""}
        {address.city}, {address.state} - {address.pincode}
      </Text>

      <Text style={styles.line}>Phone: {address.phone}</Text>

      {address.isDefault ? (
        <Text style={styles.badge}>Default Address</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "dashed",
    backgroundColor: "#FFFFFF",
    padding: 16,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 14,
    color: "#334155",
    marginBottom: 8,
  },

  emptyAction: {
    fontSize: 14,
    fontWeight: "700",
    color: "#7C3AED",
  },

  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },

  line: {
    fontSize: 13,
    color: "#475569",
    marginBottom: 4,
  },

  badge: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#EDE9FE",
    color: "#7C3AED",
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: "hidden",
  },
});
