# Check CROUS availability
## What is it?
A basic Node.js project for checking if rooms are available on a CROUS university dormitory. It visites on a time intervale the CROUS official website and notifies you by SMS if new rooms are available for the city you are targeting.

## Disclaimer
This project only supports Vannes and Lyon cities for now

## Prerequisites
Vonage account (can be created for free, no credit card needed)

## Setup
*   Clone the project

    ```git clone https://github.com/jibaromar/check_CROUS_availability.git```
*   Change directory to the project's root folder

    ```cd check_CROUS_availability/```
*   Install dependencies

    ```npm install```
*   Configure the project by creating the `.env` file on the project's root directory

    ```
    VONAGE_API_KEY="your_vonage_api_key"
    VONAGE_API_SECRET="your_vonage_api_secret"
    PHONE_NUMBER="phonenumber_to_be_notified" #Ex: 33612345678
    CITY="Targeted_city" #Ex: Lyon or Vannes
    INTERVAL="time_between_checks" #time in ms
    ```
*   Start it

    ```npm start```
*   Enjoy!!