import React from "react";
import AppButton from "../ui/AppButton";

type CheckoutButtonProps = {
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function CheckoutButton({
  label = "Checkout",
  onPress,
  disabled = false,
  loading = false,
}: CheckoutButtonProps) {
  return (
    <AppButton
      title={label}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      variant="primary"
    />
  );
}
