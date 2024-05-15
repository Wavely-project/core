import { vi } from 'vitest';

export const mockedTxn: any = {
	commit: vi.fn(),
	rollback: vi.fn(),
	select: vi.fn().mockReturnThis(),
	from: vi.fn().mockReturnThis(),
	where: vi.fn().mockReturnThis(),
	whereIn: vi.fn().mockReturnThis(),
	insert: vi.fn().mockReturnThis(),
	into: vi.fn().mockReturnThis(),
	first: vi.fn(),
	delete: vi.fn().mockReturnThis(),
	update: vi.fn().mockReturnThis(),
	andWhere: vi.fn().mockReturnThis(),
};
