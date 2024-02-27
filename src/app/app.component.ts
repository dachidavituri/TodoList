import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Task } from '../models/tasks';
import { TaskService } from '../services/task.service';
import { TaskListComponent } from '../Components/task-list/task-list.component';
import { AddTaskComponent } from '../Components/add-task/add-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TaskListComponent, AddTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TodoList';
  tasks: Task[] = [];
  taskName: string = '';
  selectedStatus: string = 'აირჩიეთ დავალების სტატუსი';
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((result: Task[]) => {
      this.tasks = result;
      console.log('Received tasks:', this.tasks);
    });
  }
  onTaskDelete(updatedTasks: Task[]) {
    this.tasks = updatedTasks;
  }
  handleTaskUpdated(updatedTasks: Task[]) {
    this.tasks = updatedTasks;
  }
  updateInputValues(task: Task): void {
    if (
      this.taskName == task.taskName &&
      this.selectedStatus == task.taskStatus
    ) {
      this.taskName = '';
      this.selectedStatus = 'აირჩიეთ დავალების სტატუსი';
    } else {
      this.taskName = task.taskName;
      this.selectedStatus = task.taskStatus;
    }
  }
}
