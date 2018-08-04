const express=require('express');
const app=express();

app.use('/', express.static('./public_static'));


app.listen(4000)