import { IGroup } from './group';
import { IRole } from './role';

// export interface IUser {
//   id: number;
//   username: string;
//   password: string;
//   name: string;
//   surname: string;
//   email: string;
//   role: string;
//   org_id: string;
//   group: string | null;
// }
export interface IUser {
  id: number;
  username: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  role: IRole;
  organization: string; // or organization: IOrganization
  group: IGroup;
  is_active: boolean;
  is_verified: boolean;
}
