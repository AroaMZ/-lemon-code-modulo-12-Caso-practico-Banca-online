
import Axios from 'axios';

const url = `${process.env.BASE_API_URL}/movements`;

export const getMovements = () => Axios.get(url).then(({ data }) => data);

export const insertMovement = (movement) => {
    return getMovements().then((movements) => {
        let id = movements.length + 1;
        movement.id = id.toString();
        return Axios.post(url, movement).then((response) => {
            return response.data;
        });

    }
    )
    
}

 
