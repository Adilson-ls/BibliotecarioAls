import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

export interface LoanRecord {
  id: string;
  usuario_id: string;
  exemplar_id: string;
  loaned_at: string;
  due_at: string | null;
  returned_at: string | null;
}

@Injectable()
export class LoansService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(activeOnly?: boolean) {
    if (activeOnly) {
      return this.databaseService.query<LoanRecord>(
        'SELECT id, usuario_id, exemplar_id, loaned_at, due_at, returned_at FROM emprestimos WHERE returned_at IS NULL ORDER BY loaned_at DESC'
      );
    }

    return this.databaseService.query<LoanRecord>(
      'SELECT id, usuario_id, exemplar_id, loaned_at, due_at, returned_at FROM emprestimos ORDER BY loaned_at DESC'
    );
  }

  async findById(id: string) {
    const result = await this.databaseService.query<LoanRecord>(
      'SELECT id, usuario_id, exemplar_id, loaned_at, due_at, returned_at FROM emprestimos WHERE id = $1 LIMIT 1',
      [id]
    );
    return result.rows[0] ?? null;
  }

  async findByUser(usuarioId: string) {
    return this.databaseService.query<LoanRecord>(
      'SELECT id, usuario_id, exemplar_id, loaned_at, due_at, returned_at FROM emprestimos WHERE usuario_id = $1 ORDER BY loaned_at DESC',
      [usuarioId]
    );
  }

  async checkout(usuarioId: string, exemplarId: string) {
    const loanResult = await this.databaseService.query<LoanRecord>(
      `INSERT INTO emprestimos (usuario_id, exemplar_id, loaned_at, due_at) VALUES ($1, $2, NOW(), NOW() + INTERVAL '14 days') RETURNING id, usuario_id, exemplar_id, loaned_at, due_at, returned_at`,
      [usuarioId, exemplarId]
    );

    await this.databaseService.query('UPDATE exemplares SET status = $1 WHERE id = $2', ['loaned', exemplarId]);
    return loanResult.rows[0];
  }

  async returnLoan(exemplarId: string) {
    const result = await this.databaseService.query<LoanRecord>(
      'UPDATE emprestimos SET returned_at = NOW() WHERE exemplar_id = $1 AND returned_at IS NULL RETURNING id, usuario_id, exemplar_id, loaned_at, due_at, returned_at',
      [exemplarId]
    );

    if (result.rows.length > 0) {
      await this.databaseService.query('UPDATE exemplares SET status = $1 WHERE id = $2', ['available', exemplarId]);
      return result.rows[0];
    }

    return null;
  }
}
