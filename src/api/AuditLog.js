import Auth from './Auth';

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
    formData.append('extra', JSON.stringify(data.extra));

    console.log('AUDIT LOG:', formData);

    return new Promise((resolve, reject) => {
      fetch(process.env.REACT_APP_HOST_API + '/api/processor', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ['Bearer', Auth.getToken()].join(' '),
        },
        body: new URLSearchParams(formData)
      })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(e => reject(e));
    });
  },
};

export default AuditLog;
