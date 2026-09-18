export type Subcategory = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
  img: string;
  subcategories: Subcategory[];
};