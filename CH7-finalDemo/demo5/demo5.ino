
#include <Wire.h>
#include <PID_v1.h>
#include <Servo.h>
#include <I2C.h>
#include <SoftwareSerial.h>
#include <XBee.h>
#include "stdlib.h"

#define    LIDARLite_ADDRESS   0x62          // Default I2C Address of LIDAR-Lite.
#define    RegisterMeasure     0x00          // Register to write to initiate ranging.
#define    MeasureValue        0x04          // Value to initiate ranging.
#define    RegisterHighLowB    0x8f          // Register to get both High and Low bytes in 1 call.

SoftwareSerial xbeeSerial(10,11);
XBee xbee = XBee();

//API Mode
XBeeResponse response  = XBeeResponse();
ZBRxResponse rx = ZBRxResponse();
ZBTxStatusResponse txStatus = ZBTxStatusResponse();
AtCommandResponse atResponse = AtCommandResponse();
XBeeAddress64 broadcastAddr = XBeeAddress64(0x00000000, 0x0000FFFF); 

//PID Mode
double input,output,setpoint;
PID pid0(&input,&output,&setpoint,3.0,0.05,0.0000839,DIRECT);

Servo myservo;
Servo wheels; // servo for turning the wheels
Servo esc; // not actually a servo, but controlled like one!

bool startup = true; // used to ensure startup only happens once
int pos = 0;         // Position of the servo (degress, [0, 180])
int distanceright, distanceleft, distance, LidarLeft, LidarRight;    // Distance measured
int startupDelay = 1000; // time to pause at each calibration step
int triggerPin1 = 13;
long distance1;
int sensorPins[] = {2,3}; // Array of pins connected to the sensor Power Enable lines
int sensorPinsArraySize = 2; // The length of the array
const int anPin1 = 0;
unsigned long pulse_width;
int pinReceptor = A1;
int sensorVal;
int black = 0;
double counter = 0;
int timer = 0;
double rotation = 0;
int count;
int count1;

void start_sensor(){
  digitalWrite(triggerPin1,HIGH);
  delay(1);
  digitalWrite(triggerPin1,LOW);
}


void setup()
{
  Serial.begin(9600);
  xbeeSerial.begin(9600);
  
  xbee.setSerial(xbeeSerial);
  
  // Servo control
  myservo.attach(5); 
  wheels.attach(8); // initialize wheel servo to Digital IO Pin #8
  esc.attach(9); // initialize ESC to Digital IO Pin #9
  calibrateESC();
  
  // LIDAR control
  I2c.begin(); // Opens & joins the irc bus as master
  delay(100); // Waits to make sure everything is powered up before sending or receiving data  
  I2c.timeOut(50); // Sets a timeout to ensure no locking up of sketch if I2C communication fails
  for (int i = 0; i < sensorPinsArraySize; i++){
    pinMode(sensorPins[i], OUTPUT); // Pin to first LIDAR-Lite Power Enable line
    Serial.print(sensorPins[i]);
  }
  //PID Control
  pid0.SetOutputLimits(0,45 );
  pid0.SetMode(AUTOMATIC);
  setpoint=45;
  pinMode(triggerPin1, OUTPUT);
}

// Get a measurement from the LIDAR Lite
void processResponse(){
  if (xbee.getResponse().isAvailable()) {
      // got something
      //xbee conntected
      if (xbee.getResponse().getApiId() == ZB_RX_RESPONSE) {
        // got a zb rx packet
        
        // now fill our zb rx class
        xbee.getResponse().getZBRxResponse(rx);
         
            
         String msg = String(rx.getData()[0]);
       // int id = int(xbee.getResponse().getFrameData()[10]);
               
        
          wheels.write(180);
        
      }
  }
}

int lidarGetRangeLeft(void)
{  
pulse_width = pulseIn(3, HIGH); // Count how long the pulse is high in microseconds
  if(pulse_width != 0){ // If we get a reading that isn't zero, let's print it
        pulse_width = pulse_width/10; // 10usec = 1 cm of distance for LIDAR-Lite
    Serial.println(pulse_width); // Print the distance
    return(pulse_width);
  }else{ // We read a zero which means we're locking up. 
    digitalWrite(4,LOW); // Turn off the sensor
    delay(1);// Wait 1ms
    digitalWrite(4,HIGH); //Turn on te sensor
    delay(1);//Wait 1ms for it to turn on.
  }
  delay(1); //Delay so we don't overload the serial port
}


int lidarGetRangeRight(void)
{  
  int val = -1;
  
  Wire.beginTransmission((int)LIDARLite_ADDRESS); // transmit to LIDAR-Lite
  Wire.write((int)RegisterMeasure); // sets register pointer to  (0x00)  
  Wire.write((int)MeasureValue); // sets register pointer to  (0x00)  
  Wire.endTransmission(); // stop transmitting

  delay(20); // Wait 20ms for transmit

  Wire.beginTransmission((int)LIDARLite_ADDRESS); // transmit to LIDAR-Lite
  Wire.write((int)RegisterHighLowB); // sets register pointer to (0x8f)
  Wire.endTransmission(); // stop transmitting

  delay(20); // Wait 20ms for transmit
  
  Wire.requestFrom((int)LIDARLite_ADDRESS, 2); // request 2 bytes from LIDAR-Lite

  if(2 <= Wire.available()) // if two bytes were received
  {
    val = Wire.read(); // receive high byte (overwrites previous reading)
    val = val << 8; // shift high byte to be high 8 bits
    val |= Wire.read(); // receive low byte as lower 8 bits
  }
 // Serial.println(val);
  return val;
}

