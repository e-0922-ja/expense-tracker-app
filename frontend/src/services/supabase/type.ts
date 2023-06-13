export interface CreateAuthUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateUserRequest {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
