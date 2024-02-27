import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/tasks';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  @Input() tasks?: Task[];
  @Output() taskUpdated = new EventEmitter<Task[]>();
  @Input() taskName: string = '';
  @Input() selectedStatus: string = 'აირჩიეთ დავალების სტატუსი';
  constructor(private taskService: TaskService) {}
  addTask() {
    if (this.taskName.trim() !== '') {
      console.log(this.taskName);
      console.log(this.selectedStatus);
      this.taskService
        .createTask({
          taskName: this.taskName,
          taskStatus: this.selectedStatus,
        })
        .subscribe((tasks: Task[]) => this.taskUpdated.emit(tasks));
      this.taskName = '';
      this.selectedStatus = 'აირჩიეთ დავალების სტატუსი';
    }
  }
  updateTask() {
    console.log(this.taskName);
    console.log(this.selectedStatus);
    if (this.taskName.trim() !== '') {
      this.taskService
        .updateTask({
          id: this.taskService.selectedTask?.id,
          taskName: this.taskName,
          taskStatus: this.selectedStatus,
        })
        .subscribe((tasks: Task[]) => this.taskUpdated.emit(tasks));
    }
    this.taskName = '';
    this.selectedStatus = 'აირჩიეთ დავალების სტატუსი';
  }
  submitForm() {
    if (this.taskService.isUpdateAble) {
      this.updateTask();
    } else {
      this.addTask();
    }
  }
  get isEdited(): boolean {
    return this.taskService.isEdited;
  }
}
