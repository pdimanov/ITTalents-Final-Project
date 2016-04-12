# Laravel PHP Framework

[![Build Status](https://travis-ci.org/laravel/framework.svg)](https://travis-ci.org/laravel/framework)
[![Total Downloads](https://poser.pugx.org/laravel/framework/d/total.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Stable Version](https://poser.pugx.org/laravel/framework/v/stable.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Unstable Version](https://poser.pugx.org/laravel/framework/v/unstable.svg)](https://packagist.org/packages/laravel/framework)
[![License](https://poser.pugx.org/laravel/framework/license.svg)](https://packagist.org/packages/laravel/framework)

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable, creative experience to be truly fulfilling. Laravel attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as authentication, routing, sessions, queueing, and caching.

Laravel is accessible, yet powerful, providing tools needed for large, robust applications. A superb inversion of control container, expressive migration system, and tightly integrated unit testing support give you the tools you need to build any application with which you are tasked.

## Official Documentation

Documentation for the framework can be found on the [Laravel website](http://laravel.com/docs).

## Setting up

- **If you are on XAMPP you need to comment out `;extension=php_fileinfo.dll` from the php.ini file located in the php folder in XAMPP by removing the `;`.** This will allow the composer to install properly Intervention/Image, the extension used for the uploading of the users' avatars. Make sure to restart XAMPP after uncommenting.</br></br>
- Open the main project folder in a console and run `composer install`.</br>
- Once it's finished, go to the **/public** folder with your console and run `npm install`.</br>
- Get back to your main project folder and rename your **.env.example** file to **.env**.</br>
- If you are running your MySQL on XAMPP your default **DB_USERNAME** should be equal to **root** and your **DB_PASSWORD** should be equal to an empty string.</br></br>
For example:
```
DB_USERNAME=root
DB_PASSWORD=''
```
- You can go to your PhpMyAdmin by clicking **Admin** on your XAMPP Control Panel. There you should make a new database and change the **DB_DATABASE** in your **.env** file to correspond to the database name you had given in your PhpMyAdmin.</br></br>
For example:
```
DB_USERNAME=my_project
```
- Then you can save your **.env** file and run the command `php artisan key:generate` on your console with your main project folder as its path.</br>
- For adding the migrations into your database you can use the laravel command `php artisan migrate` through your console.</br>
- If you have made any changes in your migration files you can run `php artisan migrate:rollback` and then `php artisan migrate` in your console or you can just run `php artisan migrate:refresh` which would do the same thing - delete your migrations and build them up again.</br>
- For filling the database with the seeders we have provided, you can run the command `php artisan db:seed`.</br>
**Note: You must have migrated your database beforehand.**</br>
- For making a localhost server you must run the command `php artisan serve`, after that you can open **localhost:8000** in your browser.

## Headers being used

- When registering a new user or logging in with an already made user you use the several headers:
```
Accept : application/json
Content-Type : application/json
X-Requested-With : XmlHttpRequest
```
- After there is an already logged in user, the client needs to verify which specific user is logged in and send this information to the API via a token which is returned to the client when he logs in and saves it in his Local Storage. After that to verify his identity, the client sends a custom header with the token's value in it.</br></br>
For example:
```
X-Api-Token : zD7funJLtfqY4Ad85TZn1jB2yoznyIhdYzQjzNAYOToXc9ftUTX5euBasvH3
```
- On every request regarding the user's information, these four headers are **required**.

## Routing and use of the API

- In the console with your main project folder as its path, you can write the command `php artisan route:list` which would give you all the routes with their methods, URIs and actions.</br>
- **Route**: `localhost:8000/api/user/register`</br>
**Method**: `POST`</br>
**Body example**: `{"username":"ivancho","email":"ivancho@abv.bg","password":"ivancho","password_confirmation":"ivancho"}`</br>
**Response**: Returns the new user's data. Returns errors if some of the fields don't pass the validation.</br></br>

- **Route**: `localhost:8000/api/user/login`</br>
**Method**: `POST`</br>
**Body example**: `{"email":"ivancho@abv.bg","password":"ivancho"}`</br>
**Response**: Returns the user's data. Returns errors if some of the fields don't pass the validation or such user doesn't exist.</br></br>

- **Route**: `localhost:8000/api/hero`</br>
**Method**: `POST`</br>
**Body example**: `{"name":"Adriancho","gender":"male"}`</br>
**Response**: Returns a message with the new hero's data. Returns errors if some of the fields don't pass the validation, token isn't given such user doesn't exist.</br></br>

- **Route**: `localhost:8000/api/hero/info`</br>
**Method**: `GET`</br>
**Response**: Returns a message with all the hero's data and the surrounding world(quests, quest givers, mobs, all items). Returns errors if some of the fields don't pass the validation, token isn't given, such user doesn't exist or the user doesn't have a hero yet.</br></br>

- **Route**: `localhost:8000/api/hero`</br>
**Method**: `DELETE`</br>
**Response**: Returns a message that the User's hero has been deleted successfully. Returns an error if the user already doesn't have a hero.</br></br>

- **Route**: `localhost:8000/api/hero/buy`</br>
**Method**: `POST`</br>
**Body example**: `{"id":2}`</br>
**Response**: Returns a message if the hero has successfully bought an item or already has this item. Returns an error if the hero doesn't have enough money or such an item doesn't exist.</br></br>

- **Route**: `localhost:8000/api/hero/sell`</br>
**Method**: `POST`</br>
**Body example**: `{"id":2}`</br>
**Response**: Returns a message if the hero has successfully sold an item. Returns an error if such an item doesn't exist.</br></br>

- **Route**: `localhost:8000/api/save/location`</br>
**Method**: `PUT`</br>
**Body example**: `{"map_x":100,"map_y":100}`</br>
**Response**: Returns a message when the hero has successfully saved his location.</br></br>

- **Route**: `localhost:8000/api/shop`</br>
**Method**: `GET`</br>
**Parameter values**: `armor/boots/gloves/head/weapon`</br>
**Parameter example**: `?slot-type=armor`</br>
**Response**: Returns a message with the hero's gold and all the items from the valid slot-type or the hero's gold and all the items from the shop if the parameter value is incorrect.</br></br>

- **Route**: `localhost:8000/api/user`</br>
**Method**: `GET`</br>
**Response**: Returns the user's username, avatar and email and basic information about the user's hero. Returns only the user's username, avatar and email and a null value for the hero's name if the user doesn't have a hero.</br></br>

- **Route**: `localhost:8000/api/user/upload`</br>
**Method**: `POST`</br>
**Body**: The key used for this method is "image" and the method accepts an image with extensions png, bmp, jpeg. The max size allowed is 1024KB.</br>
**Response**: Returns the route for the user's avatar. There is a default route which all users who still haven't uploaded an avatar get. Otherwise they get the route for their own avatar.</br></br>

- **Route**: `localhost:8000/api/hero`</br>
**Method**: `GET`</br>
**Parameter example**: `?search=ivan`</br>
**Response**: Returns a message with all heroes who have this bit in their names. Returns an error if no hero has this bit in their name.</br></br>

- **Route**: `localhost:8000/api/statistics`</br>
**Method**: `GET`</br>
**Parameter keys**: `quantity | direction | column`</br>
**Parameter values**: `quantity: some number (default is 5)` | `direction: 'asc' | 'desc'(default)` | `column: 'username' | 'hero name' | 'level' | 'health' | 'attack' | 'defense' | 'gold'` </br>
**Parameter example**: `?quantity=5&direction=asc&column=level`</br>
**Response**: Returns a message with the hero's and user's information ordered by the column and direction given. Returns an error if no such column exists in heroes table.</br></br>

- **Route**: `localhost:8000/api/hero/equip`</br>
**Method**: `PUT`</br>
**Body example**: `{"id":2}`</br>
**Response**: Returns a message that the user has successfully equipped an item and data about the hero and his items. Returns an error if an item with the given id doesn't exist or the hero doesn't have this item</br></br>

- **Route**: `localhost:8000/api/hero/acceptQuest`</br>
**Method**: `PUT`</br>
**Response**: Returns the hero's info with the new accepted quest's info and the mob required to kill. Returns an error if the hero hasn't completed his current quest.</br>

- **Route**: `localhost:8000/api/hero/kill`</br>
**Method**: `PUT`</br>
**Body example**: `{"mob_id":1,"map_x":200,"map_y":2944}`</br>
**Response**: Returns a message that the hero's kill has been successfully saved, updating the hero's map position and updating the hero's quest progress if the mob is his quest's target. Also saves the gold and experience received from the mob. Returns a data with keys `gold`, `experience`, `progress`.</br>

- **Route**: `localhost:8000/api/hero/returnQuest`</br>
**Method**: `PUT`</br>
**Body example**: `{"map_x":200,"map_y":2944}`</br>
**Response**: Returns a message that the hero has successfully completed the quest, saving the gold and experience from the quest, saving the hero's location and updating his status about the hero's quests. Returns a message if the hero needs to kills more mobs in order to complete the quest. Returns an error if the hero doesn't have a quest.</br>