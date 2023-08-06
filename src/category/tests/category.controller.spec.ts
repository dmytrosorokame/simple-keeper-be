import { Test } from '@nestjs/testing';
import { createRequest } from 'node-mocks-http';

import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { Category } from '../dto/category.dto';

import { categoryStub } from './stubs/category.stub';

jest.mock('../category.service');

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [CategoryController],
      providers: [CategoryService],
    }).compile();

    categoryController = moduleRef.get<CategoryController>(CategoryController);
    categoryService = moduleRef.get<CategoryService>(CategoryService);
    jest.clearAllMocks();
  });

  describe('getAllByUserId', () => {
    describe('when getAllByUserId is called', () => {
      let categories: Category[];

      beforeEach(async () => {
        const req = createRequest();

        req.user = { sub: categoryStub().userId };

        categories = await categoryController.getAllByUserId(req);
      });

      test('then it should call userService', () => {
        expect(categoryService.getAllByUserId).toBeCalledWith(
          categoryStub().userId,
        );
      });

      test('then it should return a array of categories', () => {
        expect(categories).toEqual([categoryStub()]);
      });

      test('then categories should relate to user', () => {
        expect(categories[0].userId).toEqual(categoryStub().userId);
      });
    });
  });
});
