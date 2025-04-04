import {
  Controller,
  Delete,
  Param,
  UseGuards,
  Req,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: { user: { id: number } }) {
    const user = await this.usersService.findById(Number(req.user.id));
    if (!user) {
      throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id') id: number,
    @Req() req: { user: { id: number } },
  ) {
    if (req.user.id !== Number(id)) {
      throw new HttpException('Non autorisé', HttpStatus.UNAUTHORIZED);
    }
    await this.usersService.remove(id);
    return { message: 'Utilisateur supprimé avec succès' };
  }
}
