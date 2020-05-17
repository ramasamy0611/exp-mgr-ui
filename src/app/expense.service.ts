import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_CONFIG } from './server.config';
import { ExpenseData } from './expenseData';
import { Observable, Subscription, of } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { ExpenseDataStr } from './expenseDataStr';
import { ExpenseCategoryEnum } from './expense/expenseCategoryEnum';
import { TransactionTypeEnum } from './transactionTypeEnum';
import { TransactionSourceEnum } from './transactionSourceEnum';
import { mapTo, map } from 'rxjs/operators';
import { HTTP_OPTIONS_POST } from './header.config';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  httpOptionsPost = HTTP_OPTIONS_POST;
  serverConfig = SERVER_CONFIG;
  url: string;
  constructor(private httpClient: HttpClient) { this.url = this.serverConfig.backEndUrl.concat('/expense'); }

  public saveExpense(expenseData: ExpenseData): Observable<Number> {
    return this.httpClient
      .post<Number>(this.url.concat('/add'), JSON.stringify(expenseData), this.httpOptionsPost);
  }
  public saveExpenseAndGet(expenseData: ExpenseData): Observable<ExpenseData> {
    return this.httpClient
      .post<ExpenseData>(this.url.concat('/addget'), JSON.stringify(expenseData), this.httpOptionsPost);
  }
  public getExpenseAllExpenses(): Observable<ExpenseData[]> {
    return this.httpClient
      .get<ExpenseData[]>(this.url.concat('/getAllExpenses'));
  }
  public getExpenseAllExpensesByDate(date: Date): Observable<ExpenseData[]> {
    return this.httpClient
      .get<ExpenseData[]>(this.url.concat('/getAllExpensesByDate/' + date));
  }
  public getExpenseAllExpensesBetweenDate(fromDate: Date, toDate: Date): Observable<ExpenseData[]> {
    return this.httpClient
      .get<ExpenseData[]>(this.url.concat('/getAllExpensesBetweenDates/' + fromDate + '/' + toDate));
  }
}
