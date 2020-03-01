import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
      baseURL: 'https://silent-auction-bw.herokuapp.com/',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`,
      },
    });
};
