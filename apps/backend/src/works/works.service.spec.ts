import { WorksService } from './works.service';

type QueryMock = jest.Mock<Promise<{ rows: any[] }>, [string, any[]]>;

const mockDatabaseService = () => ({
  query: jest.fn() as QueryMock
});

describe('WorksService', () => {
  let service: WorksService;
  let db: ReturnType<typeof mockDatabaseService>;

  beforeEach(() => {
    db = mockDatabaseService();
    service = new WorksService(db as any);
  });

  it('should return all works when no search is provided', async () => {
    db.query.mockResolvedValueOnce({ rows: [{ id: '1', title: 'Título A', author: 'Autor A', isbn: '123', publisher: 'Editora A', year: 2024 }] });

    const result = await service.findAll();

    expect(db.query).toHaveBeenCalledWith('SELECT id, isbn, title, author, publisher, year FROM obras ORDER BY title');
    expect(result.rows).toHaveLength(1);
  });

  it('should search by title, author or ISBN', async () => {
    db.query.mockResolvedValueOnce({ rows: [{ id: '2', title: 'Design de Sistemas', author: 'Fernanda', isbn: '456', publisher: 'Editora B', year: 2023 }] });

    const result = await service.findAll('design');

    expect(db.query).toHaveBeenCalledWith(
      `SELECT id, isbn, title, author, publisher, year FROM obras WHERE LOWER(title) LIKE $1 OR LOWER(author) LIKE $1 OR isbn LIKE $1 ORDER BY title`,
      ['%design%']
    );
    expect(result.rows[0].title).toContain('Design');
  });

  it('should create a work record', async () => {
    db.query.mockResolvedValueOnce({ rows: [{ id: '3', isbn: '789', title: 'Novo Livro', author: 'Novo Autor', publisher: 'Nova Editora', year: 2025 }] });

    const payload = { isbn: '789', title: 'Novo Livro', author: 'Novo Autor', publisher: 'Nova Editora', year: 2025 };
    const result = await service.create(payload);

    expect(db.query).toHaveBeenCalledWith(
      'INSERT INTO obras (isbn, title, author, publisher, year) VALUES ($1, $2, $3, $4, $5) RETURNING id, isbn, title, author, publisher, year',
      [payload.isbn, payload.title, payload.author, payload.publisher, payload.year]
    );
    expect(result).toEqual({ id: '3', ...payload });
  });
});
