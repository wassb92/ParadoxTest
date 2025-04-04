import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Titre du cours',
    example: 'Ceci est le titre du cours',
  })
  title: string;

  @ApiProperty({
    description: 'Description du cours',
    example: 'Ceci est la description du cours.',
  })
  description: string;

  @ApiProperty({
    description: 'URL de la vidéo du cours',
    example:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  })
  videoUrl: string;

  @ApiProperty({ description: 'Progression du cours', example: 0, default: 0 })
  progress: number;
}
