import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseData } from '../expenseData';
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
  displayedColumns: string[] = ['transactionDate', 'expenseCategory', 'expenseName', 'transactionSource', 'openingBalance', 'transactionAmount', 'closingBalance'];
  today: Date = new Date();
  dateStr: string;
  pipe = new DatePipe('en-US')
  expenseDataStrArr: ExpenseDataStr[];
  matDatepicker: Date;
  fromDate: Date;
  toDate: Date;
  expenseCategoryOptions: string[] = [''];
  expenseDate: Date;
  ExpenseCategoryEnum = ExpenseCategoryEnum;
  ExpenseNameEnum = ExpenseNameEnum;
  TransactionTypeEnum = TransactionTypeEnum;
  TransactionSourceEnum = TransactionSourceEnum;
  expenseDataToSave: ExpenseData;
  expenseAmountEntered: number;
  isExpenseAddedSucces: boolean;
  expenseId: Number;
  isExpenseQuerySection: boolean;
  isExpenseAddSection: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router, private expenseService: ExpenseService) {
    this.dateStr = this.pipe.transform(this.today, 'short');
    this.expenseDataToSave = { closingBalance: 0, expenseCategory: null, expenseName: null, openingBalance: 0, transactionAmount: 0, transactionDate: null, transactionSource: null, transactionType: null }
  }

  ngOnInit(): void {
  }
  saveExpense() {
    console.log('Save expense');
    this.expenseService.saveExpense(this.expenseDataToSave)
      .subscribe(data => {
        this.expenseId = data;
        this.isExpenseAddedSucces = true;
        console.log('data received save expense', data);
      }, error => { console.log('error->', error); this.expenseDataStrArr = null; });
  }
  isQueryExpense() {
    this.isExpenseAddSection = false;
    this.isExpenseQuerySection = true;
  }
  isAddExpense() {
    this.isExpenseQuerySection = false;
    this.isExpenseAddSection = true;
    this.expenseDataStrArr = null;
    this.fromDate = null;
    this.toDate = null;
  }
  queryExpense() {
    this.isExpenseAddedSucces = false;
    console.log('date now ', new Date(), "selectedDate", this.fromDate)
    this.expenseService.getExpenseAllExpensesBetweenDate(this.fromDate, this.toDate)
      .subscribe(data => {
        this.expenseDataStrArr = [...this.getExpenseDataStrArr(data)];
      }, error => { console.log('error->', error); this.expenseDataStrArr = null; })
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
export enum TransactionSourceEnum {
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  UPI = "UPI",
  NET_BANKING = "NET_BANKING",
  PAY_TM = "PAY_TM",
  GOOGLE_PAY = "GOOGLE_PAY",
  CASH = "CASH"
}
export enum TransactionTypeEnum {
  DEBT = "DEBT",
  CREDIT = "CREDIT",
  EXPENSE = "EXPENSE",
  NA = "NA"
}
export enum ExpenseCategoryEnum {
  MORTGAGE_OR_RENT = "MORTGAGE_OR_RENT",
  TRANSPORTATION = "TRANSPORTATION",
  FOOD = "FOOD",
  UTILITIES = "UTILITIES",
  CLOTHING = "CLOTHING",
  MEDICAL_HEALTHCARE = "MEDICAL_HEALTHCARE",
  INSURANCE = "INSURANCE",
  PERSONAL = "PERSONAL",
  DEBT = "DEBT",
  RETIREMENT = "RETIREMENT",
  EDUCATION = "EDUCATION",
  SAVINGS = "SAVINGS",
  GIFT_OR_DONATION = "GIFT_OR_DONATION",
  ENTERTAINMENT = "ENTERTAINMENT"
}
export enum ExpenseNameEnum {
  CLOTHING_ADULT_CLOTHS = "CLOTHING_ADULT_CLOTHS",
  CLOTHING_ADULT_SHOES = "CLOTHING_ADULT_SHOES",
  CLOTHING_CHILDREN_CLOTHS = "CLOTHING_CHILDREN_CLOTHS",
  CLOTHING_CHILDREN_SHOES = "CLOTHING_CHILDREN_SHOES",
  DEBT_PERSONAL_LOAN = "DEBT_PERSONAL_LOAN",
  DEBT_EDUCATIONAL_LOAN = "DEBT_EDUCATIONAL_LOAN",
  DEBT_CREDIT_CARDS = "DEBT_CREDIT_CARDS",
  DEBT_PAY_ON_DELIVERY = "DEBT_PAY_ON_DELIVERY",
  DEBT_HOME_LOAN = "DEBT_HOME_LOAN",
  DEBT_GOLD_LOAN = "DEBT_GOLD_LOAN",
  WITHDREW_CHIT_FUNDS = "WITHDREW_CHIT_FUNDS",
  EDUCATION_CHILDREN_COLLEGE = "EDUCATION_CHILDREN_COLLEGE",
  EDUCATION_YOUR_COLLEGE = "EDUCATION_YOUR_COLLEGE",
  EDUCATION_SCHOOL_SUPPLIES = "EDUCATION_SCHOOL_SUPPLIES",
  EDUCATION_BOOKS = "EDUCATION_BOOKS",
  EDUCATION_SUBSCRIPTIONS = "EDUCATION_SUBSCRIPTIONS",
  ENTERTAINMENT_ALCOHOL_OR_BARS = "ENTERTAINMENT_ALCOHOL_OR_BARS",
  ENTERTAINMENT_GAMES = "ENTERTAINMENT_GAMES",
  ENTERTAINMENT_MOVIES = "ENTERTAINMENT_MOVIES",
  ENTERTAINMENT_CONCERTS = "ENTERTAINMENT_CONCERTS",
  ENTERTAINMENT_VACATIONS = "ENTERTAINMENT_VACATIONS",
  ENTERTAINMENT_SUBSCRIPTIONS_AMAZON = "ENTERTAINMENT_SUBSCRIPTIONS_AMAZON",
  FOOD_GROCERIES = "FOOD_GROCERIES",
  FOOD_RESTAURANTS = "FOOD_RESTAURANTS",
  FOOD_PET_FOOD = "FOOD_PET_FOOD",
  GIFT_AND_DONATION_BIRTHDAY = "GIFT_AND_DONATION_BIRTHDAY",
  GIFT_AND_DONATION_ANNIVERSARY = "GIFT_AND_DONATION_ANNIVERSARY",
  GIFT_AND_DONATION_WEDDING = "GIFT_AND_DONATION_WEDDING",
  GIFT_AND_DONATION_PONGAL = "GIFT_AND_DONATION_PONGAL",
  GIFT_AND_DONATION_DEEPAWALI = "GIFT_AND_DONATION_DEEPAWALI",
  SPECIAL_OCCASION = "SPECIAL_OCCASION",
  CHARITIES = "CHARITIES",
  HOUSE_HOLD_AND_SUPPLIES_TOILETRIES = "HOUSE_HOLD_AND_SUPPLIES_TOILETRIES",
  HOUSE_HOLD_AND_SUPPLIES_LAUNDRY = "HOUSE_HOLD_AND_SUPPLIES_LAUNDRY",
  HOUSE_HOLD_AND_SUPPLIES_DISH_WASH = "HOUSE_HOLD_AND_SUPPLIES_DISH_WASH",
  HOUSE_HOLD_AND_SUPPLIES_CLEANING_SUPPLIES = "HOUSE_HOLD_AND_SUPPLIES_CLEANING_SUPPLIES",
  HOUSE_HOLD_AND_SUPPLIES_TOOLS = "HOUSE_HOLD_AND_SUPPLIES_TOOLS",
  INSURANCE_HEALTH_INSURANCE = "INSURANCE_HEALTH_INSURANCE",
  INSURANCE_HOME_WARRANTY_PROTECTION = "INSURANCE_HOME_WARRANTY_PROTECTION",
  INSURANCE_AUTO_INSURANCE = "INSURANCE_AUTO_INSURANCE",
  INSURANCE_LIFE_INSURANCE = "INSURANCE_LIFE_INSURANCE",
  INSURANCE_DISABILITY_INSURANCE = "INSURANCE_DISABILITY_INSURANCE",
  MEDICAL_OR_HEALTHCARE_PRIMARY_CARE = "DEBTMEDICAL_OR_HEALTHCARE_PRIMARY_CARE_CREDIT_CARDS",
  MEDICAL_OR_HEALTHCARE_DENTAL_CARE = "MEDICAL_OR_HEALTHCARE_DENTAL_CARE",
  MEDICAL_OR_HEALTHCARE_SPECIALITY = "MEDICAL_OR_HEALTHCARE_SPECIALITY",
  MEDICAL_OR_HEALTHCARE_URGENT_CARE = "MEDICAL_OR_HEALTHCARE_URGENT_CARE",
  MEDICAL_OR_HEALTHCARE_MEDICATIONS = "MEDICAL_OR_HEALTHCARE_MEDICATIONS",
  MEDICAL_OR_HEALTHCARE_MEDICAL_DEVICES = "MEDICAL_OR_HEALTHCARE_MEDICAL_DEVICES",
  MORTGAGE_OR_RENT_PROPERTY_TAXES = "MORTGAGE_OR_RENT_PROPERTY_TAXES",
  MORTGAGE_OR_RENT_HOUSE_HOLD_REPAIR = "MORTGAGE_OR_RENT_HOUSE_HOLD_REPAIR",
  MORTGAGE_OR_RENT_HOA_FEES = "MORTGAGE_OR_RENT_HOA_FEES", // house owner association fees
  MORTGAGE_OR_RENT_RENT = "MORTGAGE_OR_RENT_RENT",
  PERSONAL_GYM = "PERSONAL_GYM",
  PERSONAL_SPORTS = "PERSONAL_SPORTS",
  PERSONAL_HAIRCUT = "PERSONAL_HAIRCUT",
  PERSONAL_SALON_SERVICES = "PERSONAL_SALON_SERVICES",
  PERSONAL_COSMETICS = "PERSONAL_COSMETICS",
  PERSONAL_BABY_SITTER = "PERSONAL_BABY_SITTER",
  PERSONAL_SUBSCRIPTIONS = "PERSONAL_SUBSCRIPTIONS",
  RETIREMENT_FINANCIAL_PLANNING = "RETIREMENT_FINANCIAL_PLANNING",
  RETIREMENT_INVESTING = "RETIREMENT_INVESTING",
  SAVINGS_EMERGENCY_FUND = "SAVINGS_EMERGENCY_FUND",
  SAVINGS_BIG_PURCHASE = "SAVINGS_BIG_PURCHASE",
  SAVINGS_RD = "SAVINGS_RD",
  SAVINGS_FD = "SAVINGS_FD",
  SAVINGS_POST_OFFICE = "SAVINGS_POST_OFFICE",
  SAVINGS_STOCK_MARKET = "SAVINGS_STOCK_MARKET",
  SAVINGS_REAL_ESTATE = "SAVINGS_REAL_ESTATE",
  TRANSPORTATION_FUEL = "TRANSPORTATION_FUEL",
  TRANSPORTATION_INSURANCE = "TRANSPORTATION_INSURANCE",
  TRANSPORTATION_MAINTENANCE_OIL_CHANGES = "TRANSPORTATION_MAINTENANCE_OIL_CHANGES",
  TRANSPORTATION_PARKING = "TRANSPORTATION_PARKING",
  TRANSPORTATION_REPAIR = "TRANSPORTATION_REPAIR",
  UTILITIES_ELECTRICITY = "UTILITIES_ELECTRICITY",
  UTILITIES_WATER = "UTILITIES_WATER",
  UTILITIES_GARBAGE = "UTILITIES_GARBAGE",
  UTILITIES_PHONES = "UTILITIES_PHONES",
  UTILITIES_CABLE = "UTILITIES_CABLE",
  UTILITIES_INTERNET = "UTILITIES_INTERNET",
  UTILITIES_GAS = "UTILITIES_GAS"
}

