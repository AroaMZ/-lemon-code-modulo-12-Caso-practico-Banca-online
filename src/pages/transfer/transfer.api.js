import Axios from 'axios';
import { getAccount } from '../account/account.api';

const url = `${process.env.BASE_API_URL}/account-list`;



export const updateBalance = (id, balance) => {
  return getAccount(id).then((account) => {
    account.balance = balance;
    return Axios.put(`${url}/${id}`, account).then(({ data }) => data);
  })

 
}
 
