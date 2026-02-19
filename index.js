import express from "express";
import axios from "axios";

const app = express();
const port = 3001;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "nikita";
const yourPassword = "chiku";
const yourAPIKey = "bd2daf8c-efb3-4caa-bfda-eba721b0c7f9";
const yourBearerToken = "";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
})

app.get("/noAuth", async(req, res) => {
  try{
  const response=await axios.get(API_URL+"random")
  res.render("index.ejs",{content: JSON.stringify(response.data)})}
  catch(error){
    res.status(404).status(error.message)
  }
});

app.get("/basicAuth", async(req, res) => {
  try{
  const response=await axios.get(API_URL+"all?page=2",{auth:{
    username: yourUsername,
    password: yourPassword
  }})
  res.render("index.ejs",{content:JSON.stringify(response.data)})}
  catch(error){
    res.status(404).send(error.message)
  }
});

app.get("/apiKey", async(req, res) => {
  try{
  const response=await axios.get(API_URL+"filter",{params:{score:5,apiKey:yourAPIKey}})
  res.render("index.ejs",{content:JSON.stringify(response.data)})}
  catch(error){
    res.status(404).send(error.message)
  }
});

app.get("/bearerToken", async(req, res) => {
  try{
  const response= await axios.get(API_URL+"secrets/42",{headers:
    {Authorization: `Bearer 18a25d9c-46a7-4c64-a7e7-9b10cfcb725d`
    }})
    res.render("index.ejs",{content:JSON.stringify(response.data)})}
    catch(error){
     res.status(404).send(error.message)
    }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
