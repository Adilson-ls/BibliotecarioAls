import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

export interface UserRecord {
  id: string;
  saml_id: string;
  name: string;
  email: string;
  is_anonymized: boolean;
}

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findBySamlId(samlId: string): Promise<UserRecord | null> {
    const result = await this.databaseService.query<UserRecord>(
      'SELECT id, saml_id, name, email, is_anonymized FROM usuarios WHERE saml_id = $1 LIMIT 1',
      [samlId]
    );

    return result.rows[0] ?? null;
  }

  async createFromSamlProfile(profile: any): Promise<UserRecord> {
    const name = profile['displayName'] || profile['cn'] || 'Usuário SAML';
    const email = profile['email'] || profile['mail'] || '';

    const result = await this.databaseService.query<UserRecord>(
      'INSERT INTO usuarios (saml_id, name, email, is_anonymized) VALUES ($1, $2, $3, FALSE) RETURNING id, saml_id, name, email, is_anonymized',
      [profile.nameID, name, email]
    );

    return result.rows[0];
  }
}
