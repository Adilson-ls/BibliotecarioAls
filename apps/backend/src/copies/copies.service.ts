import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

export interface CopyRecord {
  id: string;
  obra_id: string;
  barcode: string;
  physical_state: string;
  status: string;
}

@Injectable()
export class CopiesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(obraId?: string) {
    if (!obraId) {
      return this.databaseService.query<CopyRecord>(
        'SELECT id, obra_id, barcode, physical_state, status FROM exemplares ORDER BY barcode'
      );
    }

    return this.databaseService.query<CopyRecord>(
      'SELECT id, obra_id, barcode, physical_state, status FROM exemplares WHERE obra_id = $1 ORDER BY barcode',
      [obraId]
    );
  }

  async findById(id: string) {
    const result = await this.databaseService.query<CopyRecord>(
      'SELECT id, obra_id, barcode, physical_state, status FROM exemplares WHERE id = $1 LIMIT 1',
      [id]
    );
    return result.rows[0] ?? null;
  }

  async create(payload: Partial<CopyRecord>) {
    const result = await this.databaseService.query<CopyRecord>(
      'INSERT INTO exemplares (obra_id, barcode, physical_state, status) VALUES ($1, $2, $3, $4) RETURNING id, obra_id, barcode, physical_state, status',
      [payload.obra_id, payload.barcode, payload.physical_state || 'new', payload.status || 'available']
    );
    return result.rows[0];
  }

  async update(id: string, payload: Partial<CopyRecord>) {
    const result = await this.databaseService.query<CopyRecord>(
      `UPDATE exemplares SET obra_id = COALESCE($1, obra_id), barcode = COALESCE($2, barcode), physical_state = COALESCE($3, physical_state), status = COALESCE($4, status) WHERE id = $5 RETURNING id, obra_id, barcode, physical_state, status`,
      [payload.obra_id, payload.barcode, payload.physical_state, payload.status, id]
    );
    return result.rows[0] ?? null;
  }

  async delete(id: string) {
    await this.databaseService.query('DELETE FROM exemplares WHERE id = $1', [id]);
    return { deleted: true };
  }
}
