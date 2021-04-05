console.log('Client Side javascript file is loaded! ')

fetch('http://localhost:3000/weather?address=!')
.then((resp) => {
    resp.json().then((data) => {
        if (data.error){
            return console.log("Invalid Data")
        }
        console.log("Location: ", data.location)
        console.log("Forecast: ", data.forecast.success)
    })
})

// fetch('http://puzzle.mead.io/puzzle')
// .then((resp) => {
//     resp.json().then((data) => {
//         console.log(data)
//     })
// })