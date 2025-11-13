export interface Entity {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CurrencyEntity {
  code: string;
  name: string;
  symbol: string;
}