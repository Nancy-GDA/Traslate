const translateFrom = document.querySelector('.translated-from')
const translateTo = document.querySelector('.translated-to')
const btnTraslate = document.querySelector('.traslate')
const textOrigin = document.querySelector('.text-orgin')
const textTranslate = document.querySelector('.text-traslate')

//Url de la appi
const API = 'https://text-translator2.p.rapidapi.com/getLanguages'
//Objeto con el metodo get,y las cabeceras que se nececitan donde esta la key de la api y el host de donde la eestoy trayendo
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '33e3e8eda8msh9638b70982a8ad3p16c578jsn80c551007f46',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
};
//Llamo a mi api y a las opciones que tenga  y posteriormente la respuesta que me de por el then la solicito en un archivo tipo json
fetch(API, options)
	.then(response => response.json())
	.then(objet => {
        //el nuevo objeto retornado en formato json lo asigno a una variable donde estan los lenguajes 
        let lenguages = objet.data.languages
        //Recorro un forEach para iterar con cada uno de los lenguajes que esten dentro del array
        lenguages.forEach(element => {
            //mediante el selector inyecto el html que traera las opciones al option del select
            translateFrom.innerHTML += `<option value="${element.code}" class="translated-from">${element.name}</option>`
            translateTo.innerHTML += ` <option value="${element.code}" class="translated-to">${element.name}</option>`
        });
    })
    //Cacho el error y lo imprimo por consola
	.catch(err => console.error(err));
//mando llamar mi boton 
    btnTraslate.addEventListener('click',()=>{
    })