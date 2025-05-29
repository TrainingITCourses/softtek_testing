export interface BalanceRepository {
  readBalance: () => number;
  writeBalance: (balance: number) => void;
}

export interface BankService {
  getLimit: () => number;
}

export class ATM {
  public balance: number = 0;
  private limit = 0;

  constructor(
    private balanceRepository: BalanceRepository,
    bankService: BankService
  ) {
    this.balance = balanceRepository.readBalance();
    this.limit = bankService.getLimit();
  }

  public withdraw(amount: number): number {
    this.guardAmount(amount);
    const result = Math.min(amount, this.limit, this.balance);
    this.balance -= result;
    this.balanceRepository.writeBalance(this.balance);
    return result;
  }

  private guardAmount(amount: number): void {
    if (amount < 0) throw new Error("Not negative");
    if (amount % 50) throw new Error("Not 50s");
  }
}
