import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('findByEmail', () => {
    it('should return user when a user with the given email exists', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        password: 'hashed_password',
        refreshToken: null,
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const email = 'test@example.com';
      const result = await userService.findByEmail(email);

      expect(result).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });

    it('should return null when a user with the given email does not exist', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const email = 'nonexistent@example.com';
      const result = await userService.findByEmail(email);

      expect(result).toBeNull();
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });

  describe('findById', () => {
    it('should return user when a user with the given ID exists', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        password: 'hashed_password',
        refreshToken: null,
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const id = 1;
      const result = await userService.findById(id);

      expect(result).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should return null when a user with the given ID does not exist', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const id = 100;
      const result = await userService.findById(id);

      expect(result).toBeNull();
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        password: 'hashed_password',
        refreshToken: null,
      };

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

      const email = 'test@example.com';
      const password = 'password123';
      const result = await userService.create(email, password);

      expect(result).toEqual(mockUser);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: { email, password },
      });
    });
  });

  describe('update', () => {
    it('should update a user with the given ID and data', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        password: 'hashed_password',
        refreshToken: null,
      };

      jest.spyOn(prismaService.user, 'update').mockResolvedValue(mockUser);

      const id = 1;
      const updatedData = { email: 'updated@example.com' };
      const result = await userService.update(id, updatedData);

      expect(result).toEqual(mockUser);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id },
        data: updatedData,
      });
    });
  });
});
