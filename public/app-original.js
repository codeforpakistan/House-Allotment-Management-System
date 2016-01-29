/**
 * Created by Waqas on 9/24/2015.
 */
'use strict';

(function()
{
    var myApp_ED = angular.module('myApp_ED', [
        'ngRoute',
        'Main_Module'
    ]);

    myApp_ED.config(['$routeProvider', function($routeProvider)
    {
        $routeProvider.
            when('/dashboard',
            {
                templateUrl: 'partials/dashboard.html'
                //controller: 'dashboard_Controller'
            }).
            /********************************************* HOUSE START *********************************************/
            when('/add_house',
            {
                templateUrl: 'partials/add_house_details.html',
                controller: 'add_house_Controller'
            }).

            when('/search_house',
            {
                templateUrl: 'partials/search_house.html',
                controller: 'search_house_Controller'
            }).

            when('/update_house',
            {
                templateUrl: 'partials/update_house_details.html',
                controller: 'update_house_Controller'
            }).
            /********************************************* HOUSE END ***********************************************/


            /*************************************** FILE UPOLOAD START *********************************************/
            when('/ngDroplet',
            {
                templateUrl: 'partials/ngDroplet.html',
                controller: 'UploadController'
            }).
            /*************************************** FILE UPOLOAD END ***********************************************/

            /*************************************** FILE UPOLOAD START *********************************************/
            when('/colony',
            {
                templateUrl: 'partials/colony.html'
            }).

            when('/search_colony',
            {
                templateUrl: 'partials/colony.html'
            }).

            when('/add_employee',
            {
                templateUrl: 'partials/add_employee_info.html'
            }).

            when('/search_employee',
            {
                templateUrl: 'partials/search_employee.html'
            }).

            when('/basic_profile',
            {
                templateUrl: 'partials/basic_profile.html'
            }).

            when('/update_employee_info',
            {
                templateUrl: 'partials/update_employee_info.html'
            }).
            /*************************************** FILE UPOLOAD END ***********************************************/

            otherwise({
                redirectTo: '/dashboard'
            });
    }]);

})();