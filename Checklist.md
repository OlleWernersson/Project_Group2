## Responsive (alltså att man kan använda sidan med olika skärmstorlekar) 

Här rekommenderade Mikael att vi ska använda media queries och för kartorna så var canvas rekommenderat.

- [] StartView
- [] JoinView
- [] CreateLobbyView
- [] CreateRouteView
- [] ChooseMapView
- [] LobbyView
- [] GameView
- [] ResultView

Kommer vi att använda RandomView och GameIDView?

## LobbyView

- [x] Man ska bara kunna joina en lobby en gång
- [x] Bara den som skapade lobbyn ska kunna starta spelet
- [x] När man startar spelet så ska alla som är i lobbyn joina spelet
- [x] Man ska bara kunna starta spelet om alla som är i lobbyView har joinat lobbyn?
- [] Man ska inte kunna välja samma färg
- [x] Border runt player pieces i lobbyView
- [] Ska man kunna lämna lobbyn?
- [] Man ska inte kunna heta samma sak som någon annan?
- [] Meddelande om att inte alla har joinat lobby än?

Vad händer om en spelare bara stänger ner fönstret i lobbyn eller i GameView?

## GameView - Olle arbetar med denna nu

- [x] När alla spelare joinar gameView så ska alla spelare placeras i samma stad och det ska synas för alla
- [x] Alla ska få en av de tre frågor relaterade till den staden slumpmässigt.
- [] När man svarar rätt så ska man få gå till nästa stad och få en ny slumpmässig fråga där och alla ska se att man har kommit till nästa stad
- [] När man svarar fel så ska man få vänta? ny fråga eller slumpmässig?

## Grundkrav (kolla av innan vi lämnar in)

- [] Allting är responsive?
- [] UI är dynamiskt uppdaterad beroende på språk men rutterna behöver inte vara det
- [] Vi kan skapa en rutt och det fungerar som de förbestämda 

## CreateLobbyView

- [] något som indikerar vilket språk den förvalda rutten är på

## JoinView

- [] Man ska inte kunna joina en lobby som har startat spelet