import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodosService {

  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.TodoCreateInput ) {
    return this.prismaService.todo.create({
      data
    })
  }

  findAll() {
    return this.prismaService.todo.findMany()
  }

  findOne(id: string) {
    return this.prismaService.todo.findUnique({
      where: {id}
    })
  }

  update(updateTodoInput: UpdateTodoInput) {
    return this.prismaService.todo.update({
      where: {id: updateTodoInput.id},
      data: {
        taskDescription: updateTodoInput.taskDescription,
        taskName: updateTodoInput.taskName,
        taskSchedule: updateTodoInput.taskSchedule,
        isDone: updateTodoInput.isDone
      }
    })
  }

  remove(id: string) {
    return this.prismaService.todo.delete({
      where: {id}
    })
  }
}
