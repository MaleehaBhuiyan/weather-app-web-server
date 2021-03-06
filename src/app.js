const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { get } = require('http')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handle Bars engine and views location 
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve 
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Maleeha Bhuiyan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Maleeha Bhuiyan"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: "Maleeha Bhuiyan"
    })
})

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Maleeha Bhuiyan',
        errorMessage: 'Help Article Note Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Maleeha Bhuiyan',
        errorMessage: 'Page not Found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})