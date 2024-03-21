const axios = require('axios');
require('dotenv').config();


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
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
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
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
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