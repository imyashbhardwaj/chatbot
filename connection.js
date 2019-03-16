var express = require('express');  
var app = express();  
var bodyParser = require('body-parser');
var util = require('util');
var cors = require('cors');  
app.use(cors({origin: 'http://localhost:1337/'}));
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  

var prompt = require('prompt-sync')();
var AssistantV1 = require('watson-developer-cloud/assistant/v1');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/page.html', function (req, res,next) {  
   res.sendFile( __dirname + "/" + "page.html" );  
})  

app.post('/watson1', urlencodedParser, function (req, res,next) { 
console.log(req.body.data);
// Set up Assistant service wrapper.
var service = new AssistantV1({
  username: '*********', // replace with service username
  password: '**********', // replace with service password
  version: '2018-02-16'
});

var workspace_id = "*******"; // replace with workspace ID

// Start conversation with empty message.
//service.message({
  //workspace_id: workspace_id
  //}, processResponse);

// Process the service response.
function processResponse(err, response) {
  if (err) {
    console.error(err); // something went wrong
    return;
  }
  

  /*var endConversation = false;

  // Check for action flags.
  if (response.output.action === 'display_time') {
    // User asked what time it is, so we output the local system time.
    console.log('The current time is ' + new Date().toLocaleTimeString() + '.');
  } else if (response.output.action === 'end_conversation') {
    // User said goodbye, so we're done.
    console.log(response.output.text[0]);
    endConversation = true;
  } */
  else {
    // Display the output from dialog, if any.
    if (response.output.text.length != 0) {
        console.log(response.output.text[0]);
		res.json({data:response.output.text[0]});
			
    }
  }

  // If we're not done, prompt for the next round of input.
  //if (!endConversation) {
    
	
  //}
  
return; 
  }
var newMessageFromUser = req.body.data;
	service.message({
      workspace_id: workspace_id,
      input: { text: newMessageFromUser },
      // Send back the context to maintain state.
      //context : response.context,
    }, processResponse)
})
var server = app.listen(1337, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("Server running at 127.0.0.1:1337")  
})  
