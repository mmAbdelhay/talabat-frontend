<img src="./public/logo.png" align="right" width="27%" style="margin-top:15px; background-color:white; border-raduis:10px"/>

# Talabatak

it's an online ordering application and this is its frontEnd

# Table of Contents

- ### [Introduction](#Introduction) :microphone:
- ### [Installation steps](#Getting-Started) :memo:
- ### [Related repos](#Related-Repos)
- ### [Authors](#Authors) :thinking:
- ### [License](#License) :closed_book:

# Introduction

This project is a full on system which works similarly as talabat the delivery system we have the backend in this repo and the rest of the system is distributed through other repos which their links will be found at the end of the document, The system consists of a web frontend for:

The service providers (Restaurants, Pharmacies,etc..)
The Super users
The clients/guests
also the system has a driver mobile application for the people which are responsible for delivery and a mobile application for the clients.

With that being said let's discuss the decisions taken in this project.

# Installation steps

    1.	Make sure that Git is installed.
    2.	Open the terminal in an empty directory and type $ git clone https://github.com/mmAbdelhay/talabat-frontend.git
    3.	Once it’s done make sure you have Node and NPM installed
        note that you have to get a new google api key (geocode & maps for js & places)
        and place it in public/index.html in last script tag and in src/views/map/client-config.js
        inorder to have you map and autocomplete of your address work smoothly
    4.	Open the directory that appeared and in the terminal type $ npm install
    5.	make sure your backend is on
    6.	Open src/assets/config type your backend ip (if you want to run it to the backend installed on your localhost so it will be http://localhaost: and the port that your backend listening on)
    7.	open up you brower to http://localhost:3000

# Related-repos

- BackEnd : https://github.com/aliosman21/Talabat_Backend.git
- Client mobile application : https://github.com/mmAbdelhay/talabat-mobile-client.git
- Driver mobile application : https://github.com/mmAbdelhay/talabat-mobile-driver.git

# Authors

<a href="https://github.com/aliosman21"><img src="https://github.com/aliosman21.png" width="7%" style="border-radius:50%;margin-right:10px;" /></a>
<a href="https://github.com/mmAbdelhay"><img src="https://github.com/mmAbdelhay.png" width="7%" style="border-radius:50%;margin-right:10px;" /></a>
<a href="https://github.com/karim-arafa"><img src="https://github.com/karim-arafa.png" width="7%" style="border-radius:50%;margin-right:10px;" /></a>
<a href="https://github.com/youssefshaban"><img src="https://github.com/youssefshaban.png" width="7%" style="border-radius:50%;margin-right:10px;" /></a>
<a href="https://github.com/ibrahimHesham"><img src="https://github.com/ibrahimHesham.png" width="7%" style="border-radius:50%;margin-right:10px;" /></a>
<a href="https://github.com/ali-khaled-ali"><img src="https://github.com/ali-khaled-ali.png" width="7%" style="border-radius:50%;margin-right:10px;" /></a>

# License

SeaScape is [MIT licensed](./LICENSE).
