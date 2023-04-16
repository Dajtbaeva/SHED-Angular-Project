export interface IUser {
  id: number;
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  org_id: string;
  group: string | null;
}
