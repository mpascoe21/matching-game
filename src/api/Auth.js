import Cache from '../service/Cache';
import Api from '../Api';

const Auth = {
  login: () => {
    const formData = new FormData();
    formData.append('_username', process.env.REACT_APP_API_USERNAME);
    formData.append('_password', process.env.REACT_APP_API_PASSWORD);

    return new Promise((resolve, reject) => {
      fetch(process.env.REACT_APP_HOST_API + '/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData)
      })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(e => reject(e));
    });
  },

  getToken: () => {
    const cache = new Cache();

    // If we don't have a token already lets get one
    if (null === cache.get('auth_token')) {
      Api.Auth.login().then((response) => {
        // Save token to be used later
        cache.set('auth_token', response.token, 1);

        return response.token;
      }).catch((e) => {
        console.log('auth error:', e);
      });
    }

    // Return cached JWT token
    return cache.get('auth_token');
  },
};

export default Auth;
