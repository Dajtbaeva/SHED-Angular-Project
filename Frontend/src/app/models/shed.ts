import { IEvent } from './event';

export interface IShed {
  id: number;
  time: number;
  events: IEvent[];
}
