import { Controller, Body } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { logindto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Teacher')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('local')
  @ApiBody({ description: 'Enter username and pasword', type: logindto })
  sininlocal(@Body() req: any) {
    return this.authService.siginlocal(req);
  }
}
