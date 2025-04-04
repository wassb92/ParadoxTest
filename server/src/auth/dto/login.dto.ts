import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: "Adresse email de l'utilisateur" })
  email: string;

  @ApiProperty({ description: "Mot de passe de l'utilisateur" })
  password: string;
}
