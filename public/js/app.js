console.log('js client side file');


const weatherEventListener = document.querySelector('form');

const inputElement = document.querySelector('input');

const messageOne = document.getElementById('message-1');

const secondMessage = document.getElementById('message-2');


weatherEventListener.addEventListener('submit', (e) => {
    const inputValue = inputElement.value
    messageOne.textContent = 'Loading...'
    secondMessage.textContent = ''
    e.preventDefault();
    fetch('http://localhost:3000/weather?address='+ inputValue +'').then( (response) => {
    response.json().then( (data) => {
        
        if(data.error){
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            secondMessage.textContent = data.forecast
        }
    })
  })
})