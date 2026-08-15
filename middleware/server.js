const express = require('express');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const PORT = process.env.PORT || 3500;



//-----------------built in middlewares------------------
//form data
app.use(express.urlencoded({ extended : false }));
//builtin middleware for JSON
app.use(express.json())


//Custom Midllewares:
app.use(logger);

//Serve static files
app.use(express.static(path.join(__dirname , '/public')));




app.get(['/' , '/index.html' , '/index'] , (req , res) => {
    res.sendFile(path.join(__dirname , 'views' , 'index.html'))
});

app.get(['/new-page.html' , '/new-page'] , (req , res) => {
    res.sendFile(path.join(__dirname , 'views' , 'new-page.html'))
});

app.get(['/old-page.html' , '/old-page'] , (req , res) => {
    res.redirect(301 , 'new-page')
});

//Route handlers

app.get(['/hello.html' , '/hello'] , (req , res,next) => {
    console.log("Requested to Hello.html")
    next();
} , (req ,res) => {
    res.send("Hello world");
})

//Chaining route Handlers

const one = (req,res , next) => {
    console.log('One');
    next();
}
const two = (req , res , next) => {
    console.log('Two');
    next();
}
const three = (req, res) => {
    console.log('THree');
    res.send("Finished");
}

app.get(['/chain.html' , '/chain'] , [one , two , three]);

app.all('*' , (req , res) => {
    res.status(404)
    if(req.accepts('html')) 
    {
        res.sendFile(path.join(__dirname , 'views' , '404.html'));
    }
    else if(req.accepts('json')) 
    {
        res.json({ error : '404 no found'});;
    } else {
        res.type('txt').send('404 not found')
    }
    
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));