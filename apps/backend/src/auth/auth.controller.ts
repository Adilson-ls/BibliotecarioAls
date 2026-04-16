import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('saml')
  @UseGuards(AuthGuard('saml'))
  samlLogin() {
    return {
      message: 'Redirecting to IdP for SAML login...'
    };
  }

  @Get('saml/callback')
  @UseGuards(AuthGuard('saml'))
  samlCallback(@Req() req: any) {
    return {
      success: true,
      user: req.user
    };
  }
}
