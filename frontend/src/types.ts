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

export interface Friendship {
  friendEmail: string;
  friendId: UUID;
  id: UUID;
  registeredAt: string;
  statusId: number;
  updatedAt: string;
  userId: UUID;
}

export interface Users {
  email: string;
  firstName: string;
  id: UUID;
  lastName: string;
  password: string;
  registeredAt: string;
  updatedAt: string;
}
