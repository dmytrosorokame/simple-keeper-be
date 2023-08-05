import { Test } from '@nestjs/testing';
import { createRequest } from 'node-mocks-http';

import { UserDto } from '../dto/user.dto';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

import { userStub } from './stubs/user.stub';

jest.mock('../user.service');

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('getMe', () => {
    describe('when getMe is called', () => {
      let user: UserDto;

      beforeEach(async () => {
        const req = createRequest();

        req.user = { sub: userStub().id };

        user = await userController.getMe(req);
      });

      test('then it should call userService', () => {
        expect(userService.findById).toBeCalledWith(userStub().id);
      });

      test('then it should return a user', () => {
        const newUser = userStub();

        delete newUser.password;
        delete newUser.refreshToken;

        expect(user).toEqual(newUser);
      });

      test("then password shouldn't return", () => {
        expect('password' in user).toBeFalsy();
      });

      test("then refreshToken shouldn't return", () => {
        expect('refreshToken' in user).toBeFalsy();
      });
    });
  });
});
