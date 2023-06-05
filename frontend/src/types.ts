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
