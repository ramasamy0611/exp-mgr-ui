import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { ExpenseNameEnum } from './expenseNameEnum';
import { ExpenseCategoryEnum } from './expense/expenseCategoryEnum';
import { TransactionTypeEnum } from './transactionTypeEnum';
import { TransactionSourceEnum } from './transactionSourceEnum';

export interface ExpenseData {
  transactionDate: Date;

  openingBalance: number;

  expenseName: ExpenseNameEnum;

  expenseCategory: ExpenseCategoryEnum;

  transactionType: TransactionTypeEnum;

  transactionSource: TransactionSourceEnum;

  transactionAmount: number;

  closingBalance: number;
}