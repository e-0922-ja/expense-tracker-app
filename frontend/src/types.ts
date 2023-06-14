import { SvgIconProps } from "@mui/material/SvgIcon";
import { UUID } from "crypto";

export interface Friend {
  id: UUID;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Category {
  name: string;
  icon: React.ComponentType<SvgIconProps>;
}

export interface Expense {
  id: string;
  category: string;
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
