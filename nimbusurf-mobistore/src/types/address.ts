export type Address = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  line1: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
};

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
