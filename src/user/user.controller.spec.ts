import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMe', () => {
    it('should return the user without password and refreshToken', async () => {
      const mockUserId = 1;
      const mockUser = {
        id: mockUserId,
        email: 'test@example.com',
        password: 'hashed_password',
        refreshToken: 'some_refresh_token',
      };

      jest.spyOn(userService, 'findById').mockResolvedValue(mockUser);

      // Mock the request object
      const mockRequest = {
        user: { sub: mockUserId },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await controller.getMe(mockRequest as any);

      expect(result.id).toEqual(mockUser.id);
      expect(result.email).toEqual(mockUser.email);
      expect('password' in result).toBeFalsy();
      expect('refreshToken' in result).toBeFalsy();
      expect(userService.findById).toHaveBeenCalledWith(mockUserId);
    });
  });
});
