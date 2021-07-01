import  $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from "./js/bike-service";


function bikeMe(response) {
  if (response) {
    for (let i = 0; i < 10; i++) {
      if (response.bikes[i].stolen === true) {
      let dateStolen = new Date(response.bikes[i].date_stolen * 1000)
      console.log((dateStolen.getMonth() + 1) + " - " + dateStolen.getDate())
      $('#result').append(`<p>Is this bike stolen?: <span id="stolen">${response.bikes[i].stolen}</span></p>`)
      $('#result').append(`<p>Here is the date it was stolen (if it was): ${dateStolen}</p>`)
      $('#result').append(`<p>Here's a link to the bike <a href="${response.bikes[i].url}">click me</a>`)
      }
    } 
  }
}

function trekStolen(response) {
  let numberTrekBikesStolen = 0
  let dateStart = Date.now() - (604800 * 1000);
  console.log(dateStart)
  for (let i = 0; i < 20; i++) {
    let dateStolen = response.bikes[i].date_stolen * 1000
    console.log(dateStolen)
    if (dateStolen > dateStart) {
      numberTrekBikesStolen ++;
      console.log(numberTrekBikesStolen)
    }
  }
  $("#manNumbers").text(numberTrekBikesStolen)
}

$(document).ready(function() {

  $('#bike').click(function() {
    BikeService.getBike()
    .then(function(response) {
      bikeMe(response)
    })
    .catch(function(error){
      $('#result').append(`<p>There's been an error and this is it: ${error}<p>`)
    })
  })

  $("#form1").submit(function() {
    let manufacturer = $("#manInput").val();
    BikeService.getManufacturerTrek(manufacturer)
    .then(function(response) {
      trekStolen(response) 
    })
    .catch(function(error) {
      $("#manNumbers").text(error)
    })
  })

})