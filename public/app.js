/**
 * Created by Waqas on 9/24/2015.
 */
'use strict';

(function()
{
    var myApp_ED = angular.module('myApp_ED', [
        'ngRoute',
        'Main_Module',
        'withAjax',
        'withPromise',
        'withAngularWay'
    ]);

    // app.config(function ($bootboxProvider)
    // {
    //     $bootboxProvider.setDefaults({ locale: "es" });
    // });

    myApp_ED.config(['$routeProvider', function($routeProvider)
    {
        $routeProvider.
            when('/dashboard',
            {
                templateUrl: 'partials/dashboard.html'
                //controller: 'dashboard_Controller'
            }).
            /********************************************* HOUSE START *********************************************/
            when('/adtAjax',
            {
                templateUrl: 'partials/adtAjax.html',
                controller: 'WithAjaxController'
            }).

            when('/adtPromise',
            {
                templateUrl: 'partials/adtPromise.html',
                controller: 'WithPromiseController'
            }).

            when('/adtAngularWay',
            {
                templateUrl: 'partials/adtAngularWay.html',
                controller: 'withAngularWayController'
            }).

            when('/add_house',
            {
                templateUrl: 'partials/add_house_details.html',
                controller: 'add_house_Controller'
            }).

             when('/datatables',
            {
                templateUrl: 'partials/data_table.html',
                // controller: 'add_house_Controller'
            }).

            when('/search_house',
            {
                templateUrl: 'partials/search_house.html',
                controller: 'search_house_Controller'
            }).

            when('/update_house/:house_id',
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
                templateUrl: 'partials/add_employee_info.html',
                controller: 'Add_Employee_Controller'
            }).

            when('/search_employee',
            {
                templateUrl: 'partials/search_employee.html',
                controller: 'Search_Employee_Controller'
            }).

            when('/update_employee/:officer_id',
            {
                templateUrl: 'partials/update_employee_info.html',
                controller: 'Update_Employee_Controller'
            }).

            when('/basic_profile',
            {
                templateUrl: 'partials/basic_profile.html'
            }).

            when('/bps',
            {
                templateUrl: 'partials/bps.html',
                controller: 'BPS_Controller'
            }).

            when('/department',
            {
                templateUrl: 'partials/department.html',
                controller: 'Department_Controller'
            }).

            when('/designation',
            {
                templateUrl: 'partials/designation.html',
                controller: 'Designation_Controller'
            }).

            when('/directoriate',
            {
                templateUrl: 'partials/directoriate.html',
                controller: 'Directoriate_Controller'
            }).

            when('/wl3',
            {
                templateUrl: 'partials/wl3.html',
                controller: 'wl3_Controller'
            }).

            when('/Allot_House/:officer_id',
            {
                templateUrl: 'partials/allot_house.html',
                controller: 'Allot_House_Controller'
            }).

            when('/testupdate',
            {
                templateUrl: 'partials/testupdate.html',
                controller: 'testController'
            }).
            /*************************************** FILE UPOLOAD END ***********************************************/

            otherwise({
                redirectTo: '/dashboard'
            });

            // myApp_ED.run(function($rootScope, $templateCache)
            // {
            //     $rootScope.$on('$viewContentLoaded', function()
            //     {
            //         $templateCache.removeAll();
            //     });
            // });

    }]);

})();