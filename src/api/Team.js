import Cache from "../service/Cache";

const Team = {
  get: () => new Promise((resolve, reject) => {
    const cache = new Cache();

    if (null !== cache.get('staff')) {
      resolve(cache.get('staff'));
      return;
    }

    fetch(process.env.REACT_APP_TEAM_DATA_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        cache.set('staff', data, 1);

        resolve(data);
      })
      .catch(e => reject(e));
  }),
};

export default Team;
