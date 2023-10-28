import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    return this.tasks.filter((task) => {
      if (status && task.status !== status) {
        return false;
      }

      if (
        search &&
        !task.title.toLowerCase().includes(search.toLocaleLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task: Task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with id ${id} is not found`);
    }

    return found;
  }

  deleteTask(id: string): void {
    const isExist: boolean = Boolean(this.getTaskById(id));
    if (isExist) {
      this.tasks = this.tasks.filter((task: Task) => task.id !== id);
    }
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    const existingTaskIndex = this.tasks.findIndex((task) => task.id === id);

    if (existingTaskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} is not found`);
    }

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
