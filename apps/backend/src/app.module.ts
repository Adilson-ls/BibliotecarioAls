import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { WorksModule } from './works/works.module';
import { CopiesModule } from './copies/copies.module';
import { LoansModule } from './loans/loans.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, UsersModule, WorksModule, CopiesModule, LoansModule],
  controllers: [],
  providers: []
})
export class AppModule {}
