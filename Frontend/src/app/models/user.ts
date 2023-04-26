export interface IUser {
  id: number;
  username: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  role: number;
  organization: string;
  group: number | null;
}
