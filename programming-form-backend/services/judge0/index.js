const axios = require('axios');


 const getResToken = async (sourceCode, languageId, stdin) => {
  try {
  const convertedSourceCode = Buffer.from(sourceCode).toString('base64');
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: {
      base64_encoded: 'true',
      fields: '*'
    },
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      //TODO: Shift this to .env file
      'X-RapidAPI-Key': 'f40520f1bfmsh51f1cedbc986419p16d9b1jsn55004c8d4c0f',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    data: {
      language_id: languageId,
      source_code: convertedSourceCode,
      stdin: stdin
    }
  };

    const response = await axios.request(options);
    return response.data.token;
  } catch (error) {
    console.error("Error in getResToken: ", error);
    throw error;
  }
};


 const getSubmissionResponse = async (token) => {
  try {
  const options = {
    method: 'GET',
    url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    params: {
      base64_encoded: 'true',
      fields: '*'
    },
    headers: {
      'X-RapidAPI-Key': 'f40520f1bfmsh51f1cedbc986419p16d9b1jsn55004c8d4c0f',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    }
  };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getResToken, getSubmissionResponse };