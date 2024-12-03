// services/api.js
import axios from 'axios';

const fetchNews = async () => {
  try {
    const response = await axios.get('https://uasdapi.ia3x.com/swagger/index.html'); 
    return response.data; 
    console.error("Error fetching news:", error);
    return [];
  }
};

export default fetchNews;