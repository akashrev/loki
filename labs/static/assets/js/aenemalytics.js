/* Webarch Admin Dashboard 
/* This JS is Only DEMO Purposes 
-----------------------------------------------------------------*/	
$(document).ready(function() {		
$(".revCall").hide()
			$(".revLanguage").hide()
			$(".revToken").hide()
			$(".revPlatform").hide()
			$(".revOverview").show()
			
			
			
			});

	

	var dn = [
            ['hindi', 30],
            ['bengali', 30],
            
	];
	var plot = $.plotAnimator($("#platform-placeholder"), [
			{ 
				data: dn, 
				animator: {steps: 100, duration: 1000, start:0}, 		
				lines: {show:true,fill:0.8,lineWidth:6},	
				shadowSize:0,
				color: '#f35958'
			},{
				data: dn, 
				points: { show: true, fill: true, radius:6,fillColor:"#f35958",lineWidth:3 },	
				color: '#fff',				
				shadowSize:0
			}
			
		],{	xaxis: {
		tickLength: 2,
		tickDecimals: 0,
		min:2,

				font :{
					lineHeight: 13,
					style: "normal",
					weight: "bold",
					family: "sans-serif",
					variant: "small-caps",
					color: "#6F7B8A"
				}
			},
			yaxis: {
				ticks: 3,
                tickDecimals: 0,
				tickColor: "#f0f0f0",
				font :{
					lineHeight: 13,
					style: "normal",
					weight: "bold",
					family: "sans-serif",
					variant: "small-caps",
					color: "#6F7B8A"
				}
			},
			grid: {
				backgroundColor: { colors: [ "#fff", "#fff" ] },
				borderWidth:1,borderColor:"#f0f0f0",
				margin:0,
				minBorderMargin:0,							
				labelMargin:20,
				hoverable: true,
				clickable: true,
				mouseActiveRadius:6
			},
			legend: { show: true
			}
		});


	$("#platform-placeholder").bind("plothover", function (event, pos, item) {
				if (item) {
					var x = item.datapoint[0].toFixed(2),
						y = item.datapoint[1].toFixed(2);

					$("#tooltip").html(item.series.label + " of " + x + " = " + y)
						.css({top: item.pageY+5, left: item.pageX+5})
						.fadeIn(200);
				} else {
					$("#tooltip").hide();
				}
	
		});
	
	$("<div id='tooltip'></div>").css({
			position: "absolute",
			display: "none",
			border: "1px solid #fdd",
			padding: "2px",
			"background-color": "#fee",
			"z-index":"99999",
			opacity: 0.80
	}).appendTo("body");
	 
	
	var d2 = [
            [1, 30],
            [2, 30],
            [3, 30],
            [4, 40],
            [5, 70],
            [6, 45],
            [7, 50],
	];
	var plot = $.plotAnimator($("#language-placeholder"), [
			{ 
				data: d2, 
				animator: {steps: 100, duration: 1000, start:0}, 		
				lines: {show:true,fill:0.8,lineWidth:6},	
				shadowSize:0,
				color: '#f35958'
			},{
				data: d2, 
				points: { show: true, fill: true, radius:6,fillColor:"#f35958",lineWidth:3 },	
				color: '#fff',				
				shadowSize:0
			}
			
		],{	xaxis: {
		tickLength: 2,
		tickDecimals: 0,
		min:2,

				font :{
					lineHeight: 13,
					style: "normal",
					weight: "bold",
					family: "sans-serif",
					variant: "small-caps",
					color: "#6F7B8A"
				}
			},
			yaxis: {
				ticks: 3,
                tickDecimals: 0,
				tickColor: "#f0f0f0",
				font :{
					lineHeight: 13,
					style: "normal",
					weight: "bold",
					family: "sans-serif",
					variant: "small-caps",
					color: "#6F7B8A"
				}
			},
			grid: {
				backgroundColor: { colors: [ "#fff", "#fff" ] },
				borderWidth:1,borderColor:"#f0f0f0",
				margin:0,
				minBorderMargin:0,							
				labelMargin:20,
				hoverable: true,
				clickable: true,
				mouseActiveRadius:6
			},
			legend: { show: true
			}
		});


	$("#language-placeholder").bind("plothover", function (event, pos, item) {
				if (item) {
					var x = item.datapoint[0].toFixed(2),
						y = item.datapoint[1].toFixed(2);

					$("#tooltip").html(item.series.label + " of " + x + " = " + y)
						.css({top: item.pageY+5, left: item.pageX+5})
						.fadeIn(200);
				} else {
					$("#tooltip").hide();
				}
	
		});
	
	$("<div id='tooltip'></div>").css({
			position: "absolute",
			display: "none",
			border: "1px solid #fdd",
			padding: "2px",
			"background-color": "#fee",
			"z-index":"99999",
			opacity: 0.80
	}).appendTo("body");
	
	// Moris Charts - Line Charts
	
	
	
	
		
	/*	Morris.Area({
	  element: 'tokenTotal-area',
	  data: [
		{ y: '2006', a: 100, b: 90 },
		{ y: '2007', a: 75,  b: 65 },
		{ y: '2008', a: 50,  b: 40 },
		{ y: '2009', a: 75,  b: 65 },
		{ y: '2010', a: 50,  b: 40 },
		{ y: '2011', a: 75,  b: 65 },
		{ y: '2012', a: 100, b: 90 }
	  ],
	  xkey: 'y',
	  ykeys: ['a', 'b'],
	  labels: ['Series A', 'Series B'],
	  lineColors:['#0090d9','#b7c1c5'],
	  lineWidth:'0',
	   grid:'false',
	  fillOpacity:'0.5'
	}); */
	
	
	
	
	
	
	//Bar Chart  - Jquert flot

 
 
    function getMonthName(newTimestamp) {
        var d = new Date(newTimestamp);
 
        var numericMonth = d.getMonth();
        var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 
        var alphaMonth = monthArray[numericMonth];
 
        return alphaMonth;
    }
	

	 // ORDERED & STACKED CHART
    