//Initialization
void calibrateESC(){
    esc.write(180); // full backwards
    delay(startupDelay);
    esc.write(0); // full forwards
    delay(startupDelay);
    esc.write(90); // neutral
    delay(startupDelay);
    esc.write(90); // reset the ESC to neutral (non-moving) value
}

void turn(int distanceright,int distanceleft,int front)
{ if(distanceleft<distanceright)//more closer to left 
  {
  if(front>120)
  {
  if(distanceleft<30)
  wheels.write(90 + 40);
  else if(distanceleft>30 )
  wheels.write(90 - 15);
  else
   wheels.write(90);
  }
  else
  wheels.write(90 + 90);
  }
  if(distanceleft>distanceright) //more closer to right
  {
  if(front>120)
  {
  if(distanceright<30)
  wheels.write(90 - 15);
  else if(distanceright>30 )
  wheels.write(90 + 40);
  else
   wheels.write(90);
  }
  else
  wheels.write(90 + 90);
  }
  
}

void loop()
{  //distance for sonar sensor
//  float x = second();
  
 //  xbee.readPacket();
  //processResponse();
  
   String received;
    if(Serial.available()){
      received += Serial.read();
      Serial.println(Serial.read());
      if(received.equals("T\n")){
        wheels.write(0); delay(3650);
      }
    }
  start_sensor();
 
  distance1 = analogRead(anPin1)/2;
  delay(50);
 // if(distance1 < 12){esc.write(95);delay(10);wheels.write(wheels.read()+5);esc.write(70);}
  enableDisableSensor(3); //Turn on sensor attached to pin 3 and disable all others
  double dis3 = readDistance()/2.54;
  enableDisableSensor(2);
  double dis2 = readDistance()/2.54;
  Serial.print("dis2");
  Serial.println(dis2);
  Serial.print("dis3");
  Serial.println(dis3);
//  delay(1000);
   if(dis2 >=400 || dis3 >= 400){
      count++;
    }else{
      count=0;
    }
    if(count==2){
      count=0;
      wheels.write(0);delay(3750);
    }
  input = radToDeg(atan(abs(dis2 - dis3)/4.4));

    setpoint = 45;

    pid0.Compute();
   
   if(wheels.read()+4 <90)
    { wheels.write(wheels.read()+4);}
    else if(dis2>dis3)
     { 
      wheels.write(abs((wheels.read()-output/3.449 )));
   
    delay(10);   
   
    }
   // if ((dis3 > dis2) && (wheels.read()-4 >90))
  
   if(wheels.read()-4 >90)
    {
      wheels.write(wheels.read()-4);}
      else if (dis3>dis2){
      wheels.write(abs((wheels.read()+output/2)));
      
      }
      
    esc.write(75);
    delay(10);

    //Stop Automatically
    if(distance1>120){
      count1++;
    }else{
      count1=0;
    }
    if(count1==3){
      count1=0;
      esc.write(90);
      delay(500);
      wheels.write(90);
      esc.write(105);
      delay(3500);
      wheels.write(0);
      esc.write(75);
      delay(1500);
    }
  

}

 /* Convert degree value to radians */
double degToRad(double degrees){
  return (degrees * 71) / 4068;
}

/* Convert radian value to degrees */
double radToDeg(double radians){
  return (radians * 4068) / 71;
}

void enableDisableSensor(int sensorPin){
  for (int i = 0; i < sensorPinsArraySize; i++){
      digitalWrite(sensorPins[i], LOW); // Turn off all sensors
  }
  digitalWrite(sensorPin, HIGH); // Turn on the selected sensor
  delay(1); // The sensor takes 1msec to wake
}

int readDistance(){
  uint8_t nackack = 100; // Setup variable to hold ACK/NACK resopnses     
  while (nackack != 0){ // While NACK keep going (i.e. continue polling until sucess message (ACK) is received )
    nackack = I2c.write(LIDARLite_ADDRESS,RegisterMeasure, MeasureValue); // Write 0x04 to 0x00
    delay(1); // Wait 1 ms to prevent overpolling
  }

  byte distanceArray[2]; // array to store distance bytes from read function
  
  // Read 2byte distance from register 0x8f
  nackack = 100; // Setup variable to hold ACK/NACK resopnses     
  while (nackack != 0){ // While NACK keep going (i.e. continue polling until sucess message (ACK) is received )
    nackack = I2c.read(LIDARLite_ADDRESS,RegisterHighLowB, 2, distanceArray); // Read 2 Bytes from LIDAR-Lite Address and store in array
    delay(1); // Wait 1 ms to prevent overpolling
  }
  int distance = (distanceArray[0] << 8) + distanceArray[1];  // Shift high byte [0] 8 to the left and add low byte [1] to create 16-bit int
  
  return distance;   // Print Sensor Name & Distance
    
}
