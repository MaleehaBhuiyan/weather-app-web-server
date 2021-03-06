console.log('Client Side javascript file is loaded! ')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location)
    .then((resp) => {
        resp.json().then((data) => {
            if (data.error){
                return messageOne.textContent = "Unable to find location."
            }
            messageOne.textContent =  data.location
            messageTwo.textContent = data.forecast.success
        })
    })
    
})