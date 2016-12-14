
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var hh = today.getHours();
if(mm<10)
mm = '0'+mm;

var localCopy;
var yyyy = today.getFullYear();
today = yyyy+'-'+mm+'-'+dd+' '+hh+':00:00.0';
var apiList = new Array();
var languageList = new Array();
var platformList = new Array();
var dateList = new Array();
var operationList = new Array();
var morrisCall = new Array();
var morrisToken = new Array();
var platformUserDonut = new Array();
var languageUserDonut = new Array();
var platformCallDonut = new Array();
var languageCallDonut = new Array();
var languageTokenDonut = new Array();
var platformTokenDonut = new Array();
var callAm = new Array();
var apiBuild = new Array();
var apiBuilds = new Array();
var tokenAm = new Array();
var platformAm = new Array();
var languageAm = new Array();
var totalCalls;
var lastHrCall;
var lastHrToken;
var totalTokens;
var deviceCount;
var revCallToday;
var revTokenToday;
var popularLanguage;
var popularLanguageCount;
var popLangCallCount
var popularPlatform;
var popularPlatformCount;
var popPlatCallCount;
var callForThis;
var tokenForThis;
var platformName = new Array();
	
$(document).ready(function(e) {
    



$.ajax({
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
												if (objUserDetailsJson.status == 1) 
												{
													 alert('call Done')
													 var datamsg = objUserDetailsJson.clientBeanList;
													 totalCalls = 0;
													 totalTokens = 0;
													 deviceCount = 0;
													 revCallToday = 0;
													 revTokenToday = 0;
													 lastHrCall = 0;
													 lastHrToken = 0;
													 popularLanguageCount = 0;
													 popularPlatformCount = 0;
													 popLangCallCount = 0;
													 popPlatCallCount= 0;
													 languageList.push(datamsg[0].language);
													 platformList.push(datamsg[0].platform);
													 dateList.push(datamsg[0].curTime);
													 operationList.push(datamsg[0].operation);
													 apiList.push(JSON.parse('{"name":"api1","value":"'+datamsg[0].apiKey+'"}'));
													 
													 

											for(var i = 0; i<datamsg.length; i++)
												{
														
														totalCalls+=parseInt(datamsg[i].callCount);
														totalTokens+=parseInt(datamsg[i].tokencount);
														deviceCount+=parseInt(datamsg[i].deviceCount);
														if(datamsg[i].curTime==today)
														{
															revCallToday+=parseInt(datamsg[i].callCount);
															revTokenToday+=parseInt(datamsg[i].tokencount);
															if(today.getHours() - datamsg[i].curTime.getHours()==1)
															{
																lastHrCall+=parseInt(datamsg[i].callCount);
																lastHrToken += parseInt(datamsg[i].tokencount);
															}
														}
														
													for(var j=0;j<apiList.length; j++)
														{
															if(datamsg[i].apiKey == apiList[j].value)
															{
																var uapi = false;
																break;
															}
															else
															uapi = true;
															}
															if(uapi)
															apiList.push(JSON.parse('{"name":"api'+(++j)+'","value":"'+datamsg[i].apiKey+'"}'));
													
													for(var j=0;j<languageList.length; j++)
														{
															if(datamsg[i].language == languageList[j])
															{
																var ulang = false;
																break;
															}
															else
															ulang = true;
															}
															if(ulang)
															languageList.push(datamsg[i].language);
														
													for(var j=0;j<platformList.length; j++)
														{
															if(datamsg[i].platform == platformList[j])
															{
																var uplat = false;
																break;
															}
															else
															uplat = true;
															}
															if(uplat)
															platformList.push(datamsg[i].platform);
													
													for(var j=0;j<dateList.length; j++)
														{
															if(datamsg[i].curTime == dateList[j])
															{
																var udate= false;
																break;
																}
															else
															udate = true;
															}
															if(udate)
															dateList.push(datamsg[i].curTime);
													for(var j=0;j<operationList.length; j++)
														{
															if(datamsg[i].operation == operationList[j])
															{
																var uoperate= false;
																break;
															}
															else
															uoperate = true;
															}
															if(uoperate)
															operationList.push(datamsg[i].operation);
														}
												}
														for(var k=0;k<languageList.length;k++)
														{	
															var callCount = 0;
															var tokenCount = 0;
															for(var j=0;j<datamsg.length;j++)
															{
																if(datamsg[j].language == languageList[k])
																	{
																	callCount+=parseInt(datamsg[j].callCount);
																	tokenCount+=parseInt(datamsg[j].tokencount);
																	}
																	
															}
															if(tokenCount>popularLanguageCount)
															{
																popularLanguageCount=tokenCount;
																popLangCallCount = callCount;
																popularLanguage = languageList[k];
																}
															
															languageCallDonut.push(JSON.parse('{"label":"'+languageList[k]+'", "value":"'+callCount+'"}'));
															languageTokenDonut.push(JSON.parse('{"label":"'+languageList[k]+'", "value":"'+tokenCount+'"}'));
															}
															for(var k=0;k<platformList.length;k++)
														{	
														switch(platformList[k]){
															case 1: platformName.push("iOS");
															break;
															case 2: platformName.push("Android");
															break;
															case 3: platformName.push("Windows");
															break;
															case 4: platformName.push("Web");
															break;
															case 5: platformName.push("jQuery");
															break;
															}
														
															var callCount = 0;
															var tokenCount = 0;
															for(var j=0;j<datamsg.length;j++)
															{
																if(datamsg[j].platform == platformList[k])
																	{
																	callCount+=parseInt(datamsg[j].callCount);
																	tokenCount+=parseInt(datamsg[j].tokencount);
																	}
															}
															if(tokenCount>popularPlatformCount)
															{
																popularPlatformCount=tokenCount;
																popPlatCallCount=callCount;
																popularPlatform = platformName[k];
																}
															platformCallDonut.push(JSON.parse('{"label":"'+platformList[k]+'", "value":"'+callCount+'"}'));
															platformTokenDonut.push(JSON.parse('{"label":"'+platformName[k]+'", "value":"'+tokenCount+'"}'));
															}
															for(var j=0;j<apiList.length;j++)
															{
																apiBuild.push(JSON.parse('{"balloonText": "[[title]] Calls :[[value]]","bullet": "round","id": "overview'+j+'","title": "'+apiList[j].name+'","type": "smoothedLine","valueField": "'+apiList[j].name+'"}'));
															apiBuilds.push(JSON.parse('{"balloonText": "[[title]] Tokens :[[value]]","bullet": "round","id": "overview'+j*2+'","title": "'+apiList[j].name+'","type": "smoothedLine","valueField": "'+apiList[j].name+'"}'));	
																
																for(var k=0;k<dateList.length;k++)
																{
																	callForThis = 0;
																	tokenForThis = 0;
																	for(var l=0; l<datamsg.length;l++)
													if(apiList[j].value == datamsg[l].apiKey && dateList[k]==datamsg[l].curTime) 
																		{
																			callForThis+=parseInt(datamsg[l].callCount);
																			tokenForThis+=parseInt(datamsg[l].tokencount);
																			}
														if(callAm.length<dateList.length)				
									{
										callAm.push(JSON.parse('{"date":"'+dateList[k]+'","'+apiList[j].name+'":"'+callForThis+'"}'));
									tokenAm.push(JSON.parse('{"date":"'+dateList[k]+'","'+apiList[j].name+'":"'+tokenForThis+'"}'));
									}
									else
															{
																var jstr = JSON.stringify(callAm[k]);
																var kstr = JSON.stringify(tokenAm[k])
																jstr=jstr.replace('}',',"'+apiList[j].name+'":"'+callForThis+'"}');
																callAm[k]= JSON.parse(jstr);
																kstr=kstr.replace('}',',"'+apiList[j].name+'":"'+tokenForThis+'"}');
																tokenAm[k]= JSON.parse(kstr);
																
																}		
																}
																}
													switcher("overview");
												
											});
						
						
	
											
		});	
										