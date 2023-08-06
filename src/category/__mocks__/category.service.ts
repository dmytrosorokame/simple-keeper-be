import { categoryStub } from '../tests/stubs/category.stub';

export const CategoryService = jest.fn().mockReturnValue({
  getAllByUserId: jest.fn().mockReturnValue([categoryStub()]),
  create: jest.fn().mockReturnValue(categoryStub()),
  delete: jest.fn().mockReturnValue(categoryStub()),
});
