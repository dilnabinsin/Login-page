const express = require("express")

const app =express();
const hbs =require("hbs")
const session = require('express-session');
const nocache=require('nocache')
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(session({
    secret: 'keyboard cat', // Secret key for signing the session ID cookie
    resave: false,           // Don't save session if it's not modified
    saveUninitialized: false // Don't create session until something is stored
  }));
  app.use(nocache())
const username = 'user';
const password = 'password';





app.get('/',(req,res)=>{  // Route to serve the login form
    if(req.session.username){
        res.render('home');

    }
  else{
    if(req.session.passwordwrong){
        res.render('login',{ message: 'Invalid credentials' });
        req.session.passwordwrong=false;
    }
    else{
        res.render('login');
    }
   
  }
   
   
})

app.post('/verify',(req,res)=>{
    // res.send("success");
    console.log(req.body)
    if(req.body.username===username && req.body.password===password)
  {
    req.session.username=req.body.username;
    //res.render('home')
    res.redirect('/home')
  }
else{
    //res.render('login',{ message: 'Invalid credentials' });
    req.session.passwordwrong=true;
    res.redirect('/')
}


})
//updated
app.get('/home',(req,res)=>{
    if(req.session.username){
        res.render('home')
    }
    else{
        if(req.session.passwordwrong){
            req.session.passwordwrong=false;
            res.render('login',{ message: 'Invalid credentials' });
          
        }
       else{
        res.render('login')
       }
    }
})



app.get('/logout',(req,res)=>{
    req.session.destroy();
   // res.send("logout successfully")
   res.render('login',{message:'logout'})
})
//

// app.get('/notfound', (req, res) => {
//   res.send('Oops! Page not found.');
// });


// app.use("*", (req, res) => {
 
//     res.redirect("/notfound");
//   });
  
app.listen(5000,()=>console.log("server running on port 5000"))