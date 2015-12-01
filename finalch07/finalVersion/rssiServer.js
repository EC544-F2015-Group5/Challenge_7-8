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

var sampleDelay = 1000;
 

app.use(express.static(path.join(__dirname, 'public')));

//Note that with the XBeeAPI parser, the serialport's "data" event will not fire when messages are received!
portConfig = {
	baudRate: 9600,
  parser: XBeeAPI.rawParser()
};

var sp;
sp = new SerialPort.SerialPort(portName, portConfig);

app.get('/', function(req, res){
  res.sendfile('1.html');
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
 var nodeidentifierPacket = {  
  type: C.FRAME_TYPE.AT_COMMAND,
  command: "ND",

  commandParameter: []
}

var requestRSSI = function(){
  
  sp.write(XBeeAPI.buildFrame(RSSIRequestPacket));

 // sp.write(XBeeAPI.buildFrame(nodeidentifierPacket));
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
  var m =[]; var n = [];
  if (frame.type == 144 ){
    //console.log(frame.data);
   console.log("Beacon ID: " + frame.data[1] + ", RSSI: " + (frame.data[0]));
    //n = frame.nodeIdentification.nodeIdentifier;
  }
   //if(frame.type == 144){
   // m = frame.data[0];}
   
    /*switch (frame.type){
      
      case 144: //console.log(frame.data[0]); 
                 m = frame.data[0]; 
                break; 
      case 0x88: //console.log(frame.nodeIdentification.nodeIdentifier);
                  n = frame.nodeIdentification.nodeIdentifier;                  
               break;
    
    }*/

                  if (n == 1 ) x = m;
                  if (n == 2 )  y = m;
                  if (n == 3 ) z = m;
                  if (n == 4 ) w = m;
                   // console.log(n + " " + m);
                   // n.pop(); m.pop();






/*

    var fs = require('fs');
    //s.push(frame.data[0]+'\r\n');
    var A = -45.0;
    var n = 2.2;
    distance =math.round(math.pow(10.0,(A + frame.data[0])/(10.0*n)),3);

    if(frame.data[1] == 1) x = frame.data[0];
    if(frame.data[1] == 2) y = frame.data[0];
         if(frame.data[1] == 3) z = frame.data[0];
       if(frame.data[1] == 4) w = frame.data[0];*/

       var map0 = new Array();
       map0[0] = new Array(x,y,z,w);
       //map for partition 1
       var map1 = new Array();
       map1[0] = new Array(68,61,57,51);
       map1[1] = new Array(59,61,48,49);
       map1[2] = new Array(53,54,38,56);
       map1[3] = new Array(63,56,37,56);
       map1[4] = new Array(49,58,37,53);
       map1[5] = new Array(60,59,39,50);
       map1[6] = new Array(54,57,42,47);
       map1[7] = new Array(56,58,43,44);
       map1[8] = new Array(54,60,43,43);
       map1[9] = new Array(54,60,43,43);
       map1[10] = new Array(58,51,48,52);
       map1[11] = new Array(58,58,40,53);
      v1 =math.var(map1);

       //partition 2
      var map2 = new Array();
       map2[0] = new Array(60,53,62,37);
       map2[1] = new Array(62,54,59,39);
       map2[2] = new Array(55,66,48,45);
       map2[3] = new Array(51,53,47,47);
       map2[4] = new Array(49,57,58,42);
       map2[5] = new Array(53,59,52,49);
       map2[6] = new Array(57,55,49,44);
       map2[7] = new Array(60,57,49,45);
       map2[8] = new Array(65,57,50,39);
       map2[9] = new Array(57,68,49,42);
       map2[10] = new Array(50,54,45,48);
       map2[11] = new Array(57,60,55,47);
      v2 = math.var(map2);
       //partition 3
             var map3 = new Array();
       map3[0] = new Array(56,62,63,54);
       map3[1] = new Array(55,54,60,54);
       map3[2] = new Array(55,54,60,54);
       map3[3] = new Array(49,51,48,48);
       map3[4] = new Array(54,52,53,55);
       map3[5] = new Array(51,62,48,53);
       map3[6] = new Array(51,54,46,53);
       map3[7] = new Array(60,57,53,47);
       map3[8] = new Array(54,49,51,52);
       map3[9] = new Array(58,52,51,59);
         v3 = math.var(map3);

      var map4 = new Array();
       map4[0] = new Array(50,47,57,48);
       map4[1] = new Array(50,53,63,51);
       map4[2] = new Array(53,58,63,57);
       map4[3] = new Array(49,61,55,60);
       map4[4] = new Array(56,57,54,48);
       map4[5] = new Array(55,51,60,58);
       map4[6] = new Array(54,55,45,53);
       map4[7] = new Array(61,54,44,54);
       map4[8] = new Array(61,57,49,48);
       map4[9] = new Array(55,63,51,47);
       map4[10] = new Array(59,61,47,49);
       map4[11] = new Array(51,55,51,54);
       map4[12] = new Array(57,58,53,51);
       map4[13] = new Array(55,58,61,60);
       map4[14] = new Array(50,57,65,50);
       map4[15] = new Array(52,51,66,47);
       
        v4 = math.var(map4);
         var map5 = new Array();
       map5[0] = new Array(66,56,54,51);
       map5[1] = new Array(52,54,51,51);
       map5[2] = new Array(50,54,60,50);
       map5[3] = new Array(48,54,60,53);
       map5[4] = new Array(51,53,46,54);
       map5[5] = new Array(55,53,46,54);
       map5[6] = new Array(47,51,50,45);
       map5[7] = new Array(47,50,57,45);
       map5[8] = new Array(57,50,65,47);
       map5[9] = new Array(64,50,59,48);
       map5[10] = new Array(54,58,60,50);
       map5[11] = new Array(57,54,51,67);
       map5[12] = new Array(54,51,50,63);
      
       
       v5 = math.var(map5);
            var map6 = new Array();
       map6[0] = new Array(49,57,59,54);
       map6[1] = new Array(49,52,61,58);
       map6[2] = new Array(46,53,58,53);
       map6[3] = new Array(45,53,53,57);
       map6[4] = new Array(56,57,59,51);
       map6[5] = new Array(51,49,56,52);
       map6[6] = new Array(53,49,57,49);
       map6[7] = new Array(54,51,64,55);
       map6[8] = new Array(48,60,56,53);
       map6[9] = new Array(47,60,53,49);
       map6[10] = new Array(51,54,53,57);
       map6[11] = new Array(52,55,60,51);
       
       
      v6 = math.var(map6);

            var map7 = new Array();
       map7[0] = new Array(55,61,66,59);
       map7[1] = new Array(59,68,57,54);
       map7[2] = new Array(53,49,57,57);
       map7[3] = new Array(57,53,55,54);
       map7[4] = new Array(50,49,57,62);
       map7[5] = new Array(48,52,60,54);
       map7[6] = new Array(46,58,64,50);
       map7[7] = new Array(54,61,61,52);
       map7[8] = new Array(54,62,57,50);
       map7[9] = new Array(55,62,57,50);
       map7[10] = new Array(55,53,50,52);

       v7 = math.var(map7);

            var map8 = new Array();
       map8[0] = new Array(47,56,58,57);
       map8[1] = new Array(45,48,59,57);
       map8[2] = new Array(51,40,53,49);
       map8[3] = new Array(51,53,62,57);
       map8[4] = new Array(44,50,51,49);
       map8[5] = new Array(49,46,52,49);
       map8[6] = new Array(58,66,59,54);
       map8[7] = new Array(53,64,59,56);
       map8[8] = new Array(46,53,53,59);
       map8[9] = new Array(43,50,57,53);
       map8[10] = new Array(47,48,57,51);
       map8[11] = new Array(47,48,54,55);
       map8[12] = new Array(54,45,49,59);
       map8[13] = new Array(49,43,53,52);
       map8[14] = new Array(51,49,57,57);
       
       v8 = math.var(map8);
             var map9 = new Array();
       map9[0] = new Array(44,37,69,69);
       map9[1] = new Array(42,40,64,69);
       map9[2] = new Array(45,43,63,54);
       map9[3] = new Array(43,43,65,48);
       map9[4] = new Array(46,40,58,59);
       map9[5] = new Array(46,38,58,64);
       map9[6] = new Array(48,41,57,64);
       map9[7] = new Array(48,41,57,64);
       map9[8] = new Array(49,41,59,57);
       map9[9] = new Array(45,47,53,57);
       map9[10] = new Array(54,41,56,55);
       map9[11] = new Array(43,39,60,52);
       map9[12] = new Array(49,48,65,57);
       map9[13] = new Array(52,48,58,57);
       map9[14] = new Array(45,44,55,52);
       map9[15] = new Array(53,45,57,61);
       
      v9 = math.var(map9);
      var good = false;
    if (typeof(map0[0][0])!='undefined' && typeof(map0[0][1])!='undefined' && typeof(map0[0][2])!='undefined' && typeof(map0[0][3])!='undefined' ) {
        good = true; 
        console.log(map0);
    };    

       if(good){
       	console.log('Im here');
         var vari = [];
       
map1.push(map0);
var1 = math.var(map1);
vari.push(var1);
map1.pop();
//map1.splice(map1.indexof(map0),1);

map2.push(map0);
var2 = math.var(map2);
vari.push(var2);
map2.pop();

//map2.splice(map2.indexof(map0),1);

map3.push(map0);
var3 = math.var(map3);
vari.push(var3);
map3.pop();

//map3.splice(map3.indexof(map0),1);

map4.push(map0);
var4 = math.var(map4);
vari.push(var4);
map4.pop();

//map4.splice(map4.indexof(map0),1);

map5.push(map0);
var5 = math.var(map5);
vari.push(var5);
map5.pop();

//map5.splice(map5.indexof(map0),1);

map6.push(map0);
var6 = math.var(map6);
vari.push(var6);
map6.pop();

//map6.splice(map6.indexof(map0),1);

map7.push(map0);
var7 = math.var(map1);
vari.push(var7);
map7.pop();

//map7.splice(map7.indexof(map0),1);

map8.push(map0);
var8 = math.var(map8);
vari.push(var8);
map8.pop();

//map8.splice(map8.indexof(map0),1);

map9.push(map0);
var9 = math.var(map9);
vari.push(var9);
map9.pop();

//map9.splice(map9.indexof(map0),1);
//console.log(math.min(vari));
var array = [];
array=[v1,v2,v3,v4,v5,v6,v7,v8,v9];
var a = []
a = [math.abs(vari[0]-v1),math.abs(vari[1]-v2),math.abs(vari[2]-v3),math.abs(vari[3]-v4),math.abs(vari[4]-v5),math.abs(vari[5]-v6),math.abs(vari[6]-v7),math.abs(vari[7]-v8),math.abs(vari[8]-v9)];
var m = math.min(a);
for(var i = 0; i<a.length;i++){
 if (m == a[i]){
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
io.emit('action',8 );
}
else if(i == 8){
io.emit('action',9 );
}
//}
//}
}
       }
  }

});