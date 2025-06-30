import {
	IsBoolean,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateTaskDto {
	@IsString({ message: 'O titulo deve ser uma string' })
	@IsNotEmpty({ message: 'O titulo é obrigatório' })
	@MaxLength(100, { message: 'O titulo deve ter no máximo 100 caracteres' })
	readonly title: string;

	@IsBoolean({ message: 'O status deve ser um booleano' })
	@IsOptional()
	readonly isCompleted?: boolean;
}
