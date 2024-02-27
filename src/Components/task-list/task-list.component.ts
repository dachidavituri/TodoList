import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Task } from '../../models/tasks';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnChanges {
  @Input() tasks?: Task[];
  @Output() taskDelete = new EventEmitter<Task[]>();
  continueTasks: Task[] = [];
  completedTasks: Task[] = [];
  @Output() taskClicked: EventEmitter<Task> = new EventEmitter<Task>();
  constructor(private taskService: TaskService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.tasks) {
      this.continueTasks = [];
      this.completedTasks = [];
      this.tasks.forEach((task) => {
        if (task.taskStatus === 'მიმდინარე') {
          this.continueTasks.push(task);
        } else if (task.taskStatus === 'დასრულებული') {
          this.completedTasks.push(task);
        }
      });
    }
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe((updatedTasks: Task[]) => this.taskDelete.emit(updatedTasks));
  }
  updateTask(task: Task) {
    console.log(task.taskName);
    console.log(task.taskStatus);
    this.taskService.isUpdateAble = true;
    this.taskClicked.emit(task);
    if (this.taskService.selectedTask == task) {
      this.taskService.selectedTask = null;
      this.taskService.isEdited = false;
    } else {
      this.taskService.selectedTask = task;
      this.taskService.isEdited = true;
    }
  }
  get selectedTask(): Task | null {
    return this.taskService.selectedTask;
  }
}
