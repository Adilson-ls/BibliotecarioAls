import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

export interface WorkRecord {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher?: string;
  year?: number;
}

@Injectable()
export class WorksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(search?: string) {
    if (!search) {
      return this.databaseService.query<WorkRecord>('SELECT id, isbn, title, author, publisher, year FROM obras ORDER BY title');
    }

    const normalized = `%${search.trim().toLowerCase()}%`;
    return this.databaseService.query<WorkRecord>(
      `SELECT id, isbn, title, author, publisher, year FROM obras WHERE LOWER(title) LIKE $1 OR LOWER(author) LIKE $1 OR isbn LIKE $1 ORDER BY title`,
      [normalized]
    );
  }

  async findById(id: string) {
    const result = await this.databaseService.query<WorkRecord>(
      'SELECT id, isbn, title, author, publisher, year FROM obras WHERE id = $1 LIMIT 1',
      [id]
    );
    return result.rows[0] ?? null;
  }

  async create(payload: Partial<WorkRecord>) {
    const result = await this.databaseService.query<WorkRecord>(
      'INSERT INTO obras (isbn, title, author, publisher, year) VALUES ($1, $2, $3, $4, $5) RETURNING id, isbn, title, author, publisher, year',
      [payload.isbn, payload.title, payload.author, payload.publisher || null, payload.year || null]
    );
    return result.rows[0];
  }

  async update(id: string, payload: Partial<WorkRecord>) {
    const result = await this.databaseService.query<WorkRecord>(
      `UPDATE obras SET isbn = COALESCE($1, isbn), title = COALESCE($2, title), author = COALESCE($3, author), publisher = COALESCE($4, publisher), year = COALESCE($5, year) WHERE id = $6 RETURNING id, isbn, title, author, publisher, year`,
      [payload.isbn, payload.title, payload.author, payload.publisher || null, payload.year || null, id]
    );
    return result.rows[0] ?? null;
  }

  async delete(id: string) {
    await this.databaseService.query('DELETE FROM obras WHERE id = $1', [id]);
    return { deleted: true };
  }
}
