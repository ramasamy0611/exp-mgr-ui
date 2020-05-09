import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseData } from '../expenseData';
import { ExpenseNameEnum } from '../expenseNameEnum';
import { ExpenseCategoryEnum } from '../expenseCategoryEnum';
import { TransactionTypeEnum } from '../transactionTypeEnum';
import { TransactionSourceEnum } from '../transactionSourceEnum';
import { formatDate, DatePipe } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { LocalizedString } from '@angular/compiler/src/output/output_ast';

export interface ExpenseDataStr {
  transactionDate: Date;

  openingBalance: number;

  expenseName: string;

  expenseCategory: string;

  transactionType: string;

  transactionSource: string;

  transactionAmount: number;

  closingBalance: number;
}
const EXPENSE_DATA: ExpenseData[] = [
  { transactionDate: new Date, expenseCategory: ExpenseCategoryEnum.FOOD, expenseName: ExpenseNameEnum.FOOD_GROCERIES, transactionType: TransactionTypeEnum.EXPENSE, transactionSource: TransactionSourceEnum.NET_BANKING, openingBalance: 1000, transactionAmount: 100, closingBalance: 1000 }
];

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  title = 'Expenses Page';
  displayedColumns1: string[] = ['transactionDate', 'expenseCategory', 'expenseName', 'transactionType', 'transactionSource', 'openingBalance', 'transactionAmount', 'closingBalance'];
  today: Date = new Date();
  dateStr: string;
  pipe = new DatePipe('en-US')
  dataSource1: ExpenseDataStr[] = [
    { transactionDate: new Date(), expenseCategory: ExpenseCategoryEnum[ExpenseCategoryEnum.FOOD], expenseName: ExpenseNameEnum[ExpenseNameEnum.FOOD_GROCERIES], transactionType: TransactionTypeEnum[TransactionTypeEnum.EXPENSE], transactionSource: TransactionSourceEnum[TransactionSourceEnum.NET_BANKING], openingBalance: 1000, transactionAmount: 100, closingBalance: 1000 }
  ];;
  constructor(
    private route: ActivatedRoute,
    private router: Router, ) {
    this.dateStr = this.pipe.transform(this.today, 'short');
  }

  ngOnInit(): void {
  }

}
