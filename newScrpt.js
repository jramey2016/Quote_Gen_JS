const quoteContainer = document.getElementById('quote-container'); //ID tag HTML;
const quoteField = document.getElementById('quote'); //quote field
const authorField = document.getElementById('speaker');  //author field
const twitBtn  = document.getElementById('twitter'); //twtitter button
const newQBtn   = document.getElementById('new-quote'); //new quote
const loader = document.getElementById('loader'); //loader
// Start from getting the quotes from the quote API
let apiQuote = [];


//Random number gen to get a random quote for the user.
//Print out that quote
function newQuote() {
    load();
   const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)]; //(1648)
   authorField.textContent = quote.author;
   quoteField.textContent = quote.text;
   //For Anon quotes
   if(!quote.author){
       authorField.textContent = 'Uknown';
   }

   //Quote length to base styling of the page.
   if(quote.text.length > 100){ //100 char threashhold.
       quoteField.classList.add('long-quote')
   }
   complete();
}

//show loading animation
function load(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Tweet the Quote you like button
function tweet(){
    const twitUrl = `https://twitter.com/intent/tweet?text=${quoteField.textContent} - ${authorField.textContent}`;
    window.open(twitUrl, '_blank');
}

//ActionListeners for buttons 
newQBtn.addEventListener('click', newQuote);
twitBtn.addEventListener('click', tweet);

async function getQuote() {
    load();
    const quoteUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(quoteUrl);
        apiQuote = await response.json();
        newQuote();
    }catch(error){
       console.log(error);
    }
}

//Run this function once code loads
getQuote();