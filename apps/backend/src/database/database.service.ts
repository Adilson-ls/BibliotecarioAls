import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { createPool, Pool } from '@neondatabase/serverless';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL não está configurada. Defina no .env ou no ambiente.');
    }

    this.pool = createPool({
      connectionString,
      ssl: { rejectUnauthorized: false }
    });
  }

  async query<T = any>(text: string, params: unknown[] = []) {
    return this.pool.query<T>(text, params);
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
