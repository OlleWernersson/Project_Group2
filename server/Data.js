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
       c:1
      },
      {q: "How much do you enjoy coding?", 
       a: ["1", "2", "3", "4", "5"],
       c: 2
      }, 

      {q: "How angry are you?",
      a: ["wrong answer", "right answer", "wrong answer"],
      c:1,
      },

     {q: "How many people live in Uppsala?",
     a: ["1", "2", "3", "4"],
     c:3
      },

      {q: "Vem är sveriges monark?",
      a: ["Emma", "Pappa", "Mamma", "Mormor"],
      c:2
       }
    ],
    answers: [],
    currentQuestion: 0,
    participants:[],
    c:null
  }
  this.lobbies = {}
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
    poll.route = route;
    poll.lang = lang;  
    poll.questions = [];
    poll.answers = [];
    poll.currentQuestion = 0;
    poll.participants = [];              
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
    return null
  }
}

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  console.log("question added to", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}

Data.prototype.editQuestion = function(pollId, index, newQuestion) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions[index] = newQuestion;
  }
}

Data.prototype.getQuestion = function(pollId, qId=null) {
  const poll = this.polls[pollId];
  console.log("question requested for ", pollId, qId);
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}

Data.prototype.submitAnswer = function(pollId, answer) {
  const poll = this.polls[pollId];
  console.log("answer submitted for ", pollId, answer);
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

Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
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
Data.prototype.addPlayerToLobby = function(gameID, playerName, playerColor) {
  // if (!this.lobbies[lobbyID]) {
  //   this.lobbies[lobbyID] = [];
  //   let player = {
  //     name: playerName,
  //     answers: []
  //   }
  //   this.lobbies[lobbyID].push(player);
  //   console.log(playerName + " joined lobby " + lobbyID)
  // }
  // else {
  //   let player = {
  //     name: playerName,
  //     answers: []
  //   }
  //   this.lobbies[lobbyID].push(player);
  //   console.log(playerName + " joined lobby " + lobbyID)
  // }

  const poll = this.polls[gameID];
  console.log ("new user added to ", gameID, playerName)
  if (typeof poll !== 'undefined') {
    let participant = {
      name: playerName,
      color: playerColor,
    }
  poll.participants.push(participant)
  }
}
Data.prototype.getPlayers = function(pollID) {
  // console.log(this.lobbies[lobbyID])
  // return this.lobbies[lobbyID]

  const poll = this.polls[pollID];
  console.log(poll, "hallå från getplayers",pollID)

  if (typeof poll !== 'undefined') {
    console.log(poll.participants, "hallå")
    return poll.participants
  }
  return []
}
Data.prototype.getPoll = function(pollID){
  return this.polls[pollID]
}

export { Data };



