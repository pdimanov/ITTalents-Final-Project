<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>FinalRPG</title>
        <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="assets/css/index.css">
        <base href="/" />
    </head>
    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="node_modules/angular/angular.js"></script>
    <script src="node_modules/angular-route/angular-route.js"></script>
    <script src="node_modules/satellizer/satellizer.min.js"></script>

    <script src="app/app.js"></script>

    <script src="app/services/UserService.js"></script>
    <script src="app/services/StorageService.js"></script>
    <script src="app/services/AuthService.js"></script>

    <script src="app/controllers/HomeController.js"></script>
    <script src="app/controllers/NavigationController.js"></script>
    <script src="app/controllers/LoginController.js"></script>
    <script src="app/controllers/LogoutController.js"></script>
    <script src="app/controllers/RegisterController.js"></script>
    <script src="app/controllers/ProfileController.js"></script>
    <script src="app/controllers/ShopController.js"></script>
    <script src="app/controllers/StatisticsController.js"></script>

    <body ng-app="users">
        <div id="main" class="container-fluid">
            <nav id="navbar" class="navbar navbar-default navbar-fixed-top" ng-controller="NavigationController">
                <div class="container">
                    <div class="navbar-header">
                        <button id="mainToggle" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapse-navbar" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand custom-nav-link logo" href="/home">FinalRPG</a>
                    </div>
                    <div class="collapse navbar-collapse" id="collapse-navbar">
                        <ul class="nav navbar-nav navbar-right" ng-hide="isLogged">
                            <li><a href="/login" class="custom-nav-link">login</a></li>
                            <li><a href="/register" class="custom-nav-link">register</a></li>
                            <li><a href="/about" class="custom-nav-link">about</a></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right" ng-show="isLogged">
                            <li><a href="/shop" class="custom-nav-link">shop</a></li>
                            <li><a href="/statistics" class="custom-nav-link">statistics</a></li>
                            <li class="dropdown">
                                <a href="" class="dropdown-toggle custom-nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">user <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a href="/profile" class="custom-nav-link">profile</a></li>
                                    <li><a href="/logout" class="custom-nav-link">logout</a></li>
                                </ul>
                            </li>
                            <li><a href="/about" class="custom-nav-link">about</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section id="mainContent" ng-view>

            </section>
            <footer id="footer" class="navbar-fixed-bottom">
                <div class="container">
                    <p class="text-center custom-nav-link">ITT Final Project</p>
                </div>
            </footer>
        </div>
    </body>
</html>