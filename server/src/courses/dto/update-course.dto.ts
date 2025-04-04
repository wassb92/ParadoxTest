import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCourseDto {
  @ApiPropertyOptional({ description: 'Progression du cours (en pourcentage)' })
  readonly progress?: number;
}
