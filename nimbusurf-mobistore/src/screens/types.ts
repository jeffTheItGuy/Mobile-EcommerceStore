export type ProductParams = {
  id: string | number;
  name: string;
  img: string;
  type?: string;
  price: number | string;
};

export type ProductListParams = {
  categoryType?: string;
};

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Categories: undefined;
  ProductList: ProductListParams | undefined;
  Product: ProductParams;
  Cart: ProductParams | undefined;
  Login: undefined;
  Address: undefined;
};
