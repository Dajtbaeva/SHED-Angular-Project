// import { IGroup } from './group';
// import { IRole } from './role';

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
  role: number;
  organization: string;
  group: number | null;
}
