var threshhold = 3.5;
var quakes = [];

function preload(){
  img = loadImage('flatmap.jpeg');
}

function setup() {
  noLoop();
	cnv = createCanvas(1200, 600);
 // cnv.mouseMoved(showInfo);
	let url =
   'https://earthquake.usgs.gov/earthquakes/feed/v1.0/' +
    'summary/all_day.geojson';
  loadJSON(url, drawEarthquake);
}

function draw() {
  background(255);
	var resizedHeight = img.height * width / img.width;
  //image(img, 0,0,img.width,img.height,0,0,width,height);
	img.resize(1200,600);
	image(img, 0,0,img.width,img.height);
	//img.resize(0,800);
//	print("Image height: "+ img.height + " Image width: " + img.width);
}

function drawEarthquake(earthquakes) {
  // Get the magnitude and name of the earthquake out of the loaded JSON
 push();
	//translate(width/2, height/2);
	for (var i=0; i<earthquakes.features.length; i++){
	  
		let earthquakeMag = round(earthquakes.features[i].properties.mag,1);
  	let earthquakeName = earthquakes.features[i].properties.place;
		var magName = earthquakeName + "\n"+earthquakeMag;
		//turn real lat and lon into mapped values to correspond to canvas
		//var mappedLat = map(earthquakes.features[i].geometry.coordinates[1],-90,90,(height/2), -1*(height/2));
		//var mappedLon = map(earthquakes.features[i].geometry.coordinates[0],-180,180,-1*(width/2), (width/2));
		
		var mappedLat = map(earthquakes.features[i].geometry.coordinates[1],-90,90,height, 0);
		var mappedLon = map(earthquakes.features[i].geometry.coordinates[0],-180,180,0,width);
		
		
		var quake = {      //circle var only lives for duration of loop
      mlat: mappedLat,
      mlon: mappedLon,
      mmag: earthquakeMag,
			mname: earthquakeName,
    };
		
		if(earthquakeMag > threshhold){
			quakes.push(quake);
			let lowcol = color(255,255,255); 
			let hicol = color(255,0,0); 
			fill(lerpColor(lowcol, hicol, map(earthquakeMag,3,9,0,1)));
  		ellipse(mappedLon, mappedLat, earthquakeMag * 10, earthquakeMag * 10);
  	//textAlign(CENTER);
			fill(0);
  	//	text(magName,mappedLon-50, mappedLat - 40, width, 30);
			text(earthquakeMag,mappedLon-4, mappedLat);//, width, 30);
			//text(magName,mappedLon-4, mappedLat);//, width, 30);
		 // print(magName,earthquakes.features[i].geometry.coordinates[0],earthquakes.features[i].geometry.coordinates[1]);
		}
	}
pop();
}

function mouseClicked(){
	//loop through the list of quakes, if dist from mouse is less than 10 
	//display text with the name and magnitude for the quake at that index
//	push();
//	translate(width/2, height/2);
	for(var i = 0; i < quakes.length; i++ ) {
		//var mapMouseY = map(mouseY,0,height,90, -90);
		//var mapMouseX = map(mouseX,0,width,-180, 180);
		var d = dist(mouseX, mouseY, quakes[i].mlon, quakes[i].mlat);
		//print(mouseX + " " + mapMouseX +" " +mouseY + " " +  mapMouseY + " " + quakes[i].mlon + " " + quakes[i].mlat);
		if (d < 10) {
			text(quakes[i].mname,mouseX - 20 ,mouseY -20);
			//print("In text true block");
		}
	
	} 
	//print(mouseX + " " +mouseY);
//	pop();
}