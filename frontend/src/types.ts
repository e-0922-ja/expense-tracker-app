import { SvgIconProps } from "@mui/material/SvgIcon";
import { Database } from "../../supabase/schema";

export interface Friend {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface FriendWithStatus extends Friend {
  statusId: number;
  sender: boolean;
}

export interface EachAmount extends Friend {
  amount: string;
  paid: boolean;
}

export interface Category {
  name: string;
  icon: React.ComponentType<SvgIconProps>;
}

export interface ToolbarItem {
  path: string;
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

export interface Friendship {
  friendEmail: string;
  friendId: string;
  id: string;
  registeredAt: string;
  statusId: number;
  updatedAt: string;
  userId: string;
}

export interface Users {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  password: string;
  registeredAt: string;
  updatedAt: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Message {
  isError: boolean;
  message: string;
}

export interface FriendEmail {
  email: string;
}

export type FriendShipsReturns =
  Database["public"]["Functions"]["get_user_friends"]["Returns"];
export type FriendShipsArgs =
  Database["public"]["Functions"]["get_user_friends"]["Args"];
export type FriendShipsInsert =
  Database["public"]["Tables"]["Friendships"]["Insert"];

export type BorrowedAmountReturns =
  Database["public"]["Functions"]["get_total_borrowed_amount"]["Returns"];
export type LentAmountReturns =
  Database["public"]["Functions"]["get_total_lent_amount"]["Returns"];
export type ExpensesReturns =
  Database["public"]["Functions"]["get_expenses"]["Returns"];

export interface CurrentUser {
  email: string;
  password: string;
}

export interface PasswordData {
  password: string;
  confPassword: string;
}

export interface Expense {
  amount: string;
  description: string;
}

export interface EachAmount extends Friend {
  amount: string;
  paid: boolean;
}

export interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
