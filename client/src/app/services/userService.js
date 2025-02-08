const serverPath = "https://cfhc.fly.dev/api";

export const userService = {

  async getUsers() {
    const res = await fetch(serverPath + '/users');
    return Promise.resolve(res.json());
  },

  async addUser(firstName, lastName) {
    const res = await fetch(serverPath + '/users', {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    return Promise.resolve(res.json());
  }

}