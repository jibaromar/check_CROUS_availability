import fetch from "node-fetch";
import 'dotenv/config'
import {headers, cities} from "./config/globals.js"
import sendSms from "./notification/sendSms.js"

let isSentNotification = false;

const checkAvailability = () => {
  fetch("https://trouverunlogement.lescrous.fr/api/fr/search/21", {
    "headers": headers,
    "body": cities[process.env.CITY],
    "method": "POST"
  })
    .then(response => response.json())
    .then(data => {
        console.log(data?.results?.total);
        if (data?.results?.total === 0){
          isSentNotification = false;
          return;
        }
        if(isSentNotification === false){
          sendSms(`${new Date()}\n\nLyon got some new rooms: Total=${data.results.total}\n\n`);
          isSentNotification = true;
        }
    });
}

// main
setInterval(checkAvailability, process.env.INTERVAL)