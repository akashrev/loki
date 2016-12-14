// JavaScript Document
var revCallToday;
var revTokenToday;
var revPopularLanguage;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
if(mm<10)
mm = '0'+mm;
var localCopy;
var yyyy = today.getFullYear();
today = yyyy+'-'+mm+'-'+dd+' '+'00:00:00.0';
var apiList = new Array();
		var tokenData = new Array();
		var morrisXdata = new Array();
		var callAreaData = new Array();
		var tokenAreaData = new Array()
		var languageCall = new Array();
		var languageToken = new Array();
		var popularLanguage = "";
		var popularLangCount = 0;
		var platformCall = new Array();
		var totalMonths = new Array();
		var totalPlatforms = new Array();
		var totalLanguages = new Array();
		var totalApis = new Array();
		var totalYears = new Array();
		var totalDevices = new Array();
		var totalCalls;
		var totalTokens;
		var morrisA = new Array();
		var morrisL = new Array();
		var langC = new Array();
		var langT = new Array();
		var dtstr = new Array();
		var dtstrcount;
		var userList= new Array();
		var morrisLKey = new Array();
$(document)
				.ready(
						function(event) {
							
							loadSalesGraph();
							function loadSalesGraph(){
	var seriesData = [ [], []];
	var random = new Rickshaw.Fixtures.RandomData(50);

	for (var i = 0; i < 50; i++) {
		random.addData(seriesData);
	}

	graph = new Rickshaw.Graph( {
		element: document.querySelector("#sales-graph"),
		height: 108,
		renderer: 'area',
		series: [
			{
				data: seriesData[0],
				color: color_danger,
				name:'Transliteration'
			},{
				data: seriesData[1],
				color: '#f2f4f6',
				name:'Localization'
			}
		]
	} );
	var hoverDetail = new Rickshaw.Graph.HoverDetail( {
		graph: graph
	});

	setInterval( function() {
		random.removeData(seriesData);
		random.addData(seriesData);
		graph.update();

	},1000);
}

							
							
							
							var userDataSet;
							var usageDataForUser = "";

							$
									.ajax({
										type : "GET",
										async : true,
										contentType : "application/json;charset=UTF-8",
										url : "http://localhost:8080/laas/getApiListByUsername",
										data : "username=" + "laasadmin@reverieinc.com"
									})
									.done(
											function(msg) {
												//redirect accordingly
												//			event.preventDefault();
												var objUserDetailsJson = msg;

												if (objUserDetailsJson.status == 1) {
													alert('call Done')
													var datamsg = objUserDetailsJson.clientBeanList;
													var lmg = JSON
															.stringify(datamsg[0].apiKey);

													//For Listing All APIs
													var dataExtractTotal = dataExtractTotal();

													function dataExtractTotal() {

														totalCalls = 0;
														totalTokens = 0;
														morrisXdata[0] = datamsg[0].curTime;
														totalApis[0] = datamsg[0].apiKey;
														totalPlatforms[0] = datamsg[0].platform;
														totalLanguages[0] = datamsg[0].language;
														var monthCount = 0;
														revCallToday = 0;
														revTokenToday = 0;
														// 														totalMonths[0] = datamsg[0].month;

														for (var i = 0; i < datamsg.length; i++) {
															
															var count = 0;
															var counts = 0;
															var mcount = 0;
															var ycount = 0;
															var countmor = 0;
															var apiCount = 0;
															
															
															
															if(datamsg[i].curTime==today)
															{
																revCallToday+=parseInt(datamsg[i].callCount);
															revTokenToday+=parseInt(datamsg[i].tokencount);
															}
															totalCalls += parseInt(datamsg[i].callCount);
															totalTokens += parseInt(datamsg[i].tokencount);
															for (var apiChk = 0; apiChk < totalApis.length; apiChk++) {
																if (datamsg[i].apiKey == totalApis[apiChk].toString())
																	apiCount++;
															}

															if (apiCount == 0) {
																totalApis
																		.push(datamsg[i].apiKey);
																// 																continue;
															}
															for (var mchk = 0; mchk < totalMonths.length; mchk++) {
																if (datamsg[i].month == totalMonths[mchk])
																	mcount++;
															}
															if (mcount == 0) {
																totalMonths
																		.push(datamsg[i].month);

															}
															for (var ychk = 0; ychk < totalYears.length; ychk++) {
																if (datamsg[i].year == totalYears[ychk])
																	ycount++;
															}
															if (ycount == 0) {
																totalYears
																		.push(datamsg[i].year);

															}

															for (var j = 0; j < totalPlatforms.length; j++) {
																if (datamsg[i].platform == totalPlatforms[j])
																	count++;
															}

															if (count == 0) {
																totalPlatforms
																		.push(datamsg[i].platform);
																// 																continue;
															}

															for (var j = 0; j < totalLanguages.length; j++) {
																if (datamsg[i].language == totalLanguages[j])
																	counts++;
															}

															if (counts == 0) {
																totalLanguages
																		.push(datamsg[i].language);
																// 																continue;
															}
															

															for (var morc = 0; morc < morrisXdata.length; morc++) {
																if (datamsg[i].curTime == morrisXdata[morc])
																	countmor++;
															}

															if (countmor == 0) {
																morrisXdata
																		.push(datamsg[i].curTime);
																// 																var temp = morrisXdata[0].toString();
																// 																temp = temp.match(/(-+[0-9])\d+-/g);
																// 																temp=temp.toString();
																// 																temp=temp.match(/\d\d/g);
																// 																totalMonths[monthCount]=temp;
																// 																monthCount++;
																// 																continue;

															}

														}
														var forCall = 0;
														var forToken = 0;
														for(var sif=0; sif<morrisXdata.length;sif++)
														{
															for(var fis=0; fis<datamsg.length; fis++)
															if(morrisXdata[sif]==datamsg[fis].curTime)
															{
																forCall += parseInt(datamsg[fis].callCount);
															 forToken += parseInt(datamsg[fis].tokencount);
															}
															var callAreaStr = '{"call":"'+forCall.toString()+'"'+',"y":"'+morrisXdata[sif]+'"}';
															var callAreaJson = JSON.parse(callAreaStr);
															callAreaData.push(callAreaJson); 
															forCall = 0;
															var tokenAreaStr = '{"token":"'+forToken.toString()+'"'+',"date":"'+morrisXdata[sif]+'"}';
															var tokenAreaJson = JSON.parse(tokenAreaStr);
															tokenAreaData.push(tokenAreaJson); 
															forToken = 0;
															        
														}
														var langTokCnt=0;
														for (j = 0; j < totalLanguages.length; j++) {
															languageCall[j] = 0;
															languageToken[j] = 0;
															for (i = 0; i < datamsg.length; i++)

															{
																
																var lngstr = (datamsg[i].language)
																		.toString();
																if (lngstr == totalLanguages[j])

																	{languageCall[j] += parseInt(datamsg[i].callCount);
																languageToken[j]+=parseInt(datamsg[i].tokencount);
																var finalpop = lngstr;
																	}
																
																
															}
															
															if(languageToken[j]>popularLangCount)
															{
																langTokCnt = languageToken[j];
																popularLangCount = langTokCnt;
														popularLanguage = finalpop;
														
															}
														}
												
														
														
														// 														for (plat = 0; plat < datamsg.length; plat++)
														// 															switch (datamsg[plat].platform) {
														// 															case 1: {
														// 																platformCall[0] += parseInt(datamsg[plat].callCount);
														// 																break;
														// 															}
														// 															case 2: {
														// 																platformCall[1] += parseInt(datamsg[plat].callCount);
														// 																break;
														// 															}
														// 															case 3: {
														// 																platformCall[2] += parseInt(datamsg[plat].callCount);
														// 																break;
														// 															}
														// 															case 4: {
														// 																platformCall[3] += parseInt(datamsg[plat].callCount);
														// 																break;
														// 															}
														// 															case 5: {
														// 																platformCall[4] += parseInt(datamsg[plat].callCount);
														// 																break;
														// 															}
														// 															}

													}

													
													var callForThis = 0;
													var tokenForThis = 0;
													dtstrcount = 0;
													while (dtstrcount < morrisXdata.length) {
														var revApiStr = "";
														var revApiStrArea = "";
														var morrisLine = '{ "y":"revApiList }';
														var morrisArea = '{ "y":"revApiList }';

														dtstr[dtstrcount] = ""
																+ morrisXdata[dtstrcount];
														for (var revStr = 0; revStr < totalApis.length; revStr++) {

															for (var cpa = 0; cpa < datamsg.length; cpa++)
																if (totalApis[revStr] == datamsg[cpa].apiKey
																		&& morrisXdata[dtstrcount] == datamsg[cpa].curTime) {
																	callForThis += parseInt(datamsg[cpa].callCount);
																	tokenForThis += parseInt(datamsg[cpa].tokencount);
																}
															revApiStr += ', "api'
																	+ revStr
																			.toString()
																	+ '":"'
																	+ callForThis
																			.toString()
																	+ '"';
															revApiStrArea += ', "api'
																	+ revStr
																			.toString()
																	+ '":"'
																	+ tokenForThis
																			.toString()
																	+ '"';
															callForThis = 0;
															tokenForThis = 0;
														}

														var dtval = dtstr[dtstrcount]
																+ '"'
														revApiStr = dtval
																+ revApiStr;
														revApiStrArea = dtval
																+ revApiStrArea;
														morrisLine = morrisLine
																.replace(
																		"revApiList",
																		revApiStr);
														morrisArea = morrisArea
																.replace(
																		"revApiList",
																		revApiStrArea);
														var JsonstrLine = JSON
																.parse(morrisLine);
														morrisL
																.push(JsonstrLine);
														var JsonstrArea = JSON
																.parse(morrisArea);
														morrisA
																.push(JsonstrArea);
														dtstrcount++;
													}
													
													var innerStr="";
													for(var revList = 0;revList<totalApis.length;revList++)
														{
														var temp=userList;
														for(var prsApi = 0;prsApi<datamsg.length;prsApi++)
															{
															if(totalApis[revList]==datamsg[prsApi].apiKey)
															{
																
															apiName = "API"+revList.toString();
															apiFull = totalApis[revList].toString();
															apiDate=datamsg[prsApi].createdOn;
															apiCreated = apiDate.toString();
															
															break;
															}
															
															
															}
														
														innerStr+=temp;
														}
													for (var revLang = 0; revLang < totalLanguages.length; revLang++) {
														var callForLang = 0;
														var tokForLang = 0;														
														var callStr = "";
														var callPie = '{"label":"revLangCount}';
														var tokPie = '{"label":"revLangCount}';
													
														for (var lngCnt = 0; lngCnt < datamsg.length; lngCnt++) {
															if (totalLanguages[revLang] == datamsg[lngCnt].language)
																{callForLang += parseInt(datamsg[lngCnt].callCount);
																tokForLang += parseInt(datamsg[lngCnt].tokencount);
																}
															// 												callStr = ''+totalLanguages[revLang]+',"value":"'+callForLang.toString()+'';

														}
														callStr = ''
																+ totalLanguages[revLang]
																+ '","value":"'
																+ callForLang
																		.toString()
																+ '"';
														tokStr = ''
																+ totalLanguages[revLang]
																+ '","value":"'
																+ tokForLang
																		.toString()
																+ '"';
														callPie = callPie
																.replace(
																		"revLangCount",
																		callStr);
														var callJson = JSON
																.parse(callPie);
																
														langC.push(callJson);
														tokPie = tokPie.replace("revLangCount",tokStr);
														var tokenJson = JSON.parse(tokPie);
														langT.push(tokenJson);
													}
													for (var revPlat = 0; revPlat < totalPlatforms.length; revPlat++) {
														var callForPlat = 0;
														var callStrP = "";

														for (var pltCnt = 0; pltCnt < datamsg.length; pltCnt++) {
															if (totalPlatforms[revPlat] == datamsg[pltCnt].platform)
																callForPlat += parseInt(datamsg[pltCnt].callCount);
															//														callStr = ''+totalLanguages[revLang]+',"value":"'+callForLang.toString()+'';

														}

														platformCall
																.push(callForPlat);
													}
													for (var revStr = 0; revStr < totalApis.length; revStr++)
														morrisLKey
																.push("api"
																		+ revStr
																				.toString());
													//Morris
													

													//morris Line Ends

													//Morris Area Starts

													var apiInf = '<li class="active"> <a href="#" id="apiName">revApiName</a> </li>'
													//sparkline
													for (var apiinf=0; apiinf<totalApis.length; apiinf++)
													{
														var listfill = apiInf;
														listfill=listfill.replace('revApiName', totalApis[apiinf].toString())
														$("#apiList").append(listfill)
													}
// 													var statt;
// 													for(var licApi=0;licApi<totalApis.length;licApi++)
													
// 													{
// 														var keyApi = ""+totalApis[licApi];
// 													licenseInfo(totalApis[licApi]);
// 													statt=licenseInfo(totalApis[licApi]);
// 													var licData = JSON.parse(statt);
// 													if (licData.status==1)
// 														{
// 														if(licData.localization ==1)
// 															alert("hello")
														
														
// 														}
// 													}
													/*
													
													 * remove later
													 */
													//				showErrMsg("idErrMsg","login OK!");
													success = 1;
													 switcher('overview');
													return true;

												}
											});
						});
						

											
											