## Grundkrav (kolla av innan vi lämnar in)

- [] Allting är responsive?
- [] UI är dynamiskt uppdaterad beroende på språk men rutterna behöver inte vara det
- [x] Vi kan skapa en rutt och det fungerar som de förbestämda 
- [] Inga varningar i consolen som gör att det inte funkar när vi ska sätta ut detta på internet?
- [] Testa hur andra använder sidan för första gånger när de vill joina ett spel och spela (med dator + mobil?)
- [] Testa hur andra använder sidan för första gånger när de vill skapa en rutt på datorn

## Responsive (alltså att man kan använda sidan med olika skärmstorlekar) Brädden är det viktiga

Här rekommenderade Mikael att vi ska använda media queries och för kartorna så var canvas rekommenderat.

- [x] StartView - Viktig - nu funkar det bra på mobiler!
- [x] JoinView - Viktig - verkar också funka på mobiler!
- [x] CreateLobbyView - verkar funka på mobilen!
- [] CreateRouteView
- [] ChooseMapView
- [/] LobbyView - Viktig - funkar nästan på mobiler det är bara IdBox som blockerar
- [/] GameView - Viktig
- [] GameResultView
- [/] JoinLobbyView - Viktig - funker nästan på mobiler det är bara IdBox som blockerar

Kommer vi att använda RandomView och GameIDView?

Det viktigaste är att man kan joina spelet och spela lätt med olika typer av skärmar

## Allmänt

- [] Göra bilderna mindre färgglada?
- [X] Göra en rutt på svenska
- [x] Göra en rutt på engelska
- [X] HoverEffekt på mer buttons?

## LobbyView

- [x] Man ska bara kunna joina en lobby en gång
- [x] Bara den som skapade lobbyn ska kunna starta spelet
- [x] När man startar spelet så ska alla som är i lobbyn joina spelet
- [x] Man ska bara kunna starta spelet om alla som är i lobbyView har joinat lobbyn?
- [] Man ska inte kunna välja samma färg
- [x] Border runt player pieces i lobbyView
- [] Ska man kunna lämna lobbyn?
- [x] Man ska inte kunna heta samma sak som någon annan
- [] Meddelande om att inte alla har joinat lobby än?
- [] En countdown så att alla är redo för att spelet kommer starta?
- [x] Så att man kan ladda om

Vad händer om en spelare bara stänger ner fönstret i lobbyn eller i GameView?

## GameView

- [x] När alla spelare joinar gameView så ska alla spelare placeras i samma stad och det ska synas för alla
- [x] Alla ska få en av de tre frågor relaterade till den staden slumpmässigt.
- [x] När man svarar rätt så ska man få gå till nästa stad och få en ny slumpmässig fråga där och alla ska se att man har kommit till nästa stad
- [x] När man svarar fel så ska man få vänta? ny fråga eller slumpmässig?
- [x] När man svarar rätt och är vid den sista staden så ska alla pushas till GameResultView
- [/] Använd Canvas för att kunna göra kartan responsive
- [x] Linjer mella städer så att det blir lättare att se ruttens struktur?
- [/] Något som indikerar vilken av pluttarna som man är eftersom att det är svårt att komma ihåg vilken färg man valde?
- [x] ändra så att man får en fråga via serven så att den inte ändras när man laddar om eller ändrar skärmstorlek
- [] Städers storlek och titel ändras med media quaries?
- [] göra kartan minde färgglad och få städerna att "poppa" med shadow osv finns i css!
- [x] Göra så att kartan aldrig strechas ut så att Mikael blir glad?
- [] Ändra så att man alltid ser sig själv i mitten på kartan om man inte scrollar


## CreateLobbyView - Planen är att man får först välja mellan att välja rutt eller skapa rutt. Om man väljer att välja rutt så ska man få upp under det där man kan sätta sitt namn och färg.

- [] något som indikerar vilket språk den förvalda rutten är på
- [x] Sepparera Create Lobby och Create new Route
- [] Man ska inte kunna få ett GameID som redan finns
- [x] röd border runt förvalda spelknappar när man inte har valt karta 

## JoinView

- [x] Man ska inte kunna joina en lobby som har startat spelet

## GameResultView

- [/] Man ska kunna se vilken stad spelarna kom till och vem som vann

## CreateRouteView
- [] blädderfunktion

## JoinLobbyView

- [] Så att man bara kan se de tillgängliga färgerna