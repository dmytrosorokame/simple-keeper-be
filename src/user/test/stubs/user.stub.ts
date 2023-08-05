import { User } from '@prisma/client';

export const userStub = (): User => ({
  id: 123,
  email: 'test@example.com',
  password: 'password',
  refreshToken: 'token',
});
