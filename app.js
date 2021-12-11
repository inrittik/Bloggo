const { render } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const app = express();

const dbURI = 'mongodb+srv://nritt_ik:Munla%40123@cluster0.2urtv.mongodb.net/mongoTuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


app.set('view engine', 'ejs');
app.use(express.static('public')); 
app.use(express.urlencoded({extended:true})); 
 

app.get('/', (req, res) => {
  res.redirect('/blogs');
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { title: 'All Blogs', blogs: result})  
      })
      .catch((err) => {
          console.log(err);
      })
})

app.post('/blogs', (req, res)=> {
    const blog = new Blog(req.body);
    blog.save()
      .then((result)=> {
        res.redirect('/blogs');
      })
      .catch((err)=>{
        console.log(err);
      })
})

app.get('/about', (req, res) => {
    res.render('about', { title : 'About'});
})

app.get('/create/blog', (req, res) => {
    res.render('create', {title: 'Create Blog'})
})

app.get('/blogs/:id', (req, res)=> {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', {blog : result, title: "Blog Details"});
    })
    .catch(err=> {
      res.render('404', {title: 'Error'});
    })
})

app.delete('/blogs/:id', (req, res)=> {
  const id= req.params.id;
  Blog.findByIdAndDelete(id)
    .then(()=> {
      res.json({redirect: '/blogs'});
    })
    .catch(err => {
      console.log(err);
    })
})

app.use((req, res) => {
  res.render('404', {title: 'Error'});
})