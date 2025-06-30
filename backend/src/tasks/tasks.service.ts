import {
	Injectable,
	NotFoundException,
	InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

interface TaskRequest {
	title: string;
	isCompleted?: boolean;
}

@Injectable()
export class TasksService {
	constructor(private readonly prisma: PrismaService) {}

	async createTask(createTaskDto: CreateTaskDto) {
		try {
			return await this.prisma.task.create({
				data: createTaskDto,
			});
		} catch (error) {
			throw new InternalServerErrorException('Erro ao criar a tarefa');
		}
	}

	async listTasks() {
		try {
			return await this.prisma.task.findMany({
				select: {
					id: true,
					title: true,
					isCompleted: true,
				},
			});
		} catch (error) {
			throw new InternalServerErrorException('Erro ao listar as tarefas');
		}
	}

	async findTaskById(id: number) {
		const task = await this.prisma.task.findUnique({
			where: { id },
			select: {
				id: true,
				title: true,
				isCompleted: true,
			},
		});

		if (!task) {
			throw new NotFoundException('Tarefa não encontrada');
		}

		return task;
	}

	async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
		try {
			const taskExists = await this.findTaskById(id);
			if (!taskExists) {
				throw new NotFoundException('Tarefa não encontrada');
			}
			return await this.prisma.task.update({
				where: { id },
				data: {
					...updateTaskDto,
				},
			});
		} catch (error) {
			throw new InternalServerErrorException('Erro ao atualizar a tarefa');
		}
	}

	async deleteTask(id: number) {
		try {
			const taskExists = await this.findTaskById(id);
			if (!taskExists) {
				throw new NotFoundException('Tarefa não encontrada');
			}
			return await this.prisma.task.delete({
				where: { id },
			});
		} catch (error) {
			throw new InternalServerErrorException('Erro ao deletar a tarefa');
		}
	}
}
