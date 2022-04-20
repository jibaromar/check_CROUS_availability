import 'dotenv/config'
import Vonage from "@vonage/server-sdk";

const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
})

export default (message) => {
    const from = "Vonage APIs"
    const to = process.env.PHONE_NUMBER
    const text = message

    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.error(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.error(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}