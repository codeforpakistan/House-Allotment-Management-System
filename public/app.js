/**
 * Created by Waqas on 9/24/2015.
 */
'use strict';

(function()
{
    var myApp_ED = angular.module('myApp_ED', [
        'ngRoute',
        'ngCookies',
        'Main_Module',
        'withAjax',
        'withPromise',
        'withAngularWay',
        'withServerSide'])
    .config(config)
    .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'partials/dashboard.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })

            .when('/login', {
                templateUrl: 'authentication/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })

            .when('/register', {
                templateUrl: 'authentication/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            })

            /***************************** ANGULAR DT TESTING START *****************************/
            .when('/adtServer',
            {
                templateUrl: 'partials/adtServer.html',
                controller: 'withServerSideController'
            })

            .when('/adtAjax',
            {
                templateUrl: 'partials/adtAjax.html',
                controller: 'WithAjaxController'
            })

            .when('/adtPromise',
            {
                templateUrl: 'partials/adtPromise.html',
                controller: 'WithPromiseController'
            })

            .when('/adtAngularWay',
            {
                templateUrl: 'partials/adtAngularWay.html',
                controller: 'withAngularWayController'
            })

            .when('/datatables',
            {
                templateUrl: 'partials/data_table.html',
                // controller: 'add_house_Controller'
            })
            /***************************** ANGULAR DT TESTING END *******************************/

            /***************************** FILE UPOLOAD START ***********************************/
            .when('/ngDroplet',
            {
                templateUrl: 'partials/ngDroplet.html',
                controller: 'UploadController'
            })
            /***************************** FILE UPOLOAD END *************************************/

            /*************************** HOUSE RELEATED LINKS START *****************************/
            .when('/add_house',
            {
                templateUrl: 'partials/add_house_details.html',
                controller: 'add_house_Controller'
            })

            .when('/search_house',
            {
                templateUrl: 'partials/search_house.html',
                controller: 'search_house_Controller'
            })

            .when('/update_house/:house_id',
            {
                templateUrl: 'partials/update_house_details.html',
                controller: 'update_house_Controller'
            })

            .when('/availabe_houses',
            {
                templateUrl: 'partials/availabe_houses_list.html',
                controller: 'availabe_houses_Controller'
            })

            .when('/occupied_houses',
            {
                templateUrl: 'partials/occupied_houses_list.html',
                controller: 'occupied_houses_Controller'
            })
            /*************************** HOUSE RELEATED LINKS END *******************************/

            /************************** COLONY RELEATED LINKS START *****************************/
            .when('/colony',
            {
                templateUrl: 'partials/colony.html'
            })

            .when('/search_colony',
            {
                templateUrl: 'partials/colony.html'
            })
            /************************** COLONY RELEATED LINKS END *******************************/

            /************************** EMPLOYEE RELEATED LINKS START ***************************/
            .when('/add_employee',
            {
                templateUrl: 'partials/add_employee_info.html',
                controller: 'Add_Employee_Controller'
            })

            .when('/search_employee',
            {
                templateUrl: 'partials/search_employee.html',
                controller: 'Search_Employee_Controller'
            })

            .when('/update_employee/:officer_id',
            {
                templateUrl: 'partials/update_employee_info.html',
                controller: 'Update_Employee_Controller'
            })

            .when('/basic_profile',
            {
                templateUrl: 'partials/basic_profile.html'
            })
            /************************** EMPLOYEE RELEATED LINKS END *****************************/

            /************************* GENERAL RELEATED LINKS START *****************************/
            .when('/bps',
            {
                templateUrl: 'partials/bps.html',
                controller: 'BPS_Controller'
            })

            .when('/department',
            {
                templateUrl: 'partials/department.html',
                controller: 'Department_Controller'
            })

            .when('/designation',
            {
                templateUrl: 'partials/designation.html',
                controller: 'Designation_Controller'
            })

            .when('/directoriate',
            {
                templateUrl: 'partials/directoriate.html',
                controller: 'Directoriate_Controller'
            })
            /************************** GENERAL RELEATED LINKS END *****************************/
            
            /**************************** WL RELEATED LINKS START ******************************/
            .when('/wl1',
            {
                templateUrl: 'partials/wl1.html',
                controller: 'TwentyPlus_Controller'
            })

            .when('/wl2',
            {
                templateUrl: 'partials/wl2.html',
                controller: 'SeventeenToNinteenP3_Controller'
            })

            .when('/wl3',
            {
                templateUrl: 'partials/wl3.html',
                controller: 'wl3_Controller'
            })

            .when('/FifteenToSixteenAttached',
            {
                templateUrl: 'partials/FifteenToSixteenAttached.html',
                controller: 'FifteenToSixteenAttached_Controller'
            })

            .when('/FifteenToSixteenSec',
            {
                templateUrl: 'partials/FifteenToSixteenSec.html',
                controller: 'FifteenToSixteenSec_Controller'
            })

            .when('/TwelveToFourteenSec',
            {
                templateUrl: 'partials/TwelveToFourteenSec.html',
                controller: 'TwelveToFourteenSec_Controller'
            })

            .when('/TwelveToFourteenAttached',
            {
                templateUrl: 'partials/TwelveToFourteenAttached.html',
                controller: 'TwelveToFourteenAttached_Controller'
            })

            .when('/OneToElevenSec',
            {
                templateUrl: 'partials/OneToElevenSec.html',
                controller: 'OneToElevenSec_Controller'
            })

            .when('/OneToElevenAttached',
            {
                templateUrl: 'partials/OneToElevenAttached.html',
                controller: 'OneToElevenAttached_Controller'
            })

            .when('/class4',
            {
                templateUrl: 'partials/class4.html',
                controller: 'class4_Controller'
            })
            /****************************** WL RELEATED LINKS END ******************************/
            
            /******************** HOUSE ALLOTMENT RELEATED LINKS START *************************/
            .when('/Allot_House/:officer_id',
            {
                templateUrl: 'partials/allot_house.html',
                controller: 'Allot_House_Controller'
            })
            /********************* HOUSE ALLOTMENT RELEATED LINKS END **************************/
            
            /****************************** TESTING STUFF START ********************************/
           .when('/testupdate',
            {
                templateUrl: 'partials/testupdate.html',
                controller: 'testController'
            })
            /******************************* TESTING STUFF END *********************************/

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http)
    {
        $rootScope.SessionRegistered = {};

        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};

        if ($rootScope.globals.currentUser)
        {
            $rootScope.SessionRegistered = true;
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current)
        {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn)
            {
                $rootScope.SessionRegistered = false;
                $location.path('/login');
            }
        });
    }

})();