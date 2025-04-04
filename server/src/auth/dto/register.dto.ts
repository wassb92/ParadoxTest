import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: "Adresse email de l'utilisateur" })
  email: string;

  @ApiProperty({ description: "Mot de passe de l'utilisateur" })
  password: string;

  @ApiProperty({ description: "Prénom de l'utilisateur" })
  firstName: string;

  @ApiProperty({ description: "Nom de famille de l'utilisateur" })
  lastName: string;
}
