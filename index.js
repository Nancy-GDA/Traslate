const translateFrom = document.querySelector('.translated-from')
const translateTo = document.querySelector('.translated-to')
let traduceBtn = document.querySelector('#submit');
const textOrigin = document.querySelector('.text-orgin').value
const textTranslate = document.querySelector('.text-traslate')

let languageFrom 
let languageTo 

//Objeto con el metodo get,y las cabeceras es decir los lenguajes que se nececitan donde esta la key de la api y el host de donde la eestoy trayendo
const options = {
    method: 'GET',
    headers: { 
        'X-RapidAPI-Key': '33e3e8eda8msh9638b70982a8ad3p16c578jsn80c551007f46',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
};
//Llamo a mi api y a las opciones que tenga  y posteriormente la respuesta que me de por el then la solicito en un archivo tipo json
fetch('https://text-translator2.p.rapidapi.com/getLanguages', options)
	.then(response => response.json())
	.then(response => {
        //el nuevo objeto retornado en formato json lo asigno a una variable donde estan los lenguajes 
        let languages = response.data.languages
        //Recorro un forEach para iterar con cada uno de los lenguajes que esten dentro del array
        languages.forEach(element => {
            //mediante el selector inyecto el html que traera las opciones al option del select
            translateFrom.innerHTML += `<option value="${element.code}" class="translated-from">${element.name}</option>`
            translateTo.innerHTML += ` <option value="${element.code}" class="translated-to">${element.name}</option>`
            })
//Es el texto que se traducira y que tiene el select y lo paso a una variabke que tenga el idioma seleccionado   
            translateFrom.addEventListener('click',()=>{
                languageFrom = translateFrom.value
            })
//Lo que se tradujo e igual la variable que toma el idioma seleccionado
            translateTo.addEventListener('click',()=>{
                languageTo = translateTo.value
            }) 
    })
    //Toma el error y lo imprime por consola
	.catch(err => console.error(err));
//mando llamar mi boton de traducir
traduceBtn.addEventListener('click', event=>{ 
    console.log(textOrigin)  
//traigo estos parametros de la api y sustituyo el lenguaje que selecciono de inicio y al que quiero traducir
const encodedParams = new URLSearchParams();
    encodedParams.append("source_language",languageFrom)
    encodedParams.append("target_language", languageTo)
    encodedParams.append("text",languageTo)
//Parametros que tiene la api para el metodo post es decir añadir elementos
console.log(encodedParams)
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '33e3e8eda8msh9638b70982a8ad3p16c578jsn80c551007f46',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: encodedParams
    };
    
    fetch('https://text-translator2.p.rapidapi.com/translate', options)
        .then(response => response.json())
        .then(response => {response => 
            console.log(response)
            let textFinally = response.data.translatedText
            textTranslate.innerText = textFinally

    })
        .catch(err => console.error(err))
})