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
/*var turn = function(){

sp.on("open", function(){
  sp.write("T");
});
}*/

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

    if(frame.data[1] == 1) x = frame.data[0];
    if(frame.data[1] == 2) y = frame.data[0];
         if(frame.data[1] == 3) z = frame.data[0];
       if(frame.data[1] == 4) w = frame.data[0];

       var map0 = new Array();
       map0[0] = new Array(x,y,z,w);

       var map1 = new Array();
map1[0] = new Array(74,46,69,60);
map1[1] = new Array(75,42,66,66);
map1[2] = new Array(82,53,78,61);
map1[3] = new Array(84,58,79,56);
map1[4] = new Array(79,54,69,70);
map1[5] = new Array(76,52,70,63);
map1[6] = new Array(80,51,69,62);
map1[7] = new Array(80,56,73,60);
map1[8] = new Array(75,54,78,63);
map1[9] = new Array(72,54,74,51);

var map2 = new Array();
 map2[0] = new Array(86,56,78,58);
 map2[1] = new Array(74,53,75,48);
 map2[2] = new Array(87,60,67,55);
 map2[3] = new Array(80,57,75,58);
 map2[4] = new Array(75,63,64,59);
 map2[5] = new Array(79,56,64,60);
 map2[6] = new Array(81,54,66,57);
 map2[7] = new Array(75,61,70,53);
 map2[8] = new Array(73,60,65,48);

 var map3 = new Array();
map3[0] = new Array(76,62,70,47);
map3[1] = new Array(82,58,68,54);
map3[2] = new Array(81,67,62,52);
map3[3] = new Array(73,59,69,48);
map3[4] = new Array(80,79,78,47);
map3[5] = new Array(75,65,73,55);
map3[6] = new Array(80,65,72,46);
map3[7] = new Array(75,59,86,52);
map3[8] = new Array(73,64,65,49);


var map4 = new Array();
       map4[0] = new Array(69,61,63,48);
       map4[1] = new Array(75,68,64,45);
       map4[2] = new Array(71,72,65,49);
       map4[3] = new Array(72,72,64,50);
       map4[4] = new Array(79,71,66,44);
       map4[5] = new Array(71,68,67,39);
       map4[6] = new Array(80,72,72,38);
       map4[7] = new Array(76,67,68,41);

       var map5 = new Array();
     map5[0] = new Array(69,75,67,45);
     map5[1] = new Array(73,63,59,40);
     map5[2] = new Array(80,65,71,51);
     map5[3] = new Array(82,75,67,50);
     map5[4] = new Array(79,68,61,56);
     map5[5] = new Array(83,76,62,59);
     map5[6] = new Array(73,72,63,51);
     map5[7] = new Array(70,63,56,51);

     var map6 = new Array();
map6[0] = new Array(66,68,55,50);
map6[1] = new Array(75,71,58,49);
map6[2] = new Array(65,67,63,57);
map6[3] = new Array(67,66,55,52);
map6[4] = new Array(64,73,60,52);
map6[5] = new Array(64,70,54,49);
map6[6] = new Array(61,69,63,60);
map6[7] = new Array(66,69,55,57);

var map7 = new Array();
map7[0] = new Array(71,74,62,56);
map7[1] = new Array(66,73,63,63);
map7[2] = new Array(63,70,63,68);
map7[3] = new Array(62,81,55,59);
map7[4] = new Array(70,81,57,63);
map7[5] = new Array(63,67,50,61);
map7[6] = new Array(65,67,55,52);

