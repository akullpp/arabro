const handleSuccess = response => response.json()

const handleError = error => console.error(error)

const request = (endpoint, method, payload) =>
  fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(payload),
  }).then(handleSuccess).catch(handleError)

export default {
  post: (uri, payload) => request(uri, 'POST', payload),
}
