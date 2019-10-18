const express = require('express');
const geoCode = require('./utils/geocode.js');
const foreCast = require('./utils/forecast.js');
const path = require('path');
const hbs = require('hbs')
const app = express();

// path for the express server
const directoryName = (path.join(__dirname, '../public'));

//path to the handlebars directory
const templateDirectory = (path.join(__dirname, '../templates/views'));

const partialsHandlebars = (path.join(__dirname, '../templates/partials'))

//settin the handlebars to fire when it finds directory
app.set('view engine', 'hbs');
app.set('views', templateDirectory);
hbs.registerPartials(partialsHandlebars)

//path to directory to serve files from public
app.use(express.static(directoryName))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'uvaldo'
    })
 });
 app.get('/about', (req,res) => {
     res.render('about', {
        title: 'About',
         name: 'Uvaldo',
      
     })
});
app.get('/help', (req,res) => {
    res.render('help', {
        message: 'Ask your question',
        title:'Help',
        name: 'Uvaldo'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
       return res.send({
            error: 'please provide address'
        })
    }  
       geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
       return res.send({error})
        } 
         
       foreCast(latitude, longitude, (error, forecastData) => {
           if(error){
           return  res.send({error})
           }
           res.send({
          location,
          forecast: forecastData,
          address: req.query.address
        });
        
      })
   })
});
app.get('/products', (req,res) => {
    if(!req.query.search){
       return res.send({
            error:'enter a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('errorPage', {
        title:'help page',
        name: 'Junior',
        errorMessage: 'help page not found'
    })
})

app.get('*', (req,res) => {
    res.render('errorPage', {
        title:'404 error page',
        name: '404',
        errorMessage: '404 error route not found'
    })
});

app.listen(3000, () => {
  console.log('server is up and running in port 3000')
});