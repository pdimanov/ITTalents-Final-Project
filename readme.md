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

- **Route**: `localhost:8000/api/hero`</br>
**Method**: `GET`</br>
**Response**: Returns a message with the hero's data. Returns errors if some of the fields don't pass the validation, token isn't given such user doesn't exist.</br></br>

- **Route**: `localhost:8000/api/hero`</br>
**Method**: `DELETE`</br>
**Response**: Returns a message that the User's hero has been deleted successfully. Returns an error if the user already doesn't have a hero.</br></br>

- **Route**: `localhost:8000/api/hero/buy`</br>
**Method**: `POST`</br>
**Body example**: `{"id":2}`</br>
**Response**: Returns a message if the hero has successfully bought an item. Returns an error if the hero doesn't have enough money or such an item doesn't exist.</br></br>

- **Route**: `localhost:8000/api/hero/sell`</br>
**Method**: `POST`</br>
**Body example**: `{"id":2}`</br>
**Response**: Returns a message if the hero has successfully sold an item. Returns an error if such an item doesn't exist.</br></br>

- **Route**: `localhost:8000/api/hero/obtain-item`</br>
**Method**: `POST`</br>
**Body example**: {"id":5}</br>
**Response**: Returns a message if a hero has successfully obtained an item, for example from a quest reward. Returns an error if such an item doesn't exist.</br></br>

- **Route**: `localhost:8000/api/save/location`</br>
**Method**: `PUT`</br>
**Body example**: `{"map_x":100,"map_y":100}`</br>
**Response**: Returns a message when the hero has successfully saved his location.</br></br>

- **Route**: `localhost:8000/api/save/gold`</br>
**Method**: `PUT`</br>
**Body example**: `{"gold":200}`</br>
**Response**: Returns a message when the hero has successfully saved his gold.</br></br>

- **Route**: `localhost:8000/api/save/level`</br>
**Method**: `PUT`</br>
**Body example**: `{"level":2,"experience":3}`</br>
**Response**: Returns a message when the hero has successfully saved his level and experience. Returns an error if the level is lower than before or when the level is the same and the experience is lower than before.</br></br>

- **Route**: `localhost:8000/api/shop`</br>
**Method**: `GET`</br>
**Response**: Returns a message when the shop has successfully returned all the items in the game.</br></br>

- **Route**: `localhost:8000/api/shop/{slot_type}`</br>
**Method**: `GET`</br>
**{slot_type} options**: armor/head/weapon/gloves/boots</br>
**Response**: Returns a message when a slot type collection has successfully been returned. Returns an error if there is no such slot type.</br></br>

- **Route**: `localhost:8000/api/user`</br>
**Method**: `GET`</br>
**Response**: Returns the user's username and email and basic information about the user's hero.</br></br>