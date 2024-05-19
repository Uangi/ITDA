// csvToDatabaseRequest.js
import axios from 'axios';
import address from '../../API_KEY';


const csvToDatabaseRequest = async () => {
    try {
        const response = await axios.get(`${address.backendaddress}/csvToDatabase`,{withCredentials : true});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching fashion data:', error);
        throw error;
    }
};

export default csvToDatabaseRequest;
