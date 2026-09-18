import { useState } from "react";

export type AddressFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  pincode: string;
  line1: string;
  landmark: string;
  city: string;
  state: string;
};

export type AddressFormErrors = Partial<Record<keyof AddressFormValues, string>>;

const initialValues: AddressFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  pincode: "",
  line1: "",
  landmark: "",
  city: "",
  state: "",
};

const onlyDigits = (value: string) => {
  return value.replace(/[^0-9]/g, "");
};

const validateAddressForm = (
  values: AddressFormValues
): AddressFormErrors => {
  const errors: AddressFormErrors = {};

  if (values.firstName.trim().length < 2) {
    errors.firstName = "Enter a valid first name.";
  }

  if (values.lastName.trim().length < 2) {
    errors.lastName = "Enter a valid last name.";
  }

  if (onlyDigits(values.phone).length !== 10) {
    errors.phone = "Enter a valid 10-digit phone number.";
  }

  if (onlyDigits(values.pincode).length !== 6) {
    errors.pincode = "Enter a valid 6-digit PIN code.";
  }

  if (values.line1.trim().length < 5) {
    errors.line1 = "Enter full address with house details.";
  }

  if (values.landmark.trim().length < 2) {
    errors.landmark = "Enter a landmark.";
  }

  if (values.city.trim().length < 2) {
    errors.city = "Enter a valid city.";
  }

  if (values.state.trim().length < 2) {
    errors.state = "Enter a valid state.";
  }

  return errors;
};

export function useAddressForm(
  onSubmit: (values: AddressFormValues) => void
) {
  const [values, setValues] = useState<AddressFormValues>(initialValues);
  const [errors, setErrors] = useState<AddressFormErrors>({});

  const handleChange = (
    field: keyof AddressFormValues,
    text: string
  ) => {
    let nextValue = text;

    if (field === "phone") {
      nextValue = onlyDigits(text).slice(0, 10);
    }

    if (field === "pincode") {
      nextValue = onlyDigits(text).slice(0, 6);
    }

    setValues((previous) => ({
      ...previous,
      [field]: nextValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const handleSubmit = () => {
    const validationErrors = validateAddressForm(values);

    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(Boolean);

    if (!hasErrors) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}
