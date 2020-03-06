import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
      // baseURL: 'http://localhost:5000/',
      baseURL: 'https://silent-auction-bw.herokuapp.com/',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`,
      },
    });
};
