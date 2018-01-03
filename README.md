# spring Boot, Angular Websocket with Stomp Chat Demo

Spring Websocket Chat demo using STOMP with Angular4

**Usage** 

 [1] Setting up the Angular application

    > cd src/main
    > ng new -sg -st ng
    > cd angular-stomp-websocket
    > ng new -sg -st ng
    > npm i --save sockjs-client
    > npm i --save ng2-stomp-service


 [2] Running

    > gradle bootRun


 [3] Continuous ng Build
 
To continuously build the ng app assets being served by the Spring Boot app 
  
    > gradle ngWatch
