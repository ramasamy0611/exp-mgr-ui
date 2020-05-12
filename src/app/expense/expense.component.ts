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
import { ExpenseDataStr } from '../expenseDataStr';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  title = 'Expenses Page';
  displayedColumns: string[] = ['transactionDate', 'expenseCategory', 'expenseName', 'transactionType', 'transactionSource', 'openingBalance', 'transactionAmount', 'closingBalance'];
  today: Date = new Date();
  dateStr: string;
  pipe = new DatePipe('en-US')
  expenseData: ExpenseDataStr[];
  matDatepicker: Date;
  selDate: Date;
  constructor(
    private route: ActivatedRoute,
    private router: Router, private expenseService: ExpenseService) {
    this.dateStr = this.pipe.transform(this.today, 'short');
  }

  ngOnInit(): void {
  }
  queryExpense() {
    console.log()
    this.expenseService.getExpenseAllExpensesByDate(this.selDate)
      .subscribe(data => {
        this.expenseData = [...this.getExpenseDataStrArr(data)];
      }, error => { console.log('error->', error); this.expenseData = null; })
  }
  getExpenseDataStrArr(expenseDataArr: ExpenseData[]): ExpenseDataStr[] {
    return expenseDataArr.map(element =>
      this.transformDataToStr(element)
    );
  }
  transformDataToStr(expenseData: ExpenseData): ExpenseDataStr {
    return {
      transactionDate: (expenseData.transactionDate != null) ? expenseData.transactionDate : null,

      openingBalance: expenseData.openingBalance,

      expenseName: expenseData.expenseName,

      expenseCategory: ExpenseCategoryEnum[expenseData.expenseCategory],

      transactionType: TransactionTypeEnum[expenseData.transactionType],

      transactionSource: TransactionSourceEnum[expenseData.transactionSource],

      transactionAmount: expenseData.transactionAmount,

      closingBalance: expenseData.closingBalance
    }
  }
}
