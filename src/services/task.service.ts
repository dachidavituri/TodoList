import { Injectable } from '@angular/core';
import { Task } from '../models/tasks';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  enviromentUrl = 'https://localhost:7067/api';
  url = 'Task';
  isEdited: boolean = false;
  isUpdateAble = false;
  selectedTask: Task | null = null;
  constructor(private http: HttpClient) {}
  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.enviromentUrl}/${this.url}`);
  }
  public createTask(task: Task): Observable<Task[]> {
    return this.http.post<Task[]>(`${this.enviromentUrl}/${this.url}`, task);
  }
  public deleteTask(task: Task): Observable<Task[]> {
    return this.http.delete<Task[]>(
      `${this.enviromentUrl}/${this.url}/${task.id}`
    );
  }
  public updateTask(task: Task): Observable<Task[]> {
    this.isUpdateAble = false;
    return this.http.put<Task[]>(
      `${this.enviromentUrl}/${this.url}/${task.id}`,
      task
    );
  }
}
