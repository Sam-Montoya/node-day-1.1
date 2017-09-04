module.exports = {
    getBooks:   function(req, res){ res.send(books) },
    createBook: function(req, res){ },
    updateBook: function(req, res){},
    deleteBook: function(req, res){ books = books.filter(book=>book.id!==Number(req.params.id)); res.send(books);},
    upvoteBook: function(req, res){}
};