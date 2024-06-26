// Descrizione:
// Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:




const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];
// Milestone 1 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
//seleziono il container in cui stampare i post nel DOM
const postContainer = document.querySelector(`#container`);
//stampo dinamicamente ogni oggetto contenuto nell'array posts
posts.forEach((signlePost) => {
  let postsTemplate = generateSinglePost(signlePost);
  postContainer.innerHTML += postsTemplate;

})

// Milestone 2
//Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
//Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

//slezionare tutti i tasti mi piace
const allLikeBtn = document.querySelectorAll(`.js-like-button`);
const allLikeCounter = document.querySelectorAll(`.js-likes-counter`)
//per ogni bottone, creo un evento di ascolto e gli aggiungo la classe like-button--liked al click
const likedPostId = []
console.log(likedPostId)
allLikeBtn.forEach((singleDOMBtn, index) => {
    singleDOMBtn.addEventListener(`click`, function(event) {
        //dire al browser che scelgo io che cosa deve succedere dopo l'evento e il browser non torna più a inizio pagina dopo il click
        event.preventDefault()
        //seleziono il counter del singolo post
        let postId = parseInt(this.dataset.postid)
        
        // const connectedCounter = document.querySelector(`#like-counter-` + postId)
        // console.log(connectedCounter)
        //creo una variabile in cui salvo un indice dell'array allLikeCounter che corrisponde al counter di ogni post
        const connectedCounter = allLikeCounter[index]
        //incremento la variabile di uno ogni volta che clicco
        
        if(!singleDOMBtn.classList.contains(`like-button--liked`)){
            singleDOMBtn.classList.add(`like-button--liked`);
            connectedCounter.innerHTML ++
        } else if(singleDOMBtn.classList.contains(`like-button--liked`)){
            singleDOMBtn.classList.remove(`like-button--liked`)
            connectedCounter.innerHTML --
        }
        
       
        if(!likedPostId.includes(postId)){
            likedPostId.push(postId) 
        }
        console.log(likedPostId)
    })
})
// 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.


// 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
//mi servono le iniziali dell'utente, da stampare nel DOM all'interno del div contenitore immagine se il valore image di author è null








//---------------
//   FUNCTIONS
//---------------

function generateSinglePost(uniquePost) {
    //destrutturo l'array posts e salvo il contenuto delle chiavi in varibili
    let {id, content, media, author, likes, created}= uniquePost;
    let {image} = author
    // 1. Formattare le date in formato italiano (gg/mm/aaaa)
    //separo la data in un array, giro l'array e lo unisco separato da /
    
    //salvo in una variabile il codice che voglio stampare per ogni post e sostituisco alcune parti con le varibili
    let userInitials = getUserInitials(author)
    console.log(image)

    let defaultPic

    if(image){
        defaultPic = `
            <img class="profile-pic" src="${image} " alt="${name}"></img>`
    } else {
        defaultPic = `${userInitials}`
    }
    
    
    let generatedPost = `
    <div class="post">
        <div class="post__header">
            <div class="post-meta">
                <div class="post-meta__icon">
                ${defaultPic}            
                </div>                    
                <div class="post-meta__data">
                    <div class="post-meta__author">${author.name}</div>
                    <div class="post-meta__time">${convertDate (created)}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${content}.</div>
        <div class="post__image">
            <img src="${media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>
    `
    return generatedPost
}

//funzione che trasforma una stringa in due array con nome e cognome ne prende le iniziali e le salva in una variabile in uppercase
function getUserInitials(arrayName){
    let authorNameArray = arrayName.name.split(` `)
    let [name, surname] = authorNameArray
    let initials = `<div class="profile-pic-default">
                        <span>${name[0]}${surname[0]}</span>
                    </div>`
    return initials
} 

function convertDate (arrayKey){
    //si puo anche destrutturare l'array e salvare la data in ordine giusto in una variabile con template literal
    let italianDate = arrayKey.split(`-`).reverse().join(`/`);
    return italianDate
}