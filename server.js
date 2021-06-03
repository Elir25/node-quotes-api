const express = require("express");
const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

const quotes = require("./quotes.json");

app.get('/', function(request, response) {
  response.send('/quotes/17 should return one quote, by id')
});

app.get("/quotes", function(request, response){
  response.json(quotes);
});

//READ A QUOTE GIVEN AN ID (if theres no id we can use its position in the array)
app.get("/quotes/:id", function(request, response){
  response.setHeader("Content-Type", "application/json");

  const quoteId = quotes.find(item => item.id == request.params.id)
  if(quoteId){  
    response.send(JSON.stringify(quoteId));
  } else {    
    response.send(JSON.stringify({error: "quote not found"}));
  }
});

// READ 2 option: In case the json does not have id for each element, we are based in the position
/*app.get('/quotes:id', function (request, response) {
  const index = parseInt(request.params.index) -1
  console.log(typeof index)

  response.send(quotes[index])
})*/

/**------------------------------------------------------------ */
//POST - CREATE A NEW QUOTE
app.post("/quotes", function(request, response){
  response.setHeader("Content-Type", "application/json");

  const body = request.body;
  console.log(body)
  // const newQuote = { id: quotes.length + 1, name: body.name };
  // quotes.push(newQuote);

  // response.send(JSON.stringify(newQuote));
  const quoteNew = {
    quote: body.quote,
    author: body.author,
    id: quotes.length + 1
  }
  quotes.push(quoteNew)
  // response.send({ id: quotes.length})//returns just the id of the new quote
  response.send(quoteNew)
});

/**------------------------------------------------------------ */
//PUT - pdate existing data in memory using a PUT request.
app.put('/quotes/:id', function(request, response) {
  

})

//DELETE A QUOTE FROM THE ARR 
app.delete('/quotes/:id', function (request, response){

  const index = parseInt(request.params.id) -1

  quotes.splice(index, 1, undefined) //delete 1 item at this index and replace with undefined
  response.status(204).send()
});

app.listen(3000, () => console.log("Listening on port 3000"));
//MIN 1h : 24