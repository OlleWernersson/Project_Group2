function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang, d.route, d.mapImage));
  });

  socket.on('addQuestion', function(d) {
    console.log(d)
    //jag har ändrat vad variablerna heter för frågorna här i createrouteview
    //problem här c kommer ut som undefined kanske kommer från något tidigare oklart var utskriften sker
    data.addQuestion(d.pollId, {q: d.questionPart, a: d.answers, c: d.c, city: d.city} );

    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('getNextQuestion', function(d) {
    let nextIndex=d.index+1;
    socket.emit('sendNextQuestion', data.polls[d.pollId].questions[nextIndex])
  });

  socket.on('editQuestion', function(d) {
    data.editQuestion(d.pollId, d.index, {q: d.q, a: d.a});
    socket.emit('questionEdited', data.getAllQuestions(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    console.log("nu har vi joinat")
    socket.join(pollId);
/*     socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId)); */
  });

  socket.on('beginSetup',function(pollId){
    io.to(pollId).emit("setupComplete")
    console.log("setup complete")
  }); 

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  });

  socket.on('loadcities', function(gameID) {
    socket.emit('citiesLoaded',  data.getCities(gameID))
  });

  socket.on('removeCity', function(d) {
    data.removeCity(d.gameID, d.selectedCity)
    socket.emit('citiesLoaded',  data.getCities(d.gameID))
  });

  socket.on('joinLobby', function (d) {
    data.addPlayerToLobby(d.gameID, d.playerName, d.playerColorObj, d.isHost);
    let players = data.getPlayers(d.gameID)
    console.log(players, "hallå från socket")
    io.to(d.gameID).emit('updatePlayerList', players);
    let colors = data.getColors(d.gameID);
    io.to(d.gameID).emit("getColors", colors)
    io.to(d.gameID).emit("CheckIsNameTaken")
  });

  socket.on('enterlobby', function(gameID){
    let players = data.getPlayers(gameID)
    io.to(gameID).emit('updatePlayerList', players);
  })
  socket.on('getPoll', function(pollId) {
    io.to(pollId).emit('thisPoll', data.getPoll(pollId))
  })
  socket.on('getQuestionForCity', function(d){
    console.log(d)
    let cityQuestions = data.getCityQuestions(d.pollID, d.city)
    socket.emit('loadNewQuestions')
  }) 
  socket.on('saveCurrentCity', function(d){
    console.log("nu är vi save current city sockets", d)
    data.addCurrentCity(d.name,d.first_letter,d.top,d.left,d.pollId)
  })
  socket.on('CheckGameID', function(pollID) {
    socket.emit('isGameIDStarted', data.isGameIDStarted(pollID))
    socket.emit('isGameIDValid', data.doesPollIDExist(pollID))
  })

  socket.on("loadColors", function(gameID) {
    console.log("loadcolors printar data.getColors: ", data.getColors(gameID))

    let colors = data.getColors(gameID);
    socket.emit("getColors", colors)
  })
  socket.on("checkIfHost", function(gameID, playerName) {
    socket.emit("isHost", data.isHost(gameID, playerName))
  })
  socket.on('startGame', function(gameID) {
    data.gameStarted(gameID)
    io.to(gameID).emit('navigateToGame', gameID)
  })
  socket.on('whatIsHostName', function(gameID) {
    socket.emit('hostName', data.getHostName(gameID))
  })
  socket.on('goToNextCity', function(playerName, pollId) {
    data.goToNextCity(playerName, pollId)
    if(data.isGameFinished(pollId)) {
      io.to(pollId).emit('navigateToGameResultView', pollId)
    }
    else {
      io.to(pollId).emit('thisPoll', data.getPoll(pollId))
    }
  })
  socket.on('updateQuestionIndex', function(playerName, pollId){
    data.updatePlayerQuestion(playerName,pollId)
    io.to(pollId).emit('thisPoll', data.getPoll(pollId))
  })
  socket.on('isThisNameTaken', function(gameID, playerName) {
    socket.emit('isNameTaken', data.isNameTaken(gameID,playerName))
  })
  socket.on('updateCountdown',function(playerName, gameID){
      data.updatePlayerCountdown(playerName, gameID)
      io.to(gameID).emit('thisPoll', data.getPoll(gameID))
  } )
  socket.on('resetCountdown', function(playerName,gameID){
    data.resetPlayerCountdown(playerName,gameID)
    io.to(gameID).emit('thisPoll', data.getPoll(gameID))
  })
  socket.on('setMaxCountdown', function(playerName, gameID){
    data.setMaxCountdown(playerName,gameID)
    io.to(gameID).emit('thisPoll', data.getPoll(gameID))
  })
}

export { sockets };