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

Open the main project folder in a console and run "composer install".
Once it's finished, go to the "public" folder with your console and run "npm install".
Get back to your main project folder and rename your ".env.example" file to ".env".
If you are running your MySQL on XAMPP your default DB_USERNAME should be equal to "root" and your DB_PASSWORD should be equal to an empty string.
    For example: DB_USERNAME=root
                 DB_PASSWORD=''
You can go to your PhpMyAdmin by clicking "Admin" on your XAMPP Control Panel. There you should make a new database and change the DB_DATABASE in your ".env" file to correspond to the database name you gave in your PhpMyAdmin.
    For example: DB_USERNAME=my_project
Then you can save your ".env" file and run the command "php artisan key:generate" on your console with your main project folder as its path.
For adding the migrations into your database you can use the laravel command "php artisan migrate" through your console.
If you have made any changes in your migration files you can run "php artisan migrate:rollback" and then "php artisan migrate" in your console or you can just run "php artisan migrate:refresh" which is doing the two things with a single command - deleting your migrations and building them up again.
For filling the database with seeders we have provided, you can run the command "php artisan db:seed". Note: You must have migrated your database beforehand.
For making a localhost server you must run the command "php artisan serve" which after that you can open with localhost:8000 in your browser.