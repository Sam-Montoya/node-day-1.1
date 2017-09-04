const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const port = 8080;


app.use((req, res, next)=>{
  console.log(req.url);
  next();
})
app.use(express.static(`${__dirname}/../build`))
app.use(bodyParser.json());

let books = require('./data/books.js');

app.get('/api/books', (req, res)=>{
  res.send(books);
})

app.post('/api/books', (req, res)=>{
  if (!req.body.title){
    return res.status(400).send("All books must have a title");
  }
  req.body.id = (books.length?books[books.length -1].id+1:1)
  books.push(req.body);
  res.send(req.body);
})

app.put('/api/books/:id', (req, res)=>{

  // let bookToUpdate = books.find((book)=>book.id === req.params.id * 1);
  // if (!bookToUpdate){
  //   return res.status(404).send("No book found with that ID");
  // }

  // delete req.body.votes;
  // delete req.body.id;
  // Object.assign(bookToUpdate, req.body);

  console.log(req.params.id);
  for(let i = 0; i < books.length; i++){
    if(books[i].id === Number(req.params.id)){
      //Edit the book
      Object.assign( books[i], req.body);
      //Send book back to the front end
      return res.send(books[i]);
    }
  }
  let bookToEdit = books.find((book)=>book.id === req.params.id * 1);
  Object.assign(bookToEdit, req.body);
  res.send(bookToEdit);
});

app.delete('/api/books/:id', (req, res)=>{
  books = books.filter(book=>book.id!==Number(req.params.id))
  res.send(books);
});

app.patch('/api/books/:id/upvote', (req, res)=>{
  let bookToUpvote = books.find((book)=>book.id === req.params.id * 1);
  if (!bookToUpvote){
    return res.status(404).send("No book by that ID to update");
  }
  bookToUpvote.votes +=1;
  res.send(`${bookToUpvote.title} now has ${bookToUpvote.votes} votes`);
})

app.get('/*', (req, res)=>{
  res.sendFile(path.join(__dirname, '..','build','index.html'));
})

app.listen(port, ()=>{
  console.log(`Listening on port: ${port}` );
  console.log('Im being hit!');
})
