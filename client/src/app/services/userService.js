const serverPath = "https://cfhc.fly.dev/api";

export const userService = {

  async getUsers() {
    const res = await fetch(serverPath + '/users');
    return Promise.resolve(res.json());
  },

  async addUser(firstName, lastName, username, password, admin, email) {
    const res = await fetch(serverPath + '/users', {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        admin: admin,
        email: email
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    return Promise.resolve(res);
  },

  async loginUser(username, password) {
    const res = await fetch(serverPath + '/login', {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    return Promise.resolve(res);
  }

}