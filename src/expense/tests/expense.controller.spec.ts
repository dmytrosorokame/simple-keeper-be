import { Test } from '@nestjs/testing';
import { createRequest } from 'node-mocks-http';

import { Expense } from '../dto/expense.dto';
import { ExpenseController } from '../expense.controller';
import { ExpenseService } from '../expense.service';

import { expenseStub } from './stubs/expense.stub';

jest.mock('../expense.service');

describe('ExpenseController', () => {
  let expenseController: ExpenseController;
  let expenseService: ExpenseService;

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
});
