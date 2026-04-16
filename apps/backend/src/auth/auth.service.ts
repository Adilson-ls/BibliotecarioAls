import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(profile: any) {
    if (!profile || !profile.nameID) {
      return null;
    }

    const user = await this.usersService.findBySamlId(profile.nameID);
    if (user) {
      return user;
    }

    return this.usersService.createFromSamlProfile(profile);
  }
}
