$('#home').on('pageinit', function(){
	//code needed for home page goes here
        var addForm = $('#addItemForm');
                               
});	
		
$('#additem').on('pageinit', function(){

		var myForm = $('#addItemForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
                            errorMsgs.click();
                            var html = '';
                            for (var key in validator.submitted) {
                                var label = $('label[for^="' + key + '"]').not('[generated]');
                                var legend = label.closest('fieldset').find('.ui-controlgroup-label');
                                var fieldName = legend.length ? legend.text(): label.text();
                                html +='<li>' + fieldName +'</li>';
                            };
                            $("#errorMessages ul").html(html)
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};


