import { IGroup } from './group';
import { IRoom } from './room';
import { IUser } from './user';

export interface IEvent {
  id: number;
  event_start_time: number;
  room: IRoom;
  discipline: string;
  day: number;
  tutor: IUser;
  group: IGroup;
  status: boolean;
}
