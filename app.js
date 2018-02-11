// tst

var express = require('express');
var app = express();
//var fs = require('fs');
var url = require('url');

app.configure(function() {
    app.engine('html', require('uinexpress').__express) // Используем функцию "template" библиотеки underscore для рендеринга
    app.set('view engine', 'html')                      
    app.set('views', __dirname + "/tpl");
    app.set("view options", {layout: 'layout.html'});   // Файл layout.html по умолчанию будет оборачивать все шаблоны
    app.use(express.static(__dirname + "/public"));     // Делаем файлы из папки public доступными на сайте
});

app.get('/', function(req, res){          // Обрабатываем запрос корневой страницы "/"
    res.render('index.html');
});
app.get('/portfolio', function(req, res){ // Обрабатываем запрос страницы "/portfolio"
    res.render('portfolio.html');
});
app.get('/standalone', function(req, res){
    res.render('standalone.html');
});

var Ans = [];

// -----------------------------------------------------------------
// Application itself
// -----------------------------------------------------------------

// all storable data
var State = {
  Towns : 
  [
  // Blue - 'B'
    {name:'Atlanta',        color:'B', ways:[1,4,38], disB:0,disK:0,disR:0,disY:0, lab:true}, // 0
    {name:'Chicago',        color:'B', ways:[0,2,3,36,37], disB:0,disK:0,disR:0,disY:0, lab:false}, // 1
    {name:'SanFrancisco',   color:'B', ways:[1,31,34,36], disB:0,disK:0,disR:0,disY:0, lab:false}, // 2
    {name:'Monreal',        color:'B', ways:[1,4,5], disB:0,disK:0,disR:0,disY:0, lab:false}, // 3
    {name:'Washington',     color:'B', ways:[0,3,5,38], disB:0,disK:0,disR:0,disY:0, lab:false}, // 4
    {name:'NewYork',        color:'B', ways:[3,4,6,7], disB:0,disK:0,disR:0,disY:0, lab:false}, // 5
    {name:'London',         color:'B', ways:[5,7,8,9], disB:0,disK:0,disR:0,disY:0, lab:false}, // 6
    {name:'Madrid',         color:'B', ways:[5,6,9,12,43], disB:0,disK:0,disR:0,disY:0, lab:false}, // 7
    {name:'Essen',          color:'B', ways:[6,9,10,11], disB:0,disK:0,disR:0,disY:0, lab:false}, // 8
    {name:'Paris',          color:'B', ways:[6,7,8,11,12], disB:0,disK:0,disR:0,disY:0, lab:false}, // 9
    {name:'St.Petersburg',  color:'B', ways:[8,13,15], disB:0,disK:0,disR:0,disY:0, lab:false}, // 10
    {name:'Milan',          color:'B', ways:[8,9,13], disB:0,disK:0,disR:0,disY:0, lab:false}, // 11

    // Black - 'K'
    {name:'Algiers',  color:'K', ways:[7,9,13,14], disB:0,disK:0,disR:0,disY:0, lab:false}, // 12
    {name:'Istambul', color:'K', ways:[10,11,12,14,15,16], disB:0,disK:0,disR:0,disY:0, lab:false}, // 13
    {name:'Cairo',    color:'K', ways:[12,13,16,17], disB:0,disK:0,disR:0,disY:0, lab:false}, // 14
    {name:'Moscow',   color:'K', ways:[10,13,18], disB:0,disK:0,disR:0,disY:0, lab:false}, // 15
    {name:'Baghdad',  color:'K', ways:[13,14,17,18,19], disB:0,disK:0,disR:0,disY:0, lab:false}, // 16
    {name:'Riyadh',   color:'K', ways:[14,16,19], disB:0,disK:0,disR:0,disY:0, lab:false}, // 17
    {name:'Tehran',   color:'K', ways:[15,16,19,21], disB:0,disK:0,disR:0,disY:0, lab:false}, // 18
    {name:'Karachi',  color:'K', ways:[16,17,18,20,21], disB:0,disK:0,disR:0,disY:0, lab:false}, // 19
    {name:'Mumbai',   color:'K', ways:[19,21,22], disB:0,disK:0,disR:0,disY:0, lab:false}, // 20
    {name:'Delhi',    color:'K', ways:[18,19,20,22,23], disB:0,disK:0,disR:0,disY:0, lab:false}, // 21
    {name:'Chennai',  color:'K', ways:[20,21,23,24,25], disB:0,disK:0,disR:0,disY:0, lab:false}, // 22
    {name:'Kolkata',  color:'K', ways:[21,22,24,28], disB:0,disK:0,disR:0,disY:0, lab:false}, // 23

    // Red - 'R'
    {name:'Bangkok',       color:'R', ways:[22,23,25,28,29], disB:0,disK:0,disR:0,disY:0, lab:false}, // 24
    {name:'Jakarta',       color:'R', ways:[22,24,29,35], disB:0,disK:0,disR:0,disY:0, lab:false}, // 25
    {name:'Beijing',       color:'R', ways:[27,30], disB:0,disK:0,disR:0,disY:0, lab:false}, // 26
    {name:'Shanghai',      color:'R', ways:[26,28,30,31,33], disB:0,disK:0,disR:0,disY:0, lab:false}, // 27
    {name:'HongKong',      color:'R', ways:[23,24,27,29,33,34], disB:0,disK:0,disR:0,disY:0, lab:false}, // 28
    {name:'HoChiMinhCity', color:'R', ways:[24,25,28,34], disB:0,disK:0,disR:0,disY:0, lab:false}, // 29
    {name:'Seoul',         color:'R', ways:[26,27,31], disB:0,disK:0,disR:0,disY:0, lab:false}, // 30
    {name:'Tokyo',         color:'R', ways:[2,27,30,32], disB:0,disK:0,disR:0,disY:0, lab:false}, // 31
    {name:'Osaka',         color:'R', ways:[31,33], disB:0,disK:0,disR:0,disY:0, lab:false}, // 32
    {name:'Taipei',        color:'R', ways:[27,28,32,34], disB:0,disK:0,disR:0,disY:0, lab:false}, // 33
    {name:'Manila',        color:'R', ways:[2,28,29,33,35], disB:0,disK:0,disR:0,disY:0, lab:false}, // 34
    {name:'Sydney',        color:'R', ways:[25,34,36], disB:0,disK:0,disR:0,disY:0, lab:false}, // 35
    
    
    // Yellow - 'Y'
    {name:'LosAngeles',   color:'Y', ways:[1,2,34,37], disB:0,disK:0,disR:0,disY:0, lab:false}, // 36
    {name:'MexicoCity',   color:'Y', ways:[1,36,38,39,42], disB:0,disK:0,disR:0,disY:0, lab:false}, // 37
    {name:'Miami',        color:'Y', ways:[0,4,37,39], disB:0,disK:0,disR:0,disY:0, lab:false}, // 38
    {name:'Bogota',       color:'Y', ways:[37,38,42,43,46], disB:0,disK:0,disR:0,disY:0, lab:false}, // 39
    {name:'Lagos',        color:'Y', ways:[41,43,44], disB:0,disK:0,disR:0,disY:0, lab:false}, // 40
    {name:'Khartoum',     color:'Y', ways:[14,40,44,47], disB:0,disK:0,disR:0,disY:0, lab:false}, // 41
    {name:'Lima',         color:'Y', ways:[37,39,45], disB:0,disK:0,disR:0,disY:0, lab:false}, // 42
    {name:'SaoPaulo',     color:'Y', ways:[7,39,40,46], disB:0,disK:0,disR:0,disY:0, lab:false}, // 43
    {name:'Kinshasa',     color:'Y', ways:[40,41,47], disB:0,disK:0,disR:0,disY:0, lab:false}, // 44
    {name:'Santiago',     color:'Y', ways:[42], disB:0,disK:0,disR:0,disY:0, lab:false}, // 45
    {name:'BuenosAires',  color:'Y', ways:[39,43], disB:0,disK:0,disR:0,disY:0, lab:false}, // 46
    {name:'Johannesburg', color:'Y', ways:[41,44], disB:0,disK:0,disR:0,disY:0, lab:false} // 47
  ],
  
  Classes :
  [
    'Researcher',
    'Scientist',
    'Medic',
    'Quarantine Specialist',
    'Contingency Planner',
    'Engineer',
    'Dispatcher'
  ],
  
  // define two players
  Players :
  [
    {name:'Player1', pclass:0, hand:[], acts:3, pos:0},
    {name:'Player2', pclass:1, hand:[], acts:3, pos:0}
  ],
  
  infect_deck : [],
  infect_drop : [],
  
  // -1 - teleport
  // -2 - free lab
  // -3 - silent night
  // -13 - !INFECT
  help_deck : [],
  help_drop : [],
  
  is_silent_night:false,
  dis_marker:2, // number of cards from infect deck, to use
  dis_markers: [2,2,2,3,3,4,4],
  outbreak_counter:0, // >=7 - lose
  cur_turn:0,
  cur_player:0,
  first_player:0,
  players_count:2,
  labs_count:0,
  
  remedyB:false,
  remedyK:false,
  remedyR:false,
  remedyY:false,
  
  defeatedB:false,
  defeatedK:false,
  defeatedR:false,
  defeatedY:false,
  
  epidemy_count:6,
  epidemy_id:0,
  
  cont_planner_card_id:0,
  engineer_migrate_used:false,
  
  started:false,
  
  disCntB:0,
  disCntK:0,
  disCntR:0,
  disCntY:0,
  
  DIS_MAX:24,  // if more - game is lost
  OUTBR_MAX:7,  // if more - game is lost
  ACTS_MAX:4,
  CARDS_PER_TURN:2,
  CARDS_PER_PLAYER_START:4,
  PLAYERS_MIN:2,
  PLAYERS_MAX:4,
  PLAYERS_START_CARDS_AMOUNT_ARR:[4,3,2],
  LABS_MAX:6,
  HAND_SIZE_MAX:7,
  EVENT_CARD_COUNT:5,
  
//  misc_prev_commands:[],
//  misc_prev_command_index:0,
  misc_multistep_request:false,
  misc_multistep_reason:''
};

