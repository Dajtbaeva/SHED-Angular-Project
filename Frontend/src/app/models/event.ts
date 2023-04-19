import { IRoom } from "./room";
import { IUser } from "./user";

export interface IEvent {
  id: number;
  event_start_time: number;
  room: IRoom;
  discipline: string;
  day: number;
  tutor: IUser;
}
// export interface IEvent {
//   id: number;
//   event_start_time: number;
//   room: string;
//   discipline: string;
//   day: number;
//   tutor: string;
// }
