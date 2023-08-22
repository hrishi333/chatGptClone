import openai from "../lib/chatGpt";
import axios from "axios";

const query = async (prompt: string,chatId: string, model: string) => {

//FOR OPEN AI by pr labs

const options = {
  method: 'POST',
  url: 'https://open-ai21.p.rapidapi.com/conversationfalcon',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '373e4a97eemsh39694858ba74ddep177359jsn5c8a09e49534',
    'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
  },
  data: {
    messages: [
      {
        role: 'user',
        content: prompt,
      }
    ],
    web_access: false
  }
};

try {
	const response = await axios.request(options);
 
	return(response);
} catch (error) {
	console.error(error);
}

 
//FOR ROBOMATIC API
/* const encodedParams = new URLSearchParams();
encodedParams.set('in', prompt);
encodedParams.set('op', 'in');
encodedParams.set('cbot', '1');
encodedParams.set('SessionID', 'RapidAPI1');
encodedParams.set('cbid', '1');
encodedParams.set('key', 'RHMN5hnQ4wTYZBGCF3dfxzypt68rVP');
encodedParams.set('ChatSource', 'RapidAPI');
encodedParams.set('duration', '1');

const options = {
  method: 'POST',
  url: 'https://robomatic-ai.p.rapidapi.com/api',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '373e4a97eemsh39694858ba74ddep177359jsn5c8a09e49534',
    'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com'
  },
  data: encodedParams,
};

try {
	const response = await axios.request(options);
  console.log(response, "this is response");
	return response;
} catch (error) {
	return(error);
} */
 

//for open AI API
  /* const res = await openai.createCompletion({
      model,
      prompt,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => {
      console.log(res);
      res.data.choices[0].text;
    })
    .catch(
      (error) =>
        `ChatGPT was unable to find answer for that : (Error:${error.message})`
    ); */

};

export default query;


