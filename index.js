class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    this.time = new Date();
    if (this.isAllowed()) {
      this.account.addTransaction(this.value);
    } else {
      console.log("Insufficient funds");
    }
  }

  isAllowed() {
    if (this.account.balance + this.value < 0) {
      return false;
    } else {
      return true;
    }
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}
class Account {

  constructor(username) {
    this.username = username;
    // this.balance = 0;
    //this.transactions is an array of Transaction objects.
    //So we need to access the object's amount in the get balance method
    this.transactions = [0];
  }
  get balance() {
    const balance = this.transactions.reduce((a, t) => {
      return a + t;
    })
    return balance;

  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

const myAccount = new Account('grep');

const t0 = new Deposit(120, myAccount);
t0.commit();

const t1 = new Withdrawal(50.25, myAccount);
t1.commit();

const t2 = new Withdrawal(9.99, myAccount);
t2.commit();

console.log("Balance:", myAccount.balance);
