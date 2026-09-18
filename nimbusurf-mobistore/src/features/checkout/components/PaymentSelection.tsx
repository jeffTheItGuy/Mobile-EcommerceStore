import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type PaymentMethod = "card" | "upi" | "cod";

const paymentMethods: Array<{
  id: PaymentMethod;
  title: string;
  description: string;
}> = [
  {
    id: "card",
    title: "Card",
    description: "Credit or debit card",
  },
  {
    id: "upi",
    title: "UPI",
    description: "Google Pay, PhonePe, Paytm",
  },
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
  },
];

type PaymentSelectionProps = {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
};

export default function PaymentSelection({
  selected,
  onSelect,
}: PaymentSelectionProps) {
  return (
    <View style={styles.container}>
      {paymentMethods.map((method) => {
        const isActive = selected === method.id;

        return (
          <Pressable
            key={method.id}
            style={[
              styles.item,
              isActive ? styles.itemActive : null,
            ]}
            onPress={() => onSelect(method.id)}
          >
            <View
              style={[
                styles.radio,
                isActive ? styles.radioActive : null,
              ]}
            />

            <View style={styles.content}>
              <Text style={styles.title}>{method.title}</Text>
              <Text style={styles.description}>{method.description}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },

  itemActive: {
    borderColor: "#7C3AED",
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#94A3B8",
    marginRight: 12,
  },

  radioActive: {
    borderColor: "#7C3AED",
    backgroundColor: "#7C3AED",
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },

  description: {
    marginTop: 3,
    fontSize: 12,
    color: "#64748B",
  },
});
