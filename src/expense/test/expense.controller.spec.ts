import { Test } from '@nestjs/testing';
import { createRequest } from 'node-mocks-http';

import { CreateExpenseDto, Expense } from '../dto/expense.dto';
import { ExpenseController } from '../expense.controller';
import { ExpenseService } from '../expense.service';

import { expenseStub } from './stubs/expense.stub';

jest.mock('../expense.service');

describe('ExpenseController', () => {
  let expenseController: ExpenseController;
  let expenseService: ExpenseService;

  describe('when create is called', () => {
    let expense: Expense;
    let createExpenseDto: CreateExpenseDto;

    beforeEach(async () => {
      createExpenseDto = {
        amount: expenseStub().amount,
        categoryId: expenseStub().categoryId,
      };

      const req = createRequest();

      req.user = { sub: expenseStub().userId };

      expense = await expenseController.create(createExpenseDto, req);
    });

    test('then it should call expenseService', () => {
      expect(expenseService.create).toBeCalledWith({
        ...createExpenseDto,
        userId: expenseStub().userId,
      });
    });

    test('then it should return a expense', () => {
      expect(expense).toEqual(expenseStub());
    });

    test('then expense should relate to user', () => {
      expect(expense.userId).toEqual(expenseStub().userId);
    });
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [ExpenseController],
      providers: [ExpenseService],
    }).compile();

    expenseController = moduleRef.get<ExpenseController>(ExpenseController);
    expenseService = moduleRef.get<ExpenseService>(ExpenseService);
    jest.clearAllMocks();
  });

  describe('when getAllByUserId is called', () => {
    let expenses: Expense[];

    beforeEach(async () => {
      const req = createRequest();

      req.user = { sub: expenseStub().userId };

      expenses = await expenseController.getAllByUserId(req);
    });

    test('then it should call expenseService', () => {
      expect(expenseService.getAllByUserId).toBeCalledWith(
        expenseStub().userId,
      );
    });

    test('then it should return a array of expenses', () => {
      expect(expenses).toEqual([expenseStub()]);
    });

    test('then expenses should relate to user', () => {
      expect(expenses[0].userId).toEqual(expenseStub().userId);
    });
  });

  describe('when getById is called', () => {
    let expense: Expense;

    beforeEach(async () => {
      const req = createRequest();

      req.user = { sub: expenseStub().userId };

      expense = await expenseController.getById(expenseStub().id, req);
    });

    test('then it should call expenseService', () => {
      expect(expenseService.getById).toBeCalledWith(
        expenseStub().id,
        expenseStub().userId,
      );
    });

    test('then it should return a expense', () => {
      expect(expense).toEqual(expenseStub());
    });

    test('then expense should relate to user', () => {
      expect(expense.userId).toEqual(expenseStub().userId);
    });
  });

  describe('when delete is called', () => {
    let expense: Expense;

    beforeEach(async () => {
      const req = createRequest();

      req.user = { sub: expenseStub().userId };

      expense = await expenseController.delete(expenseStub().id, req);
    });

    test('then it should call expenseService', () => {
      expect(expenseService.delete).toBeCalledWith(
        expenseStub().id,
        expenseStub().userId,
      );
    });

    test('then it should return a deleted expense', () => {
      expect(expense).toEqual(expenseStub());
    });

    test('then deleted expense should relate to user', () => {
      expect(expense.userId).toEqual(expenseStub().userId);
    });
  });
});
