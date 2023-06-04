import { getAccount } from '../account/account.api';
import { history } from '../../core/router';
import { getAccountList } from '../account-list/account-list.api';
import { setAccountOptions } from './transfer.helpers';
import { formValidation } from './transfer.validations';
import { onUpdateField } from '../../common/helpers';
import { onSubmitForm } from '../../common/helpers';
import { onSetError } from '../../common/helpers';
import { onSetFormErrors } from '../../common/helpers';
import { mapAccountFromViewModelToApi } from './transfer.mappers';
import { insertMovement } from '../movements/movements.api';
import { updateBalance } from './transfer.api';

let transfer = {
  selectedAccountId: '',
  iban: '',
  name: '',
  amount: '',
  concept: '',
  notes: '',
  day: '',
  month: '',
  year: '',
  email: '',
  date: '',
  balance: '',
};
const params = history.getParams();

getAccountList().then((accountList) => {
  setAccountOptions(accountList, params.id);
  transfer = {
    ...transfer,
    selectedAccountId: params.id,
  };
});

//Puedo quitarlo no?

// getAccount(params.id).then((apiAccount) => {
//   console.log(apiAccount);
// });

onUpdateField('iban', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    iban: value,
  };
  formValidation.validateField('iban', transfer.iban).then((result) => {
    onSetError('iban', result);
  });
});

onUpdateField('name', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    name: value,
  };
});
formValidation.validateField('name', transfer.name).then((result) => {
  onSetError('name', result);
});

onUpdateField('amount', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    amount: value,
  };
});
formValidation.validateField('amount', transfer.amount).then((result) => {
  onSetError('amount', result);
});

onUpdateField('concept', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    concept: value,
  };
});
formValidation.validateField('concept', transfer.concept).then((result) => {
  onSetError('concept', result);
});

onUpdateField('notes', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    notes: value,
  };
});
formValidation.validateField('notes', transfer.notes).then((result) => {
  onSetError('notes', result);
});

onUpdateField('day', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    day: value,
  };
});
formValidation.validateField('day', transfer.day).then((result) => {
  onSetError('day', result);
});

onUpdateField('month', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    month: value,
  };
});
formValidation.validateField('month', transfer.month).then((result) => {
  onSetError('month', result);
});

onUpdateField('year', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    year: value,
  };
});
formValidation.validateField('year', transfer.year).then((result) => {
  onSetError('year', result);
});

onUpdateField('email', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    email: value,
  };
});
formValidation.validateField('email', transfer.email).then((result) => {
  onSetError('email', result);
});

onUpdateField('select-account', (event) => {
  const accountId = event.target.value;
  transfer = {
    ...transfer,
    selectedAccountId: accountId,
  };
});
formValidation
  .validateField('select-account', transfer.selectedAccountId)
  .then((result) => {
    onSetError('select-account', result);
  });

const onSave = (transfer) => {
  const apiTransfer = mapAccountFromViewModelToApi(transfer);
  return insertMovement(apiTransfer);
};

const getBalance = () => {
  return getAccount(transfer.selectedAccountId).then((result) => {
    let accountBalance = result.balance;
    return accountBalance;
  });
};
onSubmitForm('transfer-button', () => {
  formValidation.validateForm(transfer).then((result) => {
    onSetFormErrors(result);
    getBalance().then((balance) => {
      transfer = {
        ...transfer,
        balance: balance,
      };
      if (transfer.amount <= transfer.balance) {
        if (result.succeeded) {
          onSave(transfer).then((apiTransfer) => {
            let newBalance = transfer.balance - transfer.amount;
            updateBalance(transfer.selectedAccountId, newBalance);
            history.back();
            
          });
        }
      } else {
        alert('No dispone de saldo suficiente');
      }
    });
  });
});


