export interface User {
  _id?: string;
  id: string;
  email: string;
  username: string;
  roles?: string[];
  createdAt?: string;
  updatedAt?: string;
}
