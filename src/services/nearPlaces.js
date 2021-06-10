import { Images } from "../constants/Images"
import { api } from '../constants/api_config';

const apiKey = 'AIzaSyDfxAFFp8jEZrtWFxr8FTieAsUAlQhFhAs'




export const getNearPlaces = (token,type,location) =>{
    var data= []
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"lats":location.latitude,"lngs":location.longitude,"type":type});
//console.log('nearplaces.js / raw : ', raw)
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

 return new Promise ((resolve,reject)=>{

 
 fetch(`${api.url}maps/listePlace`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log("result = ",result.data[0].location)
    if (result.data){
    result.data.map((el)=>{
      data.push({
        title: el.name,
      photo: el.photos ? {uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${el.photos[0].photo_reference}&key=${apiKey}`} : Images.emptyphoto,
      address: el.name,
      duration: '44',
      distance: el.distance.toFixed(2),
      id: el.name,
      lat:el.location.lat,
      lng: el.location.lng,
      })
    })
} else {
    data=[{
        title:'No result',
        photo: Images.emptyphoto,
        address: 'No '+type+' found',
        duration: '22',
        distance:'',
        id:'notFound'+type
    },{
        title:'No result',
        photo: Images.emptyphoto,
        address: 'No '+type+' found',
        duration: '22',
        distance:'',
        id:'notFound'
    }]
}
    //console.log(data)
    data.sort(function(a, b){return a?.distance - b?.distance})
    resolve(data)
  })
  .catch(error => {
    reject
    console.log('error nearPlace.js/type',type, error)
  });
})
  }