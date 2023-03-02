import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { logindto } from './dto/login.dto';
// eslint-disable-next-line
import * as teachers from './teacherdata.json';
@Injectable()
export class AuthService {
  constructor(private readonly jwtservice: JwtService) {}

  siginlocal(@Body() dto: logindto) {
    //check for email exists or not
    const teacher = teachers.find((teacher) => {
      return teacher.username === dto.username;
    });
    if (!teacher) {
      throw new UnauthorizedException('Credentials failed ');
    }
    if (teacher.password != dto.password) {
      throw new UnauthorizedException('Invalid password ');
    }
    return this.signUser(dto.username, dto.password);
  }
  //==================================================================//

  signUser(username: string, password: string) {
    return this.jwtservice.sign({
      username: username,
      password: password,
    });
  }
}
