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

export interface UpdateFriendShipRequest {
  friendId: string;
  friendEmail: string;
}

export interface UpdateAuthUserRequest {
  firstName: string;
  lastName: string;
}

export interface UpdateUserRequest {
  id: string;
  firstName: string;
  lastName: string;
}
