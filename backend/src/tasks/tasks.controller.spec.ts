import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

const mockTasksService = {
	createTask: jest.fn(),
	listTasks: jest.fn(),
	findTaskById: jest.fn(),
	updateTask: jest.fn(),
	deleteTask: jest.fn(),
};

const mockTask = {
	id: 1,
	title: 'Test Task from Controller',
	isCompleted: false,
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe('TasksController', () => {
	let controller: TasksController;
	let service: typeof mockTasksService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TasksController],
			providers: [
				{
					provide: TasksService,
					useValue: mockTasksService,
				},
			],
		}).compile();

		controller = module.get<TasksController>(TasksController);
		service = module.get(TasksService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('createTask', () => {
		it('should call service.createTask with the correct DTO and return a new task', async () => {
			const createTaskDto: CreateTaskDto = { title: 'A new task' };
			service.createTask.mockResolvedValue(mockTask);

			const result = await controller.createTask(createTaskDto);

			expect(service.createTask).toHaveBeenCalledWith(createTaskDto);
			expect(result).toEqual(mockTask);
		});
	});

	describe('listTasks', () => {
		it('should call service.listTasks and return an array of tasks', async () => {
			service.listTasks.mockResolvedValue([mockTask]);

			const result = await controller.listTasks();

			expect(service.listTasks).toHaveBeenCalled();
			expect(result).toEqual([mockTask]);
		});
	});

	describe('findTaskById', () => {
		it('should call service.findTaskById with the correct id and return a task', async () => {
			service.findTaskById.mockResolvedValue(mockTask);
			const id = 1;

			const result = await controller.findTaskById(id);

			expect(service.findTaskById).toHaveBeenCalledWith(id);
			expect(result).toEqual(mockTask);
		});
	});

	describe('updateTask', () => {
		it('should call service.updateTask with correct arguments and return the updated task', async () => {
			const updateTaskDto: UpdateTaskDto = { isCompleted: true };
			const updatedTask = { ...mockTask, ...updateTaskDto };
			service.updateTask.mockResolvedValue(updatedTask);
			const id = 1;

			const result = await controller.updateTask(id, updateTaskDto);

			expect(service.updateTask).toHaveBeenCalledWith(id, updateTaskDto);
			expect(result).toEqual(updatedTask);
		});
	});

	describe('deleteTask', () => {
		it('should call service.deleteTask with the correct id', async () => {
			service.deleteTask.mockResolvedValue(mockTask);
			const id = 1;

			await controller.deleteTask(id);

			expect(service.deleteTask).toHaveBeenCalledWith(id);
		});
	});
});
