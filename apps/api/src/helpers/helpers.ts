export type Create<T> = Omit<T, 'id'>;
export type Update<T> = Partial<Omit<T, 'id'>>;
export type List<T> = T[];
