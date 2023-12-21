function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang, d.route));
  });

  socket.on('addQuestion', function(d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a, c:d.c});
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
  socket.on('loadcities', function() {
    socket.emit('citiesLoaded',  data.getCities())
    console.log("citiesLoaded")
  });
  socket.on('joinLobby', function (d) {
    data.addPlayerToLobby(d.gameID, d.playerName, d.playerColor);
    let players = data.getPlayers(d.gameID)
    console.log(players, "hallå från socket")
    io.to(d.gameID).emit('updatePlayerList', players);
  });
  socket.on('enterlobby', function(gameID){
    let players = data.getPlayers(gameID)
    io.to(gameID).emit('updatePlayerList', players);
  })
  socket.on('getPoll', function(pollId) {
    io.to(pollId).emit('thisPoll', data.getPoll(pollId))
  })

  
 
}

export { sockets };