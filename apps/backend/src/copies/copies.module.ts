import { Module } from '@nestjs/common';
import { CopiesService } from './copies.service';
import { CopiesController } from './copies.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CopiesController],
  providers: [CopiesService],
  exports: [CopiesService]
})
export class CopiesModule {}
