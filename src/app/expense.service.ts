import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_CONFIG } from './server.config';
import { ExpenseData } from './expenseData';
import { Observable, Subscription, of } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { ExpenseDataStr } from './expenseDataStr';
import { ExpenseCategoryEnum } from './expenseCategoryEnum';
import { TransactionTypeEnum } from './transactionTypeEnum';
import { TransactionSourceEnum } from './transactionSourceEnum';
import { mapTo, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  serverConfig = SERVER_CONFIG;
  url: string;
  constructor(private httpClient: HttpClient) { this.url = this.serverConfig.backEndUrl.concat('/expense'); }

  public getExpenseAllExpenses(): Observable<ExpenseData[]> {
    return this.httpClient
      .get<ExpenseData[]>(this.url.concat('/getAllExpenses'));
  }
  public getExpenseAllExpensesByDate(date: Date): Observable<ExpenseData[]> {
    return this.httpClient
      .get<ExpenseData[]>(this.url.concat('/getAllExpensesByDate/' + date));
  }
}
