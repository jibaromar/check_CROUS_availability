import fetch from "node-fetch";
import 'dotenv/config'
import {headers, cities} from "./config/globals.js"
import sendSms from "./notification/sendSms.js"

if (process.env.INTERVAL == undefined)
  throw new Error("app not yet configured");

let isSentNotification = false;

const checkAvailability = () => {
  fetch("https://trouverunlogement.lescrous.fr/api/fr/search/21", {
    "headers": headers,
    "body": cities[process.env.CITY],
    "method": "POST"
  })
    .then(response => {
      if(response.headers.get('Content-Type') === "application/json"){
        return response.json();
      }
      throw new Error(`[${new Date()}] - The API didn't return a valid JSON object`);
    })
    .then(data => {
        if(data === undefined){
          return;
        }
        if (data.results?.total === 0){
          isSentNotification = false;
          return;
        }
        if(data.results?.total !== undefined && isSentNotification === false){
          sendSms(`${new Date()}\n\nLyon got some new rooms: Total=${data.results.total}\n\n`);
          isSentNotification = true;
        }
    })
    .catch(error => {
      console.error(error);
    });
}

// main
setInterval(checkAvailability, process.env.INTERVAL)