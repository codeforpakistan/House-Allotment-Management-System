(function () {
    'use strict';

    angular.module('Main_Module').controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;
        $rootScope.SessionRegistered = false;

        function register()
        {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response)
                {
                    if (response.success) 
                    {                        
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } 
                    else 
                    {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
