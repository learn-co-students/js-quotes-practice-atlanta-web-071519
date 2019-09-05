// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 

function main() {
    document.addEventListener("DOMContentLoaded", function() {
      fetchQuotes()
      addEventListener()
    })
  }

  function addEventListener() {
    list.addEventListener('click', function(event){
      if(event.target.className === 'quote-card'){
        fetchQuoteDetails(event.target)
      }
    })
  }


  function fetchQuotes() {
    fetch('http://localhost:3000/quotes?_embed=likes')
      .then(resp => resp.json())
      .then(quotes => {
        console.log(quotes)
        renderQuotes(quotes)
      })
      .catch(error => {
          console.log(error)
      })
  }

  function fetchQuoteDetails(quote) {
    const id = quoteEl.dataset.id
    fetch('http://localhost:3000/quotes?_embed=likes' + id)
      .then(resp => resp.json())
      .then(quote => {
        console.log(quote)
        renderQuoteDetails(quote)
      })
  }

  function renderQuotes(quotes) {
    quotes.forEach(quote => { 
       renderQuotes(quote) 
    })
  }

  function renderQuote(quote) {
    const quoteEl = document.createElement('li')
    quoteEl.className = 'quote-card'
    quoteEl.dataset.id = quote.id
    quoteEl.innerHtml = quote.author
  
    list.append(quoteEl)
  }

main()