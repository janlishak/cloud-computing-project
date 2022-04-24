// setup express
const express = require('express')
const app = express()
const port = 3000

// setup amqplib
const amqp = require('amqplib/callback_api');
const exchange = 'logs';
let channel = null;

// consts and globals
const os = require('os');
const hostname = os.hostname();
const nodeID = Math.floor(Math.random() * 1000);

let isLeader = false;
let nodes = {};

// setup endpoints
app.get('/', (req, res) => {
  res.send(
    "<html><body bgcolor='#EEEEFF'>" +
    "Webservice is running!" +
    "<br>" +
    "This instance is serverd by " +
    hostname +
    "</body></html>");
 });

//connect to rabbitmq
amqp.connect('amqp://test:test@haproxy', function(error0, connection) {
  if (error0) { throw error0;}
  connection.createChannel(function(error1, ch) {
      //setup the exchange
      if (error1) { throw error1; }
      channel = ch;
      ch.assertExchange(exchange, 'fanout', { durable: false });

      //start listening
      channel.assertQueue('', {exclusive: true}, function(error2, q) {
        if (error2) { throw error2; }
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
        channel.bindQueue(q.queue, exchange, '');
        channel.consume(q.queue, function(msg){
          if(msg.content) {
            console.log(" [x] %s", msg.content.toString());
    
            jsonMessage = JSON.parse(msg.content.toString("utf-8"));
            nodes[jsonMessage.hostname] =  { nodeID : jsonMessage.nodeID, lastAlive: Date.now()};
            if(isLeader && jsonMessage.nodeID > nodeID) isLeader = false;
          } 
        }, {noAck: true});
      });
    });
  });

  // close the connection on exit
  process.on('exit', (code) => {
    if(channel!=null){
      channel.close();
      console.log("closing rabbitmq channel");
    }
  });

// setup endpoints
app.get('/nodes', (req, res) => {

  //Send the response to the browser
   res.send(
          "<html><body bgcolor=" + 
          ((isLeader)? "#EEFFEE":"#FFEEEE") + 
          ">hostname: " + 
          hostname + 
          "<br>leader: " + isLeader +
          "<br>nodeID: " + nodeID +
          "<br>nodes: " + JSON.stringify(nodes));
 });

// based on the interval (3 seconds) publish a status message 
setInterval(function() {
  let toSend = {"hostname" : hostname, "nodeID":nodeID} ;
  if(channel){
    let message = JSON.stringify(toSend);
    channel.publish(exchange, '', Buffer.from(message));
    console.log("sending alive");
  }
}, 3000);

// based on interval (5 seconds) check if the node should become a leader
// while looping delete dead nodes (those which didn't send alive message last 10 seconds)
setInterval(function() {
  leader = true;
  activeNodes = 0;
  for (const host in nodes) {
    if(nodes[host]["nodeID"]>nodeID) leader = false;
    if(Date.now() - nodes[host]["lastAlive"] > 10000) delete nodes[host];
    else activeNodes++;
  }
  console.log(leader + " " + activeNodes);
  console.log("bool: " + leader || activeNodes==0);
  isLeader = leader || activeNodes==0
}, 4000);

app.listen(port, () => {
  console.log(`Example app listening at port 3000`)
});