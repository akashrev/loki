
function localizer(){
	
	
	$
									.ajax({
										type : "GET",
										async : true,
										contentType : "application/json;charset=UTF-8",
										url : "http://localhost:8080/laas/getLocalizer",
										data : "apiKey=3612ca85654b6de85942c929abe7193b4713"
									})
									.done(
											function(msg) {
												alert("arre locall hauchi")
												var localizerData = msg;
												if(localizerData.status ==1)
												{
													localCopy = localizerData.localizerDataList
													
													$('#example3').dataTable( {
														"bProcessing":true,
														"clengthMenu": [10, 25, 50],
														"searching": true,
														"bPaginate": true,
        												"sPaginationType": "full_numbers",
														
														"aaData": localCopy,
														"aoColumns":[
															{ "mData":"english_text" },
            { "mData": "hindi_text" },{ "mData":"assamese_text" },
            { "mData": "bengali_text" },{ "mData":"tamil_text" },
            { "mData": "telugu_text" },{ "mData":"odia_text" },
            { "mData": "kannada_text" },{ "mData":"gujarati_text" },
            { "mData": "marathi_text" },{ "mData": "punjabi_text" },{ "mData": "malayalam_text" },{ "mData": "context" }
															
														],
	
		
})
.on( 'click', 'tbody td', function (e) {
       var language="hindi";
	  
		   $(this).attr("contentEditable", true);
			$(this).addClass('reveditor');
		
		reverise(this);
		
	   
	   
	   
		 use = $(this).parent();
		 
		 var tou = use.toArray();
		 
    } );
													}
												
												});
	var use;
	var qer ="";
	var queryList = new Array();
	
	

	}  
	
	
	
	/*for(var i=0;i<tou[0].children.length;i++)
		 if(i<12)
		 { qer += '"'+puse[0].children[i].innerHTML+'":'+'"'+tou[0].children[i].innerHTML+'",';}
		 else
		 {
			 qer += '"'+puse[0].children[i].innerHTML+'":'+'"'+tou[0].children[i].innerHTML+'"';
			 }
		  qer = '{'+qer+'}';
			
		 reqJson = JSON.parse(qer);
		 queryList.push(reqJson);
		 qer="";
*/

function reverise(p){	
 var cIndex = p.cellIndex
 switch(cIndex){
	 case 1 : language = "hindi"
	 break;
	 case 2: language = "assamese";
	 break;
	 case 3 : language = "bengali"
	 break;
	 case 4: language = "tamil";
	 break;
	 case 5 : language = "telugu"
	 break;
	 case 6: language = "odia";
	 break;
	 case 7 : language = "kannada"
	 break;
	 case 8: language = "gujarati";
	 break;
	 case 9 : language = "marathi"
	 break;
	 case 10: language = "assamese";
	 break;
	 case 11 : language = "punjabi"
	 break;
	 default : language ="malayalam"
	 }
	  
	$('.reveditor').reverieEditor({
							    
	   language : language,
	   rApi :"3612ca85654b6de85942c929abe7193b4713",
	   rAppId:"webapp",
       // noOfSuggs:"1"
	  
	 });
	
	  
	}