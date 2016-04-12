<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>FinalRPG</title>
        <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css">
        <link rel="stylesheet" href="assets/css/index.css">
        <base href="/" />
    </head>
    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="node_modules/angular/angular.js"></script>
    <script src="node_modules/angular-route/angular-route.js"></script>
    <script src="node_modules/angular-cookies/angular-cookies.min.js"></script>
    <script src="node_modules/angular-animate/angular-animate.min.js"></script>
    <script src="node_modules/ng-file-upload/dist/ng-file-upload.min.js"></script>
    <script src="node_modules/jquery.cookie/jquery.cookie.js"></script>

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
        <script>
            window.fbAsyncInit = function() {
                FB.init({
                    appId      : '1007243642676337',
                    xfbml      : true,
                    version    : 'v2.5'
                });
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        </script>
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
            <section id="mainContent" ng-view class="view-slide-in">

            </section>
            <footer id="footer" class="navbar-fixed-bottom">
                <div class="container">
                    <p class="text-center custom-nav-link">ITT Final Project</p>
                </div>
            </footer>
        </div>
    </body>

    <script src="node_modules/phaser/build/phaser.js"></script>

</html>