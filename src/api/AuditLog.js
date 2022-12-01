import Api from '../Api';

const AuditLog = {
  process: (data) => {
    const formData = new FormData();
    formData.append('app', process.env.REACT_APP_NAME);
    formData.append('type', data.type ?? '');
    formData.append('eventCategory', data.event.category ?? '');
    formData.append('eventAction', data.event.action ?? '');
    formData.append('eventLabel', data.event.label ?? '');
    formData.append('dimensionA', data.dimension.a ?? '');
    formData.append('dimensionB', data.dimension.b ?? '');
    formData.append('dimensionC', data.dimension.c ?? '');

    for (const key in data.extra) {
      formData.append(`extra[${key}]`, data.extra[key]);
    }

    return new Promise((resolve, reject) => {
      fetch(process.env.REACT_APP_HOST_API + '/api/processor', {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${Api.Auth.getToken()}`,
        }),
        body: new URLSearchParams(formData)
      })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(e => reject(e));
    });
  },
};

export default AuditLog;
