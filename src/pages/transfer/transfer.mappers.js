export const mapAccountFromViewModelToApi = (transfer) => {
  return {
    description: transfer.concept,
    amount: parseFloat(transfer.amount),
    balance: transfer.balance,
    transaction: new Date(
      transfer.day,
      transfer.month,
      transfer.year
    ).toLocaleDateString(),
    realTransaction: new Date(
      transfer.day,
      transfer.month,
      transfer.year
    ).toLocaleDateString(),
    accountId: transfer.selectedAccountId,
  };
};
