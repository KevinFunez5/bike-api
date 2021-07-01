export default class BikeService {
  static getBike() {
    return fetch(`https://bikeindex.org/api/v3/search?page=1&per_page=10&location=97211&distance=10&stolenness=proximity`)
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch(function(error) {
      return error;
    }) 
  }

  static getManufacturerTrek() {
    return fetch('https://bikeindex.org/api/v3/search?page=1&per_page=20&manufacturer=Trek&location=97211&distance=10&stolenness=stolen')
    .then(function(response){
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch(function(error) {
      return error
    })
  }
}