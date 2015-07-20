<% if( package === 'esp8266') { %>#include <ESP8266WiFi.h><% } else { %>#include <SPI.h>
#include <Ethernet.h><% } %>
#include <aWOT.h>
<% if( package === 'esp8266') { %>
const char* ssid = "ssid";
const char* password = "lolcat";
<% } else { %>
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
<% } %>
<% if( package === 'esp8266') { %>WiFiServer server(80);<% } else { %>EthernetServer server(80);<% } %>

WebApp app;

void setup() {
  Serial.begin(115200);
  Serial.println("Connecting...");
  <% if( package === 'esp8266') { %>
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected");

  // Print the IP address
  Serial.println(WiFi.localIP());
  <% } else { %>
  if (Ethernet.begin(mac)) {
    Serial.println(Ethernet.localIP());
  } else{
    Serial.println("Ethernet failed");
  }<% } %>
  // Start the server
  server.begin();
  Serial.println("Server started");

  // do not remove the comment below
  // asset router
  AssetRouter(app);

  // do not remove the comment below
  // other routers
  ThingRouter(app);
}

void loop(){
  <% if( package === 'esp8266') { %>WiFiClient<% } else { %>EthernetClient<% } %> client = server.available();

  if (client.available()){
    app.process(&client);
  }
  <% if( package === 'esp8266') { %>
  delay(20);<% } %>
}
