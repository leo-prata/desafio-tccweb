import {
	Body,
	Controller,
	Get,
	Post,
	Delete,
	Param,
	Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Post()
	async createTask(@Body() createTaskDto: CreateTaskDto) {
		return this.tasksService.createTask(createTaskDto);
	}

	@Get()
	async listTasks() {
		return this.tasksService.listTasks();
	}

	@Get(':id')
	async findTaskById(@Param('id') id: number) {
		return this.tasksService.findTaskById(Number(id));
	}

	@Patch(':id')
	async updateTask(
		@Param('id') id: number,
		@Body() updateTaskDto: UpdateTaskDto
	) {
		return this.tasksService.updateTask(Number(id), updateTaskDto);
	}

	@Delete(':id')
	async deleteTask(@Param('id') id: number) {
		return this.tasksService.deleteTask(Number(id));
	}
}
