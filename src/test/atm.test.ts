import { ATM, BalanceRepository } from "../app/atm/atm";

describe("the sut ", () => {
  const LIMIT = 100;
  const BALANCE = 10000;

  const balanceReader: BalanceRepository = {
    readBalance: () => {
      return BALANCE;
    },
    writeBalance: (balance: number) => {},
  };

  const bankService: any = {
    getLimit: () => {
      return LIMIT;
    },
  };

  const sut = new ATM(balanceReader, bankService);
  it("should have a balance number property", () => {
    const actual = sut.balance;
    expect(actual).toBeDefined();
  });

  it("should read from a file", () => {
    const actual = sut.balance;
    expect(actual).toBe(10000);
  });

  it("should allow to withdraw", () => {
    const inputAmount: number = 50;
    const actualAmount: number = sut.withdraw(inputAmount);
    expect(actualAmount).toEqual(inputAmount);
  });
  it("should allow to withdraw", () => {
    const inputAmount: number = LIMIT;
    const actualAmount: number = sut.withdraw(inputAmount);
    expect(actualAmount).toEqual(inputAmount);
  });

  it("should not allow to withdraw negative values", () => {
    const inputAmount: number = -150;
    expect(() => sut.withdraw(inputAmount)).toThrow("Not negative");
  });
  it("should not allow to withdraw non 50s", () => {
    const inputAmount: number = 35;
    expect(() => sut.withdraw(inputAmount)).toThrow("Not 50s");
  });

  it("should return a maximum by the bank service", () => {
    const inputAmount: number = LIMIT + 50;
    const actualAmount: number = sut.withdraw(inputAmount);
    expect(actualAmount).toEqual(LIMIT);
  });
});

describe("the sut with few money ", () => {
  const LIMIT = 1000;
  const BALANCE = 300;

  const balanceReader: BalanceRepository = {
    readBalance: () => {
      return BALANCE;
    },
    writeBalance: (balance: number) => {},
  };

  const bankService: any = {
    getLimit: () => {
      return LIMIT;
    },
  };

  const sut = new ATM(balanceReader, bankService);

  it("should return the balance", () => {
    const actualReturn = sut.withdraw(BALANCE + 50);
    expect(actualReturn).toBe(BALANCE);
  });
});

describe("the sut should save the balance ", () => {
  const LIMIT = 1000;
  const BALANCE = 10000;

  const bankService: any = {
    getLimit: () => {
      return LIMIT;
    },
  };

  let balanceReader: BalanceRepository;
  let sut: ATM;

  beforeEach(() => {
    balanceReader = {
      readBalance: () => {
        return BALANCE;
      },
      writeBalance: jest.fn().mockImplementation((balance: number) => {
        return;
      }),
    };
    sut = new ATM(balanceReader, bankService);
  });

  it("should calculate the balance", () => {
    const validInput = 100;
    const expectedBalance = 9900;
    const amountReturn = sut.withdraw(validInput);
    const actualBalance = sut.balance;
    expect(actualBalance).toBe(expectedBalance);
  });

  it("should save the balance", () => {
    const validInput = 100;
    const amountReturn = sut.withdraw(validInput);
    expect(balanceReader.writeBalance).toHaveBeenCalledTimes(1);
  });
  it("should save the correct balance", () => {
    const validInput = 100;
    const expectedBalance = 9900;
    const amountReturn = sut.withdraw(validInput);
    const actualBalance = sut.balance;
    expect(balanceReader.writeBalance).toHaveBeenCalledWith(actualBalance);
  });
});
