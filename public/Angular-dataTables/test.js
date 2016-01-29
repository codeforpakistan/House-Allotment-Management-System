var Main_Module = angular.module('withAjax', ['datatables']).controller('WithAjaxController', WithAjaxController);

	function WithAjaxController(DTOptionsBuilder, DTColumnBuilder)
	{
	    var vm = this;

	    vm.dtOptions = DTOptionsBuilder.newOptions()
	    .withOption('http', {
         // Either you specify the AjaxDataProp here
         dataSrc: 'response',
         url: 'http://localhost:3000/api/SELECT/es_house',
         type: 'GET'
     	})
     	// .withDataProp('')
	    .withPaginationType('full_numbers');
	    
	    vm.dtColumns =
	    [
	        DTColumnBuilder.newColumn('es_house_id').withTitle('ID'),
	        DTColumnBuilder.newColumn('es_house_no').withTitle('House No'),
	        DTColumnBuilder.newColumn('es_house_rooms').withTitle('No of Rooms'),
	        DTColumnBuilder.newColumn('es_colony_id').withTitle('Colony'),
	        DTColumnBuilder.newColumn('es_city_id').withTitle('City')//.notVisible()
	    ];
	}


	
function ServerSideProcessingCtrl(DTOptionsBuilder, DTColumnBuilder) {
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         // Either you specify the AjaxDataProp here
         // dataSrc: 'data',
         url: '/angular-datatables/data/serverSideProcessing',
         type: 'POST'
     })
     // or here
     .withDataProp('data')
        .withOption('processing', true)
        .withOption('serverSide', true)
        .withPaginationType('full_numbers');
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('firstName').withTitle('First name'),
        DTColumnBuilder.newColumn('lastName').withTitle('Last name').notVisible()
    ];
}