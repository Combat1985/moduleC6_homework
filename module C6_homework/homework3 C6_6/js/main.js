// Ищем кнопку, по нажатии на которую будет запрос
const buttonSendTextNode = document.querySelector('.button_send_text');
const buttonSendCoordNode = document.querySelector('.button_send_coord');
const inputNode = document.querySelector('.input_text');
const messageWindowNode = document.querySelector('.message_window');
const userName = 'User';
const echoName = 'Echo';
let websocket = null;
let coords = {latitude: 0, longitude: 0};




// Вешаем обработчик на кнопку для запроса
buttonSendTextNode.addEventListener('click', () => {
  console.log('click');

  sendMessageFromInput();  
})

buttonSendCoordNode.addEventListener('click', () =>{  
  let strJSON;

  if ("geolocation" in navigator) 
  {
    navigator.geolocation.getCurrentPosition((position) => {

      coords.latitude = position.coords.latitude;
      coords.longitude = position.coords.longitude;


      console.log('GeoLocation');
      console.log('latitude', coords.latitude);
      console.log('longitude', coords.longitude);

      messageAppend(userName, '', true);

      strJSON = JSON.stringify(coords);
      sendMessage(strJSON);
    });
  }
})

function sendMessageFromInput()
{
  const message = inputNode.value;
  console.log('call SendMessageFromInput, message = ', message);

  sendMessage(message);
}

function sendMessage(msg){
  const message = msg;

  if(websocket)
  {
    
    console.log('call sendMessage, message = ', message);
    
      websocket.send(message);
      
      messageAppend(userName, message, false);
  }
  else
  {
    websocket = new WebSocket('wss://echo-ws-service.herokuapp.com');

    console.log('websocket');
    websocket.onopen = () => {
      console.log('websocket открыт');
  
      websocket.send(message);

      
      messageAppend(userName, message);
      
      //messageAppend('', 'CONNECTED', false);
    }

    websocket.onmessage = (msg) => {
      console.log('echoName', msg);
      
      messageAppend(echoName, msg.data);
    }
    
    websocket.onclose = () => {
      console.log('websocket закрыт');
      
      //messageAppend('', 'DISCONNECTED', false);
      websocket = null;
    }
  }
}

function messageAppend(userName, userMessage, isLink){
  let msg = messageWindowNode.innerHTML;
  let msg_new;

  console.log('call messageAppend');
  console.log('userMessage = ', userMessage);


  if(!isJSONString(userMessage))
  {
    if(isLink)
    {  
      
      console.log(' coords.latitude = ', coords.latitude);
      console.log(' coords.longitude = ', coords.longitude);

      msg_new = `<p>${userName}: <a target="_blank" href="https://www.openstreetmap.org/#map=10/${coords.latitude}/${coords.longitude}">Мои координаты</a></p>`;
    }
    else
    {
      msg_new = `<p>${userName}: ${userMessage}</p>`;
    }

    console.log('call messageAppend, msg_new = ', msg_new);

    messageWindowNode.innerHTML = msg_new + msg;
  }
}

function isJSONString(str) {
  try 
  {
      JSON.parse(str);
  } 
  catch (e) 
  {
      return false;
  }
  return true;
}