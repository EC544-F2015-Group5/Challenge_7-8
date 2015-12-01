var SerialPort = require("serialport");
var express = require('express');
var app = express();
var path = require('path');
var xbee_api = require('xbee-api');

var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var math = require('mathjs');
var count=0;
var dataset = [];
var dataset1 = [];

var C = xbee_api.constants;
var XBeeAPI = new xbee_api.XBeeAPI({
  api_mode: 2
});

var portName = process.argv[2];

var sampleDelay = 3000;


app.use(express.static(path.join(__dirname, 'public')));

//Note that with the XBeeAPI parser, the serialport's "data" event will not fire when messages are received!
portConfig = {
	baudRate: 9600,
  parser: XBeeAPI.rawParser()
};

var sp;
sp = new SerialPort.SerialPort(portName, portConfig);

app.get('/', function(req, res){
  res.sendfile('2.html');
});


// io.on('connection', function(socket){
//   console.log("haha");
// });

http.listen(3000, function(){
  console.log('listening on *:3000');
});



//Create a packet to be sent to all other XBEE units on the PAN.
// The value of 'data' is meaningless, for now.
var RSSIRequestPacket = {
  type: C.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST,
  destination64: "000000000000ffff",
  broadcastRadius: 0x01,
  options: 0x00,
  data: "test"
}

var requestRSSI = function(){
  sp.write(XBeeAPI.buildFrame(RSSIRequestPacket));
}

sp.on("open", function () {

  console.log('open');
  requestRSSI();
  setInterval(requestRSSI, sampleDelay);
});

var s = [];
var distance  = [];
var d = [];
var arr = [];
var e =[];
var x,y,z,w;
var var1,var2,var3,var4,var5,var6,var7,var8,var9;
var v1,v2,v3,v4,v5,v6,v7,v8,v9;

XBeeAPI.on("frame_object", function(frame) {
  if (frame.type == 144){
    console.log("Beacon ID: " + frame.data[1] + ", RSSI: " + (frame.data[0]));
   // console.log(frame.data[0]);
    var fs = require('fs');
    //s.push(frame.data[0]+'\r\n');
    var A = -45.0;
    var n = 2.2;
    distance =math.round(math.pow(10.0,(A + frame.data[0])/(10.0*n)),3);

    if(frame.data[1] == 2) x = frame.data[0];
    if(frame.data[1] == 3) y = frame.data[0];
         if(frame.data[1] == 4) z = frame.data[0];
       if(frame.data[1] == 4) w = frame.data[0];
     var map0 = new Array();
       map0[0] = new Array(x,y,z,w);
       //map for partition 1

/*

      var good = false;
    if (typeof(map0[0][0])!='undefined' && typeof(map0[0][1])!='undefined' && typeof(map0[0][2])!='undefined' && typeof(map0[0][3] != 'undefined') ) {
        good = true;
        console.log(map0);
    };

       if(good){
       	console.log('Im here');
         var vari = [];
      var diff = [];
      // var r = [];var s = []; var t = []; var u =[]; var v = [];
      // var x = []; var y = []; var z = []; var w = [];
var r = [];
for(var i = 0; i < map1.length; i++)
{
  r.push(math.subtract(map1[i],map0[0]));
}
var varr = math.var(r);
diff.push(varr);
r = [];
for(var i = 0; i < map2.length; i++)
{
  r.push(math.subtract(map2[i],map0[0]));
}
var vars = math.var(r);
diff.push(vars);
r = [];
for(var i = 0; i < map3.length; i++)
{
  r.push(math.subtract(map3[i],map0[0]));
}
var vart = math.var(r);
diff.push(vart);
r = [];
for(var i = 0; i < map4.length; i++)
{
  r.push(math.subtract(map4[i],map0[0]));
}
var varu = math.var(r);
diff.push(varu);
r = [];
for(var i = 0; i < map5.length; i++)
{
  r.push(math.subtract(map5[i],map0[0]));
}
var varv = math.var(r);
diff.push(varv);
r = [];
for(var i = 0; i < map6.length; i++)
{
  r.push(math.subtract(map6[i],map0[0]));
}
var varw = math.var(r);
diff.push(varw);
r =[];
for(var i = 0; i < map7.length; i++)
{
  r.push(math.subtract(map7[i],map0[0]));
}
var varx = math.var(r);
diff.push(varx);
r = [];
for(var i = 0; i < map8.length; i++)
{
  r.push(math.subtract(map8[i],map0[0]));
}
var vary = math.var(r);
diff.push(vary);
r =[];
for(var i = 0; i < map9.length; i++)
{
  r.push(math.subtract(map9[i],map0[0]));
}
var varz = math.var(r);
diff.push(varz);
r = [];
console.log(diff);

var m = math.min(diff);

for(var i = 0; i<diff.length;i++){
 if (m == diff[i]){
if(i == 0){
	io.emit('action',1 );
}
else if(i == 1){
io.emit('action',2 );
}
else if(i == 2){
io.emit('action',3);
}
else if(i == 3){
io.emit('action',4 );
}
else if(i == 4){
io.emit('action',5 );
}
else if(i == 5){
io.emit('action',6);
}
else if(i == 6){
io.emit('action',7 );
}
else if(i == 7){
io.emit('action',8);
}
else if(i == 8){
io.emit('action',9 );
}
}
}
       }*/
  }

});
