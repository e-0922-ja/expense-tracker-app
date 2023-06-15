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

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  paid: boolean;
  amount: number;
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
  settled: boolean;
  members: Member[];
}

export interface CheckedMember {
  id: string;
  paid: boolean;
}
