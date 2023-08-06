import { Category } from '@prisma/client';

export const categoryStub = (): Category => ({
  id: 1,
  name: 'Test',
  userId: 1,
});
