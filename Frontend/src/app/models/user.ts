export interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: string;
  org_id: string;
  group: string | null;
}