var map8 = new Array();
       map8[0] = new Array(70,73,53,65);
       map8[1] = new Array(71,76,50,58);
       map8[2] = new Array(65,73,53,69);
       map8[3] = new Array(68,82,63,63);
       map8[4] = new Array(77,78,59,58);
       map8[5] = new Array(70,77,56,66);
       map8[6] = new Array(66,76,53,67);


       var map9 = new Array();
 map9[0] = new Array(72,81,69,68);
 map9[1] = new Array(73,71,54,73);
 map9[2] = new Array(76,74,57,67);
 map9[3] = new Array(78,76,51,77);
 map9[4] = new Array(77,72,45,66);
 map9[5] = new Array(71,78,36,63);
 map9[6] = new Array(76,76,37,67);

 var map10 = new Array();
  map10[0] = new Array(69,81,38,72);
  map10[1] = new Array(77,77,38,69);
  map10[2] = new Array(780,70,35,64);
  map10[3] = new Array(75,86,45,68);
  map10[4] = new Array(71,70,36,65);
  map10[5] = new Array(66,75,47,68);

  var map11 = new Array();
   map11[0] = new Array(70,84,51,82);
  map11[1] = new Array(68,74,50,66);
  map11[2] = new Array(74,67,54,60);
  map11[3] = new Array(73,71,52,69);
  map11[4] = new Array(67,81,51,65);
  map11[5] = new Array(67,75,49,64);

  var map12 = new Array();
   map12[0] = new Array(69,80,48,63);
  map12[1] = new Array(72,78,55,64);
  map12[2] = new Array(72,76,57,64);
  map12[3] = new Array(68,85,48,69);
  map12[4] = new Array(78,82,52,64);
  map12[5] = new Array(70,83,53,73);
  map12[6] = new Array(64,86,46,68);

  var map13 = new Array();
            map13[0] = new Array(65,86,47,70);
         map13[1] = new Array(69,79,68,69);
         map13[2] = new Array(67,86,53,73);
         map13[3] = new Array(68,82,54,75);
         map13[4] = new Array(62,85,50,80);
         map13[5] = new Array(61,82,62,72);
         map13[6] = new Array(61,85,63,80);

         var map14 = new Array();
          map14[0] = new Array(69,82,54,75);
         map14[1] = new Array(61,82,55,76);
         map14[2] = new Array(51,83,62,81);
         map14[3] = new Array(51,85,61,77);
         map14[4] = new Array(68,79,57,72);
         map14[5] = new Array(74,84,63,80);
         map14[6] = new Array(61,80,64,78);

         var map15 = new Array();
         map15[0] = new Array(49,77,57,79);
        map15[1] = new Array(52,84,71,69);
        map15[2] = new Array(55,82,57,81);
        map15[3] = new Array(59,80,57,84);
        map15[4] = new Array(67,75,57,76);
        map15[5] = new Array(58,78,62,71);

        var map16 = new Array();
         map16[0] = new Array(53,77,65,72);
        map16[1] = new Array(59,76,71,72);
        map16[2] = new Array(49,75,62,73);
        map16[3] = new Array(57,74,67,82);
        map16[4] = new Array(51,80,64,80);
        map16[5] = new Array(54,82,67,75);
        map16[6] = new Array(43,80,63,79);
        map16[7] = new Array(50,83,63,74);

        var map17 = new Array();
         map17[0] = new Array(49,76,63,72);
        map17[1] = new Array(52,83,70,76);
        map17[2] = new Array(50,75,79,82);
        map17[3] = new Array(59,67,69,72);
        map17[4] = new Array(48,72,76,72);
        map17[5] = new Array(43,73,71,67);
        map17[6] = new Array(46,69,75,73);


        var map18 = new Array();
 map18[0] = new Array(38,73,77,65);
 map18[1] = new Array(38,75,73,66);
 map18[2] = new Array(37,78,69,70);
 map18[3] = new Array(46,76,71,66);
 map18[4] = new Array(39,80,71,69);
 map18[5] = new Array(46,76,78,63);
 map18[6] = new Array(44,75,80,62);

 var map19 = new Array();
  map19[0] = new Array(56,69,77,73);
 map19[1] = new Array(50,75,83,63);
 map19[2] = new Array(50,78,75,65);
 map19[3] = new Array(53,73,78,76);
 map19[4] = new Array(45,76,77,61);
 map19[5] = new Array(48,74,76,61);
 map19[6] = new Array(54,74,77,54);
 map19[7] = new Array(57,83,79,67);

 var map20 = new Array();
  map20[0] = new Array(62,75,72,57);
 map20[1] = new Array(58,66,77,67);
 map20[2] = new Array(56,77,79,63);
 map20[3] = new Array(68,82,78,63);
 map20[4] = new Array(58,68,78,64);
 map20[5] = new Array(65,70,86,67);

 var map21 = new Array();
  map21[0] = new Array(62,67,88,63);
 map21[1] = new Array(64,74,84,67);
 map21[2] = new Array(61,74,84,67);
 map21[3] = new Array(61,74,84,67);
 map21[4] = new Array(58,64,84,66);
 map21[5] = new Array(67,69,80,76);
 map21[6] = new Array(66,70,83,76);
 map21[7] = new Array(67,64,82,67);

 var map22 = new Array();
  map22[0] = new Array(60,63,74,62);
 map22[1] = new Array(61,67,79,73);
 map22[2] = new Array(65,64,83,70);
 map22[3] = new Array(61,68,84,65);
 map22[4] = new Array(58,64,86,68);

 var map23 = new Array();
  map23[0] = new Array(74,69,80,65);
 map23[1] = new Array(64,61,83,73);
 map23[2] = new Array(62,75,83,66);
 map23[3] = new Array(71,67,80,69);
 map23[4] = new Array(66,66,77,86);
 map23[5] = new Array(71,65,84,65);

 var map24 = new Array();
  map24[0] = new Array(73,58,87,66);
 map24[1] = new Array(69,53,83,66);
 map24[2] = new Array(74,53,80,71);
 map24[3] = new Array(79,58,84,74);
 map24[4] = new Array(70,58,87,69);
 map24[5] = new Array(69,53,83,63);

 var map25 = new Array();
  map25[0] = new Array(79,54,78,70);
 map25[1] = new Array(77,59,82,76);
 map25[2] = new Array(70,66,88,74);
 map25[3] = new Array(75,60,78,74);
 map25[4] = new Array(68,60,85,78);
 map25[5] = new Array(83,55,86,71);

 var map26 = new Array();
  map26[0] = new Array(71,48,83,69);
 map26[1] = new Array(69,48,84,70);
 map26[2] = new Array(72,52,86,67);
 map26[3] = new Array(75,43,81,64);
 map26[4] = new Array(77,41,81,80);
 map26[5] = new Array(80,32,83,76);

 var map27 = new Array();
  map27[0] = new Array(86,57,77,66);
 map27[1] = new Array(71,43,86,72);
 map27[2] = new Array(81,49,84,69);
 map27[3] = new Array(83,49,89,74);
 map27[4] = new Array(82,43,82,71);
 map27[5] = new Array(82,51,88,69);
 map27[6] = new Array(84,47,88,72);

 var map28 = new Array();
  map28[0] = new Array(74,43,80,65);
 map28[1] = new Array(73,45,80,67);
 map28[2] = new Array(81,56,77,76);
 map28[3] = new Array(77,45,83,72);
 map28[4] = new Array(85,57,78,66);
 map28[5] = new Array(81,46,80,65);
 map28[6] = new Array(86,45,78,65);

 var map29 = new Array();
  map29[0] = new Array(76,53,79,66);
 map29[1] = new Array(81,40,77,63);
 map29[2] = new Array(84,43,75,81);
 map29[3] = new Array(78,40,78,63);
 map29[4] = new Array(74,40,72,59);
 map29[5] = new Array(83,41,71,61);

      var good = false;
    if (typeof(map0[0][0])!='undefined' && typeof(map0[0][1])!='undefined' && typeof(map0[0][2])!='undefined' && typeof(map0[0][3])!='undefined' ) {
        good = true;
        console.log(map0);
    };

       if(good){
       	console.log('Im here');
        var r = []; var diff = [];
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

for(var i = 0; i < map10.length; i++)
{
 r.push(math.subtract(map10[i],map0[0]));
}
var va = math.var(r);
diff.push(va);
r = [];

for(var i = 0; i < map11.length; i++)
{
 r.push(math.subtract(map11[i],map0[0]));
}
var vb = math.var(r);
diff.push(vb);
r = [];

for(var i = 0; i < map12.length; i++)
{
 r.push(math.subtract(map12[i],map0[0]));
}
var vc = math.var(r);
diff.push(vc);
r = [];

for(var i = 0; i < map13.length; i++)
{
 r.push(math.subtract(map13[i],map0[0]));
}
var vd = math.var(r);
diff.push(vd);
r = [];

for(var i = 0; i < map14.length; i++)
{
 r.push(math.subtract(map14[i],map0[0]));
}
var ve = math.var(r);
diff.push(ve);
r = [];


for(var i = 0; i < map15.length; i++)
{
 r.push(math.subtract(map15[i],map0[0]));
}
var vf = math.var(r);
diff.push(vf);
r = [];

for(var i = 0; i < map16.length; i++)
{
 r.push(math.subtract(map16[i],map0[0]));
}
var vg = math.var(r);
diff.push(vg);
r = [];

for(var i = 0; i < map17.length; i++)
{
 r.push(math.subtract(map17[i],map0[0]));
}
var vh = math.var(r);
diff.push(vh);
r = [];

for(var i = 0; i < map18.length; i++)
{
 r.push(math.subtract(map18[i],map0[0]));
}
var vi = math.var(r);
diff.push(vi);
r = [];

for(var i = 0; i < map19.length; i++)
{
 r.push(math.subtract(map19[i],map0[0]));
}
var vj = math.var(r);
diff.push(vj);
r = [];

for(var i = 0; i < map20.length; i++)
{
 r.push(math.subtract(map20[i],map0[0]));
}
var vk = math.var(r);
diff.push(vk);
r = [];

for(var i = 0; i < map21.length; i++)
{
 r.push(math.subtract(map21[i],map0[0]));
}
var vl = math.var(r);
diff.push(vl);
r = [];

for(var i = 0; i < map22.length; i++)
{
 r.push(math.subtract(map22[i],map0[0]));
}
var vm = math.var(r);
diff.push(vm);
r = [];

for(var i = 0; i < map23.length; i++)
{
 r.push(math.subtract(map23[i],map0[0]));
}
var vn = math.var(r);
diff.push(vn);
r = [];

for(var i = 0; i < map24.length; i++)
{
 r.push(math.subtract(map24[i],map0[0]));
}
var vo = math.var(r);
diff.push(vo);
r = [];

for(var i = 0; i < map25.length; i++)
{
 r.push(math.subtract(map25[i],map0[0]));
}
var vp = math.var(r);
diff.push(vp);
r = [];

for(var i = 0; i < map26.length; i++)
{
 r.push(math.subtract(map26[i],map0[0]));
}
var vq = math.var(r);
diff.push(vq);
r = [];

for(var i = 0; i < map27.length; i++)
{
 r.push(math.subtract(map27[i],map0[0]));
}
var vr = math.var(r);
diff.push(vr);
r = [];

for(var i = 0; i < map28.length; i++)
{
 r.push(math.subtract(map28[i],map0[0]));
}
var vs = math.var(r);
diff.push(vs);
r = [];

for(var i = 0; i < map29.length; i++)
{
 r.push(math.subtract(map29[i],map0[0]));
}
var vt = math.var(r);
diff.push(vt);
r = [];
console.log(diff);
var m = math.min(diff);
for(var i = 0; i<diff.length;i++){
 if (m == diff[i]){
if(i == 0 ){
	io.emit('action',1 );
}
else if(i == 1 ){
io.emit('action',2 );
}
else if(i == 2  ){
io.emit('action',3);
}
else if(i == 3 ){
io.emit('action',4 );
}
else if(i == 4 ){
io.emit('action',5 );
}
else if(i == 5 ){
io.emit('action',6);
}
else if(i == 6 ){
io.emit('action',7 );
}
else if(i == 7 ){
io.emit('action',8 );
}
else if(i == 8 ){
io.emit('action',9 );
}
else if(i == 9 ){
io.emit('action',10 );
}
else if(i == 10 ){
io.emit('action',11 );
sp.write("T");
}
else if(i == 11 ){
io.emit('action',12 );
}
else if(i == 12 ){
io.emit('action',13 );
}
else if(i == 13 ){
io.emit('action',14 );
sp.write("T");
}
else if(i == 14 ){
io.emit('action',15 );
}
else if(i == 15 ){
io.emit('action',16 );
}
else if(i == 16 ){
io.emit('action',17 );
}
else if(i == 17 ){
io.emit('action',18 );
}
else if(i == 18 ){
io.emit('action',19 );
}
else if(i == 19 ){
io.emit('action',20 );
}
else if(i == 20 ){
io.emit('action',21 );
}
else if(i == 21 ){
io.emit('action',22 );
}
else if(i == 22 ){
io.emit('action',23 );
}
else if(i == 23 ){
io.emit('action',24 );
}
else if(i == 24 ){
io.emit('action',25 );
}
else if(i == 24 ){
io.emit('action',25 );
}
else if(i == 25 ){
io.emit('action',26 );
sp.write("T");
}
else if(i == 26 ){
io.emit('action',27 );
}
else if(i == 27 ){
io.emit('action',28 );
}
else if(i == 28 ){
io.emit('action',29 );
}


}
}
       }
  }

});
