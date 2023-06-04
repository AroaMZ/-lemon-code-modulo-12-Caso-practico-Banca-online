


 
import { getAccount } from '../account/account.api';
import { onSetValues } from '../../common/helpers';
import { addMovementRows } from './movements.helpers';
import { getMovements } from './movements.api';
import {
  mapMovementsApiToVm,
  mapEmptyAccountVmToApi,
} from './movements.mappers';
import { history } from '../../core/router';
import { mapAccountApiToVm } from '../account/account.mappers';




let account = {
  id: '',
  type: '',
  alias: '',
};



const params = history.getParams();


const isEditMode = Boolean(params.id);
if (isEditMode) {
  getAccount(params.id).then((apiAccount) => {
    account = mapAccountApiToVm(apiAccount);
    onSetValues(account);/
    //
    account = AccountVmToApi(account);
    onSetValues(account);
  //
  });
} else {
  account = mapEmptyAccountVmToApi(account);
  onSetValues(account);
}

getMovements().then((movements) => {
  const vmMovements = mapMovementsApiToVm(movements, params.id);
  if (params.id === undefined) {
    addMovementRows(movements);
  } else {
    const myMovements = (vmMovements) =>
      vmMovements.filter((mymoves) => mymoves !== undefined);
    addMovementRows(myMovements(vmMovements)); 
  }
});
