/**
 * Created by Waqas on 9/24/2015.
 * Update: 01 Jan 2016
 */
'use strict';

(function()
{

    var Main_Module = angular.module('Main_Module', ['angular-flash.service', 'angular-flash.flash-alert-directive', 'ngAnimate', 'flash', 'ngDroplet', 'datatables', 'ngResource', 'datatables.buttons', 'angular-bootbox', 'datePicker', 'ui.bootstrap']);

    Main_Module.directive('uploadfile', ['FetchFileNames', function (FetchFileNames)
    {
        return {
          restrict: 'A',
          link: function(scope, element) {

            element.bind('click', function(e)
            {
                if(FetchFileNames.GetUploaderStatus() == true)
                {
                    angular.element('#upload_imgs').trigger('click');
                }
                else
                {
                    FetchFileNames.SetUploaderStatus(false);
                }
            });
          }
        };
    }]);

    Main_Module.directive('back', ['$window', function($window)
    {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }]);

    Main_Module.directive('confirm', [function ()
    {
        return {
            priority: 100,
            restrict: 'A',
            link: {
                pre: function (scope, element, attrs) {
                    var msg = attrs.confirm || "Are you sure?";

                    element.bind('click', function (event) {
                        if (!confirm(msg)) {
                            event.stopImmediatePropagation();
                            event.preventDefault;
                        }
                    });
                }
            }
        };
    }]);
    
    /**************************************************** Factory Start *********************************************************/
    Main_Module.service("FetchFileNames", function () 
    {
        var _FetchedData1        = {},
            _FetchedData2        = {},
            _FetchedRes          = {},
            _FetchUploaderStatus = false,
            _FetchHiddenRow      = [];

        return {
            GetData1: function () 
            {
                return _FetchedData1   
            },
            GetData2: function () 
            {
                return _FetchedData2
            },
            GetRes: function () 
            {
                return _FetchedRes
            },
            GetUploaderStatus: function () 
            {
                return _FetchUploaderStatus
            },
            GetHiddenRow: function () 
            {
                return _FetchHiddenRow
            },
            SetData: function (value1, value2) 
            {
                _FetchedData1 = value1;
                _FetchedData2 = value2;
            },
            SetRes: function (value) 
            {
                _FetchedRes = value;
            },
            SetUploaderStatus: function (value) 
            {
                _FetchUploaderStatus = value;
            },
            SetHiddenRow: function (value) 
            {
                _FetchHiddenRow = value;
            }
        };
    });
    

    Main_Module.factory('SimpleHttpRequest', ['$http', '$q', function($http, $q)
    {
        var deffered = $q.defer();
        var data = [];
        var SimpleHttpRequest = {};

        SimpleHttpRequest.Insert = function(Method, APIAction, TableName, DataLoad) 
        {
            var promise = $http({ 
            url   : 'http://localhost:3000/api/'+APIAction+'/'+TableName,
            method: Method,
            data  : DataLoad
            })
            promise.then(function successCallback (response) 
            {
                deffered.resolve(response);
            },
            function errorCallback(response)
            {
                deffered.reject(response);
            });

            return deffered.promise;   
        };

        SimpleHttpRequest.MultiInsert = function(Method, APIAction, TableName, DataLoad) 
        {
            var MultiInsertRes = [];

            for(var item in DataLoad)
            {
                $http({ 
                url   : 'http://localhost:3000/api/'+APIAction+'/'+TableName,
                method: Method,
                data  : DataLoad[item]
                })
                .then(function successCallback (response) 
                {
                    MultiInsertRes.push(response.data.Error);
                    deffered.resolve(MultiInsertRes);
                },
                function errorCallback(response)
                {
                    MultiInsertRes.push(response.data.Error);
                    deffered.reject(MultiInsertRes);
                });
            }

            return deffered.promise;
        };

        SimpleHttpRequest.Update = function(APIAction, TableName, UpdateByFieldName, id, DataLoad) 
        {
            var promise = $http({ 
            url   : 'http://localhost:3000/api/'+APIAction+'/'+TableName+'/'+UpdateByFieldName+'/'+id,
            method: 'PUT',
            data  : DataLoad
            })
            promise.then(function successCallback (response) 
            {
                deffered.resolve(response);
            },
            function errorCallback(response)
            {
                deffered.reject(response);
            });

            return deffered.promise;
        };

        SimpleHttpRequest.SelectRec = function(Method, APIAction, TableName)
        {
            // Pattren :  http://localhost:3000/api/SELECT/es_colony
            var promise = $http({ 
            url   : 'http://localhost:3000/api/'+APIAction+'/'+TableName,
            method: Method
            })
            promise.then(function successCallback (response) 
            {
                deffered.resolve(response);
            },
            function errorCallback(response)
            {
                deffered.reject(response);
            });

            return deffered.promise;
        }

        SimpleHttpRequest.SelectByID = function(Method, APIAction, SelectType, TableName, ByFieldName, id)
        {
            // Pattren : '/SELECTBYID/:TableName/:FieldName/:id'
            var promise = $http({ 
            url   : 'http://localhost:3000/api/'+APIAction+'/'+SelectType+'/'+TableName+'/'+ByFieldName+'/'+id,
            method: Method
            })
            promise.then(function successCallback (response) 
            {
                deffered.resolve(response);
            },
            function errorCallback(response)
            {
                deffered.reject(response);
            });

            return deffered.promise;
        }

        SimpleHttpRequest.SelectFieldByID = function(Method, APIAction, FieldToBeSelected, TableName, ByFieldName, id)
        {
            // Pattren : /SELECTFIELDBYID/:FieldToBeSelected/:TableName/:ByFieldName/:id
            var promise = $http({ 
            url   : 'http://localhost:3000/api/'+APIAction+'/'+FieldToBeSelected+'/'+TableName+'/'+ByFieldName+'/'+id,
            method: Method
            })
            promise.then(function successCallback (response) 
            {
                deffered.resolve(response);
            },
            function errorCallback(response)
            {
                deffered.reject(response);
            });

            return deffered.promise;
        }

        SimpleHttpRequest.SelectWL = function(Method, APIAction, TableName, BPSFrom, BPSTo, Employment_Type_ID_1, Employment_Type_ID_2, Service_Type_ID)
        {
            // Pattren : /WaitingList/:TableName/:BPSFrom/:BPSTo
            // Pattren : /WaitingList/es_waiting_list/BPS-17/BPS-19 // If Comparing with Title
            // Pattren : /WaitingList/es_waiting_list/17/19 // If Comparing with ID
            ///WaitingList/:TableName/:BPSFrom/:BPSTo/:Employment_Type_ID_1/:Employment_Type_ID_2/:Service_Type_ID
            var promise = $http({ 
            url   : 'http://localhost:3000/api/'+APIAction+'/'+TableName+'/'+BPSFrom+'/'+BPSTo+'/'+Employment_Type_ID_1+'/'+Employment_Type_ID_2+'/'+Service_Type_ID,
            method: Method
            })
            promise.then(function successCallback (response) 
            {
                deffered.resolve(response);
            },
            function errorCallback(response)
            {
                deffered.reject(response);
            });

            return deffered.promise;
        }

        return SimpleHttpRequest;
    }]);


    Main_Module.factory('ExtractFileNames', function()
    {
        var StoreFileName = [];
        var ExtractFileNames = {};

        ExtractFileNames.UploadedFileNames = function(objectList)
        {
            // If true it means there is only one object or else there are objects inside object
            if(objectList.hasOwnProperty('name'))
            {
                StoreFileName =  _.values(_.pick(objectList, 'name'));
            }
            else
            {
                StoreFileName = _.pluck(objectList, 'name');
            }

            return StoreFileName;
        }
        
        return ExtractFileNames;
    });


    Main_Module.factory('GenerateFilesList', function()
    {
        var UploadPicData = [];
        var GenerateFilesList = {};

        GenerateFilesList.FilesListWithID = function(objectList, fieldName, id)
        {
            if(fieldName == "house_id")
            {
                _.each(objectList, function(element, index, list)
                {
                    UploadPicData.push({"picture_name": element, house_id: id});
                });
            }
            else if(fieldName == "officer_id")
            {
                _.each(objectList, function(element, index, list)
                {
                    UploadPicData.push({"picture_name": element, officer_id: id});
                });
            }                        

            return UploadPicData;
        }
        
        return GenerateFilesList;
    });


    Main_Module.factory('InsertPicHttpRequest', ['$http', '$q', 'FetchFileNames', function($http, $q, FetchFileNames)
    {
        var deffered = $q.defer();
        var pushedData = [];  
        var InsertPicHttpRequest = {};

        InsertPicHttpRequest.InsertPicture = function(ReceivedData) 
        {
            for(var item in ReceivedData)
            {
                var promise = $http({ 
                    url   : 'http://localhost:3000/api/INSERT/es_picture',
                    method: 'POST',
                    data  : ReceivedData[item]
                })
                promise.then(function successCallback (response) 
                {
                    pushedData.push(response.data);
                    deffered.resolve(pushedData);
                },
                function errorCallback(response)
                {
                    pushedData.push(response.data);
                    deffered.reject(pushedData);
                });
            }

            return deffered.promise;
        };

        return InsertPicHttpRequest;
    }]);

    
    Main_Module.factory('CheckMultipleErrors', function()
    {
        var CheckMultipleErrors = {};
        var errorhai = [];

        CheckMultipleErrors.Check = function(DeleteList)
        {    
            var ActualErrors = _.pluck(DeleteList, "Error");
            var errorhai = _.contains(ActualErrors, true);
            return errorhai;
        };

        return CheckMultipleErrors;
    });


    Main_Module.factory('SimpleDeleteHttpRequest', ['$http', '$q', '$timeout', function($http, $q, $timeout)
    {
        var deffered = $q.defer();
        var SimpleDeleteHttpRequest = {};
        var unlinkResData = [];
        var deletedbResData = [];

        SimpleDeleteHttpRequest.unlinkFile = function(Method, APIAction, DataLoad) 
        {
            if(angular.isArray(DataLoad) && DataLoad.length>1)
            {
                for(var item in DataLoad)
                {
                    var promise = $http({ 
                    url   : 'http://localhost:3000/api/'+APIAction+'/'+DataLoad[item],
                    method: Method
                    })
                    promise.then(function successCallback (response) 
                    {
                        unlinkResData.push(response.data);
                        deffered.resolve(unlinkResData);
                    },
                    function errorCallback(response)
                    {
                        unlinkResData.push(response.data);
                        deffered.reject(unlinkResData);
                    });
                }
            }
            else
            {
                var promise = $http({ 
                    url   : 'http://localhost:3000/api/'+APIAction+'/'+DataLoad,
                    method: Method
                    })
                    promise.then(function successCallback (response) 
                    {
                        unlinkResData.push(response.data);
                        deffered.resolve(unlinkResData);
                    },
                    function errorCallback(response)
                    {
                        unlinkResData.push(response.data);
                        deffered.reject(unlinkResData);
                    });
            }
            
            return deffered.promise;
        };
                                                        
        SimpleDeleteHttpRequest.DeletedbRecord = function(MethodandAction, TableName, FieldName, ID) 
        {   
            // "DELETE from TABLENAME WHERE FIELDNAME = ID";
            var promise = $http({ 
            url   : 'http://localhost:3000/api/'+MethodandAction+'/'+TableName+'/'+FieldName+'/'+ID,
            method: MethodandAction
            })
            promise.then(function successCallback (response) 
            {  
                deletedbResData.push(response.data);
                deffered.resolve(deletedbResData);
            },
            function errorCallback(response)
            {
                deletedbResData.push(response.data);
                deffered.reject(deletedbResData);
            });
            
            return deffered.promise;
        };

        return SimpleDeleteHttpRequest;
    }]);


    Main_Module.factory('message', ['Flash', function(Flash)
    {
        var message = {};

        message.GeneralSuccess = function(CustomMessage)
        {
            if(CustomMessage)
            {
                var message = CustomMessage;
            }
            else
            {
                var message = '<strong>Successfull !</strong>';
            }
            
            return Flash.create('success', message);
        };

        message.GeneralFailed = function(CustomMessage)
        {
            if(CustomMessage)
            {
                var message = CustomMessage;
            }
            else
            {
                var message = '<strong>Failed !</strong>';
            }
            
            return Flash.create('warning', message);
        };

        message.successMessageForInsert = function(CustomMessage)
        {
            if(CustomMessage)
            {
                var message = CustomMessage;
            }
            else
            {
                var message = '<strong>Successfull !</strong> Data Inserted.';
            }
            
            return Flash.create('success', message);
        };

        message.failedMessageForInsert = function(CustomMessage)
        {
            if(CustomMessage)
            {
                var message = CustomMessage;
            }
            else
            {
                var message = '<strong>Error !</strong> Data is NOT Inserted.';
            }

            return Flash.create('danger', message);
        };

        message.successMessageForUpdate = function(CustomMessage)
        {
            if(CustomMessage)
            {
                var message = CustomMessage;
            }
            else
            {
                var message = '<strong>Successfull !</strong> Data Updated.';
            }
            
            return Flash.create('success', message);
        };

        message.failedMessageForUpdate = function(CustomMessage)
        {
            if(CustomMessage)
            {
                var message = CustomMessage;
            }
            else
            {
                var message = '<strong>Error !</strong> Data Updating Failed.';
            }

            return Flash.create('danger', message);
        };

        message.revertFailedMessage = function(CustomMessage)
        {
            if(CustomMessage)
            {
                var message = CustomMessage;
            }
            else
            {
                var message = '<strong>Warning !</strong> Something Went Wrong, System Tried To Revert Back The Process, But Its Failed. !';
            }

            return Flash.create('info', message);
        };
        
        message.revertedMessage = function(CustomMessage)
        {
            if(CustomMessage)
            {
                var message = CustomMessage;
            }
            else
            {
                var message = '<strong>Warning !</strong> Something Went Wrong, The Process is Being Reverted Back.';
            }

            return Flash.create('warning', message);
        };

        message.successMessageForDelete = function(CustomMessage)
        {
            if(CustomMessage)
            {
                var message = CustomMessage;
            }
            else
            {
                var message = '<strong>Successfull !</strong> Record Deleted successfully';
            }

            return Flash.create('success', message);
        };

        message.failedMessageForDelete = function(CustomMessage)
        {
            if(CustomMessage)
            {
                var message = CustomMessage;
            }
            else
            {
                var message = '<strong>Failed !</strong> Record Cannot Be Deleted';
            }

            return Flash.create('danger', message);
        };

        message.pauseMessage = function ()
        {
            Flash.pause();
        };

        message.dismissMessage = function ()
        {
            Flash.dismiss();
        };

        return message;
        
    }]);

        
    // Delete Pictures, Pictures Record and Main Record From DB | Takes two Argument | Main ID & Pics NamesList
    Main_Module.factory('DelMainRecPicRecUnlinkPic', ['$http', 'flash', 'SimpleHttpRequest', 'ExtractFileNames', 'SimpleDeleteHttpRequest', 'CheckMultipleErrors', 'message', 'FetchFileNames', function($http, flash, SimpleHttpRequest, ExtractFileNames, SimpleDeleteHttpRequest, CheckMultipleErrors, message, FetchFileNames)
    {
        var DelMainRecPicRecUnlinkPic = {};

        DelMainRecPicRecUnlinkPic.DeleteIt = function(NamesList, id, CallingMethod, MainTableName, PictureByFieldName)
        {
            // Check If the Picture Names are already there other wise fetch them from database first.
            // If triggered Manually NameList will be Empty
            if(CallingMethod)
            {   
                var NamesListGenerated = [];

                // Remember to send TableName, FieldName from Main Controller
                //                          Method,  APIAction,         FieldToBeSelected, TableName,    ByFieldName,       id       
                SimpleHttpRequest.SelectFieldByID('Get', 'SELECTFIELDBYID', 'es_picture_name', 'es_picture', PictureByFieldName, id)
                .then(function successCallback(response)
                {   
                    NamesListGenerated = _.pluck(response.data.es_picture, "es_picture_name");

                    var trueORfalse = true;
                    if(NamesListGenerated.length > 0)
                    {
                        //                                         NamesList,         id, CallingMethod, CustomCallback, PictureByFieldName
                        DelMainRecPicRecUnlinkPic.DeletePicRecord(NamesListGenerated, id, CallingMethod, PictureByFieldName, function(CustomCallback)
                        {
                            trueORfalse = CustomCallback;
                            if(!trueORfalse)
                            {
                                // PictureByFieldName and Main ID will always be same cuz pics are save on basis of foreigh key of main table field.
                                //                                         MainTableName, ByFieldName,        id, CallingMethod, CustomCallback
                                DelMainRecPicRecUnlinkPic.DeleteMainRecord(MainTableName, PictureByFieldName, id, CallingMethod, function(CustomCallback)
                                {
                                    FetchFileNames.SetHiddenRow(CustomCallback);
                                });
                            }
                        });
                    }
                    else
                    {   // In Calling Back TRUE we need to return some value to Main controller to hide the Deleted Line
                        // PictureByFieldName and Main ID will always be same cuz pics are save on basis of foreigh key of main table field.
                        //                                         MainTableName, ByFieldName,        id, CallingMethod, CustomCallback
                        DelMainRecPicRecUnlinkPic.DeleteMainRecord(MainTableName, PictureByFieldName, id, CallingMethod, function(CustomCallback)
                        {
                            trueORfalse = CustomCallback;
                            FetchFileNames.SetHiddenRow(trueORfalse);
                        });
                    }
                },
                function errorCallback(response)
                {
                    message.GeneralFailed("<strong>Error !</strong> Request Cannot Be Processed At This Time.");
                });
            }
            else
            {
                // Calling Method False means its been called automatically and True represents Manually
                // setting trueORfalse to true is to check if it is been oversided by customcallback.
                var trueORfalse = true;
                
                // If Custom CustomCallback returns false it means there is no Error, Error: False
                DelMainRecPicRecUnlinkPic.DeletePicRecord(NamesList, id, CallingMethod, function(CustomCallback)
                {
                    trueORfalse = CustomCallback;
                    if(!trueORfalse)
                    {
                        DelMainRecPicRecUnlinkPic.DeleteMainRecord(id, CallingMethod);
                    }
                });
                // first call DeletePicRecord funtion and when its successfull Delete call DeleteMain Record when its successfull
                // trigger a msg for revert process
            }
        };

        // REVERTING BACK PROCESS - STARTS
        DelMainRecPicRecUnlinkPic.DeletePicRecord = function(NamesList, id, CallingMethod, PictureByFieldName, CustomCallback)
        {
            SimpleDeleteHttpRequest.unlinkFile('delete','unlinkFile', NamesList)
            .then(function successCallback(response)
            {
                var results2 = CheckMultipleErrors.Check(response);

                if(!results2) // IF Result is False Carry on
                {
                    // Simple delete HTTP request to DELETE all the records on base of ID in PICTURE TABLE 
                    SimpleDeleteHttpRequest.DeletedbRecord('DELETE', 'es_picture', PictureByFieldName, id)
                    .then(function successCallback(response)
                    {
                        var results3 = CheckMultipleErrors.Check(response);
                        // False return from results3 means the Error is False, means there is no error
                        CustomCallback(results3);
                    });
                }
            });
        }

        DelMainRecPicRecUnlinkPic.DeleteMainRecord = function(MainTableName, ByFieldName, id, CallingMethod, CustomCallback)
        {
            // Remember to send TableName and FieldName from Main Controller such as Insert Controller
            SimpleDeleteHttpRequest.DeletedbRecord('DELETE', MainTableName, ByFieldName, id)
            .then(function successCallback(response)
            {
                if(CallingMethod)
                {
                    var pluckError = _.pluck(response, "Error");
                    CustomCallback(pluckError);
                    message.successMessageForDelete();
                    // flash.to('alert-2').info = 'Only for alert 2';
                }
                else
                {
                    message.revertedMessage();
                }
            },
            function errorCallback(response)
            {
                if(CallingMethod)
                {
                    message.failedMessageForDelete();
                }
                else
                {
                    message.revertFailedMessage();
                }
            });
        }
        // REVERTING BACK PROCESS - END

        return DelMainRecPicRecUnlinkPic; 

    }]);


    Main_Module.factory('FormatDate', ['$filter', function($filter)
    {
        var FormatDate = {};

        FormatDate.OutGoingDateFilter = function(inputDate)
        {
            if(inputDate == null){ return ""; } 
            var _date = $filter('date')(new Date(inputDate), 'yyyy-MM-dd');
            return _date;
        };

        FormatDate.IncomingDateFilter = function(inputDate)
        {
            if(inputDate == null){ return ""; } 
            var _date = $filter('date')(new Date(inputDate), 'dd-MMM-yyyy');
            return _date;
        };

        FormatDate.IncomingDateDisplay = function(inputDate)
        {
            if(inputDate == null){ return ""; } 
            var _date = $filter('date')(new Date(inputDate), 'dd-MMM-yyyy');
            return _date;
        };

        return FormatDate;
    }]);
    /**************************************************** Factory End ***********************************************************/


    /*********************************************** Upload File Start **********************************************************/
    Main_Module.controller('UploadController', function UploadController($scope, $timeout, FetchFileNames)
    {
        $scope.interface = {};
        $scope.uploadCount = 0;
        $scope.success = false;
        $scope.error = false;

        // Listen for when the interface has been configured.
        $scope.$on('$dropletFileAdded', function dropletFileAdded()
        {
            FetchFileNames.SetUploaderStatus(true);
        });

        $scope.$on('$dropletReady', function whenDropletReady()
        {
            $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif']);
            $scope.interface.setRequestUrl('http://localhost:3000/api/upload');
            $scope.interface.defineHTTPSuccess([/2.{2}/]);
            $scope.interface.useArray(false);
        });

        // Listen for when the files have been successfully uploaded.
        $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files)
        {

            $scope.uploadCount = files.length;
            $scope.success     = true;

            var successEvent = event.name;
            var response = response.filename;

            FetchFileNames.SetData(successEvent, response);
            // console.log(event, response, files);

            $timeout(function timeout() {
                $scope.success = false;
            }, 5000);

        });

        // Listen for when the files have failed to upload.
        $scope.$on('$dropletError', function onDropletError(event, res)
        {
            $scope.error = true;

                console.log(res);

            $timeout(function timeout()
            {
                $scope.error = false;
            }, 5000);
        });
    })
    .directive('progressbar', function ProgressbarDirective()
    {
        return {
            restrict: 'A',

            scope: {
                model: '=ngModel'
            },

            require: 'ngModel',

            link: function link(scope, element)
            {

                var progressBar = new ProgressBar.Path(element[0],
                {
                    strokeWidth: 2
                });
                +

                scope.$watch('model', function()
                {
                    progressBar.animate(scope.model / 100,
                    {
                        duration: 1000
                    });
                });

                scope.$on('$dropletSuccess', function onSuccess()
                {
                    progressBar.animate(0);
                });

                scope.$on('$dropletError', function onSuccess()
                {
                    progressBar.animate(0);
                });
            }
        }
    });
    /*********************************************** Upload File End ************************************************************/


    
    /*********************************************** DataTables Controller Start ************************************************/
    angular.module('withPromise', ['datatables', 'ngResource'])
    .controller('WithPromiseController', function WithPromiseController($scope, DTOptionsBuilder, DTColumnBuilder, $q, $http, $compile, SimpleHttpRequest)
    {
        var vm = this;
        vm.dtOptions = DTOptionsBuilder
        
        .fromFnPromise(function()
        {
            var waqas = [];

            return SimpleHttpRequest.SelectRec('GET', 'SELECT', 'es_house')
            .then(function(response)
            {
                var result = response.data.es_house;
                return result;
            });

            return defer.promise;
        })

        .withPaginationType('full_numbers')

        .withOption('initComplete', function(settings)
        {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element('#' + settings.sTableId).contents())($scope);
        });

        vm.dtColumns =
        [
            DTColumnBuilder.newColumn('es_house_id').withTitle('ID'),
            DTColumnBuilder.newColumn('es_house_no').withTitle('House No'),
            DTColumnBuilder.newColumn('es_house_rooms').withTitle('No of Rooms'),
            DTColumnBuilder.newColumn('es_colony_name').withTitle('Colony'),
            DTColumnBuilder.newColumn('es_city_name').withTitle('City'),//.notVisible()
            
            DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(function(data, type, full, meta)
            {
                return '<button class="btn btn-primary" ng-click="edit_records(' + data.es_house_id + ')">' +
                       '<i class="icon-edit"></i> Edit' + '</button>&nbsp;' +
                       '<button class="btn btn-danger" ng-click="DeleteRecord(' + data.es_house_id + ')">' +
                       '<i class="icon-remove icon-white"></i> Delete' + '</button>';
            })
        ];

        $scope.edit_records = function(es_house_id)
        {
            console.log('Editing ' + es_house_id);
            // Edit some data and call server to make changes...
            // Then reload the data so that DT is refreshed
            $scope.dtOptions.reloadData();
        };

        $scope.DeleteRecord = function(es_house_id)
        {
            console.log('Deleting' + es_house_id);
            // Delete some data and call server to make changes...
            // Then reload the data so that DT is refreshed
            $scope.dtOptions.reloadData();
        };
    });


    angular.module('withAjax', ['datatables'])
    .controller('WithAjaxController', function WithAjaxController(DTOptionsBuilder, DTColumnBuilder, $scope)
    {
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('ajax', {
                url: 'http://localhost:3000/api/SELECT/es_house',
                type: 'GET'
            })
            .withDataProp('es_house')
            .withOption('serverSide', true)
            .withOption('processing', true)
            .withOption('order', [0, 'asc'])
            .withDisplayLength(5)
            .withPaginationType('full');

        $scope.dtColumns =
        [
            DTColumnBuilder.newColumn('es_house_id').withTitle('ID'),
            DTColumnBuilder.newColumn('es_house_no').withTitle('House No'),
            DTColumnBuilder.newColumn('es_house_rooms').withTitle('No of Rooms'),
            DTColumnBuilder.newColumn('es_colony_id').withTitle('Colony'),
            DTColumnBuilder.newColumn('es_city_id').withTitle('City')//.notVisible()
        ];
    });
    
    
    angular.module('withAngularWay', ['datatables', 'ngResource'])
    .controller('withAngularWayController', function withAngularWayController($scope, $resource, DTOptionsBuilder, DTColumnDefBuilder)
    {
        //var id = {};
        var vm = this;
        vm.response = {};
        vm.dtOptions = DTOptionsBuilder.newOptions()
        // .fromFnPromise(function()
        // {
        //     return $http.get('http://localhost:3000/api/SELECT/es_colony')
        //     .then(function(response)
        //     {
        //         // console.log(response);
        //         var newData = response.data.es_colony;
        //         return newData;
        //     });
        // })

        .withPaginationType('full_numbers')
        .withDisplayLength(5);
        vm.dtColumnDefs = 
        [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1).notSortable()
        ];
        
        $resource('http://localhost:3000/api/SELECT/es_colony').get()
        .$promise.then(function(data)
        {
            vm.response = data.es_colony;
        });

        $scope.EditColonyData = function(id)
        {
            console.log(id);
        };
    });

    angular.module('withServerSide', ['datatables', 'ngResource'])
    .controller('withServerSideController', function WithPromiseController($scope, DTOptionsBuilder, DTColumnBuilder)
    {
        $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            url: 'http://localhost:3000/api/SELECT/es_officers',
            type: 'GET'
        })
        .withDataProp('es_officers')
        .withDisplayLength(10)
        .withOption('order', [0, 'asc'])
        .withOption("bPaginate", true)
        .withOption('processing', true)
        .withOption('serverSide', true)
        .withPaginationType('full_numbers');

        //$scope.dtColumns =
        //[
        //    DTColumnBuilder.newColumn('es_house_id').withTitle('ID'),
        //    DTColumnBuilder.newColumn('es_house_no').withTitle('House No'),
        //    DTColumnBuilder.newColumn('es_house_rooms').withTitle('No of Rooms'),
        //    DTColumnBuilder.newColumn('es_colony_name').withTitle('Colony'),
        //    DTColumnBuilder.newColumn('es_city_name').withTitle('City'),//.notVisible()
        //];

        $scope.dtColumns =
        [
            DTColumnBuilder.newColumn('es_officer_id').withTitle('ID'),
            DTColumnBuilder.newColumn('es_officer_name').withTitle('House No'),
            DTColumnBuilder.newColumn('es_officer_fname').withTitle('No of Rooms'),
            DTColumnBuilder.newColumn('es_officer_dob').withTitle('Colony')
        ];
    });
    /*********************************************** DataTables Controller End **************************************************/


    
    /*********************************************** INSERT House Controller Start ***********************************************/
    Main_Module.controller('add_house_Controller', function add_house_Controller($http, $window, $scope, SimpleHttpRequest, FetchFileNames, ExtractFileNames, GenerateFilesList, InsertPicHttpRequest, CheckMultipleErrors, message, DelMainRecPicRecUnlinkPic)
    {   
        /********************************** FETCH DATA START *******************************/
        $http.get('http://localhost:3000/api/SELECT/es_colony').success(function(data)
        {
            $scope.es_colony_details = data.es_colony;
        });

        $http.get('http://localhost:3000/api/SELECT/es_city').success(function(data)
        {
            $scope.es_city_details = data.es_city;
            $scope.city = '1';
        });

        $http.get('http://localhost:3000/api/SELECT/es_status').success(function(data)
        {
            $scope.es_status = data.es_status;
            $scope.status = '1';
        });
        /********************************** FETCH DATA END *********************************/

        /********************************** INSERT DATA START ********************************/
        $scope.InsertData = function()
        {
            var values = $scope.field;

            // Pattren :  http://localhost:3000/api/SELECT/es_colony
            SimpleHttpRequest.Insert('POST','INSERT', 'es_house', values)
            .then(function successCallback(response)
            {
                if(!response.data.Error)
                {
                    var id = response.data.LastID;

                    // Check If there is any Picture
                    if(FetchFileNames.GetUploaderStatus())
                    {
                        setTimeout(function()
                        {
                            var NamesList = ExtractFileNames.UploadedFileNames(FetchFileNames.GetData2());
                            
                            var NamesWithID = GenerateFilesList.FilesListWithID(NamesList, 'house_id' ,id);

                            InsertPicHttpRequest.InsertPicture(NamesWithID)
                            .then(function successCallback(response)
                            {   
                                var results1 = CheckMultipleErrors.Check(response);

                                // // // If process is successfull otherwise revert back  
                                if(!CheckMultipleErrors.Check(response))  // If its false every thing is fine.
                                {   
                                    // Flash Message of Successfull 
                                    message.successMessageForInsert();
                                    
                                    setTimeout(function()
                                    {
                                        $window.location.reload()
                                    }, 3500);                           
                                }
                                else
                                {
                                    // Revert Back the Entire Process
                                    DelMainRecPicRecUnlinkPic.DeleteIt(NamesList, id, false);
                                }
                            },
                            function errorCallback(response)
                            {
                                // If Pictures Record Cannot be Inserted than Delete the Pictures and Main Record
                                DelMainRecPicRecUnlinkPic.DeleteIt(NamesList, id, false);
                            });  

                        }, 1000);
                    }
                    else
                    {   
                        // Flash Message for Successfull insertion without pictures
                        message.successMessageForInsert("<strong>Successfull !</strong> Data Inserted successfully without Pictures");
                        
                        setTimeout(function()
                        {
                            $window.location.reload()
                        }, 3500);
    
                    }
                }
                else
                {
                    // Flash Message for Error Insertion failed
                    message.failedMessageForInsert("<strong>Error!</strong> Insertion Failed !");
                }
            },
            function errorCallback(response)
            {
                // Flash Message for Error Insertion failed
                message.failedMessageForInsert("<strong>Error!</strong> Insertion Failed !");
            });       
        };
        /********************************** INSERT DATA END **********************************/
    });
    /*********************************************** INSERT House Controller End *************************************************/

    /******************************************* SEARCH & DELETE House Controller Start ******************************************/
    Main_Module.controller('search_house_Controller', function search_house_Controller($window, $scope, $http, $q, $compile, DTOptionsBuilder, DTColumnBuilder,  SimpleHttpRequest, DelMainRecPicRecUnlinkPic, FetchFileNames, message, bootbox)
    {
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectRec('GET', 'SELECT', 'es_house')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_house);
                });

                return deffered.promise;
            })
            .withOption('order', [0, 'asc'])
            .withDisplayLength(10)
            .withPaginationType('full_numbers')
            // .withDOM('frtip')
            // .withDOM('Zlfrtip')
            .withButtons([
                // 'columnsToggle',
                // 'colvis',
                // 'copy',
                'print',
                'excel'
                // {
                //     text: 'Some button',
                //     key: '1',
                //     action: function (e, dt, node, config) {
                //         alert('Button activated');
                //     }
                // }
            ])
            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })

            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_house_id').withTitle('ID'),
                DTColumnBuilder.newColumn('es_house_no').withTitle('House No'),
                DTColumnBuilder.newColumn('es_house_rooms').withTitle('No of Rooms'),
                DTColumnBuilder.newColumn('es_colony_name').withTitle('Colony'),
                DTColumnBuilder.newColumn('es_city_name').withTitle('City'),//.notVisible()
                
                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '17%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<a class="btn btn-primary" ng-href="#/update_house/' + data.es_house_id + '">' +
                           '<i class="icon-edit"></i> Edit' + '</a>&nbsp;' +
                           '<button class="btn btn-danger" ng-click="DeleteRecord(' + data.es_house_id + ')">' +
                           '<i class="icon-remove icon-white"></i> Delete' + '</button>';
                })
            ];
        };

        $scope.DeleteRecord = function(id)
        {
            bootbox.confirm("Are you sure you want to delete this Record ?", function (confirmation)
            {
                if(confirmation)
                {
                    DelMainRecPicRecUnlinkPic.DeleteIt('', id, true, 'es_house', 'es_house_id')
                    {
                        setTimeout(function()
                        {
                            $window.location.reload();
                        }, 3500);
                    };
                }
            });
        };

        $scope.GetTData();            
    });
    /******************************************* SEARCH & DELETE House Controller Start ******************************************/

    /********************************************** UPDATE House Controller Start ************************************************/
    Main_Module.controller('update_house_Controller', function update_house_Controller($routeParams , $scope, $http, SimpleHttpRequest, FetchFileNames, ExtractFileNames, GenerateFilesList, CheckMultipleErrors, InsertPicHttpRequest, DelMainRecPicRecUnlinkPic, message)
    {
        /********************************** UPDATE DATA START *******************************/
        var HID = $routeParams.house_id;


        $http.get('http://localhost:3000/api/SELECT/es_colony').success(function(data)
        {
            $scope.es_colony_details = data.es_colony;
        });

        $http.get('http://localhost:3000/api/SELECT/es_city').success(function(data)
        {
            $scope.es_city_details = data.es_city;
        });

        $http.get('http://localhost:3000/api/SELECT/es_status').success(function(data)
        {
            $scope.es_status = data.es_status;
        });

        $http.get("http://localhost:3000/api/SELECTBYID/simpleselect/es_house/es_house_id/"+HID).success(function(data)
        {
            $scope.field = data.es_house[0];
        });

        $http.get("http://localhost:3000/api/SelectTwoFieldsByID/es_picture_id/es_picture_name/es_picture/es_house_id/"+HID).success(function(data)
        {
            $scope.field.pictureNames = data.es_picture;
        });


        $scope.UpdateData = function()
        {
            var values = $scope.field;

            var formFields = _.omit(values, "pictureNames");
            
            SimpleHttpRequest.Update('UPDATE', 'es_house', 'es_house_id', HID, formFields)
            .then(function (response)
            {
                if(!response.data.Error)
                {
                    // Check If there is any Picture
                    if(FetchFileNames.GetUploaderStatus())
                    {
                        setTimeout(function()
                        {
                            var NamesList = ExtractFileNames.UploadedFileNames(FetchFileNames.GetData2());
                            
                            var NamesWithID = GenerateFilesList.FilesListWithID(NamesList, 'house_id', HID);

                            InsertPicHttpRequest.InsertPicture(NamesWithID)
                            .then(function successCallback(response)
                            {   
                                console.log(response);                      
                                var results1 = CheckMultipleErrors.Check(response);

                                if(!results1)  // If its false every thing is fine.
                                {   
                                    // Flash Message of Successfull 
                                    message.successMessageForUpdate("<strong>Successfull !</strong> Data Updated With New Pictures.");
                                }
                                else
                                {
                                    message.failedMessageForUpdate("<strong>Error !</strong> New Pictures Insertion Failed.");
                                }
                            },
                            function errorCallback(response)
                            {
                                message.failedMessageForUpdate("<strong>Error !</strong> Pictures Updating Failed.");
                            });  

                        }, 1000);
                    }
                    else
                    {
                        message.successMessageForUpdate("<strong>Successfull !</strong> Data Updated Without Any New Pictures.");
                    }
                }
                else
                {
                    message.failedMessageForUpdate();
                }
            },
            function errorCallback(response)
            {
                message.failedMessageForUpdate();
            });
        }

        $scope.hideRow = [];
        $scope.DeletePictureInside = function(id, picture_name, index)
        {
            // MAKE SURE TO DELETE PICTURE BY ID & PICTURE NAME - RIGHT NOW ITS ONLY DELETING BY PICTURE NAME
            //  ID = FIELD TO BE MATCHED TO
            //                                           NamesList, id, CallingMethod, PictureByFieldName, CustomCallback
            DelMainRecPicRecUnlinkPic.DeletePicRecord(picture_name, id, 'true', 'es_picture_id', function(CustomCallback)
            {
                var receivedResult = CustomCallback;
                if(!receivedResult)
                {
                    message.successMessageForDelete();
                    $scope.hideRow[index] = true;
                    
                    // $scope.refresh();
                    // setTimeout(function()
                    // {
                    //     $route.reload();
                    // }, 5000);
                }
                else
                {
                    message.failedMessageForDelete();
                }

            });
        }
    });
    /********************************************** UPDATE House Controller End **************************************************/

    /******************************************* Occupied Houses List Controller Start *******************************************/
    Main_Module.controller('occupied_houses_Controller', function occupied_houses_Controller($window, $filter, $scope, $http, $q, $compile, DTOptionsBuilder, DTColumnBuilder,  SimpleHttpRequest, DelMainRecPicRecUnlinkPic, FetchFileNames, message, bootbox)
    {
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectRec('GET', 'SELECT', 'es_occupied_house')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_occupied_house);
                });

                return deffered.promise;
            })
            .withOption('order', [0, 'asc'])
            .withDisplayLength(10)
            .withPaginationType('full_numbers')
            .withButtons([
                'print',
                'excel'
            ])
            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })

            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_occupied_house_id').withTitle('OHID'),
                DTColumnBuilder.newColumn('es_officer_id').withTitle('OID'),
                DTColumnBuilder.newColumn('es_officer_name').withTitle('Name'),
                DTColumnBuilder.newColumn('es_officer_fname').withTitle('F-Name'),
                DTColumnBuilder.newColumn('es_officer_cnic').withTitle('CNIC'),

                DTColumnBuilder.newColumn('es_officer_doappt').withTitle('Date of Appt')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MMM-yyyy');
                }),
                DTColumnBuilder.newColumn('es_officer_dor').withTitle('Date of Ret')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MMM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_officer_personal_no').withTitle('Personal No'),
                DTColumnBuilder.newColumn('es_house_no').withTitle('House No'),
                DTColumnBuilder.newColumn('es_colony_name').withTitle('Colony Name'),
                DTColumnBuilder.newColumn('es_occupied_house_doalt').withTitle('Date of Allotmemnt').withOption('width', '9%')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MMM-yyyy');
                }),
                DTColumnBuilder.newColumn('es_occupied_house_dov').withTitle('Date of Vaccant').withOption('width', '9%')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MMM-yyyy');
                })
            ];
        };

        $scope.GetTData();            
    });
    /******************************************* Occupied Houses List Controller End *********************************************/
    
    /******************************************* Availabe Houses List Controller Start *******************************************/
    Main_Module.controller('availabe_houses_Controller', function availabe_houses_Controller($window, $scope, $http, $q, $compile, DTOptionsBuilder, DTColumnBuilder,  SimpleHttpRequest, DelMainRecPicRecUnlinkPic, FetchFileNames, message, bootbox)
    {
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectRec('GET', 'HouseList', 'es_house')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_house);
                });

                return deffered.promise;
            })
            .withOption('order', [0, 'asc'])
            .withDisplayLength(10)
            .withPaginationType('full_numbers')
            .withButtons([
                'print',
                'excel'
            ])
            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })

            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_house_id').withTitle('ID'),
                DTColumnBuilder.newColumn('es_house_no').withTitle('House No'),
                DTColumnBuilder.newColumn('es_house_rooms').withTitle('No of Rooms'),
                DTColumnBuilder.newColumn('es_house_blockno').withTitle('Block No'),
                DTColumnBuilder.newColumn('es_house_streetno').withTitle('Street No'),
                DTColumnBuilder.newColumn('es_house_sector').withTitle('Sector'),
                DTColumnBuilder.newColumn('es_colony_name').withTitle('Colony'),
                DTColumnBuilder.newColumn('es_city_name').withTitle('City'),//.notVisible()
                
                DTColumnBuilder.newColumn(null).withTitle('Status').notSortable().withOption('width', '7%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<span class="label label-success">Availabe</span>'

                })
            ];
        };

        $scope.GetTData();            
    });
    /******************************************* Availabe Houses List Controller End *********************************************/




    /************************************************* Colony Controller Start ***************************************************/
    Main_Module.controller('colony_Controller', function colony_Controller($q, $window, $scope, $http, $resource, $compile, DTOptionsBuilder, DTColumnBuilder, bootbox, SimpleHttpRequest, DelMainRecPicRecUnlinkPic, message)
    {
        $scope.field = {};
        $scope.update = {};
        /********************************** FETCH DATA START *******************************/
        $http.get('http://localhost:3000/api/SELECT/es_colony_type').success(function successCallback(data)
        {
            $scope.es_colony_type = data.es_colony_type;
        });
        /********************************** FETCH DATA END *********************************/

        /********************************** DISPLAY DATA START *******************************/
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectRec('GET', 'SELECT', 'es_colony')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_colony);
                });

                return deffered.promise;
            })
            .withOption('order', [0, 'asc'])
            .withDisplayLength(5)
            .withPaginationType('simple_numbers')
            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })
            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_colony_name').withTitle('Colony'),
                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '31%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<button class="btn btn-primary" ng-click="EditData(' + data.es_colony_id + ');">' +
                           '<i class="icon-edit"></i> Edit' + '</button>&nbsp;' +
                           '<button class="btn btn-danger" ng-click="DeleteData(' + data.es_colony_id + ');">' +
                           '<i class="icon-remove icon-white"></i> Delete' + '</button>';
                })
            ];
        };

        $scope.InsertData = function()
        {
            var values = $scope.field;
            SimpleHttpRequest.Insert('POST','INSERT', 'es_colony', values)
            .then(function successCallback(response)
            {
                if(!response.data.Error)
                {
                    message.successMessageForInsert("<strong>Successfull !</strong> Colony Details Inserted");
                    setTimeout(function()
                    {
                        $window.location.reload();
                    }, 3500);
                }
                else
                {
                    message.failedMessageForInsert("<strong>Error !</strong> Data Insertion Failed");
                }
            },
            function errorCallback(response)
            {
                message.failedMessageForInsert("<strong>Error!</strong> Data Insertion Failed !");
            });
        };

        $scope.EditData = function(id)
        {
            $http.get('http://localhost:3000/api/SELECTBYID/simpleselect/es_colony/es_colony_id/'+id)
            .success(function successCallback(data)
            {
                $scope.YesEdit = true;
                $scope.update = data.es_colony[0];
            });
        };

        $scope.UpdateData = function(id)
        {
            var values = $scope.update;

            SimpleHttpRequest.Update('UPDATE', 'es_colony', 'es_colony_id', id, values)
            .then(function successCallback(response)
            {
                message.successMessageForUpdate();
            },
            function errorCallback(response)
            {
                message.failedMessageForUpdate();
            });
        };

        $scope.DeleteData = function(id)
        {
            bootbox.confirm("Are you sure you want to delete this Record ?", function (confirmation)
            {
                if(confirmation)
                {
                    DelMainRecPicRecUnlinkPic.DeleteIt('', id, true, 'es_colony', 'es_colony_id')
                    {
                        setTimeout(function()
                        {
                            $window.location.reload();
                        }, 3500);
                    };
                }
            });
        };

        // Must Initialize it to Get Data.
        $scope.GetTData();
    });
    /*************************************************** Colony Controller End ***************************************************/

    /**************************************************** BPS Controller Start ***************************************************/
    Main_Module.controller('BPS_Controller', function BPS_Controller($q, $window, $scope, $http, $resource, $compile, DTOptionsBuilder, DTColumnBuilder, bootbox, SimpleHttpRequest, DelMainRecPicRecUnlinkPic, message)
    {
        $scope.field = {};
        $scope.update = {};
        /********************************** DISPLAY DATA START *******************************/
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectRec('GET', 'SELECT', 'es_bps')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_bps);
                });

                return deffered.promise;
            })
            .withOption('order', [0, 'asc'])
            .withDisplayLength(5)
            .withPaginationType('simple_numbers')
            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })
            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_bps_title').withTitle('BPS Title'),
                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '31%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<button class="btn btn-primary" ng-click="EditData(' + data.es_bps_id + ');">' +
                           '<i class="icon-edit"></i> Edit' + '</button>&nbsp;' +
                           '<button class="btn btn-danger" ng-click="DeleteData(' + data.es_bps_id + ');">' +
                           '<i class="icon-remove icon-white"></i> Delete' + '</button>';
                })
            ];
        };

        $scope.InsertData = function()
        {
            var values = $scope.field;
            SimpleHttpRequest.Insert('POST','INSERT', 'es_bps', values)
            .then(function successCallback(response)
            {
                if(!response.data.Error)
                {
                    message.successMessageForInsert("<strong>Successfull !</strong> BPS Details Inserted");
                    setTimeout(function()
                    {
                        $window.location.reload();
                    }, 3500);
                }
                else
                {
                    message.failedMessageForInsert("<strong>Error !</strong> Data Insertion Failed");
                }
            },
            function errorCallback(response)
            {
                message.failedMessageForInsert("<strong>Error!</strong> Data Insertion Failed !");
            });
        };

        $scope.EditData = function(id)
        {
            $http.get('http://localhost:3000/api/SELECTBYID/simpleselect/es_bps/es_bps_id/'+id)
            .success(function successCallback(data)
            {
                $scope.YesEdit = true;
                $scope.update = data.es_bps[0];
            });
        };

        $scope.UpdateData = function(id)
        {
            var values = $scope.update;

            SimpleHttpRequest.Update('UPDATE', 'es_bps', 'es_bps_id', id, values)
            .then(function successCallback(response)
            {
                message.successMessageForUpdate();
            },
            function errorCallback(response)
            {
                message.failedMessageForUpdate();
            });
        };

        $scope.DeleteData = function(id)
        {
            bootbox.confirm("Are you sure you want to delete this Record ?", function (confirmation)
            {
                if(confirmation)
                {
                    DelMainRecPicRecUnlinkPic.DeleteIt('', id, true, 'es_bps', 'es_bps_id')
                    {
                        setTimeout(function()
                        {
                            $window.location.reload();
                        }, 3500);
                    };
                }
            });
        };

        // Must Initialize it to Get Data.
        $scope.GetTData();
    });
    /****************************************************** BPS Controller End ***************************************************/

    /*************************************************** Department Controller Start *********************************************/
    Main_Module.controller('Department_Controller', function Department_Controller($q, $window, $scope, $http, $resource, $compile, DTOptionsBuilder, DTColumnBuilder, bootbox, SimpleHttpRequest, DelMainRecPicRecUnlinkPic, message)
    {
        $scope.field = {};
        $scope.update = {};
        /********************************** FETCH DATA START *******************************/
        $http.get('http://localhost:3000/api/SELECT/es_department_type').success(function successCallback(data)
        {
            $scope.es_department_type = data.es_department_type;
        });
        /********************************** FETCH DATA END *********************************/

        /********************************** DISPLAY DATA START *******************************/
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectRec('GET', 'SELECT', 'es_department')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_department);
                });

                return deffered.promise;
            })
            .withOption('order', [0, 'asc'])
            .withDisplayLength(5)
            .withPaginationType('simple_numbers')
            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })
            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_department_name').withTitle('Department Name'),
                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '31%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<button class="btn btn-primary" ng-click="EditData(' + data.es_department_id + ');">' +
                           '<i class="icon-edit"></i> Edit' + '</button>&nbsp;' +
                           '<button class="btn btn-danger" ng-click="DeleteData(' + data.es_department_id + ');">' +
                           '<i class="icon-remove icon-white"></i> Delete' + '</button>';
                })
            ];
        };

        $scope.InsertData = function()
        {
            var values = $scope.field;

            SimpleHttpRequest.Insert('POST','INSERT', 'es_department', values)
            .then(function successCallback(response)
            {
                if(!response.data.Error)
                {
                    message.successMessageForInsert("<strong>Successfull !</strong> Deparment Details Inserted");
                    setTimeout(function()
                    {
                        $window.location.reload();
                    }, 3500);
                }
                else
                {
                    message.failedMessageForInsert("<strong>Error !</strong> Data Insertion Failed");
                }
            },
            function errorCallback(response)
            {
                message.failedMessageForInsert("<strong>Error!</strong> Data Insertion Failed !");
            });
        };

        $scope.EditData = function(id)
        {
            $http.get('http://localhost:3000/api/SELECTBYID/simpleselect/es_department/es_department_id/'+id)
            .success(function successCallback(data)
            {
                $scope.YesEdit = true;
                $scope.update = data.es_department[0];
            });
        };

        $scope.UpdateData = function(id)
        {
            var values = $scope.update;

            SimpleHttpRequest.Update('UPDATE', 'es_department', 'es_department_id', id, values)
            .then(function successCallback(response)
            {
                message.successMessageForUpdate();
            },
            function errorCallback(response)
            {
                message.failedMessageForUpdate();
            });
        };

        $scope.DeleteData = function(id)
        {
            bootbox.confirm("Are you sure you want to delete this Record ?", function (confirmation)
            {
                if(confirmation)
                {
                    DelMainRecPicRecUnlinkPic.DeleteIt('', id, true, 'es_department', 'es_department_id')
                    {
                        setTimeout(function()
                        {
                            $window.location.reload();
                        }, 3500);
                    };
                }
            });
        };

        // Must Initialize it to Get Data.
        $scope.GetTData();
    });
    /*************************************************** Department Controller End ***********************************************/

    /******************************************** Designation Controller Start ***************************************************/
    Main_Module.controller('Designation_Controller', function Designation_Controller($q, $window, $scope, $http, $resource, $compile, DTOptionsBuilder, DTColumnBuilder, bootbox, SimpleHttpRequest, DelMainRecPicRecUnlinkPic, message)
    {
        $scope.field = {};
        $scope.update = {};
        /********************************** DISPLAY DATA START *******************************/
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectRec('GET', 'SELECT', 'es_designation')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_designation);
                });

                return deffered.promise;
            })
            .withOption('order', [0, 'asc'])
            .withDisplayLength(5)
            .withPaginationType('simple_numbers')
            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })
            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_designation_title').withTitle('Designation Title'),
                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '31%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<button class="btn btn-primary" ng-click="EditData(' + data.es_designation_id + ');">' +
                           '<i class="icon-edit"></i> Edit' + '</button>&nbsp;' +
                           '<button class="btn btn-danger" ng-click="DeleteData(' + data.es_designation_id + ');">' +
                           '<i class="icon-remove icon-white"></i> Delete' + '</button>';
                })
            ];
        };

        $scope.InsertData = function()
        {
            var values = $scope.field;
            SimpleHttpRequest.Insert('POST','INSERT', 'es_designation', values)
            .then(function successCallback(response)
            {
                if(!response.data.Error)
                {
                    message.successMessageForInsert("<strong>Successfull !</strong> BPS Designation Inserted");
                    setTimeout(function()
                    {
                        $window.location.reload();
                    }, 3500);
                }
                else
                {
                    message.failedMessageForInsert("<strong>Error !</strong> Data Insertion Failed");
                }
            },
            function errorCallback(response)
            {
                message.failedMessageForInsert("<strong>Error!</strong> Data Insertion Failed !");
            });
        };

        $scope.EditData = function(id)
        {
            $http.get('http://localhost:3000/api/SELECTBYID/simpleselect/es_designation/es_designation_id/'+id)
            .success(function successCallback(data)
            {
                $scope.YesEdit = true;
                $scope.update = data.es_designation[0];
            });
        };

        $scope.UpdateData = function(id)
        {
            var values = $scope.update;

            SimpleHttpRequest.Update('UPDATE', 'es_designation', 'es_designation_id', id, values)
            .then(function successCallback(response)
            {
                message.successMessageForUpdate();
            },
            function errorCallback(response)
            {
                message.failedMessageForUpdate();
            });
        };

        $scope.DeleteData = function(id)
        {
            bootbox.confirm("Are you sure you want to delete this Record ?", function (confirmation)
            {
                if(confirmation)
                {
                    DelMainRecPicRecUnlinkPic.DeleteIt('', id, true, 'es_designation', 'es_designation_id')
                    {
                        setTimeout(function()
                        {
                            $window.location.reload();
                        }, 3500);
                    };
                }
            });
        };

        // Must Initialize it to Get Data.
        $scope.GetTData();
    });
    /********************************************** Designation Controller End ***************************************************/

    /******************************************* Directoriate Controller Start ***************************************************/
    Main_Module.controller('Directoriate_Controller', function Directoriate_Controller($q, $window, $scope, $http, $resource, $compile, DTOptionsBuilder, DTColumnBuilder, bootbox, SimpleHttpRequest, DelMainRecPicRecUnlinkPic, message)
    {
        $scope.field = {};
        $scope.update = {};
        /********************************** DISPLAY DATA START *******************************/
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectRec('GET', 'SELECT', 'es_directoriate')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_directoriate);
                });

                return deffered.promise;
            })
            .withOption('order', [0, 'asc'])
            .withDisplayLength(5)
            .withPaginationType('simple_numbers')
            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })
            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_directoriate_title').withTitle('Directoriate Title'),
                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '31%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<button class="btn btn-primary" ng-click="EditData(' + data.es_directoriate_id + ');">' +
                           '<i class="icon-edit"></i> Edit' + '</button>&nbsp;' +
                           '<button class="btn btn-danger" ng-click="DeleteData(' + data.es_directoriate_id + ');">' +
                           '<i class="icon-remove icon-white"></i> Delete' + '</button>';
                })
            ];
        };

        $scope.InsertData = function()
        {
            var values = $scope.field;
            SimpleHttpRequest.Insert('POST','INSERT', 'es_directoriate', values)
            .then(function successCallback(response)
            {
                if(!response.data.Error)
                {
                    message.successMessageForInsert("<strong>Successfull !</strong> BPS Directoriate Inserted");
                    setTimeout(function()
                    {
                        $window.location.reload();
                    }, 3500);
                }
                else
                {
                    message.failedMessageForInsert("<strong>Error !</strong> Data Insertion Failed");
                }
            },
            function errorCallback(response)
            {
                message.failedMessageForInsert("<strong>Error!</strong> Data Insertion Failed !");
            });
        };

        $scope.EditData = function(id)
        {
            $http.get('http://localhost:3000/api/SELECTBYID/simpleselect/es_directoriate/es_directoriate_id/'+id)
            .success(function successCallback(data)
            {
                $scope.YesEdit = true;
                $scope.update = data.es_directoriate[0];
            });
        };

        $scope.UpdateData = function(id)
        {
            var values = $scope.update;

            SimpleHttpRequest.Update('UPDATE', 'es_directoriate', 'es_directoriate_id', id, values)
            .then(function successCallback(response)
            {
                message.successMessageForUpdate();
            },
            function errorCallback(response)
            {
                message.failedMessageForUpdate();
            });
        };

        $scope.DeleteData = function(id)
        {
            bootbox.confirm("Are you sure you want to delete this Record ?", function (confirmation)
            {
                if(confirmation)
                {
                    DelMainRecPicRecUnlinkPic.DeleteIt('', id, true, 'es_directoriate', 'es_directoriate_id')
                    {
                        setTimeout(function()
                        {
                            $window.location.reload();
                        }, 3500);
                    };
                }
            });
        };

        // Must Initialize it to Get Data.
        $scope.GetTData();
    });
    /********************************************** Directoriate Controller End ***************************************************/



   
    /******************************************** INSERT Employee Controller Start ***********************************************/
    Main_Module.controller('Add_Employee_Controller', function Add_Employee_Controller($http, $window, $scope, SimpleHttpRequest, FetchFileNames, ExtractFileNames, GenerateFilesList, InsertPicHttpRequest, CheckMultipleErrors, message, DelMainRecPicRecUnlinkPic, FormatDate)
    {
        $scope.GetTData = function()
        {
            $scope.field = {};
            $scope.format = FormatDate.IncomingDateFilter(new Date());
            $scope.BPSwithETGS = [{bps_id:'', ETGS_bps_date:''}];

            $scope.add = function()
            {
                $scope.BPSwithETGS.push({bps_id:'', ETGS_bps_date:''});
            }

            $scope.delete = function(index)
            {
                if(index != 0)
                {
                    $scope.BPSwithETGS.splice(index, 1);
                }
            }

            $http.get('http://localhost:3000/api/SELECT/es_gender').success(function(data)
            {
                $scope.es_gender_details = data.es_gender;
            });

            $http.get('http://localhost:3000/api/SELECT/es_marital_status').success(function(data)
            {
                $scope.es_marital_status_details = data.es_marital_status;
            });

            $http.get('http://localhost:3000/api/SELECT/es_bps').success(function(data)
            {
                $scope.es_bps_details = data.es_bps;
            });

            $http.get('http://localhost:3000/api/SELECT/es_designation').success(function(data)
            {
                $scope.es_designation_details = data.es_designation;
            });

            $http.get('http://localhost:3000/api/SELECT/es_department').success(function(data)
            {
                $scope.es_department_details = data.es_department;
            });

            $http.get('http://localhost:3000/api/SELECT/es_division').success(function(data)
            {
                $scope.es_division_details = data.es_division;
            });

            $http.get('http://localhost:3000/api/SELECT/es_domicile').success(function(data)
            {
                $scope.es_domicile_details = data.es_domicile;
            });

            $http.get('http://localhost:3000/api/SELECT/es_employment_type').success(function(data)
            {
                $scope.es_employment_type = data.es_employment_type;
            $scope.field.employment_type_id = "1";
            });

            $http.get('http://localhost:3000/api/SELECT/es_service_type').success(function(data)
            {
                $scope.es_service_type = data.es_service_type;
            });
        };

        $scope.InsertData = function()
        {
            // Converting All Dates to MySQL Format
            $scope.field.officer_dob = FormatDate.OutGoingDateFilter($scope.field.es_officer_dob);
            $scope.field.officer_doappt = FormatDate.OutGoingDateFilter($scope.field.es_officer_doappt);
            $scope.field.officer_dor = FormatDate.OutGoingDateFilter($scope.field.es_officer_dor);
            $scope.field.officer_dop = FormatDate.OutGoingDateFilter($scope.field.es_officer_dop);
            $scope.field.officer_EDFA = FormatDate.OutGoingDateFilter($scope.field.es_officer_EDFA);

            $scope.field.officer_apply_status = "1";

            if($scope.field.employment_type_id == "3")
            {
                $scope.field.service_type_id = "4"
            }

            var values = $scope.field;

            var values = _.omit(values, "es_officer_dob", "es_officer_doappt", "es_officer_dor", "es_officer_dop", "es_officer_EDFA");

            SimpleHttpRequest.Insert('POST','INSERT', 'es_officers', values)
            .then(function successCallback(response)
            {
                // console.log(response);
                if(!response.data.Error)
                {
                    var id = response.data.LastID;

                    var BPSwithETGS = [];
                    for(var item in $scope.BPSwithETGS)
                    {

                        BPSwithETGS.push({"ETGS_bps_date": FormatDate.OutGoingDateFilter($scope.BPSwithETGS[item].ETGS_bps_date), "bps_id": $scope.BPSwithETGS[item].bps_id, "officer_id": id});
                        
                        // $http({
                        //     url   : 'http://localhost:3000/api/INSERT/es_etgs',
                        //     method: 'POST',
                        //     data  : BPSwithETGS[item]
                        // })
                        // .then(function successCallback(response)
                        // {
                        //     console.log(response);
                        // });
                    }

                    setTimeout(function()
                    {                        
                        SimpleHttpRequest.MultiInsert('POST', 'INSERT', 'es_etgs', BPSwithETGS)
                        .then(function successCallback (response)
                        {
                            // console.log(response);
                            if(!response.data.Error)
                            {
                                if(FetchFileNames.GetUploaderStatus())
                                {
                                    setTimeout(function()
                                    {
                                        var NamesList = ExtractFileNames.UploadedFileNames(FetchFileNames.GetData2());

                                        var NamesWithID = GenerateFilesList.FilesListWithID(NamesList, 'officer_id', id);

                                        InsertPicHttpRequest.InsertPicture(NamesWithID)
                                        .then(function successCallback(response)
                                        {
                                            var results1 = CheckMultipleErrors.Check(response);

                                            if(!CheckMultipleErrors.Check(response))
                                            {
                                                message.successMessageForInsert();

                                                setTimeout(function()
                                                {
                                                    $window.location.reload()
                                                }, 3500);
                                            }
                                            else
                                            {
                                                DelMainRecPicRecUnlinkPic.DeleteIt(NamesList, id, false);
                                            }
                                        },
                                        function errorCallback(response)
                                        {
                                            DelMainRecPicRecUnlinkPic.DeleteIt(NamesList, id, false);
                                        });

                                    }, 1000);
                                }
                                else
                                {
                                    message.successMessageForInsert("<strong>Successfull !</strong> Data Inserted successfully without Pictures");

                                    setTimeout(function()
                                    {
                                        $window.location.reload()
                                    }, 3500);

                                }
                            }
                            else
                            {
                                SimpleDeleteHttpRequest.DeletedbRecord('DELETE', 'es_officers', 'es_officer_id', id)
                                message.failedMessageForInsert("<strong>Error!</strong> Insertion Failed !");
                            }
                        },
                        function errorCallback (response)
                        {
                            message.failedMessageForInsert("<strong>Error!</strong> Insertion Failed !");
                        });

                    }, 500);
                }
                else
                {
                    message.failedMessageForInsert("<strong>Error!</strong> Insertion Failed !");
                }
            },
            function errorCallback(response)
            {
                message.failedMessageForInsert("<strong>Error!</strong> Insertion Failed !");
            });
        };

        //Initialize
        $scope.GetTData();
    });
    /******************************************** INSERT Employee Controller End &&***********************************************/

    /**************************************** SEARCH & DELETE Employee Controller Start ******************************************/
    Main_Module.controller('Search_Employee_Controller', function Search_Employee_Controller($window, $scope, $filter, $http, $q, $compile, DTOptionsBuilder, DTColumnBuilder,  SimpleHttpRequest, SimpleDeleteHttpRequest, DelMainRecPicRecUnlinkPic, FetchFileNames, message, bootbox, FormatDate)
    {
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectRec('GET', 'SELECT', 'es_officers')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_officers);
                });

                return deffered.promise;
            })
            // .withDOM('frtip')
            .withOption('order', [0, 'asc'])
            .withDisplayLength(100)
            .withPaginationType('full_numbers')
            .withButtons([
                'print',
                'excel'
            ])
            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })

            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_officer_id').withTitle('ID'),
                DTColumnBuilder.newColumn('es_officer_name').withTitle('Name'),
                DTColumnBuilder.newColumn('es_officer_fname').withTitle('Father Name'),
                DTColumnBuilder.newColumn('es_officer_personal_no').withTitle('P. No'),
                // DTColumnBuilder.newColumn('es_officer_cell').withTitle('Cell No'),

                DTColumnBuilder.newColumn('es_officer_dob').withTitle('D.O.B')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MMM-yyyy');
                }),
                
                DTColumnBuilder.newColumn('es_officer_doappt').withTitle('Date of Appt')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MMM-yyyy');
                }),
                
                DTColumnBuilder.newColumn('es_officer_dor').withTitle('Date of Ret')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MMM-yyyy');
                }),
                
                DTColumnBuilder.newColumn('es_bps_title').withTitle('BPS'),
                DTColumnBuilder.newColumn('es_officer_cnic').withTitle('C.N.I.C'),//.notVisible()
                DTColumnBuilder.newColumn('es_designation_title').withTitle('Designaiton'),//.notVisible()
                // DTColumnBuilder.newColumn('es_department_name').withTitle('Dept'),//.notVisible(),
                DTColumnBuilder.newColumn('es_employment_type_name').withTitle('Emp Type'),//.notVisible(),
                // DTColumnBuilder.newColumn('es_service_type_name').withTitle('Service Type').notVisible(),
                
                DTColumnBuilder.newColumn(null).withTitle('Actions').withOption('width', '10.2%').notSortable().withClass('toggle')
                .renderWith(function(data, type, full, meta)
                {
                    return '<button class="btn btn-success customButton" ng-show="'+ data.es_officer_apply_status +' == 1" ng-click="Apply(' + data.es_officer_id + ')">' +
                           '<i class="icon-ok icon-white"></i>' + '</button>&nbsp;' +
                           '<a class="btn btn-primary customButton" ng-href="#/update_employee/' + data.es_officer_id + '">' +
                           '<i class="icon-edit icon-white"></i>' + '</a>&nbsp;' +
                           '<button class="btn btn-danger customButton" ng-click="DeleteData(' + data.es_officer_id + ')">' +
                           '<i class="icon-remove icon-white"></i>' + '</button>';
                })
            ];
        };

        $scope.DeleteData = function(id)
        {
            bootbox.confirm("Are you sure you want to delete this Record ?", function (confirmation)
            {
                if(confirmation)
                {
                    DelMainRecPicRecUnlinkPic.DeleteIt('', id, true, 'es_officers', 'es_officer_id')
                    {
                        setTimeout(function()
                        {
                            $window.location.reload();
                        }, 3500);
                    };
                }
            });
        };

        $scope.Apply = function(id)
        {
            var TodayDate = new Date();
            
            var DateOfApply = FormatDate.OutGoingDateFilter(TodayDate);

            var values = 
            {
              "officer_id"                  : id,
              "cnic_attached"               : "0",
              "payslip_attached"            : "0",
              "paid_bill_attached"          : "0",
              "picture_attached"            : "0",
              "appointment_letter_attached" : "0",
              "transfer_order_attached"     : "0",
              "application_date"            : DateOfApply
            };

            // SimpleHttpRequest = {};
            // SimpleHttpRequest.Insert('POST', 'INSERT', 'es_application', values)
            // .then(function(response)
            // {
            //     console.log(response);
            // });

            $http({
                url: 'http://localhost:3000/api/INSERT/es_application',
                method: 'POST',
                data: values
            })
            .then(function successCallback(response)
            {
                var app_id = response.data.LastID;

                if(!response.data.Error)
                {
                    values = { "application_id": app_id, "officer_id": id}

                    $http({
                        url: 'http://localhost:3000/api/INSERT/es_waiting_list',
                        method: 'POST',
                        data: values
                    })
                    .then(function successCallback(response)
                    {
                        var WL_id = response.data.LastID;

                        if(!response.data.Error)
                        {                            
                            var values = {"es_officer_apply_status": "0"};
                            $http({
                                url: 'http://localhost:3000/api/UPDATE/es_officers/es_officer_id/'+id,
                                method: 'PUT',
                                data: values
                            })
                            .then(function successCallback(response)
                            {
                                message.GeneralSuccess("<strong>Successfull !</strong> Application Is Added to the Waiting List");
                                setTimeout(function()
                                {
                                    $window.location.reload()
                                }, 3500);
                            },
                            function errorCallback(argument)
                            {
                                SimpleDeleteHttpRequest.DeletedbRecord('DELETE', 'es_waiting_list', 'es_wl_id', WL_id);
                                SimpleDeleteHttpRequest.DeletedbRecord('DELETE', 'es_application', 'es_application_id', app_id);
                                message.failedMessageForInsert("<stong>Error !</strong> Application Failed, Something is Terribly Wrong");
                            });
                        }
                        else
                        {
                            SimpleDeleteHttpRequest.DeletedbRecord('DELETE', 'es_application', 'es_application_id', app_id);
                            message.failedMessageForInsert("<stong>Error !</strong> Request for Application Cannot be Processed.");
                        }
                    },
                    function errorCallback(response)
                    {
                        SimpleDeleteHttpRequest.DeletedbRecord('DELETE', 'es_application', 'es_application_id', app_id);
                        message.failedMessageForInsert("<stong>Error !</strong> Request for Application Cannot be Processed.");
                    });
                }
                else
                {
                    message.failedMessageForInsert("<stong>Error !</strong> Request for Application Cannot be Processed.");
                }
            },
            function errorCallback(response)
            {
                message.failedMessageForInsert("<stong>Error !</strong> Request for Application Cannot be Processed.");
            });
        };

        // Always Initialize it to Render the Tables
        $scope.GetTData();            
    });
    /**************************************** SEARCH & DELETE Employee Controller Start ******************************************/

    /******************************************* UPDATE Employee Controller Start ************************************************/
    Main_Module.controller('Update_Employee_Controller', function Update_Employee_Controller($routeParams, $filter, $window, FormatDate, $scope, $http, SimpleHttpRequest, SimpleDeleteHttpRequest, FetchFileNames, ExtractFileNames, GenerateFilesList, CheckMultipleErrors, InsertPicHttpRequest, DelMainRecPicRecUnlinkPic, message)
    {
        var officer_id = $routeParams.officer_id;
        $scope.field = {};
        $scope.format = FormatDate.IncomingDateFilter(new Date());
        
        // Push NEWLY ADDED Records To This OR Push Records which needs to be Deleted.
        // Records can be Added & Edit OR Delete & Edit at the same time.
        var AddRecord   = [];
        var DelRecord   = [];
        var EditRecord  = [];
        var SplicedItem = [];

        $scope.BPSwithETGS = [];
        $scope.add = function()
        {
            $scope.BPSwithETGS.push({"es_ETGS_id": "", "es_ETGS_bps_date": "", "es_bps_id": "", "es_officer_id": officer_id});
        }
        $scope.delete = function(index)
        {
            if(index != 0)
            {
                SplicedItem.push($scope.BPSwithETGS[index]);
                $scope.BPSwithETGS.splice(index, 1);
            }
        }
        /********************************** UPDATE DATA START *******************************/
        // $scope.GetTData = function()
        // {
            $http.get('http://localhost:3000/api/SELECT/es_gender').success(function(data)
            {
                $scope.es_gender_details = data.es_gender;
            });

            $http.get('http://localhost:3000/api/SELECT/es_marital_status').success(function(data)
            {
                $scope.es_marital_status_details = data.es_marital_status;
            });

            $http.get('http://localhost:3000/api/SELECT/es_bps').success(function(data)
            {
                $scope.es_bps_details = data.es_bps;
            });

            $http.get('http://localhost:3000/api/SELECT/es_designation').success(function(data)
            {
                $scope.es_designation_details = data.es_designation;
            });

            $http.get('http://localhost:3000/api/SELECT/es_department').success(function(data)
            {
                $scope.es_department_details = data.es_department;
            });

            $http.get('http://localhost:3000/api/SELECT/es_division').success(function(data)
            {
                $scope.es_division_details = data.es_division;
            });

            $http.get('http://localhost:3000/api/SELECT/es_domicile').success(function(data)
            {
                $scope.es_domicile_details = data.es_domicile;
            });

            $http.get('http://localhost:3000/api/SELECT/es_employment_type').success(function(data)
            {
                $scope.es_employment_type = data.es_employment_type;
            });

            $http.get('http://localhost:3000/api/SELECT/es_service_type').success(function(data)
            {
                $scope.es_service_type = data.es_service_type;
            });

            $http.get("http://localhost:3000/api/SELECTBYID/simpleselect/es_officers/es_officer_id/"+officer_id).success(function(data)
            {
                $scope.field = data.es_officers[0];
                $scope.field.officer_dob = FormatDate.IncomingDateFilter(data.es_officers[0].es_officer_dob);
                $scope.field.officer_doappt = FormatDate.IncomingDateFilter(data.es_officers[0].es_officer_doappt);
                $scope.field.officer_dor = FormatDate.IncomingDateFilter(data.es_officers[0].es_officer_dor);
                $scope.field.officer_dop = FormatDate.IncomingDateFilter(data.es_officers[0].es_officer_dop);
                $scope.field.officer_EDFA = FormatDate.IncomingDateFilter(data.es_officers[0].es_officer_EDFA);

                $scope.field.es_civil_servant = "1";
            });

            $http.get("http://localhost:3000/api/SELECTBYID/simpleselect/es_etgs/es_officer_id/"+officer_id).success(function(data)
            {
                $scope.BPSwithETGS = data.es_etgs;
                
                for(var item in $scope.BPSwithETGS)
                {
                    $scope.BPSwithETGS[item].es_ETGS_bps_date  = FormatDate.IncomingDateFilter(data.es_etgs[item].es_ETGS_bps_date);
                }
            });

            // Just keeping the record to match something with.
            $http.get("http://localhost:3000/api/SELECTBYID/simpleselect/es_etgs/es_officer_id/"+officer_id).success(function(data)
            {
                $scope.ToCheckBPSwithETGS = data.es_etgs;

                for(var item in $scope.ToCheckBPSwithETGS)
                {
                    $scope.ToCheckBPSwithETGS[item].es_ETGS_bps_date  = FormatDate.IncomingDateFilter(data.es_etgs[item].es_ETGS_bps_date);
                }
            });

            $http.get("http://localhost:3000/api/SelectTwoFieldsByID/es_picture_id/es_picture_name/es_picture/es_officer_id/"+officer_id).success(function(data)
            {
                $scope.field.pictureNames = data.es_picture;
            });
        // };


        $scope.UpdateData = function()
        {   
            // If Deleted AND Updated at the same time
            if($scope.BPSwithETGS.length < $scope.ToCheckBPSwithETGS.length)
            {
                // Delete
                for(var item in SplicedItem)
                {
                    SimpleDeleteHttpRequest.DeletedbRecord('DELETE', 'es_etgs', 'es_ETGS_id', SplicedItem[item].es_ETGS_id);
                }
                
                // Updated
                for(var item in $scope.BPSwithETGS)
                {        
                    if($scope.BPSwithETGS[item].es_ETGS_id != "")
                    {
                        EditRecord.push($scope.BPSwithETGS[item]);
                        EditRecord[item].es_ETGS_bps_date = FormatDate.OutGoingDateFilter(EditRecord[item].es_ETGS_bps_date);
                        EditRecord[item] = _.omit(EditRecord[item], "$$hashKey");

                        var id = EditRecord[item].es_ETGS_id
                        var DataLoad = EditRecord[item];

                        SimpleHttpRequest.Update('UPDATE', 'es_etgs', 'es_ETGS_id', id, DataLoad)
                    }
                }
            }
            // If Inserted AND Updated at the same time
            else if($scope.BPSwithETGS.length > $scope.ToCheckBPSwithETGS.length)
            {
                for(var item in $scope.BPSwithETGS)
                {   
                    //Inserted
                    if($scope.BPSwithETGS[item].es_ETGS_id == "")
                    {
                        $scope.BPSwithETGS[item].bps_id = $scope.BPSwithETGS[item].es_bps_id;
                        $scope.BPSwithETGS[item].ETGS_bps_date = FormatDate.OutGoingDateFilter($scope.BPSwithETGS[item].es_ETGS_bps_date);
                        $scope.BPSwithETGS[item].officer_id = $scope.BPSwithETGS[item].es_officer_id;
                        AddRecord = _.omit($scope.BPSwithETGS[item], "$$hashKey", "es_ETGS_id", "es_ETGS_bps_date", "es_bps_id", "es_officer_id");

                        SimpleHttpRequest.Insert('POST', 'INSERT', 'es_etgs', AddRecord)
                    }

                    // Updated
                    if($scope.BPSwithETGS[item].es_ETGS_id != "")
                    {
                        EditRecord.push($scope.BPSwithETGS[item]);
                        EditRecord[item].es_ETGS_bps_date = FormatDate.OutGoingDateFilter(EditRecord[item].es_ETGS_bps_date);
                        EditRecord[item] = _.omit(EditRecord[item], "$$hashKey");

                        var id = EditRecord[item].es_ETGS_id
                        var DataLoad = EditRecord[item];

                        SimpleHttpRequest.Update('UPDATE', 'es_etgs', 'es_ETGS_id', id, DataLoad)
                    }
                }
            }
            // If ONLY Updated
            else
            {
                for(var item in $scope.BPSwithETGS)
                {   
                    // Updated
                    if($scope.BPSwithETGS[item].es_ETGS_id != "")
                    {
                        EditRecord.push($scope.BPSwithETGS[item]);
                        EditRecord[item].es_ETGS_bps_date = FormatDate.OutGoingDateFilter(EditRecord[item].es_ETGS_bps_date);
                        EditRecord[item] = _.omit(EditRecord[item], "$$hashKey");

                        var id = EditRecord[item].es_ETGS_id
                        var DataLoad = EditRecord[item];

                        SimpleHttpRequest.Update('UPDATE', 'es_etgs', 'es_ETGS_id', id, DataLoad)
                    }
                }
            }

            $scope.field.es_officer_dob = FormatDate.OutGoingDateFilter($scope.field.officer_dob);
            $scope.field.es_officer_doappt = FormatDate.OutGoingDateFilter($scope.field.officer_doappt);
            $scope.field.es_officer_dor = FormatDate.OutGoingDateFilter($scope.field.officer_dor);
            $scope.field.es_officer_dop = FormatDate.OutGoingDateFilter($scope.field.officer_dop);
            $scope.field.es_officer_EDFA = FormatDate.OutGoingDateFilter($scope.field.officer_EDFA);
            
            if($scope.field.es_employment_type_id == "3")
            {
                $scope.field.es_service_type_id = ""
            }
            
            var values = $scope.field;

            var formFields = _.omit(values, "pictureNames", "officer_dob", "officer_EGS", "officer_doappt", "officer_dor", "officer_dop", "officer_EDFA");

            SimpleHttpRequest.Update('UPDATE', 'es_officers', 'es_officer_id', officer_id, formFields)
            .then(function (response)
            {
                if(!response.data.Error)
                {
                    if(FetchFileNames.GetUploaderStatus())
                    {
                        setTimeout(function()
                        {
                            var NamesList = ExtractFileNames.UploadedFileNames(FetchFileNames.GetData2());

                            var NamesWithID = GenerateFilesList.FilesListWithID(NamesList, 'officer_id', officer_id);

                            InsertPicHttpRequest.InsertPicture(NamesWithID)
                            .then(function successCallback(response)
                            {
                                var results1 = CheckMultipleErrors.Check(response);

                                if(!results1)
                                {
                                    message.successMessageForUpdate("<strong>Successfull !</strong> Data Updated With New Pictures.");
                                }
                                else
                                {
                                    message.failedMessageForUpdate("<strong>Error !</strong> New Pictures Insertion Failed.");
                                }
                            },
                            function errorCallback(response)
                            {
                                message.failedMessageForUpdate("<strong>Error !</strong> Pictures Updating Failed.");
                            });

                        }, 1000);
                    }
                    else
                    {
                        message.successMessageForUpdate("<strong>Successfull !</strong> Data Updated Without Any New Pictures.");
                    }
                }
                else
                {
                    message.failedMessageForUpdate();
                }
            },
            function errorCallback(response)
            {
                message.failedMessageForUpdate();
            });
        }

        $scope.hideRow = [];
        $scope.DeletePictureInside = function(id, picture_name, index)
        {
            // MAKE SURE TO DELETE PICTURE BY ID & PICTURE NAME - RIGHT NOW ITS ONLY DELETING BY PICTURE NAME
            //  ID = FIELD TO BE MATCHED TO
            //                                           NamesList, id, CallingMethod, PictureByFieldName, CustomCallback
            DelMainRecPicRecUnlinkPic.DeletePicRecord(picture_name, id, 'true', 'es_picture_id', function(CustomCallback)
            {
                var receivedResult = CustomCallback;
                if(!receivedResult)
                {
                    message.successMessageForDelete();
                    $scope.hideRow[index] = true;
                }
                else
                {
                    message.failedMessageForDelete();
                }

            });
        }

        // Initialize It
        // $scope.GetTData();
    });
    /******************************************* UPDATE Employee Controller End **************************************************/


    

    

    /******************************************** WAITING LIST 20+ Controller Start **********************************************/
    Main_Module.controller('TwentyPlus_Controller', function TwentyPlus_Controller($scope, $http, $filter, $q, $compile, DTOptionsBuilder, DTColumnBuilder,  SimpleHttpRequest, FormatDate)
    {
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectWL('POST', 'WaitingList', 'es_waiting_list', '20', '22', '1', '2', 'All')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_waiting_list);
                });

                return deffered.promise;
            })            
            .withOption('order', [0, 'asc'])
            .withDisplayLength(10)
            .withPaginationType('full_numbers')

            .withButtons([
                'colvis',
                'print',
                'excel'
            ])

            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })

            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_wl_id').withTitle('W.I.D'),
                DTColumnBuilder.newColumn('es_officer_id').withTitle('O.I.D'),
                DTColumnBuilder.newColumn('es_officer_name').withTitle('Name'),
                DTColumnBuilder.newColumn('es_officer_fname').withTitle('Father Name'),
                DTColumnBuilder.newColumn('es_designation_title').withTitle('Designation'),
                DTColumnBuilder.newColumn('es_bps_title').withTitle('BPS').withOption('width', '6%'),
                DTColumnBuilder.newColumn('es_department_name').withTitle('Department'),//.withOption('width', '14%'),
                
                DTColumnBuilder.newColumn('es_ETGS_bps_date').withTitle('Date of E.T.G.S')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_application_date').withTitle('Date of Application')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_officer_dob').withTitle('Date of Birth')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                // DTColumnBuilder.newColumn('es_officer_cell').withTitle('Cell'),
                // DTColumnBuilder.newColumn('es_officer_phone').withTitle('Phone'),

                DTColumnBuilder.newColumn('es_employment_type_name').withTitle('Emp Type'),
                DTColumnBuilder.newColumn('es_service_type_name').withTitle('Service Type'),

                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '8%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<a class="btn btn-success" ng-href="#/Allot_House/' + data.es_officer_id + '">' +
                           '<i class="icon-ok icon-white"></i> Allot' + '</a>';
                })
            ];
        };

        // Always Initialize it to Render the Tables
        $scope.GetTData();            
    });
    /******************************************** WAITING LIST 20+ Controller End ************************************************/

    /*************************************** WAITING LIST 17-19 P3 Controller Start **********************************************/
    Main_Module.controller('SeventeenToNinteenP3_Controller', function SeventeenToNinteenP3_Controller($scope, $http, $filter, $q, $compile, DTOptionsBuilder, DTColumnBuilder,  SimpleHttpRequest, FormatDate)
    {
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectWL('POST', 'WaitingList', 'es_waiting_list', '17', '19', '1', '2', 'All')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_waiting_list);
                });

                return deffered.promise;
            })            
            .withOption('order', [0, 'asc'])
            .withDisplayLength(10)
            .withPaginationType('full_numbers')

            .withButtons([
                'colvis',
                'print',
                'excel'
            ])

            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })

            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_wl_id').withTitle('W.I.D'),
                DTColumnBuilder.newColumn('es_officer_id').withTitle('O.I.D'),
                DTColumnBuilder.newColumn('es_officer_name').withTitle('Name'),
                DTColumnBuilder.newColumn('es_officer_fname').withTitle('Father Name'),
                DTColumnBuilder.newColumn('es_designation_title').withTitle('Designation'),
                DTColumnBuilder.newColumn('es_bps_title').withTitle('BPS').withOption('width', '6%'),
                DTColumnBuilder.newColumn('es_department_name').withTitle('Department'),//.withOption('width', '14%'),
                
                DTColumnBuilder.newColumn('es_ETGS_bps_date').withTitle('Date of E.T.G.S')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_application_date').withTitle('Date of Application')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_officer_dob').withTitle('Date of Birth')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                // DTColumnBuilder.newColumn('es_officer_cell').withTitle('Cell'),
                // DTColumnBuilder.newColumn('es_officer_phone').withTitle('Phone'),

                DTColumnBuilder.newColumn('es_employment_type_name').withTitle('Emp Type'),
                DTColumnBuilder.newColumn('es_service_type_name').withTitle('Service Type'),

                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '8%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<a class="btn btn-success" ng-href="#/Allot_House/' + data.es_officer_id + '">' +
                           '<i class="icon-ok icon-white"></i> Allot' + '</a>';
                })
            ];
        };

        // Always Initialize it to Render the Tables
        $scope.GetTData();            
    });
    /*************************************** WAITING LIST 17-19 P3 Controller End ************************************************/

    /******************************************* WAITING LIST 3 Controller Start *************************************************/
    Main_Module.controller('wl3_Controller', function wl3_Controller($scope, $http, $filter, $q, $compile, DTOptionsBuilder, DTColumnBuilder,  SimpleHttpRequest, FormatDate)
    {
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectWL('POST', 'WaitingList', 'es_waiting_list', '17', '19', '1', '2', '4')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_waiting_list);
                });

                return deffered.promise;
            })            
            .withOption('order', [0, 'asc'])
            .withDisplayLength(10)
            .withPaginationType('full_numbers')

            .withButtons([
                'colvis',
                'print',
                'excel'
            ])

            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })

            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_wl_id').withTitle('W.I.D'),
                DTColumnBuilder.newColumn('es_officer_id').withTitle('O.I.D'),
                DTColumnBuilder.newColumn('es_officer_name').withTitle('Name'),
                DTColumnBuilder.newColumn('es_officer_fname').withTitle('Father Name'),
                DTColumnBuilder.newColumn('es_designation_title').withTitle('Designation'),
                DTColumnBuilder.newColumn('es_bps_title').withTitle('BPS').withOption('width', '6%'),
                DTColumnBuilder.newColumn('es_department_name').withTitle('Department'),//.withOption('width', '14%'),
                
                DTColumnBuilder.newColumn('es_ETGS_bps_date').withTitle('Date of E.T.G.S')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_application_date').withTitle('Date of Application')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_officer_dob').withTitle('Date of Birth')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                // DTColumnBuilder.newColumn('es_officer_cell').withTitle('Cell'),
                // DTColumnBuilder.newColumn('es_officer_phone').withTitle('Phone'),

                DTColumnBuilder.newColumn('es_employment_type_name').withTitle('Emp Type'),
                DTColumnBuilder.newColumn('es_service_type_name').withTitle('Service Type'),

                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '8%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<a class="btn btn-success" ng-href="#/Allot_House/' + data.es_officer_id + '">' +
                           '<i class="icon-ok icon-white"></i> Allot' + '</a>';
                })
            ];
        };

        // Always Initialize it to Render the Tables
        $scope.GetTData();            
    });
    /******************************************* WAITING LIST 3 Controller End ***************************************************/
    
    /************************************ WAITING LIST 15-16 Secretraiate Controller Start ***************************************/
    Main_Module.controller('FifteenToSixteenSec_Controller', function FifteenToSixteenSec_Controller($scope, $http, $filter, $q, $compile, DTOptionsBuilder, DTColumnBuilder,  SimpleHttpRequest)
    {
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectWL('POST', 'WaitingList', 'es_waiting_list', '15', '16', '1', 'null', '4')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_waiting_list);
                });

                return deffered.promise;
            })
            .withOption('order', [0, 'asc'])
            .withDisplayLength(10)
            .withPaginationType('full_numbers')

            .withButtons([
                'colvis',
                'print',
                'excel'
            ])

            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })

            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_wl_id').withTitle('W.I.D'),
                DTColumnBuilder.newColumn('es_officer_id').withTitle('O.I.D'),
                DTColumnBuilder.newColumn('es_officer_name').withTitle('Name'),
                DTColumnBuilder.newColumn('es_officer_fname').withTitle('Father Name'),
                DTColumnBuilder.newColumn('es_designation_title').withTitle('Designation'),
                DTColumnBuilder.newColumn('es_bps_title').withTitle('BPS').withOption('width', '6%'),
                DTColumnBuilder.newColumn('es_department_name').withTitle('Department'),//.withOption('width', '14%'),

                DTColumnBuilder.newColumn('es_ETGS_bps_date').withTitle('Date of E.T.G.S')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_application_date').withTitle('Date of Application')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_officer_dob').withTitle('Date of Birth')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                // DTColumnBuilder.newColumn('es_officer_cell').withTitle('Cell'),
                // DTColumnBuilder.newColumn('es_officer_phone').withTitle('Phone'),

                // DTColumnBuilder.newColumn('es_employment_type_name').withTitle('Emp Type'),
                DTColumnBuilder.newColumn('es_employment_type_name_shortcut').withTitle('EType'),
                DTColumnBuilder.newColumn('es_service_type_name_shortcut').withTitle('SType'),

                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '8%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<a class="btn btn-success" ng-href="#/Allot_House/' + data.es_officer_id + '">' +
                        '<i class="icon-ok icon-white"></i> Allot' + '</a>';
                })
            ];
        };

        // Always Initialize it to Render the Tables
        $scope.GetTData();
    });
    /************************************ WAITING LIST 15-16 Secretraiate Controller End *****************************************/

    /************************************ WAITING LIST 15-16 Attached Controller Start ***************************************/
    Main_Module.controller('FifteenToSixteenAttached_Controller', function FifteenToSixteenAttached_Controller($scope, $http, $filter, $q, $compile, DTOptionsBuilder, DTColumnBuilder,  SimpleHttpRequest)
    {
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectWL('POST', 'WaitingList', 'es_waiting_list', '15', '16', '2', 'null', '4')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_waiting_list);
                });

                return deffered.promise;
            })
            .withOption('order', [0, 'asc'])
            .withDisplayLength(10)
            .withPaginationType('full_numbers')

            .withButtons([
                'colvis',
                'print',
                'excel'
            ])

            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })

            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_wl_id').withTitle('W.I.D'),
                DTColumnBuilder.newColumn('es_officer_id').withTitle('O.I.D'),
                DTColumnBuilder.newColumn('es_officer_name').withTitle('Name'),
                DTColumnBuilder.newColumn('es_officer_fname').withTitle('Father Name'),
                DTColumnBuilder.newColumn('es_designation_title').withTitle('Designation'),
                DTColumnBuilder.newColumn('es_bps_title').withTitle('BPS').withOption('width', '6%'),
                DTColumnBuilder.newColumn('es_department_name').withTitle('Department'),//.withOption('width', '14%'),

                DTColumnBuilder.newColumn('es_ETGS_bps_date').withTitle('Date of E.T.G.S')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_application_date').withTitle('Date of Application')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_officer_dob').withTitle('Date of Birth')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                // DTColumnBuilder.newColumn('es_officer_cell').withTitle('Cell'),
                // DTColumnBuilder.newColumn('es_officer_phone').withTitle('Phone'),

                // DTColumnBuilder.newColumn('es_employment_type_name').withTitle('Emp Type'),
                DTColumnBuilder.newColumn('es_employment_type_name_shortcut').withTitle('EType'),
                DTColumnBuilder.newColumn('es_service_type_name_shortcut').withTitle('SType'),

                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '8%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<a class="btn btn-success" ng-href="#/Allot_House/' + data.es_officer_id + '">' +
                        '<i class="icon-ok icon-white"></i> Allot' + '</a>';
                })
            ];
        };

        // Always Initialize it to Render the Tables
        $scope.GetTData();
    });
    /************************************ WAITING LIST 15-16 Secretraiate Controller End *****************************************/

    /************************************ WAITING LIST 12-14 Secretraiate Controller Start ***************************************/
    Main_Module.controller('TwelveToFourteenSec_Controller', function TwelveToFourteenSec_Controller($scope, $http, $filter, $q, $compile, DTOptionsBuilder, DTColumnBuilder,  SimpleHttpRequest)
    {
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectWL('POST', 'WaitingList', 'es_waiting_list', '12', '14', '1', 'null', '4')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_waiting_list);
                });

                return deffered.promise;
            })
            .withOption('order', [0, 'asc'])
            .withDisplayLength(10)
            .withPaginationType('full_numbers')

            .withButtons([
                'colvis',
                'print',
                'excel'
            ])

            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })

            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_wl_id').withTitle('W.I.D'),
                DTColumnBuilder.newColumn('es_officer_id').withTitle('O.I.D'),
                DTColumnBuilder.newColumn('es_officer_name').withTitle('Name'),
                DTColumnBuilder.newColumn('es_officer_fname').withTitle('Father Name'),
                DTColumnBuilder.newColumn('es_designation_title').withTitle('Designation'),
                DTColumnBuilder.newColumn('es_bps_title').withTitle('BPS').withOption('width', '6%'),
                DTColumnBuilder.newColumn('es_department_name').withTitle('Department'),//.withOption('width', '14%'),

                DTColumnBuilder.newColumn('es_ETGS_bps_date').withTitle('Date of E.T.G.S')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_application_date').withTitle('Date of Application')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_officer_dob').withTitle('Date of Birth')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                // DTColumnBuilder.newColumn('es_officer_cell').withTitle('Cell'),
                // DTColumnBuilder.newColumn('es_officer_phone').withTitle('Phone'),

                // DTColumnBuilder.newColumn('es_employment_type_name').withTitle('Emp Type'),
                DTColumnBuilder.newColumn('es_employment_type_name_shortcut').withTitle('Emp Type'),
                DTColumnBuilder.newColumn('es_service_type_name_shortcut').withTitle('Service Type'),

                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '8%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<a class="btn btn-success" ng-href="#/Allot_House/' + data.es_officer_id + '">' +
                        '<i class="icon-ok icon-white"></i> Allot' + '</a>';
                })
            ];
        };

        // Always Initialize it to Render the Tables
        $scope.GetTData();
    });
    /************************************ WAITING LIST 12-14 Secretraiate Controller End *****************************************/

    /************************************** WAITING LIST 12-14 Attached Controller Start *****************************************/
    Main_Module.controller('TwelveToFourteenAttached_Controller', function TwelveToFourteenAttached_Controller($scope, $http, $filter, $q, $compile, DTOptionsBuilder, DTColumnBuilder,  SimpleHttpRequest)
    {
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectWL('POST', 'WaitingList', 'es_waiting_list', '12', '14', '2', 'null', '4')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_waiting_list);
                });

                return deffered.promise;
            })
            .withOption('order', [0, 'asc'])
            .withDisplayLength(10)
            .withPaginationType('full_numbers')

            .withButtons([
                'colvis',
                'print',
                'excel'
            ])

            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })

            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_wl_id').withTitle('W.I.D'),
                DTColumnBuilder.newColumn('es_officer_id').withTitle('O.I.D'),
                DTColumnBuilder.newColumn('es_officer_name').withTitle('Name'),
                DTColumnBuilder.newColumn('es_officer_fname').withTitle('Father Name'),
                DTColumnBuilder.newColumn('es_designation_title').withTitle('Designation'),
                DTColumnBuilder.newColumn('es_bps_title').withTitle('BPS').withOption('width', '6%'),
                DTColumnBuilder.newColumn('es_department_name').withTitle('Department'),//.withOption('width', '14%'),

                DTColumnBuilder.newColumn('es_ETGS_bps_date').withTitle('Date of E.T.G.S')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_application_date').withTitle('Date of Application')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_officer_dob').withTitle('Date of Birth')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                // DTColumnBuilder.newColumn('es_officer_cell').withTitle('Cell'),
                // DTColumnBuilder.newColumn('es_officer_phone').withTitle('Phone'),

                DTColumnBuilder.newColumn('es_employment_type_name').withTitle('Emp Type'),
                DTColumnBuilder.newColumn('es_service_type_name').withTitle('Service Type'),

                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '8%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<a class="btn btn-success" ng-href="#/Allot_House/' + data.es_officer_id + '">' +
                        '<i class="icon-ok icon-white"></i> Allot' + '</a>';
                })
            ];
        };

        // Always Initialize it to Render the Tables
        $scope.GetTData();
    });
    /**************************************** WAITING LIST 12-14 Attached Controller End *****************************************/    

    /************************************* WAITING LIST 1-11 Secretraiate Controller Start ***************************************/
    Main_Module.controller('OneToElevenSec_Controller', function OneToElevenSec_Controller($scope, $http, $filter, $q, $compile, DTOptionsBuilder, DTColumnBuilder,  SimpleHttpRequest)
    {
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectWL('POST', 'WaitingList', 'es_waiting_list', '1', '11', '1', 'null', '4')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_waiting_list);
                });

                return deffered.promise;
            })
            .withOption('order', [0, 'asc'])
            .withDisplayLength(10)
            .withPaginationType('full_numbers')

            .withButtons([
                'colvis',
                'print',
                'excel'
            ])

            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })

            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_wl_id').withTitle('W.I.D'),
                DTColumnBuilder.newColumn('es_officer_id').withTitle('O.I.D'),
                DTColumnBuilder.newColumn('es_officer_name').withTitle('Name'),
                DTColumnBuilder.newColumn('es_officer_fname').withTitle('Father Name'),
                DTColumnBuilder.newColumn('es_designation_title').withTitle('Designation'),
                DTColumnBuilder.newColumn('es_bps_title').withTitle('BPS').withOption('width', '6%'),
                DTColumnBuilder.newColumn('es_department_name').withTitle('Department'),//.withOption('width', '14%'),

                DTColumnBuilder.newColumn('es_ETGS_bps_date').withTitle('Date of E.T.G.S')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_application_date').withTitle('Date of Application')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_officer_dob').withTitle('Date of Birth')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                // DTColumnBuilder.newColumn('es_officer_cell').withTitle('Cell'),
                // DTColumnBuilder.newColumn('es_officer_phone').withTitle('Phone'),

                DTColumnBuilder.newColumn('es_employment_type_name').withTitle('Emp Type'),
                DTColumnBuilder.newColumn('es_service_type_name').withTitle('Service Type'),

                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '8%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<a class="btn btn-success" ng-href="#/Allot_House/' + data.es_officer_id + '">' +
                        '<i class="icon-ok icon-white"></i> Allot' + '</a>';
                })
            ];
        };

        // Always Initialize it to Render the Tables
        $scope.GetTData();
    });
    /************************************ WAITING LIST 1-11 Secretraiate Controller End ******************************************/

    /************************************* WAITING LIST 1-11 Attached Controller Start *******************************************/
    Main_Module.controller('OneToElevenAttached_Controller', function OneToElevenAttached_Controller($scope, $http, $filter, $q, $compile, DTOptionsBuilder, DTColumnBuilder,  SimpleHttpRequest)
    {
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectWL('POST', 'WaitingList', 'es_waiting_list', '1', '11', '2', 'null', '4')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_waiting_list);
                });

                return deffered.promise;
            })
            .withOption('order', [0, 'asc'])
            .withDisplayLength(10)
            .withPaginationType('full_numbers')

            .withButtons([
                'colvis',
                'print',
                'excel'
            ])

            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })

            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_wl_id').withTitle('W.I.D'),
                DTColumnBuilder.newColumn('es_officer_id').withTitle('O.I.D'),
                DTColumnBuilder.newColumn('es_officer_name').withTitle('Name'),
                DTColumnBuilder.newColumn('es_officer_fname').withTitle('Father Name'),
                DTColumnBuilder.newColumn('es_designation_title').withTitle('Designation'),
                DTColumnBuilder.newColumn('es_bps_title').withTitle('BPS').withOption('width', '6%'),
                DTColumnBuilder.newColumn('es_department_name').withTitle('Department'),//.withOption('width', '14%'),

                DTColumnBuilder.newColumn('es_ETGS_bps_date').withTitle('Date of E.T.G.S')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_application_date').withTitle('Date of Application')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_officer_dob').withTitle('Date of Birth')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                // DTColumnBuilder.newColumn('es_officer_cell').withTitle('Cell'),
                // DTColumnBuilder.newColumn('es_officer_phone').withTitle('Phone'),

                DTColumnBuilder.newColumn('es_employment_type_name').withTitle('Emp Type'),
                DTColumnBuilder.newColumn('es_service_type_name').withTitle('Service Type'),

                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '8%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<a class="btn btn-success" ng-href="#/Allot_House/' + data.es_officer_id + '">' +
                        '<i class="icon-ok icon-white"></i> Allot' + '</a>';
                })
            ];
        };

        // Always Initialize it to Render the Tables
        $scope.GetTData();
    });
    /************************************** WAITING LIST 1-11 Attached Controller End ********************************************/

    /************************************* WAITING LIST 1-11 Class-IV Controller Start *******************************************/
    Main_Module.controller('class4_Controller', function class4_Controller($scope, $http, $filter, $q, $compile, DTOptionsBuilder, DTColumnBuilder,  SimpleHttpRequest)
    {
        $scope.GetTData = function()
        {
            $scope.dtOptions = DTOptionsBuilder
            .fromFnPromise(function()
            {
                var deffered = $q.defer();

                SimpleHttpRequest.SelectWL('POST', 'WaitingList', 'es_waiting_list', '1', '11', '3', 'null', '4')
                .then(function successCallback(response)
                {
                    deffered.resolve(response.data.es_waiting_list);
                });

                return deffered.promise;
            })
            .withOption('order', [0, 'asc'])
            .withDisplayLength(10)
            .withPaginationType('full_numbers')

            .withButtons([
                'colvis',
                'print',
                'excel'
            ])

            .withOption('createdRow', function(row, data, dataIndex)
            {
                $compile(angular.element(row).contents())($scope);
            })

            $scope.dtColumns =
            [
                DTColumnBuilder.newColumn('es_wl_id').withTitle('W.I.D'),
                DTColumnBuilder.newColumn('es_officer_id').withTitle('O.I.D'),
                DTColumnBuilder.newColumn('es_officer_name').withTitle('Name'),
                DTColumnBuilder.newColumn('es_officer_fname').withTitle('Father Name'),
                DTColumnBuilder.newColumn('es_designation_title').withTitle('Designation'),
                DTColumnBuilder.newColumn('es_bps_title').withTitle('BPS').withOption('width', '6%'),
                DTColumnBuilder.newColumn('es_department_name').withTitle('Department'),//.withOption('width', '14%'),

                DTColumnBuilder.newColumn('es_ETGS_bps_date').withTitle('Date of E.T.G.S')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_application_date').withTitle('Date of Application')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                DTColumnBuilder.newColumn('es_officer_dob').withTitle('Date of Birth')
                .renderWith(function(data, type)
                {
                    return $filter('date')(new Date(data), 'dd-MM-yyyy');
                }),

                // DTColumnBuilder.newColumn('es_officer_cell').withTitle('Cell'),
                // DTColumnBuilder.newColumn('es_officer_phone').withTitle('Phone'),

                DTColumnBuilder.newColumn('es_employment_type_name').withTitle('Emp Type'),
                DTColumnBuilder.newColumn('es_service_type_name').withTitle('Service Type'),

                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '8%')
                .renderWith(function(data, type, full, meta)
                {
                    return '<a class="btn btn-success" ng-href="#/Allot_House/' + data.es_officer_id + '">' +
                        '<i class="icon-ok icon-white"></i> Allot' + '</a>';
                })
            ];
        };

        // Always Initialize it to Render the Tables
        $scope.GetTData();
    });
    /************************************ WAITING LIST 1-11 Class-IV Controller End *********************************************/


    
    
    /*********************************************** ALLOT House Controller Start ************************************************/
    Main_Module.controller('Allot_House_Controller', function Allot_House_Controller($routeParams, $window, $http, $scope, SimpleHttpRequest, SimpleDeleteHttpRequest, FormatDate, message)
    {   
        var OID = $routeParams.officer_id;

        $http.get('http://localhost:3000/api/SELECTFIELDBYID/es_wl_status/es_waiting_list/es_officer_id/'+OID).then(function(response)
        {
            if(response.data.es_waiting_list[0].es_wl_status == "1")
            {

                $scope.NoRecordYet = true;
            }
        });

        $http.get('http://localhost:3000/api/SELECTBYID/joinselect/es_officers/es_officer_id/'+OID).success(function(data)
        {
            $scope.field = data.es_officers[0];
            $scope.field.es_officer_dob = FormatDate.IncomingDateDisplay(data.es_officers[0].es_officer_dob);
            $scope.field.es_officer_doappt = FormatDate.IncomingDateDisplay(data.es_officers[0].es_officer_doappt);
            $scope.field.es_officer_dor = FormatDate.IncomingDateDisplay(data.es_officers[0].es_officer_dor);
        });

        $http.get('http://localhost:3000/api/SELECT/es_colony').success(function(data)
        {
            $scope.es_colony_details = data.es_colony;
        });

        $scope.fetchHouses = function(colony_id)
        {

            $http.get('http://localhost:3000/api/SELECTBYID/joinselect/es_house/es_colony_id/'+colony_id).success(function(data)
            {
                $scope.es_house_details = data.es_house;
            });
        };

        $scope.HouseDetails = function(house_id)
        {
            $http.get('http://localhost:3000/api/SELECTBYID/joinselect/es_house/es_house_id/'+house_id).success(function(data)
            {
                $scope.SingleHouse = data.es_house[0];
            });
        };        

        $scope.HouseAlloted = function()
        {
            
            $http.get('http://localhost:3000/api/SELECTFIELDBYID/es_application_id/es_application/es_officer_id/'+OID)
            .then(function successCallback (response) 
            {
                var app_id = _.values(response.data.es_application[0], 'es_application_id');
                var house_id = $scope.SingleHouse.es_house_id;
                var colony_id = $scope.SingleHouse.es_colony_id;
                var DataLoad = {"es_house_occupied_status": "1"};

                SimpleHttpRequest.Update('UPDATE', 'es_house', 'es_house_id', house_id, DataLoad)
                .then(function successCallback(response)
                {
                    if(!response.data.Error)
                    {
                        var date_of_allotment = FormatDate.OutGoingDateFilter(new Date);
                        var date_of_vaccant = FormatDate.OutGoingDateFilter($scope.field.es_officer_dor);
                        
                        var DataLoad = {
                            "occupied_house_doalt": date_of_allotment,
                            "occupied_house_dov": date_of_vaccant,
                            "officer_id": OID,
                            "house_id": house_id,
                            "colony_id": colony_id,
                            "application_id": app_id[0]
                        }

                        $http({
                            url: 'http://localhost:3000/api/INSERT/es_occupied_house',
                            method: 'POST',
                            data: DataLoad
                        })
                        .then(function successCallback(response)
                        {
                            var occupied_id = response.data.LastID;

                            if(!response.data.Error)
                            {
                                var DataLoad = {"es_wl_status": "0"};

                                $http({
                                    url: 'http://localhost:3000/api/UPDATE/es_waiting_list/es_officer_id/'+OID,
                                    method: 'PUT',
                                    data: DataLoad
                                })
                                .then(function successCallback(response)
                                {
                                    if(!response.data.Error)
                                    {
                                        message.successMessageForInsert("<strong>Successfull !</strong> House Alloted.");
                                        //setTimeout(function()
                                        //{
                                        //    $window.location='#/wl3';
                                        //}, 3500);
                                    }
                                    else
                                    {
                                        var DataLoad = {"es_house_occupied_status": "0"};
                                        SimpleDeleteHttpRequest.DeletedbRecord('DELETE', 'es_occupied_house', 'es_occupied_house_id', occupied_id);
                                        SimpleHttpRequest.Update('UPDATE', 'es_house', 'es_house_id', house_id, DataLoad)
                                        message.failedMessageForUpdate("<strong>Error!</strong> House Cannot be Alloted at this time.");
                                    } 
                                },
                                function errorCallback(response)
                                {
                                    var DataLoad = {"es_house_occupied_status": "0"};
                                    SimpleDeleteHttpRequest.DeletedbRecord('DELETE', 'es_occupied_house', 'es_occupied_house_id', occupied_id);
                                    SimpleHttpRequest.Update('UPDATE', 'es_house', 'es_house_id', house_id, DataLoad);
                                    message.failedMessageForUpdate("<strong>Error!</strong> House Cannot be Alloted at this time.");
                                });
                            }
                            else
                            {
                                var DataLoad = {"es_house_occupied_status": "0"};
                                SimpleHttpRequest.Update('UPDATE', 'es_house', 'es_house_id', house_id, DataLoad);
                                message.failedMessageForUpdate("<strong>Error!</strong> House Cannot be Alloted at this time.");
                            }
                        },
                        function errorCallback(response)
                        {
                            var DataLoad = {"es_house_occupied_status": "0"};
                            SimpleHttpRequest.Update('UPDATE', 'es_house', 'es_house_id', house_id, DataLoad);
                            message.failedMessageForUpdate("<strong>Error!</strong> House Cannot be Alloted at this time."); 
                        });
                    }
                    else
                    {
                        message.failedMessageForUpdate("<strong>Error!</strong> House Cannot be Alloted at this time.");
                    }
                },
                function errorCallback(response)
                {
                    message.failedMessageForUpdate("<strong>Error!</strong> House Cannot be Alloted at this time.");
                });
            });
        };
    });
    /*********************************************** ALLOT House Controller End **************************************************/

})();