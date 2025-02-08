const API_BASE_URL = 'https://cfhc.fly.dev/api';

const fetchData = async () => {
    // POST request
    const responsePost = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: "Fayaz" }),
    });
    const postData = await responsePost.json();
    setResponsePost(postData);

    // GET request
    const responseGet = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const getData = await responseGet.json();
    return getData;
  };


module.exports = {
    fetchData
  };