import { Budget } from '../../budgets/types';
import { Transaction } from '../../transactions/types';

interface Analytics {
  name: string;
  value: number;
}

export interface Dashboard {
  analytics: Analytics[];
  date: string;
  recentTransaction: Transaction;
  recentOnGoingBudget: Budget;
}
