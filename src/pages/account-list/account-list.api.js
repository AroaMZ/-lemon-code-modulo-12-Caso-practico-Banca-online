import Axios from "axios";
const url = `${process.env.BASE_API_URL}/account-list`; //con esto nos traemos los datos //process?? que es?
export const getAccountList = () => Axios.get(url).then(response =>{
    return response.data;
})