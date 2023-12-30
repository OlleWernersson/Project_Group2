'use strict';
const languages = ["en", "se"];
import {readFileSync} from "fs";

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
  this.polls['test'] = {
    lang: "en",
    questions: [
      {q: "How old are you?", 
       a: ["0-13", "14-18", "19-25", "26-35", "36-45","45-"],
       c:1,
       
      },
      {q: "How much do you enjoy coding?", 
       a: ["1", "2", "3", "4", "5"],
       c: 2,
       
      }, 

      {q: "How angry are you?",
      a: ["wrong answer", "right answer", "wrong answer"],
      c:1,
      
      },

     {q: "How many people live in Uppsala?",
     a: ["1", "2", "3", "4"],
     c:3,
      },

      {q: "Vem är sveriges monark?",
      a: ["Emma", "Pappa", "Mamma", "Mormor"],
      c:2,
    
       }
    ],
    answers: [],
    currentQuestion: 0,
    participants:[],
  }
  this.lobbies = {};

  this.colorObjs = [{color: "#e84a5f",
                    isSelected: false},
                    {color: "#3baea0", 
                    isSelected: false},
                    {color: "#085f63", 
                    isSelected: false},
                    {color: "#facf5a", 
                    isSelected: false},
                    {color: "#ff8b00", 
                    isSelected: false},
                    {color: "#ff847c", 
                    isSelected: false},
                    {color: "#7481cf", 
                    isSelected: false},
                  ];
}
 //Constructor initializes empty object with poll property 

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  const labels = readFileSync("./server/data/labels-" + lang + ".json");
  return JSON.parse(labels);
}

Data.prototype.createPoll = function(pollID, lang="en", route=null) {
  if (typeof this.polls[pollID] === "undefined") {
    let poll = {};
    poll.cities = this.getRouteCities(route);
    poll.currentcity = {};
    poll.route = route;
    poll.lang = lang;  
    poll.questions = [];
    poll.answers = [];
    poll.currentQuestion = 0;
    poll.participants = [];
    poll.colorObjs = this.colorObjs;              
    this.polls[pollID] = poll;
    console.log("poll created", pollID, poll);
  }
  return this.polls[pollID];
}
Data.prototype.getRouteCities = function(route) {
  if (route === 1) {
    const cities = readFileSync("server/data/europeCities.json")
    console.log(cities)
    return JSON.parse(cities)
  }
  if (route === 2) {
    const cities = readFileSync("server/data/africaCities.json")
    console.log(cities)
    return JSON.parse(cities)
  }
  if (route === 3) {
    const cities = readFileSync("server/data/southAmericaCities.json")
    console.log(cities)
    return JSON.parse(cities)
  }
  else {
    return []
  }
}

Data.prototype.addQuestion = function(pollID, q) {
  const poll = this.polls[pollID];
  console.log("question added to", pollID, q);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}

Data.prototype.editQuestion = function(pollID, index, newQuestion) {
  const poll = this.polls[pollID];
  if (typeof poll !== 'undefined') {
    poll.questions[index] = newQuestion;
  }
}

Data.prototype.getQuestion = function(pollID, qId=null) {
  const poll = this.polls[pollID];
  console.log("question requested for ", pollID, qId);
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}

Data.prototype.submitAnswer = function(pollID, answer) {
  const poll = this.polls[pollID];
  console.log("answer submitted for ", pollID, answer);
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);
  }
}

Data.prototype.getAnswers = function(pollID) {
  const poll = this.polls[pollID];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}
Data.prototype.getCities = function(){
  const cities = readFileSync("server/data/cities.json")
  return JSON.parse(cities)
}
Data.prototype.addPlayerToLobby = function(gameID, playerName, playerColorObj, isHost) {
  const poll = this.polls[gameID];
  console.log ("new user added to ", gameID, playerName)
  if (typeof poll !== 'undefined') {
    let participant = {
      name: playerName,
      colorObj: playerColorObj,
      isHost: isHost,
    }
  poll.participants.push(participant)
  }
}
Data.prototype.getPlayers = function(pollID) {
  const poll = this.polls[pollID];
  if (typeof poll !== 'undefined') {
    return poll.participants
  }
  return []
}
Data.prototype.getPoll = function(pollID){
  console.log(this.polls[pollID].cities)
  return this.polls[pollID]
}

Data.prototype.getColors = function(gameID){
  const game = this.polls[gameID];
  if (typeof game !== 'undefined') {
    return this.colorObjs;
  }
  return this.colorObjs;
  //OBS i längden måste colorObjs bli specifikt för varje poll så man kan uppdatera isSelected och ta bort färgen 
  // men just nu är detta nödlösning (this.colorObjs är global och inte pollID specifik)
}

Data.prototype.getCityQuestions = function(pollID, City){
  console.log("nu är vi i get city questions")
  const poll = this.polls[pollID];
  for(let i = 0; i < poll.cities.length; i++){
    if(poll.cities[i].name === City){
      return poll.cities[i].questions
    }
  }
}
Data.prototype.addCurrentCity = function(cityName,first_letter,top,left,pollID){
  const poll = this.polls[pollID];
  console.log(cityName,first_letter,top,left, pollID)
  console.log(poll.questions)
  poll.cities.push({top:top,left:left,name:cityName,first_letter:first_letter,questions:poll.questions})
  poll.questions = []
  console.log(poll.cities, poll.cities.questions)
}
Data.prototype.doesPollIDExist = function(pollID) {
  const poll = this.polls[pollID];
  if (typeof poll !== 'undefined'){
    return true
  }
  else {
    return false
  }
}

export { Data };



