import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import {
	NotFoundException,
	InternalServerErrorException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

const mockPrismaService = {
	task: {
		create: jest.fn(),
		findMany: jest.fn(),
		findUnique: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	},
};

const mockTask = {
	id: 1,
	title: 'Test Task',
	isCompleted: false,
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe('TasksService', () => {
	let service: TasksService;
	let prisma: typeof mockPrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TasksService,
				{
					provide: PrismaService,
					useValue: mockPrismaService,
				},
			],
		}).compile();

		service = module.get<TasksService>(TasksService);
		prisma = module.get(PrismaService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('createTask', () => {
		it('should create and return a task', async () => {
			const dto: CreateTaskDto = { title: 'New Task' };

			prisma.task.create.mockResolvedValue(mockTask);

			const result = await service.createTask(dto);

			expect(result).toEqual(mockTask);
			expect(prisma.task.create).toHaveBeenCalledWith({ data: dto });
			expect(prisma.task.create).toHaveBeenCalledTimes(1);
		});

		it('should throw an InternalServerErrorException if prisma fails', async () => {
			const dto: CreateTaskDto = { title: 'New Task' };
			prisma.task.create.mockRejectedValue(new Error());

			await expect(service.createTask(dto)).rejects.toThrow(
				InternalServerErrorException
			);
		});
	});

	describe('listTasks', () => {
		it('should return an array of tasks', async () => {
			prisma.task.findMany.mockResolvedValue([mockTask]);

			const result = await service.listTasks();

			expect(result).toEqual([mockTask]);
			expect(prisma.task.findMany).toHaveBeenCalledTimes(1);
		});

		it('should throw an InternalServerErrorException if prisma fails', async () => {
			prisma.task.findMany.mockRejectedValue(new Error());

			await expect(service.listTasks()).rejects.toThrow(
				InternalServerErrorException
			);
		});
	});

	describe('findTaskById', () => {
		it('should find and return a task by ID', async () => {
			prisma.task.findUnique.mockResolvedValue(mockTask);

			const result = await service.findTaskById(1);

			expect(result).toEqual(mockTask);
			expect(prisma.task.findUnique).toHaveBeenCalledWith({
				where: { id: 1 },
				select: { id: true, title: true, isCompleted: true },
			});
			expect(prisma.task.findUnique).toHaveBeenCalledTimes(1);
		});

		it('should throw a NotFoundException if task is not found', async () => {
			prisma.task.findUnique.mockResolvedValue(null);

			await expect(service.findTaskById(99)).rejects.toThrow(NotFoundException);
		});
	});

	describe('updateTask', () => {
		it('should update and return a task', async () => {
			const dto: UpdateTaskDto = { title: 'Updated Title' };
			const updatedTask = { ...mockTask, ...dto };

			prisma.task.findUnique.mockResolvedValue(mockTask);
			prisma.task.update.mockResolvedValue(updatedTask);

			const result = await service.updateTask(1, dto);

			expect(result).toEqual(updatedTask);
			expect(prisma.task.update).toHaveBeenCalledWith({
				where: { id: 1 },
				data: { ...dto },
			});
		});

		it('should throw InternalServerErrorException if task to update is not found', async () => {
			prisma.task.findUnique.mockResolvedValue(null);

			await expect(service.updateTask(99, {})).rejects.toThrow(
				InternalServerErrorException
			);
		});
	});

	describe('deleteTask', () => {
		it('should delete a task and return it', async () => {
			prisma.task.findUnique.mockResolvedValue(mockTask);
			prisma.task.delete.mockResolvedValue(mockTask);

			const result = await service.deleteTask(1);

			expect(result).toEqual(mockTask);
			expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: 1 } });
			expect(prisma.task.delete).toHaveBeenCalledTimes(1);
		});

		it('should throw InternalServerErrorException if task to delete is not found', async () => {
			prisma.task.findUnique.mockResolvedValue(null);

			await expect(service.deleteTask(99)).rejects.toThrow(
				InternalServerErrorException
			);
		});
	});
});
