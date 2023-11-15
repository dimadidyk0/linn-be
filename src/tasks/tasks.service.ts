import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task with id ${id} is not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   return this.tasks.filter((task) => {
  //     if (status && task.status !== status) {
  //       return false;
  //     }
  //     if (
  //       search &&
  //       !task.title.toLowerCase().includes(search.toLocaleLowerCase())
  //     ) {
  //       return false;
  //     }
  //     return true;
  //   });
  // }
  // deleteTask(id: string): void {
  //   const isExist: boolean = Boolean(this.getTaskById(id));
  //   if (isExist) {
  //     this.tasks = this.tasks.filter((task: Task) => task.id !== id);
  //   }
  // }
  // updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
  //   const existingTaskIndex = this.tasks.findIndex((task) => task.id === id);
  //   if (existingTaskIndex === -1) {
  //     throw new NotFoundException(`Task with id ${id} is not found`);
  //   }
  //   const updatedTask = { ...this.tasks[existingTaskIndex], ...updateTaskDto };
  //   this.tasks[existingTaskIndex] = updatedTask;
  //   return updatedTask;
  // }
}
