const axios = window.axios;
const url =
  "https://my-json-server.typicode.com/kellybuchanan/WebDev-Spring2021";

// not necessary but good to add
export const createUser = (id, name, cover, creator, price, rating) => {
  return axios({
    method: "post",
    url: `${url}/users`,
    data: {
      id,
      name,
      cover,
      creator,
      price,
      rating,
    },
    headers: {
      "Content-Type": "application/json",
    },
    json: true,
  })
    .then((response) => {
      console.log("POST response: ", response);
    })
    .catch((err) => {
      console.log("POST error: ", err);
    });
};

export const getAllGames = () => {
  return (
    axios
      // .get(`${url}/users`)
      .get("./Services/games.json")
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.log("GET Error: ", err);
      })
  );
};
