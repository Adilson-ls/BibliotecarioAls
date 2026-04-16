import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SamlStrategy } from './saml.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PassportModule.register({ session: false }), UsersModule],
  providers: [AuthService, SamlStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
