const express = require("express")
const app =express()
const path = require("path")
const fs = require("fs")



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname , "public")))
app.set("view engine","ejs");






app.get("/",(req,res)=>{
    fs.readdir(`./files` , (er , files)=>{
        res.render("index",{files:files})
    })
    
})
app.get("/file/:filename", function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(er,data)=>{
        res.render('show' , {filename:req.params.filename , data:data});
        console.log(data)
})
})

app.get("/edit/:filename" , (req,res)=>{
    res.render("edit" ,{filename:req.params.filename})
})
app.post("/edit" , (req, res)=>{
    let newname=req.body.new.split(' ').join('');
fs.rename(`./files/${req.body.previous}`,`./files/${newname}` , (err)=>{
    res.redirect("/")
})
})

app.post("/create",(req,res)=>{
    console.log(req.body);
    const data =req.body.title.split(' ').join('')
    console.log(data)
   fs.writeFile(`./files/${data}.txt`, req.body.details ,function(err){
   res.redirect("/");
   } )
})



app.listen(3000)