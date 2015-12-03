//int sensorpin = 0;                 // analog pin used to connect the sharp sensor
int val1 = 0;                 // variable to store the values from sensor(initially zero)
int val2 = 1;

void setup()
{
  Serial.begin(9600);               // starts the serial monitor
}
 
void loop()
{
  val1 = analogRead(0);       // reads the value of the sharp sensor
  val2 = analogRead(1);
  Serial.println(4800/(val1-20));            // prints the value of the sensor to the serial monitor
  Serial.println("IR1"); 
  Serial.println(4800/(val2-20)); 
  Serial.println("IR2"); 
  delay(1000);                    // wait for this much time before printing next value
}
