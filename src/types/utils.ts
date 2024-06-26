export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type OLDTypedOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

export type TypedOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
