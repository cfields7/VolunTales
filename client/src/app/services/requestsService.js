const serverPath = "https://cfhc.fly.dev/api";

export const requestsService = {

  async requestTime(payload) {
    const res = await fetch(serverPath + '/requests/time', {
      method: "POST",
      body: JSON.stringify({
        title: payload.title,
        body: payload.body,
        link: payload.link,
        timeSlots: payload.timeSlots,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    return Promise.resolve(res);
  },

  async requestFinance(payload) {
    const res = await fetch(serverPath + '/requests/finance', {
      method: "POST",
      body: JSON.stringify({
        title: payload.title,
        body: payload.body,
        link: payload.link,
        goal: payload.goal,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    return Promise.resolve(res);
  },

  async requestItems(payload) {
    const res = await fetch(serverPath + '/requests/item', {
      method: "POST",
      body: JSON.stringify({
        title: payload.title,
        body: payload.body,
        link: payload.link,
        items: payload.items,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    return Promise.resolve(res);
  }

}