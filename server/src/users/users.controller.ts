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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({
    summary: 'Récupérer les informations de l’utilisateur connecté',
  })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé', type: User })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async getMe(@Req() req: { user: { id: number } }): Promise<User> {
    const user = await this.usersService.findById(Number(req.user.id));
    if (!user) {
      throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: 'Supprimer le compte de l’utilisateur (auto-suppression)',
  })
  @ApiResponse({ status: 200, description: 'Utilisateur supprimé avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
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
