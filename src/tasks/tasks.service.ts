import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task: Task) => task.id === id);
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task: Task) => task.id !== id);
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    const existingTaskIndex = this.tasks.findIndex((task) => task.id === id);

    const updatedTask = { ...this.tasks[existingTaskIndex], ...updateTaskDto };
    this.tasks[existingTaskIndex] = updatedTask;

    return updatedTask;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
