const serverPath = "https://cfhc.fly.dev/api";

export const volunteerService = {

  async getTime() {
    const res = await fetch(serverPath + '/get/time', {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    return Promise.resolve(res);
  },

  async getFinance() {
    const res = await fetch(serverPath + '/get/finance', {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    return Promise.resolve(res);
  },

  async getItems() {
    const res = await fetch(serverPath + '/get/item', {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    return Promise.resolve(res);
  }

}