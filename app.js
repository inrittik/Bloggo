const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const app = express();

const dbURI = 'mongodb+srv://nritt_ik:Munla%40123@cluster0.2urtv.mongodb.net/mongoTuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


app.set('view engine', 'ejs');


app.get('/add-blog', (req, res)=> {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'body of my new blog'
    });

    blog.save()
      .then((result) => {
          res.send(result);
      })
      .catch((err) => {
          console.log(err);
      });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
      .then(result => {
          res.send(result);
      })
      .catch((err) => {
          console.log(err);
      })
})
// app.use((req, res, next) => {
//     console.log(req.hostname);
//     console.log(req.path);
//     console.log(req.method);
//     next();
// })

// middleware for static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { title : 'Home'});
})
app.get('/about', (req, res) => {
    res.render('about', { title : 'About'});
})
app.get('/create/blog', (req, res) => {
    res.render('create', { title : 'Create Blog'});
})