// COMMANDS:
// /help - displays help
// /start - start new game
// /hands - check all cards in players' hands
// /where - check all players' position
// /ways - show all road ways from the current position of the current player
// /ways 'NAME' - show all road ways from a specified town
// /heal - clean one (OR all, if can) disease element from the current position (if exist any)
// /heal CLR - clean one (OR all, if can) disease element from the current position (if exist any)
// /aleft - show available actions
// /info - detailed info about the game state

// /lab - builds a lab in the current town, spends card
// /lab -E - (Engeneer Only) builds a lab in the current town, doesn't spend card

// /fly 'NAME' - teleports current player to the specified town 'NAME', spends card 'NAME'
// /warp 'SNAME' - teleports current player to the specified town 'SNAME', spends card of the current town
// /warp -E 'NAME' 'SNAME' - (Engeneer Only) teleports current player if he or she stands in a city with Lab,
//                           to the specified town 'NAME', spends card 'SNAME' (one time per turn)
// /lwarp 'NAME' - warp to town
// /move [who] [where] [cost]
// /drive 'NAME' - go to a town, that is next to current position

// /cchange <'PLAYER_NAME'> - gives the card of the current town from another player to the current player or backward, must be in that town both
// /cchange 'NAME' <'PLAYER_NAME'> - gives the card 'NAME' from the Researcher to the other player, one of which must be current player
// if current player is trying to give the card, and there are more, than two players in that town - must specify the recipient

// /remedy 'X' 'NAME1', 'NAME2' - invent the remedy from the specified disease 'X', using two cards 'NAME1', 'NAME2'
// /turn - end the turn

var MAIN = {

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

};

var port = process.env.PORT || 5000;       
//var port = 5000;
app.listen(port);                           // Запускаем сервер на 5000 порту, если не указана переменная окружения "port" 
//console.log("Listening at " + port);        // Пишем в консоль, что запустились