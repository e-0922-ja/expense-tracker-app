import { UUID } from "crypto";

export interface Friend {
  id: UUID;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Category {
  id: number;
  name: string | null;
  sequence: number | null;
}

export interface CategoryIcon {
  id: number;
  category: string;
  icon: React.ReactElement;
}

export interface Expense {
  id: string;
  categoryId: number;
  categoryName: string;
  payer: string;
  payerFirstName: string;
  payerLastName: string;
  description: string;
  payment: number;
  date: string;
  registeredAt: string;
  userIds: string[];
  firstNames: string[];
  lastNames: string[];
  paids: boolean[];
  amounts: number[];
}
