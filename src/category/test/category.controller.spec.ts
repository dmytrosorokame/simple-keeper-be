import { Test } from '@nestjs/testing';
import { createRequest } from 'node-mocks-http';

import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { Category, CreateCategoryDto } from '../dto/category.dto';

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

  describe('create', () => {
    describe('when create is called', () => {
      let category: Category;
      let createCategoryDto: CreateCategoryDto;

      beforeEach(async () => {
        createCategoryDto = {
          name: categoryStub().name,
        };

        const req = createRequest();

        req.user = { sub: categoryStub().userId };

        category = await categoryController.create(createCategoryDto, req);
      });

      test('then it should call categoryService', () => {
        expect(categoryService.create).toBeCalledWith(
          createCategoryDto.name,
          categoryStub().userId,
        );
      });

      test('then it should return a category', () => {
        expect(category).toEqual(categoryStub());
      });

      test('then category should relate to user', () => {
        expect(category.userId).toEqual(categoryStub().userId);
      });
    });
  });

  describe('delete', () => {
    describe('when delete is called', () => {
      let category: Category;

      beforeEach(async () => {
        const req = createRequest();

        req.user = { sub: categoryStub().userId };

        category = await categoryController.delete(categoryStub().id, req);
      });

      test('then it should call categoryService', () => {
        expect(categoryService.delete).toBeCalledWith(
          categoryStub().id,
          categoryStub().userId,
        );
      });

      test('then it should return a category', () => {
        expect(category).toEqual(categoryStub());
      });

      test('then category should relate to user', () => {
        expect(category.userId).toEqual(categoryStub().userId);
      });
    });
  });
});
