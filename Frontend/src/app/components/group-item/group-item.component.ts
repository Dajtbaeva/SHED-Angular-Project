import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGroup } from 'src/app/models/group';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css'],
})
export class GroupItemComponent {
  @Input()
  group!: IGroup;
  @Input()
  students!: IUser[];
  studentsb = false;

  @Output() delete = new EventEmitter();

  deleteGroup(group: IGroup) {
    this.delete.emit(group);
  }
}
