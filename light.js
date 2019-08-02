const xapi = require('xapi');

const LIFX_TOKEN = ""; // Fill in LIFX token

var payload;
var data;
var red = 0;
var green = 0;
var blue = 0;

function setLightState(data){
  payload = JSON.stringify(data);
  xapi.command('HttpClient Put', {
    Header: ['Authorization: Basic ' + LIFX_TOKEN, 'Content-type: application/json'],
    Url: 'https://api.lifx.com/v1/lights/all/state',
    AllowInsecureHTTPS: "True"
  }, payload).catch(e => console.log(JSON.stringify(e)))
}


xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if (event.Type === 'changed') {
    if (event.WidgetId === 'power'){
      console.log(event.Value)
      data = {"power": event.Value, "brightness": 1.0};
      setLightState(data);
    }
  }
  else if (event.Type === 'released') {
    if (event.WidgetId === 'red'){
      console.log(event.Value)
      red = event.Value;
      data = {"color": "rgb:" + red + "," + green + "," + blue};
      setLightState(data);
    }
    else if (event.WidgetId === 'green'){
      console.log(event.Value)
      green = event.Value;
      data = {"color": "rgb:" + red + "," + green + "," + blue};
      setLightState(data);
    }
    else if (event.WidgetId === 'blue'){
      console.log(event.Value)
      blue = event.Value;
      data = {"color": "rgb:" + red + "," + green + "," + blue};
      setLightState(data);
    }
  }
});
