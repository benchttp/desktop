declare const brand: unique symbol;
export type Nominal<T, U> = T & { readonly [brand]: U };
