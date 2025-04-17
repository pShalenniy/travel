const axios = require('axios');

async function encryptUrl(url) {
  return await axios({
    method: 'post',
    url: `${process.env.VUE_APP_IMG_URL}`,
    headers: {
      'Content-Type': 'text/plain'
    },
    data: { imageUrl: url }
  })
    .then(function(response) {
      let imageURL = `${process.env.VUE_APP_IMG_SERVER_URL}/${response.data.encryptedUrl}/${url}`;
      let base64data = Buffer.from(imageURL).toString('base64');
      return `${process.env.VUE_APP_IMG_SERVER_PROXY}/${base64data}`;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export { encryptUrl };
