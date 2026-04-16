import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-saml';
import { AuthService } from './auth.service';

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy, 'saml') {
  constructor(private readonly authService: AuthService) {
    super({
      path: process.env.SAML_CALLBACK_URL || '/auth/saml/callback',
      entryPoint: process.env.SAML_ENTRY_POINT || '',
      issuer: process.env.SAML_ISSUER || 'bibliotecario-als',
      cert: process.env.SAML_CERT || '',
      decryptionPvk: process.env.SAML_PRIVATE_KEY || undefined,
      callbackUrl: process.env.SAML_CALLBACK_URL || 'http://localhost:3333/auth/saml/callback',
      authnContext: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport'
    });
  }

  async validate(profile: Profile) {
    return this.authService.validateUser(profile);
  }
}
