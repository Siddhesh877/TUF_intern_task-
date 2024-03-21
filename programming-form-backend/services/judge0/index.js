const axios = require('axios');
require('dotenv').config();


 const getResToken = async (sourceCode, languageId, stdin) => {
  try {
  const convertedSourceCode = Buffer.from(sourceCode).toString('base64');
  const options = {
    method: 'POST',
    url: process.env.JUDGE_URL + '/submissions',
    params: {
      base64_encoded: 'true',
      fields: '*'
    },
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.JUDGE_API_KEY,
      'X-RapidAPI-Host': process.env.JUDGE_URL
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
    url: process.env.JUDGE_URL + `/submissions/${token}`,
    params: {
      base64_encoded: 'true',
      fields: '*'
    },
    headers: {
      'X-RapidAPI-Key': process.env.JUDGE_API_KEY,
      'X-RapidAPI-Host': process.env.JUDGE_URL
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