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

//app.post('/test1', function(req, res){
//    console.log('TSET!');
//    return res.end();
//});

var Ans = '';
var History = [];

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
  misc_multistep_reason:'',
  
  MISC_GAME_ID_MAX:100000,
  misc_game_id:0,
  misc_action_id:0,
  misc_nospread:false
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


app.post('/req', function(req, res) {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
  
  function swapElems(arr, e1i, e2i) {
    var tmp = arr[e1i];
    arr[e1i] = arr[e2i];
    arr[e2i] = tmp;
  }

  function shuffleArr(arr) {
    var i=0;
    for(i=0; i<arr.length; i++) {
      var e1i = getRndInteger(0, arr.length);
      var e2i = getRndInteger(0, arr.length);
      swapElems(arr, e1i, e2i);
    }
  }  

  function getCardDispName(card_id) {
    if(card_id < 0) {
      if(card_id == -1) {
        return '!Teleport'
      } else if (card_id == -2) {
        return '!FreeLab';
      } else if (card_id == -3) {
        return '!SilentNight';
      } else if (card_id == -4) {
        return '!Prediction';
      } else if (card_id == -5) {
        return '!Immunity';
      } else if (card_id == -13) {
        return 'EPIDEMY!';
      }
      
      return '!!!Undefined';
    }
    
    if(card_id >= State.Towns.length) {
      return '!!!Undefined';
    }
    
    return State.Towns[card_id].name;
  }

  function getCardIdByDispName(card_name) {
    var fi1 = 0;
    var city_index = -1;
    
    for(fi1=0; fi1<State.Towns.length; fi1++) {
      if(State.Towns[fi1].name == card_name) {
        city_index = fi1;
        break;
      }
    }

    if(city_index >= 0) {
      return city_index;
    }
    
    if(card_name == '!Teleport') {
      return -1;
    } else if(card_name == '!FreeLab') {
      return -2;
    } else if(card_name == '!SilentNight') {
      return -3;
    } else if(card_name == '!Prediction') {
      return -4;
    } else if(card_name == '!Immunity') {
      return -5;
    }
    
    //Epidemy id - error
    return -13;
  }

  function infectTown(t_id, color, already_prop) {
    // Qua Spec prevents propagation
    // not affect setup
    if(State.started) {
      var qua_spec_p_id = getPlayerIdByClassName('Quarantine Specialist');
      if(qua_spec_p_id >= 0) {
        var qua_spec_pos = State.Players[qua_spec_p_id].pos;
        if(qua_spec_pos == t_id) {
          log('Quarantine Specialist prevents infection in \'' + State.Towns[t_id].name + '\'.');
          return true;
        }
        var i=0;
        for(i=0; i<State.Towns[qua_spec_pos].ways.length; i++) {
          if(State.Towns[qua_spec_pos].ways[i] == t_id) {
            log('Quarantine Specialist prevents infection in \'' + State.Towns[t_id].name + '\'.');
            return true;
          }
        }
      }
    }

    // Medic prevents placing cubes of the disease with remedy, if stands in this town
    var medic_id = getPlayerIdByClassName('Medic');
    if(medic_id >= 0) {
      if(t_id == State.Players[medic_id].pos) {
        if(color == 'B' && State.remedyB) {
          log('Medic prevents infecting of \'' + State.Towns[t_id].name + '\' by Blue disease.');
          return true;
        } else if(color == 'K' && State.remedyK) {
          log('Medic prevents infecting of \'' + State.Towns[t_id].name + '\' by Black disease.');
          return true;
        } else if(color == 'R' && State.remedyR) {
          log('Medic prevents infecting of \'' + State.Towns[t_id].name + '\' by Red disease.');
          return true;
        } else if(color == 'Y' && State.remedyY) {
          log('Medic prevents infecting of \'' + State.Towns[t_id].name + '\' by Yellow disease.');
          return true;
        }
      }
    }

    function match_raw(arr) {
      var fi1 = 0;
      for(fi1=0; fi1<arr.length; fi1++) {
        if(arr[fi1] == t_id) {
          return fi1;
        }
      }
      
      return -1;
    }
    
    
    if(!State.defeatedB && color == 'B') {
      if(State.Towns[t_id].disB >= 3) {
        State.Towns[t_id].disB = 3;
        if(match_raw(already_prop) < 0) {
          if(!outbrDisease(t_id, color, already_prop)) {
            return false;
          }
        }
      } else {
        State.Towns[t_id].disB++;
        State.disCntB++;
        if(State.disCntB > State.DIS_MAX) {
          Lose('Blue disease spreads too fast');
          return false;
        }
      }
    } else if (!State.defeatedK && color == 'K') {
      if(State.Towns[t_id].disK >= 3) {
        State.Towns[t_id].disK = 3;
        if(match_raw(already_prop) < 0) {
          if(!outbrDisease(t_id, color, already_prop)) {
            return false;
          }
        }
      } else {
        State.Towns[t_id].disK++;
        State.disCntK++;
        if(State.disCntK > State.DIS_MAX) {
          Lose('Black disease spreads too fast');
          return false;
        }
      }
    } else if (!State.defeatedR && color == 'R') {
      if(State.Towns[t_id].disR >= 3) {
        State.Towns[t_id].disR = 3;
        if(match_raw(already_prop) < 0) {
          if(!outbrDisease(t_id, color, already_prop)) {
            return false;
          }
        }
      } else {
        State.Towns[t_id].disR++;
        State.disCntR++;
        if(State.disCntR > State.DIS_MAX) {
          Lose('Red disease spreads too fast');
          return false;
        }
      }
    } else if (!State.defeatedY && color == 'Y') {
      if(State.Towns[t_id].disY >= 3) {
        State.Towns[t_id].disY = 3;
        if(match_raw(already_prop) < 0) {
          if(!outbrDisease(t_id, color, already_prop)) {
            return false;
          }
        }
      } else {
        State.Towns[t_id].disY++;
        State.disCntY++;
        if(State.disCntY > State.DIS_MAX) {
          Lose('Yellow disease spreads too fast');
          return false;
        }
      }
    }
    
    return true;
  }

  function outbrDisease(t_id, color, already_prop) {
    log('Outbreak in \'' + State.Towns[t_id].name + '\'!');
    already_prop.push(t_id);
    // increment number of outbreaks
    State.outbreak_counter++;
    if(State.outbreak_counter > State.OUTBR_MAX) {
      Lose('too many outbreaks');
      return false;
    } else {
      var i=0;
      for(i=0; i<State.Towns[t_id].ways.length; i++) {
        if(!infectTown(State.Towns[t_id].ways[i], color, already_prop)) {
          return false;
        }
        log(getInfectionStrFull(State.Towns[t_id].ways[i]));
      }
    }
    
    return true;
  }  

  function getInfection(t_id, color) {
    if(color == 'B') {
      return State.Towns[t_id].disB;
    } else if (color == 'K') {
      return State.Towns[t_id].disK;
    } else if (color == 'R') {
      return State.Towns[t_id].disR;
    } else if (color == 'Y') {
      return State.Towns[t_id].disY;
    }
    
    return -1;
  }

  function getInfectionStrFull(t_id) {
    str = 'City';
    str += ' \'';
    str += State.Towns[t_id].name;
    str += '\'';
    str += 'is infected by ';
    var bfirst = true;
    if(State.Towns[t_id].disB > 0) {
      str += '\'B\' - ';
      str += State.Towns[t_id].disB;
      bfirst = false;
    }
    if(State.Towns[t_id].disK > 0) {
      if(!bfirst) {
        str += ', '
      }
      str += '\'K\' - ';
      str += State.Towns[t_id].disK;
      bfirst = false;
    }
    if(State.Towns[t_id].disR > 0) {
      if(!bfirst) {
        str += ', '
      }
      str += '\'R\' - ';
      str += State.Towns[t_id].disR;
      bfirst = false;
    }
    if(State.Towns[t_id].disY > 0) {
      if(!bfirst) {
        str += ', '
      }
      str += '\'Y\' - ';
      str += State.Towns[t_id].disY;
      bfirst = false;
    }
    if(bfirst) {
      str += 'NOTHING';
    }
    
    str += ';'

    return str;
  }

  function getTownIdByName(name) {
    var i=0;
    for(i=0; i<State.Towns.length; i++) {
      if(State.Towns[i].name == name) {
        return i;
      }
    }
    
    return -1;
  }

  function isTownInWays(t_id, wt_id) {
    var i=0;
    for(i=0; i<State.Towns[wt_id].ways.length; i++) {
      if(State.Towns[wt_id].ways[i] == t_id) {
        return true;
      }
    }
    
    return false;
  }

  function getPlayerIdByClassName(cname) {
    var fi1 = 0;
    var c_id = -1;
    
    for(fi1=0; fi1<State.Classes.length; fi1++) {
      if(State.Classes[fi1] == cname) {
        c_id = fi1;
        break;
      }
    }

    if(c_id < 0) {
      return -1;
    }
    
    for(fi1=0; fi1<State.Players.length; fi1++) {
      if(State.Players[fi1].pclass == c_id) {
        return fi1;
      }
    }
    
    return -1;
  }

  function getPlayerIdByName(pname) {
    var i=0;
    for(i=0; i<State.Players.length; i++) {
      if(State.Players[i].name == pname) {
        return i;
      }
    }
    
    return -1;
  }

  function log(str) {
      if(Ans != '') {
        Ans += '\n';
      }
      Ans += str;
      
      if(!State.misc_nospread) {
        History[History.length-1] = Ans;
      }
  }

  function process_main() {
    var THIS_SITE = 'http://v-prj0.herokuapp.com/';

    State.misc_nospread = false;
    var cmd = req_st.command;
    var arg1 = req_st.arg1;
    var arg2 = req_st.arg2;
    var arg3 = req_st.arg3;

    var game_cmds_arr = ['help',
                         'start',
                         'ways',
                         'where',
                         'drive',
                         'fly',
                         'warp',
                         'move',
                         'turn',
                         'heal',
                         'lab',
                         'remedy',
                         'cchange',
                         'redraw',
                         'migrate',
                         'use',
                         'info',
                         'setpname',
                         'classinfo',
                         'me',
                         //'misc_clr',   // (client side now)
                         //'misc_map',   // (client side now)
                         //'misc_rules', // (client side now)
                         'misc_about'];
                         
    var fi1 = 0;
    var cmd_found = false;
    for(fi1=0; fi1<game_cmds_arr.length; fi1++) {
      if(game_cmds_arr[fi1] == cmd) {
        cmd_found = true;
        break;
      }
    }

    if(!cmd_found) {
      State.misc_nospread = true;
      log('Unknown command. Type \'/help\' to see available commands.');
      return;
    }
    
    History.push('');
    if(cmd == 'help') {
      State.misc_nospread = true;
      Help();
    } else if(cmd == 'start') {
      State.misc_game_id++;
      State.misc_action_id = 0;
      // reset history
      History = [];
      History.push('');
      Init(arg1, arg2);
    } else if(cmd == 'ways' && State.started) {
      State.misc_nospread = true;
      Ways(arg1);
    } else if(cmd == 'where' && State.started) {
      State.misc_nospread = true;
      Where();
    } else if(cmd == 'drive' && State.started) {
      Drive(arg1);
    } else if(cmd == 'fly' && State.started) {
      Fly(arg1);
    } else if(cmd == 'warp' && State.started) {
      Warp(arg1, arg2, arg3);
    } else if(cmd == 'move' && State.started) {
      Move(arg1, arg2, arg3);
    } else if(cmd == 'turn' && State.started) {
      Turn();
    } else if(cmd == 'heal' && State.started) {
      Heal(arg1);
    } else if(cmd == 'lab' && State.started) {
      Lab(arg1);
    } else if(cmd == 'remedy' && State.started) {
      Remedy(arg1, arg2, arg3);
    } else if(cmd == 'cchange' && State.started) {
      Cchange(arg1, arg2);
    } else if(cmd == 'redraw' && State.started) {
      Redraw(arg1);
    } else if(cmd == 'migrate' && State.started) {
      Migrate(arg1, arg2);
    } else if(cmd == 'use' && State.started) {
      Use(arg1);
    } else if(cmd == 'info' && State.started) {
      State.misc_nospread = true;
      Info(arg1);
    } else if(cmd == 'setpname' && State.started) {
      Setpname(arg1, arg2);
    } else if(cmd == 'classinfo') {
      State.misc_nospread = true;
      Classinfo(arg1);
    } else if(cmd == 'me' && State.started) {
      State.misc_nospread = true;
      Me();
    } else if(cmd == 'misc_about') {
      State.misc_nospread = true;
      log('Product: Digital Pandemic.');
      log('Version: pre-release 1(v0.2)');
      log('Author: Varyier');
      log('E-mail: attervip@yandex.ru');
      log('Location site: ' + THIS_SITE);
      log('Date(first version): 09.02.2018');
      log('Date(release): -');
    } else if(!State.started) {
      State.misc_nospread = true;
      log('Start the game first.');
    }
    
    if(!State.misc_nospread) {
      State.misc_action_id++;
    } else {
      History.pop();
    }
  }

  // STUFF
  function drawCards(p_id) {
    if(State.help_deck.length <= 0) {
      Lose('help deck has drained');
      return false;
    } else {
      State.Players[p_id].hand.push(State.help_deck[State.help_deck.length-1]);
      State.help_deck.pop();
      return true;
    }
  }

  function Init(pcnt, skill) {
    State.started = false;

    // choose player count
    if(pcnt == '2') {
      State.players_count = 2;
      log('Number of players is 2 - four cards per player on start;');
    } else if (pcnt == '3') {
      State.players_count = 3;
      log('Number of players is 3 - three cards per player on start;');
    } else if (pcnt == '4') {
      State.players_count = 4;
      log('Number of players is 4 - two cards per player on start;');
    } else if(pcnt == '') {
      State.players_count = 2;
      log('Number of players is 2 - four cards per player on start;');      
    } else {
      log('Must specify correct number of players: \'2\', \'3\', \'4\', \'0\' or empty (for default)');
      return;
    }
    
    // choose skill level
    if(skill == 'easy') {
      State.epidemy_count = 4;
      log('Skill level is EASY - 4 epidemy cards;');
    } else if (skill == 'medium') {
      State.epidemy_count = 5;
      log('Skill level is MEDIUM - 5 epidemy cards;');
    } else if (skill == 'heroic') {
      State.epidemy_count = 6;
      log('Skill level is HEROIC - 6 epidemy cards;');
    } else if(skill == '') {
      // default skill is medium
      State.epidemy_count = 5;
      log('Skill level is MEDIUM - 5 epidemy cards;');
    } else {
      log('Unknown skill level. Use \'easy\', \'medium\', \'heroic\' or empty');
      return;
    }
    
    var i=0;

    for(i=0; i<State.Towns.length; i++) {
      State.Towns[i].disB = 
      State.Towns[i].disK =
      State.Towns[i].disR = 
      State.Towns[i].disY = 0;
      // lab only in Atlanta
      State.Towns[i].lab = (i==0);
    }
    
    State.remedyB =
    State.remedyK =
    State.remedyR = 
    State.remedyY = false;
    
    State.defeatedB =
    State.defeatedK =
    State.defeatedR = 
    State.defeatedY = false;
    
    State.disCntB = 
    State.disCntK = 
    State.disCntR = 
    State.disCntY = 0;
    
    // -1 - teleport
    // -2 - free lab
    // -3 - silent night
    // -13 - !INFECT (must be 3)
    State.infect_deck = [];
    State.infect_drop = [];
    
    State.help_deck = [-1,-2,-3,-4,-5];
    State.help_drop = [];
    
    // add all City cards into both decks
    for(i=0; i<State.Towns.length; i++) {
      State.infect_deck.push(i);
      State.help_deck.push(i);
    }
    
    // shuffle both decks
    shuffleArr(State.help_deck);
    shuffleArr(State.infect_deck);
    
    // Init Players, assigning classes
    var classes_left = [];
    for(i=0; i<State.Classes.length; i++) {
      classes_left.push(i);
    }
    
    shuffleArr(classes_left);

    State.Players = [];
    var initial_hand_size = State.PLAYERS_START_CARDS_AMOUNT_ARR[State.players_count-State.PLAYERS_MIN];
    for(i=0; i<State.players_count; i++) {
      var p_id = State.Players.length;
      State.Players.push({});

      State.Players[p_id].name = 'Player' + (i+1).toString();
      State.Players[p_id].pclass = classes_left[i];
      State.Players[p_id].hand = [];
      var j=0;
      for(j=0; j<initial_hand_size; j++) {
        drawCards(p_id);
      }
      State.Players[p_id].acts = State.ACTS_MAX;
      State.Players[p_id].pos = 0; // Atlanta
    }
    
    // init Epidemies
    State.epidemy_id = 0;
    
    var epi_arrs = [];
    var epi_mod = State.help_deck.length % State.epidemy_count;
    var nTaken = 0;
    for(i=0;i<State.epidemy_count; i++) {
      var id = epi_arrs.length;
      epi_arrs.push([]);
      var size = (State.help_deck.length-epi_mod) / State.epidemy_count;
      if(i<epi_mod) {
        size++;
      }
      var j=0;
      for(j=0; j<size; j++) {
        epi_arrs[id].push(State.help_deck[nTaken++]);
      }
      epi_arrs[id].push(-13);
      shuffleArr(epi_arrs[id]);
    }
    State.help_deck = [];
    for(i=0; i<State.epidemy_count; i++) {
      var j=0;
      for(j=0; j<epi_arrs[i].length; j++) {
        State.help_deck.push(epi_arrs[i][j]);
      }
    }
    
    State.labs_count = 1;
    
    State.is_silent_night = false;
    State.dis_marker = State.dis_markers[State.epidemy_id];
    State.outbreak_counter = 0;
    State.cur_turn = 0;
    State.first_player = State.cur_player = getRndInteger(0, State.Players.length);
    
    State.cont_planner_card_id = 0;
    State.engineer_migrate_used = false;
    
    log('New game started.');
    for(i=0; i<State.Players.length; i++) {
      var str = 'Player';
      str += ' \'';
      str += State.Players[i].name;
      str += '\'';
      
      str += ' is \''
      str += State.Classes[State.Players[i].pclass];
      str += '\','
      
      str += ' has: ';
      
      var j=0;
      for(j=0; j<State.Players[i].hand.length; j++) {
        str += ' \'';
        str += getCardDispName(State.Players[i].hand[j]);
        str += '\'';
        if(j<State.Players[i].hand.length-1) {
        str += ', ';
        }
      }
      
      str += ';';
      log(str);
    }
    
    var str = '';
    // initial infect
    // 3
    var infect = State.infect_deck[State.infect_deck.length-1];
    var arr = [];
    State.infect_deck.pop();
    State.infect_drop.push(infect);
    infectTown(infect, State.Towns[infect].color, arr);
    infectTown(infect, State.Towns[infect].color, arr);
    infectTown(infect, State.Towns[infect].color, arr);
    log(getInfectionStrFull(infect));
    
    infect = State.infect_deck[State.infect_deck.length-1];
    State.infect_deck.pop();
    State.infect_drop.push(infect);
    infectTown(infect, State.Towns[infect].color, arr);
    infectTown(infect, State.Towns[infect].color, arr);
    infectTown(infect, State.Towns[infect].color, arr);
    log(getInfectionStrFull(infect));
    
    infect = State.infect_deck[State.infect_deck.length-1];
    State.infect_deck.pop();
    State.infect_drop.push(infect);
    infectTown(infect, State.Towns[infect].color, arr);
    infectTown(infect, State.Towns[infect].color, arr);
    infectTown(infect, State.Towns[infect].color, arr);
    log(getInfectionStrFull(infect));
    
    // 2
    infect = State.infect_deck[State.infect_deck.length-1];
    State.infect_deck.pop();
    State.infect_drop.push(infect);
    infectTown(infect, State.Towns[infect].color, arr);
    infectTown(infect, State.Towns[infect].color, arr);
    log(getInfectionStrFull(infect));
    
    infect = State.infect_deck[State.infect_deck.length-1];
    State.infect_deck.pop();
    State.infect_drop.push(infect);
    infectTown(infect, State.Towns[infect].color, arr);
    infectTown(infect, State.Towns[infect].color, arr);
    log(getInfectionStrFull(infect));

    infect = State.infect_deck[State.infect_deck.length-1];
    State.infect_deck.pop();
    State.infect_drop.push(infect);
    infectTown(infect, State.Towns[infect].color, arr);
    infectTown(infect, State.Towns[infect].color, arr);
    log(getInfectionStrFull(infect));
    
    // 1
    infect = State.infect_deck[State.infect_deck.length-1];
    State.infect_deck.pop();
    State.infect_drop.push(infect);
    infectTown(infect, State.Towns[infect].color, arr);
    log(getInfectionStrFull(infect));
    
    infect = State.infect_deck[State.infect_deck.length-1];
    State.infect_deck.pop();
    State.infect_drop.push(infect);
    infectTown(infect, State.Towns[infect].color, arr);
    log(getInfectionStrFull(infect));

    infect = State.infect_deck[State.infect_deck.length-1];
    State.infect_deck.pop();
    State.infect_drop.push(infect);
    infectTown(infect, State.Towns[infect].color, arr);
    log(getInfectionStrFull(infect));
    
    str = 'Now the turn is for player';
    str += ' \'';
    str += State.Players[State.cur_player].name;
    str += '\'';
    str += ';';
    
    log(str);
    
    State.started = true;
  }

  function Where() {
    var i=0;
    for(i=0; i<State.Players.length; i++) {
      var str = 'Player';
      str += ' \'';
      str += State.Players[i].name;
      str += '\'';
      str += ' is in';
      str += ' \'';
      str += State.Towns[State.Players[i].pos].name;
      str += '\'';
      str += ';';
      log(str);
    }
  }

  function Ways(from) {
    var from_id = -1;
    var i=0;
    var from_name;
    if(from == '') {
      // current town of the current player
      from_id = State.Players[State.cur_player].pos;
      from_name = State.Towns[from_id].name;
    } else {  
      for(i=0; i<State.Towns.length; i++) {
        if(State.Towns[i].name == from) {
          from_id = i;
          from_name = State.Towns[from_id].name;
          break;
        }
      }
    }
    
    if(from_id == -1) {
      log('ERROR[Ways]: cannot find the town ' + from);
    }
    
    var str = 'Ways from ';
    str += ' \'';
    str += from_name;
    str += '\'';
    str += ' are:'
    for(i=0; i<State.Towns[from_id].ways.length; i++) {
      if(i != 0) {
        str += ','
      }
      str += ' \'';
      str += State.Towns[State.Towns[from_id].ways[i]].name;
      str += '\'';
    }
    str += ';'
    
    log(str);
  }

  function Drive(dest) {
    var pos = State.Players[State.cur_player].pos;
    var pos_dest = getTownIdByName(dest);
    if(pos_dest < 0) {
      log('Incorrect city name.');
    } else if(State.Players[State.cur_player].acts <= 0) {
      log('No actions left.');
    } else if(!isTownInWays(pos_dest, pos)) {
      log('City is unreacheble from the current positon.');
    } else {
      State.Players[State.cur_player].acts--;
      State.Players[State.cur_player].pos = pos_dest;
      
      var str = 'Player';
      str += ' \'';
      str += State.Players[State.cur_player].name;
      str += '\'';
      str += ' is now in';
      str += ' \'';
      str += State.Towns[State.Players[State.cur_player].pos].name;
      str += '\'';
      str += ';';
      log(str);
      
      log('Actions left: ' + State.Players[State.cur_player].acts + '.');
      AutoHeal();
    }
  }

  function Fly(dest) {
    var pos_dest = getTownIdByName(dest);
    var pos = State.Players[State.cur_player].pos;

    var fi1 = 0;
    var card_index = -1;
    
    // searching for card of the corresponding city
    for(fi1=0; fi1<State.Players[State.cur_player].hand.length; fi1++) {
      if(State.Players[State.cur_player].hand[fi1] == pos_dest) {
        card_index = fi1;
        break;
      }
    }
    
    if(pos_dest < 0) {
      log('Incorrect city name.');
    } else if(pos == pos_dest) {
      log('Choose a city, other that the current one.');
    } else if(State.Players[State.cur_player].acts <= 0) {
      log('No actions left.');
    } else if(card_index < 0) {
      log('Need the card of that city.');
    } else {
      State.Players[State.cur_player].acts--;
      State.Players[State.cur_player].pos = pos_dest;
      State.Players[State.cur_player].hand[card_index] = 
      State.Players[State.cur_player].hand[State.Players[State.cur_player].hand.length-1];
      State.Players[State.cur_player].hand.pop();
      State.help_drop.push(pos_dest);
      
      log('Discarded card \'' + dest + '\'.');
      
      var str = 'Player';
      str += ' \'';
      str += State.Players[State.cur_player].name;
      str += '\'';
      str += ' is now in';
      str += ' \'';
      str += State.Towns[State.Players[State.cur_player].pos].name;
      str += '\'';
      str += ';';
      log(str);
      
      log('Actions left: ' + State.Players[State.cur_player].acts + '.');
      AutoHeal();
    }
  }

  function Warp(arg1, eDest, eCost) {
    var pos_dest = getTownIdByName(arg1);
    var pos = State.Players[State.cur_player].pos;
    
    var fi1 = 0;
    var card_index = -1;
    
    // searching for card of the corresponding city
    for(fi1=0; fi1<State.Players[State.cur_player].hand.length; fi1++) {
      if(State.Players[State.cur_player].hand[fi1] == pos) {
        card_index = fi1;
        break;
      }
    }
    
    if(pos_dest < 0) {
      log('Incorrect city name.');
    } else if(pos == pos_dest) {
      log('Choose a city, other that the current one.');
    } else if(State.Players[State.cur_player].acts <= 0) {
      log('No actions left.');
    } else if(card_index < 0) {
      log('Need the card of the current city.');
    } else {
      State.Players[State.cur_player].acts--;
      State.Players[State.cur_player].pos = pos_dest;
      State.Players[State.cur_player].hand[card_index] = 
      State.Players[State.cur_player].hand[State.Players[State.cur_player].hand.length-1];
      State.Players[State.cur_player].hand.pop();
      State.help_drop.push(pos);
      
      log('Discarded card \'' + State.Towns[pos].name + '\'.');
      
      var str = 'Player';
      str += ' \'';
      str += State.Players[State.cur_player].name;
      str += '\'';
      str += ' is now in';
      str += ' \'';
      str += State.Towns[State.Players[State.cur_player].pos].name;
      str += '\'';
      str += ';';
      log(str);
      
      log('Actions left: ' + State.Players[State.cur_player].acts + '.');
      AutoHeal();
    }
  }

  function Move(who, where, cost) {
    var who_id = getPlayerIdByName(who);
    
    var where_player = false;
    var where_id = getCardIdByDispName(where);
    
    if(where_id == -13) {
      where_id = getPlayerIdByName(where);
      where_player = true;
      if(where_id >= 0) {
        where_id = State.Players[where_id].pos;
      }
    }
    
    var cost_id = getCardIdByDispName(cost);
    
    if(getPlayerIdByClassName('Dispatcher') != State.cur_player) {
      log('Must be Dispatcher to use this command.');
    } else if(who_id < 0) {
      log('Incorrect player name to move.');
    } else if(where_id < 0) {
      log('Incorrect destination. Second argument must specify the player or the city to move to.');
    } else if(State.Players[who_id].pos == where_id) {
      log('Cannot move player to his or her current position.');
    } else if(State.Players[State.cur_player].acts <= 0) {
      log('No actions left.');
    } else {
      var action = '';
    
      var fi1 = 0;
      var player_in_dest = false;
      
      for(fi1=0; fi1<State.Players.length; fi1++) {
        if(State.Players[fi1].pos == where_id) {
          player_in_dest = true;
          break;
        }
      }
    
      var hand_index = -1;
      var cost_card_id = getCardIdByDispName(cost);
      // choose the cheapest action (maybe with spending a card): move to player, drive, direct or chapter flight
      if(isTownInWays(where_id, State.Players[who_id].pos)) {
        // Drive
        action = 'Drive';
      } else if(player_in_dest) {
        // move to player (Bring)
        action = 'Bring';
      } else {
        // search hand for a card
        var cur_pos = State.Players[who_id].pos;
        var dest_pos = where_id;
        
        var fi1 = 0;
        var dir_flight_card_index = -1;
        var cha_flight_card_index = -1;
        
        for(fi1=0; fi1<State.Players[State.cur_player].hand.length; fi1++) {
          if(State.Players[State.cur_player].hand[fi1] == dest_pos) {
            dir_flight_card_index = fi1;
          }
          if(State.Players[State.cur_player].hand[fi1] == cur_pos) {
            cha_flight_card_index = fi1;
          }          
        }
        
        if(dir_flight_card_index < 0 && cha_flight_card_index < 0) {
          // no required card
          log('This action requires a card: \'' + getCardDispName(dest_pos) + '\' or \'' + getCardDispName(cur_pos) + '\'.');
          return;
        } else if(dir_flight_card_index < 0 && !(cha_flight_card_index < 0)) {
          // chapter flight (check cost)
          if(cost != '' && cost_card_id != cur_pos) {
            log('Cost doesn\'t match the required action (need \'' + getCardDispName(cur_pos) + '\').');
            return;
          }
          action = 'Chapter flight';
          cost_card_id = cur_pos;
          hand_index = cha_flight_card_index;
        } else if(cha_flight_card_index < 0 && !(dir_flight_card_index < 0)) {
          // direct flight (check cost)
          if(cost != '' && cost_card_id != dest_pos) {
            log('Cost doesn\'t match the required action (need \'' + getCardDispName(dest_pos) + '\').');
            return;
          }
          action = 'Direct flight';
          cost_card_id = dest_pos;
          hand_index = dir_flight_card_index;
        } else {
          // has both cards - choose by cost
          if(cost_card_id == dest_pos) {
            action = 'Direct flight';
            hand_index = dir_flight_card_index;
          } else if(cost_card_id == cur_pos) {
            action = 'Chapter flight';
            hand_index = cha_flight_card_index;
          } else {
            // bad cost
            log('Cost is not specified or doesn\'t match the required action (need \'' + getCardDispName(dest_pos) + '\' or \'' + getCardDispName(cur_pos) + '\').');
            return;
          }
        }
      }
    
      if(action == '') {
        log('UERR: Cannot determine move action.');
        return;
      }
    
      State.Players[State.cur_player].acts--;
      State.Players[who_id].pos = where_id;
      if(action == 'Direct flight' || action == 'Chapter flight') {
        // discard a card as cost
        if(hand_index < 0 || cost_card_id < 0) {
          log('UERR: Cannot choose card from hand to pay cost.');
          return;
        }
      
        State.Players[State.cur_player].hand[hand_index] =
        State.Players[State.cur_player].hand[State.Players[State.cur_player].hand.length-1];
        State.Players[State.cur_player].hand.pop();
        State.help_drop.push(cost_card_id);
      }
      
      log('Dispatcher has moved \'' + State.Players[who_id].name + '\' to \'' + State.Towns[where_id].name + '\' using ' + action + '.');
      if(action == 'Direct flight' || action == 'Chapter flight') {
        log('Discarded card \'' + getCardDispName(cost_card_id) + '\'.');
      }
      log('Actions left: ' + State.Players[State.cur_player].acts + '.');
      AutoHeal();
    }
  }

  function Turn() {
    var str = 'Player';
    str += ' \'';
    str += State.Players[State.cur_player].name;
    str += '\'';
    str += ' ended the turn';
    str += ';';
    log(str);
    
    var i=0;
    for(i=0; i<State.Players.length; i++) {
      State.Players[i].acts = State.ACTS_MAX;
    }
    
    var outbr_arr = [];
    for(i=0; i<State.CARDS_PER_TURN; i++) {
      if(State.help_deck.length > 0 && State.help_deck[State.help_deck.length-1] == -13) {
        // Epidemy
        State.help_deck.pop();
        if(!EPIDEMY(outbr_arr)) {
          return;
        }
      } else {
          if(!drawCards(State.cur_player)) {
            return;
          }
          var card_id = State.Players[State.cur_player].hand[State.Players[State.cur_player].hand.length-1];
          log('Current player draws \'' + getCardDispName(card_id) + '\';');
      }
    }
    
    if(State.is_silent_night) {
      State.is_silent_night = false;
      log('Silent night - no infection.');
    } else {
      // diseases
      log('Infection time!');
    
      for(i=0; i<State.dis_marker; i++) {
        var infect = State.infect_deck[State.infect_deck.length-1];
        State.infect_deck.pop();
        State.infect_drop.push(infect);
        if(!infectTown(infect, State.Towns[infect].color, outbr_arr)) {
          return;
        }
        log(getInfectionStrFull(infect));
      
        if(State.infect_deck.length <= 0) {
          log('Refill infection deck');
          State.infect_deck = State.infect_drop;
          State.infect_drop = [];
          shuffleArr(State.infect_deck);
        }
      }
    }

    State.engineer_migrate_used = false;
    State.cur_player = (State.cur_player+1) % State.Players.length;
    
    if(State.cur_player == State.first_player) {
      State.cur_turn++;
      log('Now it\'s turn number ' + State.cur_turn + ';');
    }
    
    str = 'Player';
    str += ' \'';
    str += State.Players[State.cur_player].name;
    str += '\'';
    str += ' takes the turn';
    str += ';';
    log(str);
    
    CheckExtraCardsInHands();
  }

  function Heal(color) {
    var pos = State.Players[State.cur_player].pos;
    
    if(color == '') {
      color = State.Towns[pos].color;
    }

    if(color != 'B' && color != 'K' && color != 'R' && color != 'Y') {
      log('Wrong color id.');
    } else if(    (color == 'B' && State.Towns[pos].disB <= 0)
        || (color == 'K' && State.Towns[pos].disK <= 0)
        || (color == 'R' && State.Towns[pos].disR <= 0)
        || (color == 'Y' && State.Towns[pos].disY <= 0)) {
      log('Nothing to heal.');
    } else if(State.Players[State.cur_player].acts <= 0) {
      log('No actions left.');
    } else {
      var bMedic = (State.Classes[State.Players[State.cur_player].pclass] == 'Medic');
    
      if(color == 'B') {
        if(bMedic) {
          State.disCntB = State.disCntB - State.Towns[pos].disB;
          State.Towns[pos].disB = 0;
        } else {
          State.Towns[pos].disB--;
          State.disCntB--;
        }
      } else if(color == 'K') {
        if(bMedic) {
          State.disCntK = State.disCntK - State.Towns[pos].disK;
          State.Towns[pos].disK = 0;
        } else {
          State.Towns[pos].disK--;
          State.disCntK--;
        }
      } else if(color == 'R') {
        if(bMedic) {
          State.disCntR = State.disCntR - State.Towns[pos].disR;
          State.Towns[pos].disR = 0;
        } else {
          State.Towns[pos].disR--;
          State.disCntR--;
        }
      } else if(color == 'Y') {
        if(bMedic) {
          State.disCntY = State.disCntY - State.Towns[pos].disY;
          State.Towns[pos].disY = 0;
        } else {
          State.Towns[pos].disY--;
          State.disCntY--;
        }
      }
    
      State.Players[State.cur_player].acts--;
      log(getInfectionStrFull(pos));
      
      log('Actions left: ' + State.Players[State.cur_player].acts + '.');
      KillDiseases();
    }
  }

  function Lab(city_name_to_remove_lab) {
    var pos = State.Players[State.cur_player].pos;
    var is_engy = State.Classes[State.Players[State.cur_player].pclass] == 'Engineer';
    var city_id_to_remove_lab = getCardIdByDispName(city_name_to_remove_lab);
    
    var fi1 = 0;
    var hand_index = -1;
    
    for(fi1=0; fi1<State.Players[State.cur_player].hand.length; fi1++) {
      if(State.Players[State.cur_player].hand[fi1] == pos) {
        hand_index = fi1;
        break;
      }
    }
    
    if(State.Towns[pos].lab) {
      log('Already has Lab in this city.');
    } else if(State.labs_count >= State.LABS_MAX) {
      if(city_name_to_remove_lab == '') {
        log('Too many Labs on the map (' + State.labs_count.toString() + '/' + State.LABS_MAX.toString() + '). Must specify the city to remove lab from.');
      } else if(city_id_to_remove_lab < 0) {
        log('Incorrect city name to remove Lab from.');
      }
    } else if(State.Players[State.cur_player].acts <= 0) {
      log('No actions left.');
    } else if(!is_engy && hand_index < 0) {
      log('Need the card of the current city to build the Lab.');
    } else {
      State.Towns[pos].lab = true;
      State.Players[State.cur_player].acts--;
      log('Lab built in \'' + State.Towns[pos].name + '\'.');
      if(!is_engy) {
        State.Players[State.cur_player].hand[hand_index] =
        State.Players[State.cur_player].hand[State.Players[State.cur_player].hand.length-1];
        State.Players[State.cur_player].hand.pop();
        State.help_drop.push(pos);
        log('Discarded city card \'' + State.Towns[pos].name + '\'.');
      } else {
        log('Engineer doesn\'t use city cards to build Labs.');
      }
      
      // remove extra Lab
      if(State.labs_count >= State.LABS_MAX) {
        State.Towns[city_id_to_remove_lab].lab = false;
        log('Lab removed from \'' + State.Towns[city_id_to_remove_lab].name + '\'.');
      } else {
        State.labs_count++;
      }
      
      log('Actions left: ' + State.Players[State.cur_player].acts + '.');
    }
  }

  function Remedy(color, exclude_card1, exclude_card2) {
    if(color != 'B' && color != 'K' && color != 'R' && color != 'Y') {
      log('Wrong color id.');
    } else if((color == 'B' && State.remedyB) ||
              (color == 'K' && State.remedyK) ||
              (color == 'R' && State.remedyR) || 
              (color == 'Y' && State.remedyY)) {
       log('You alredy have this remedy.');
    } else if(!State.Towns[State.Players[State.cur_player].pos].lab) {
      log('Need Lab.');
    } else if(State.Players[State.cur_player].acts <=0) {
      log('No actions left.');
    } else {
      var i=0;
      var used_arr = [];
      var unused_arr = [];
      var e1_id = -1;
      var e2_id = -1;
      if(exclude_card1 != '') {
        e1_id = getTownIdByName(exclude_card1);
        if(e1_id < 0) {
          log('Invalid exclusion - \'' + exclude_card1 + '\'.');
          return;
        }
      }
      if(exclude_card2 != '') {
        e2_id = getTownIdByName(exclude_card2);
        if(e2_id < 0) {
          log('Invalid exclusion - \'' + exclude_card2 + '\'.');
          return;
        }
      }

      var needed_cards = 5;
      if(State.Classes[State.Players[State.cur_player].pclass] == 'Scientist') {
        needed_cards = 4;
      }
      
      // choose proper cards by color, and exclusions
      for(i=0; i<State.Players[State.cur_player].hand.length; i++) {
        var card_id = State.Players[State.cur_player].hand[i];
        
        if(card_id >= 0 && State.Towns[card_id].color == color && card_id != e1_id && card_id != e2_id && used_arr.length < needed_cards) {
          used_arr.push(card_id);
        } else {
          unused_arr.push(card_id);
        }
      }
      
      if(used_arr.length < needed_cards) {
        log('Not enough cards - need ' + needed_cards + ', have ' + used_arr.length + '.');
      } else {
        if(State.Classes[State.Players[State.cur_player].pclass] == 'Scientist') {
          log('Scientist uses four cards to create the remedy');
        }
        
        if(color == 'B') {
          State.remedyB = true;
        } else if(color == 'K') {
          State.remedyK = true;
        } else if(color == 'R') {
          State.remedyR = true;
        }
        log('Remedy created!');
        
        State.Players[State.cur_player].hand = unused_arr;
        var i=0;
        for(i=0; i<used_arr.length; i++) {
          State.help_drop.push(used_arr[i]);
        }
        log('Used cards: \'' + used_arr.toString() + '\'.');
        log('Other cards: \'' + unused_arr.toString() + '\'.');
        
        if(State.remedyB && State.remedyK && State.remedyR && State.remedyY) {
          Win();
          return;
        }
        KillDiseases();
      }
    }
  }

  function Cchange(arg1, arg2) {
    // arg1 = arg2 = ''                     -> giving a card to the defined player
    // arg1 is player id, arg2 = ''         -> give a card to that player
    // arg1 is card name, arg2 = ''         -> (R) give this card to a player
    // arg1 is card name, arg2 is player id -> (R) give this card to this player

    var c_id = -1;
    var p_id = -1;
    if(arg1 != '') {
      // can be player name or card name
      var id = getTownIdByName(arg1);
      if(id < 0) {
        id = getPlayerIdByName(arg1);
        if(id < 0) {
          log('Bad cchange.');
          log('Call with player_name/card_name/card_name player_name.');
          return;
        } else {
          p_id = id;
        }
      } else {
        c_id = id;
      }
      
      if(arg2 != '') {
        if(p_id > 0) {
          log('Bad cchange.');
          log('Call with player_name/card_name/card_name player_name.');
          return;
        }
        
        id = getPlayerIdByName(arg2);
        if(id < 0) {
          log('Bad cchange.');
          log('Call with player_name/card_name/card_name player_name.');
          return;
        } else {
          p_id = id;
        }
      }
    }

    // spends action
    if(State.Players[State.cur_player].acts <= 0) {
      log('No actions left.');
      return;
    }

    if(c_id < 0) {
      // current town by default
      c_id = State.Players[State.cur_player].pos;
    }

    var recipient_id = -1;
    var holder_id = -1;
    
    // determine holder
    var cindex = -1;
    var i=0;
    for(i=0; i<State.Players.length; i++) {
    
      var fi1 = 0;
      var cindex = -1;
      
      for(fi1=0; fi1<State.Players[i].hand.length; fi1++) {
        if(State.Players[i].hand[fi1] == c_id) {
          cindex = fi1;
          break;
        }
      }
    
      if(cindex >= 0) {
        holder_id = i;
        break;
      }
    }

    if(holder_id < 0) {
      log('No one holds the card \'' + State.Towns[c_id].name + '\'.');
      return;
    }

    if(State.Players[holder_id].pos != State.Players[State.cur_player].pos) {
      // must be here to exchange
      log('No such card is hold in that position.');
      return;
    }
    
    // determine recipient
    recipient_id = p_id;
    if(recipient_id < 0) {
      for(i=0; i<State.Players.length; i++) {
        if(i != holder_id && State.Players[i].pos == State.Players[State.cur_player].pos) {
          if(recipient_id >= 0) {
            log('There are more than one possible recipients. Choose one of them.');
            return;
          } else {
            recipient_id = i;
          }
        }
      }
    }
    
    if(recipient_id < 0) {
      log('There are no recipients available.');
      return;
    }
    
    if(State.Players[recipient_id].pos != State.Players[State.cur_player].pos) {
      log('Recepient stands in different city.');
      return;
    }
    
    // checking positions and cur player
    if(holder_id != State.cur_player && recipient_id != State.cur_player) {
      log('Current player must participate in exchange.');
      return;
    }
    if(holder_id == recipient_id) {
      log('Cannot exchange with yourself.');
      return;
    }
    
    var researcher_id = getPlayerIdByClassName('Researcher');
    if(c_id != State.Players[State.cur_player].pos) {
      if(holder_id != researcher_id) {
        log('Only Researcher can give card other than a card of the current city.');
        return;
      }
    }
    
    // perform exchange
    State.Players[State.cur_player].acts--;
    State.Players[recipient_id].hand.push(c_id);
    State.Players[holder_id].hand[cindex] =
    State.Players[holder_id].hand[State.Players[holder_id].hand.length-1];
    State.Players[holder_id].hand.pop();
    
    if(c_id != State.Players[State.cur_player].pos) {
      log('Researcher gave the card \'' + State.Towns[c_id].name + '\' to ' + State.Players[recipient_id].name + '\'');
    } else {
      log('Exchange performed successfully. Now card \'' + State.Towns[c_id].name + '\' is in hand of the ' + State.Players[recipient_id].name + '\'');
    }
    CheckExtraCardsInHands();
  }

  function Redraw(event_card_name) {
    var card_id = getCardIdByDispName(event_card_name);

    var fi1 = 0;
    var card_index = -1;
    
    for(fi1=0; fi1<State.help_drop.length; fi1++) {
      if(State.help_drop[fi1] == card_id) {
        card_index = fi1;
        break;
      }
    }
    
    if(getPlayerIdByClassName('Contingency Planner') != State.cur_player) {
      log('Must be Contingency Planner to use this command.');
    } else if(State.cont_planner_card_id != 0) {
      log('Already has redrawn card: \'' + getCardDispName(State.cont_planner_card_id) + '\'.');
    } else if(card_id >= 0 || card_id == -13) {
      log('Incorrect Event card name.');
    } else if(card_index < 0) {
      log('This card is not in the Help deck drop.');
    } else if(State.Players[State.cur_player].acts <= 0) {
      log('No actions left.');
    } else {
      State.Players[State.cur_player].acts--;
      State.cont_planner_card_id = card_id;
      State.help_drop[card_index] = State.help_drop[State.help_drop.length-1];
      State.help_drop.pop();
      
      // use get disp name to avoid case mismatch
      log('Card \'' + getCardDispName(card_id) + '\' was redrawn by Contingency Planner.');
      log('Actions left: ' + State.Players[State.cur_player].acts + '.');
    }
  }

  function Migrate(where, card_to_drop_name) {
    var card_id = getCardIdByDispName(card_to_drop_name);
    
    var fi1 = 0;
    var hand_card_index = -1;
    
    for(fi1=0; fi1<State.Players[State.cur_player].hand.length; fi1++) {
      if(State.Players[State.cur_player].hand[fi1] == card_id) {
        hand_card_index = fi1;
        break;
      }
    }

    var where_id = getCardIdByDispName(where);
    if(getPlayerIdByClassName('Engineer') != State.cur_player) {
      log('Must be Engineer to use this command.');
    } else if(State.engineer_migrate_used) {
      log('Already used that command this turn. Only one Migrate per turn is allowed.');
    } else if(!State.Towns[State.Players[State.cur_player].pos].lab) {
      log('Can use Migrate only from a city with Lab.');
    } else if(card_id < 0) {
      log('Incorrect city card name.');
    } else if(hand_card_index < 0) {
      log('No such card in your hand.');
    } else if(where_id < 0) {
      log('Incorrect destination city name.');
    } else if(State.Players[State.cur_player].acts <= 0) {
      log('No actions left.');
    } else {
      State.engineer_migrate_used = true;
      State.Players[State.cur_player].acts--;
      State.Players[State.cur_player].pos = where_id;
      State.Players[State.cur_player].hand[hand_card_index] =
      State.Players[State.cur_player].hand[State.Players[State.cur_player].hand.length-1];
      State.Players[State.cur_player].hand.pop();
      State.help_drop.push(card_id);
      
      log('Migration used. Migrated to \'' + where + '\'.');
      log('Discarded card \'' + card_to_drop_name + '\'.');
      log('Actions left: ' + State.Players[State.cur_player].acts + '.');
    }
  }

  function Use(card_name) {
    var card_id = getCardIdByDispName(card_name);
    
    if(card_id >= 0 || card_id == -13) {
      log('Incorrect Event card name.');
    } else {
      // search for card
      var holder_id = -1;
      var hand_index = -1;
      
      var fi1 = 0;
      var fi2 = 0;
      
      for(fi1=0; fi1<State.Players.length; fi1++) {
        for(fi2=0; fi2<State.Players[fi1].hand.length; fi2++) {
          if(State.Players[fi1].hand[fi2] == card_id) {
            // card found in this player's hand
            hand_index = fi2;
            holder_id = fi1;
            break;
          }
        }
      }
      
      if(holder_id < 0 && State.cont_planner_card_id == 0) {
        log('Nobody holds that card.');
        return;
      }
    
      // Set request tail
      State.misc_multistep_reason = 'USE ' + card_name;
      State.misc_multistep_request = true;
      
      // Ask for arguments
      if(card_name == '!Teleport') {
        log('!Teleport: [who:player_name] [where:city_name]');
      } else if(card_name == '!FreeLab') {
        log('!FreeLab: [where:city_name] [OPT city_to_remove_lab:city_name]');
      } else if(card_name == '!SilentNight') {
        log('!SilentNight: <anything, non-empty>');
      } else if(card_name == '!Prediction') {
        log('Cards from the top of the infect deck:');
        
        var i=0;
        for(i=0; i<6; i++) {
          log('  ' + (i+1).toString() + ' - \'' + getCardDispName(State.infect_deck[State.infect_deck.length-1-i]) + '\';');
        }
        log('!Prediction: [Dig1:digit] [Dig2:digit] [Dig3:digit] [Dig4:digit] [Dig5:digit] [Dig6:digit]');
      } else if(card_name == '!Immunity') {
        log('!Immunity: [which_city:city_name]');
      }
      log('');
    }
  }

  function KillDiseases() {
    if(!State.defeatedB && State.remedyB && State.disCntB == 0) {
      State.defeatedB = true;
      log('Blue disease finally defeated!');
    }
    if(!State.defeatedK && State.remedyK && State.disCntK == 0) {
      State.defeatedK = true;
      log('Black disease finally defeated!');
    }
    if(!State.defeatedR && State.remedyR && State.disCntR == 0) {
      State.defeatedR = true;
      log('Red disease finally defeated!');
    }
    if(!State.defeatedY && State.remedyY && State.disCntY == 0) {
      State.defeatedY = true;
      log('Yellow disease finally defeated!');
    }
  }

  function AutoHeal() {
    var medic_id = getPlayerIdByClassName('Medic');
    if(medic_id > 0) {
      var pos = State.Players[medic_id].pos;
      if(State.remedyB && State.Towns[pos].disB > 0) {
        State.disCntB = State.disCntB - State.Towns[pos].disB;
        State.Towns[pos].disB = 0;
      }
      if(State.remedyK && State.Towns[pos].disK > 0) {
        State.disCntK = State.disCntK - State.Towns[pos].disK;
        State.Towns[pos].disK = 0;
      }
      if(State.remedyR && State.Towns[pos].disR > 0) {
        State.disCntR = State.disCntR - State.Towns[pos].disR;
        State.Towns[pos].disR = 0;
      }
      if(State.remedyY && State.Towns[pos].disY > 0) {
        State.disCntY = State.disCntY - State.Towns[pos].disY;
        State.Towns[pos].disY = 0;
      }
      KillDiseases();
    }
  }

  function Info(about) {
    var bSome = false;
    var av_info_arr = ['infect', 'infect_left', 'pos', 'classes', 'hands', 'labs', 'acts', 'remedy', 'decks'];

    if(about == 'info' || about == 'keys') {
      log('Available info: ' + av_info_arr.toString() + ' or empty for full info.');
      return;
    }

    if(about == '') {
      log('Detailed game info:');
    }
    
    if(about == '' || about == 'infect') {
      log('Infected cities:');
      var i=0;
      for(i=0; i<State.Towns.length; i++) {
        if(State.Towns[i].disB > 0 || State.Towns[i].disK > 0 || State.Towns[i].disR > 0 || State.Towns[i].disY > 0) {
          log('  ' + getInfectionStrFull(i));
        }
      }
      
      log('Epidemies: ' + State.epidemy_id.toString());
      log('Outbreaks: ' + State.outbreak_counter.toString() + ';');
      log('Disease marker: ' + State.dis_marker + ';');
      bSome = true;
    }
    
    if(about == '' || about == 'infect_left') {
      log('Infection left:');
      log('  - Blue: ' + (State.DIS_MAX - State.disCntB).toString() + ';');
      log('  - Black: ' + (State.DIS_MAX - State.disCntK).toString() + ';');
      log('  - Red: ' + (State.DIS_MAX - State.disCntR).toString() + ';');
      log('  - Yellow: ' + (State.DIS_MAX - State.disCntY).toString() + ';');
      bSome = true;
    }
    
    if(about == '' || about == 'pos') {
      log('Player positions:');
      var i=0;
      for(i=0; i<State.Players.length; i++) {
        log('  Player \'' + State.Players[i].name + '\' is in the city \'' + State.Towns[State.Players[i].pos].name + '\';');
      }
      bSome = true;
    }
    
    if(about == '' || about == 'classes') {
      log('Player classes:');
      var i=0;
      for(i=0; i<State.Players.length; i++) {
        log('  Player \'' + State.Players[i].name + '\' is \'' + State.Classes[State.Players[i].pclass] + '\';');
      }
      bSome = true;
    }
    
    if(about == '' || about == 'hands') {
      log('Player hands:');
      var i=0;
      for(i=0; i<State.Players.length; i++) {
        if(State.Players[i].hand.length <= 0 ) {
          log('  Player \'' + State.Players[i].name + '\' has no cards in hand.');
        } else {
          log('  Player \'' + State.Players[i].name + '\' has cards:');
          var j=0;
          for(j=0; j<State.Players[i].hand.length; j++) {
            log('    - \'' + getCardDispName(State.Players[i].hand[j]) + '\';');
          }
        }
      }
      bSome = true;
    }
    
    if(about == '' || about == 'labs') {
      log('Labs:');
      var i=0;
      for(i=0; i<State.Towns.length; i++) {
        if(State.Towns[i].lab) {
          log('  - \'' + State.Towns[i].name + '\';')
        }
      }
      log('  Labs left: ' + (State.LABS_MAX-State.labs_count).toString() + '.')
      bSome = true;
    }
    
    if(about == '' || about == 'acts') {
      log('Current player has ' + State.Players[State.cur_player].acts.toString() + ' actions left.');
      bSome = true;
    }
    
    if(about == '' || about == 'remedy') {
      log('Remedies:');
      if(!State.remedyB && !State.remedyK && !State.remedyR && !State.remedyY) {
        log('  no remedies invented.');
      } else {
        if(State.remedyB) {
          log('  - Blue' + (State.defeatedB ? ' (defeated)' : '') + ';');
        }
        if(State.remedyK) {
          log('  - Black' + (State.defeatedK ? ' (defeated)' : '') + ';');
        }
        if(State.remedyR) {
          log('  - Red' + (State.defeatedR ? ' (defeated)' : '') + ';');
        }
        if(State.remedyY) {
          log('  - Yellow' + (State.defeatedY ? ' (defeated)' : '') + ';');
        }
      }
      bSome = true;
    }
    
    if(about == '' || about == 'decks') {
      log('Decks:');
      // help deck
      log('Help deck has ' + State.help_deck.length.toString() + ' cards.');
      log('Help deck drop(' + State.help_drop.length + '):');
      if(State.help_drop.length <= 0) {
        log('  EMPTY');
      } else {
        var i=0;
        for(i=0; i<State.help_drop.length; i++) {
          log('  - \'' + getCardDispName(State.help_drop[i]) + '\';');
        }
      }
      
      // infect deck
      log('Infect deck has ' + State.infect_deck.length.toString() + ' cards.');
      log('Infect deck drop(' + State.infect_drop.length + '):');
      if(State.infect_drop.length <= 0) {
        log('  EMPTY');
      } else {
        var i=0;
        for(i=0; i<State.infect_drop.length; i++) {
          log('  - \'' + State.Towns[State.infect_drop[i]].name + '\';');
        }
      }
      
      bSome = true;
    }
    
    if(!bSome) {
      log('Unknown info. Known values are: ' + av_info_arr.toString() + ' or empty.');
    }
  }

  // describes the abilities of the certain class
  function Classinfo(c_name) {
    // Researcher +
    // Scientist +
    // Medic +
    // Quarantine Specialist +

    if(State.started && c_name == '') {
      c_name = State.Classes[State.Players[State.cur_player].pclass];
    } else if(c_name == 'all' || c_name == '') {
      // all classes info
      log('Existing classes:');
    } else {
    
      var fi1 = 0;
      var c_id = -1;
      
      for(fi1=0; fi1<State.Classes.length; fi1++) {
        if(State.Classes[fi1] == c_name) {
          c_id = fi1;
          break;
        }
      }
    
      if(c_id < 0) {
        log('Unknown class name.');
        return;
      }
    }
    
    if(c_name == 'Researcher') {
      log('Researcher:');
      log(' - As an action Researcher can give any city card to another player, or another player can take any city card from Researcher. Both must be in the same city.');
    } else if(c_name == 'Scientist') {
      log('Scientist:');
      log(' - needs only four cards of one color to invent the remedy for the disease of that color.');
    } else if(c_name == 'Medic') {
      log('Medic:');
      log(' - heals all disease instead of one piece;');
      log(' - heals all disease automatically and prevents its appearence in the city, the Medic currently is, if the remedy for that disease is invented.');
    } else if(c_name == 'Quarantine Specialist') {
      log('Quarantine Specialist:');
      log(' - prevents the infection of the city, QS stands in, and all cities, that are connected with that city (except initial infect).');
    } else if(c_name == 'Engeneer') {
      log('Engeneer:');
      log(' - can build a Lab in the city, Engeneer stands in, as an action (without discarding the card);');
      log(' - can once per turn, warp to any city, from the current city with Lab, spending action and discarting the card of any city;');
    } else if(c_name == 'Dispatcher') {
      log('Dispatcher (not implemented):');
      log(' - as an action can move any player, as if Dispatcher was this player (drive, fly or warp using the cards in Dispatcher\'s hand);');
      log(' - as an action can move any player to the position of any other player;');
    } else if(c_name == 'Contingency Planner') {
      log('Contingency Planner (partialy implemented):');
      log(' - as an action can take any Event card from the discard pile of the Help deck, and use it later, the card is threated as it is removed from the game after that;');
    } else {
      log('No info for now.');
    }
  }

  // info about the current player
  function Me() {
    log('Current player - \'' + State.Players[State.cur_player].name + '\':');
    log('  Position: \'' + State.Towns[State.Players[State.cur_player].pos].name + '\';');
    log('  Actions left: ' + State.Players[State.cur_player].acts.toString() + ';');
    log('  Hand(' + State.Players[State.cur_player].hand.length + '/' + State.HAND_SIZE_MAX + '):');
    if(State.Players[State.cur_player].hand.length <= 0) {
      log('    EMPTY');
    } else {
      var i=0;
      for(i=0; i<State.Players[State.cur_player].hand.length; i++) {
        log('    - \'' + getCardDispName(State.Players[State.cur_player].hand[i]) + '\';');
      }
    }
    
    // @TODO: maybe add current Event card for Cont. Planner
  }

  function Setpname(p_id_str, p_name) {
    var p_id = -1;

    if(p_id_str == '1') {
      p_id = 0;
    } else if(p_id_str == '2') {
      p_id = 1;
    } else if (p_id_str == '3') {
      p_id = 2;
    } else if(p_id_str == '4') {
      p_id = 3;
    }
    
    if(p_id == -1 || p_id >= State.Players.length) {
      log('You should specify correct player id (between 1 and number of players).');
      return;
    }

    if(p_name == '') {
      log('Player name cannot be empty.');
      return;
    }
    
    var i=0;
    for(i=0; i<State.Towns.length; i++) {
      if(p_name == State.Towns[i].name) {
        log('Player name cannot match the city name.');
        return;
      }
    }
    
    p_id = (State.first_player+p_id)%State.Players.length;
    
    for(i=0; i<State.Players.length; i++) {
      if(p_name == State.Players[i].name) {
        if(p_id == i) {
          log('That player already known as \'' + p_name + '\'.');
        } else {
          log('Player name is not unique - player \'' + (i+1) + '\' has the same name.');
        }
        return;
      }
    }
    
    log('Player \'' + State.Players[p_id].name + '\' is now known as \'' + p_name + '\'.')
    State.Players[p_id].name = p_name;
  }

  // for multistep request ('/use' command or card drop)
  function process_tail() {
    // for Prediction only - wait for fully processed
    var res = !(((State.misc_multistep_reason.substr(0,4) == 'USE ') &&
                 (State.misc_multistep_reason.substring(4) == '!Prediction')) ||
                 (State.misc_multistep_reason.substr(0,4) == 'PCL ')
                 );

    if(req_flat.trim() == '') {
      // empty args - ignore
      return res;
    }

    if(State.misc_multistep_reason.substr(0,4) == 'USE ') {
      // get argument string to use the card
      var card_name = State.misc_multistep_reason.substring(4);
      var card_id = getCardIdByDispName(card_name);
      
      if(card_id >= 0 || card_id == -13) {
        log('UERR: incorrect multistep request card name.');
        return res;
      }
      
      // search for card in hands and in CP's storage
      var cpHolds = false;
      var found = false;
      var holder_id = -1, hand_index = -1;
      
      var fi1 = 0;
      var fi2 = 0;
      
      for(fi1=0; fi1<State.Players.length; fi1++) {
        for(fi2=0; fi2<State.Players[fi1].hand.length; fi2++) {
          if(State.Players[fi1].hand[fi2] == card_id) {
            // card found in this player's hand
            hand_index = fi2;
            holder_id = fi1;
            break;
          }
        }
      }
      
      if(State.cont_planner_card_id == card_id) {
        // Contingency Planner holds in special storage
        cpHolds = true;
        found = true;
      } else if(holder_id >= 0) {
        // a player holds
        found = true;
      }
      
      if(found) {
        var args = [];
        if(!MultistepRequestParseArgs(args)) {
          return res;
        }
      
        var cmd_res = false;
        if(card_name == '!Teleport') {
          // who - player_name
          // where - city_name
          if(args.length != 2) {
            log('Incorrect number of arguments. Must specify [who], [where].');
            return res;
          }
          cmd_res = Teleport(args[0], args[1]);
        } else if(card_name == '!FreeLab') {
          // where - where to build lab
          // city_to_remove_lab - remove lab from city, if limit reached
          var where = '';
          var city_to_remove_lab = '';
          if(State.labs_count >= State.LABS_MAX) {
            if(args.length != 2) {
              log('Incorrect number of arguments. Must specify [where], [city_to_remove_lab].');
              return res;
            }
            city_to_remove_lab = args[1];
          } else if(args.length != 1) {
            log('Incorrect number of arguments. Must specify [where].');
            return res;
          }
          where = args[0];
          
          cmd_res = FreeLab(where, city_to_remove_lab);
        } else if(card_name == '!SilentNight') {
          // No args - must be used immediately (problem)
          cmd_res = SilentNight();
        } else if(card_name == '!Prediction') {
          // numbers 1 to 6 - in which order place cards (just 6 symbols)
          if(args.length != 6) {
            log('Incorrect number of arguments. Must specify 6 digits from 1 to 6.');
            return res;
          }
          cmd_res = Prediction(args);
        } else if(card_name == '!Immunity') {
          // card name in infect drop to remove from the game
          if(args.length != 1) {
            log('Incorrect number of arguments. Must specify [card_name].');
            return res;
          }
          cmd_res = Immunity(args[0]);
        }
        
        if(!cmd_res) {
          return res;
        }
        
        if(State.cont_planner_card_id == card_id) {
          log('Contingency Planner used card \'' + card_name + '\'.');
          State.cont_planner_card_id = 0;
        } else {
          log('Player \'' + State.Players[holder_id].name + '\' used card ' + card_name + '\'.');
          State.Players[holder_id].hand[hand_index] =
          State.Players[holder_id].hand[State.Players[holder_id].hand.length-1];
          State.Players[holder_id].hand.pop();
          State.help_drop.push(card_id);
        }
        
        return true;
      } else {
        log('UERR: can\'t find Event card \'' + card_name + '\'.');
      }
      
       return res;
    } else if(State.misc_multistep_reason.substr(0,4) == 'PCL ') {
      var player_id = -1;      
      var fi1 = 0;
      
      for(fi1=0; fi1<State.Players.length; fi1++) {
        if(State.Players[fi1].hand.length > State.HAND_SIZE_MAX) {
          player_id = fi1;
          break;
        }
      }
      
      if(player_id < 0) {
        log('UERR: nobody has extra cards in hand.');
        return true;
      }
    
      var args = [];
      if(!MultistepRequestParseArgs(args)) {
        return res;
      }
    
      // discard required number of cards
      var i=0;
      for(i=0; i<args.length; i++) {
        var card_id = getCardIdByDispName(args[i]);
        
        var card_index = -1;      
        var fi1 = 0;
        
        for(fi1=0; fi1<State.Players[player_id].hand.length; fi1++) {
          if(State.Players[player_id].hand[fi1] == card_id) {
            card_index = fi1;
            break;
          }
        }

        if(card_index < 0) {
          log('\'' + args[i] + '\': Incorrect card name or player \'' + State.Players[player_id].name + '\' holds no cards with that name.');
          continue;
        }
        
        State.Players[player_id].hand[card_index] = 
        State.Players[player_id].hand[State.Players[player_id].hand.length-1];
        State.Players[player_id].hand.pop();
        State.help_drop.push(card_id);
        log('Player \'' + State.Players[player_id].name + '\' discarted card \'' + args[i] + '\'.');
        if(State.Players[player_id].hand.length <= State.HAND_SIZE_MAX) {
          break;
        }
      }
      log('Player \'' + State.Players[player_id].name + '\' now has ' + State.Players[player_id].hand.length.toString() + ' cards in hand.');

      return CheckExtraCardsInHands();
    } else {
      log('UERR: incorrect multistep request.');
    }
    
    return res;
  }

  function MultistepRequestParseArgs(args) {
    var args_str = req_flat.trim();

    // tokenize by quote
    var qargs = args_str.split("'");

    if(qargs.length % 2 == 0) {
      log('Missing closing quote in the command.');
      return false;
    } else if(args_str.indexOf(',') >= 0) {
      // commas not allowed
      log('Commas are not allowed in the command.');
      return false;
    }

    var i=0;
    for(i=0; i<qargs.length; i++) {
      if(i % 2 == 0) {
        // not in quotes - tokenize by spaces
        var arg_str = qargs[i];
        arg_str = arg_str.split(" ").toString();
        arg_str = arg_str.split(" ").toString();
        arg_str = arg_str.split("\n").toString();
        arg_str = arg_str.split("\r").toString();
        var arg_arr = arg_str.split(",");
        var j=0;
        for(j=0; j<arg_arr.length; j++) {
          if(arg_arr[j] != '') {
            args.push(arg_arr[j]);
          }
        }
      } else {
        // in quotes - push value (even if empty)
        args.push(qargs[i]);
      }
    }
    
    return true;
  }

  function Teleport(who, where) {
    var p_id = getPlayerIdByName(who);
    var dest_id = getCardIdByDispName(where);
    
    if(p_id < 0) {
      log('Incorrect player name.');
      return false;
    } else if(dest_id < 0) {
      log('Incorrect destination city name.');
      return false;
    } else if(State.Players[p_id].pos == dest_id) {
      log('Already there.');
      return false;
    } else {
      State.Players[p_id].pos = dest_id;
      log('Player \'' + who + '\' has been teleported to \'' + where + '\'.');
    }
    
    return true;
  }

  function FreeLab(where, city_to_remove_lab) {
    var where_id = getCardIdByDispName(where);
    var to_remove_from_id = getCardIdByDispName(city_to_remove_lab);
    
    if(where_id < 0) {
      log('Incorrect city name to build Lab in.');
      return false;
    } else if(city_to_remove_lab != '' && to_remove_from_id < 0) {
      log('Incorrect city name to remove Lab from.');
      return false;
    } else if(city_to_remove_lab != '' && !State.Towns[to_remove_from_id].lab) {
      log('Cannot remove Lab from the city \'' + city_to_remove_lab + '\': no Lab there.');
      return false;
    } else {
      if(city_to_remove_lab != '') {
        State.Towns[to_remove_from_id].lab = false;
        log('Lab has been removed from the city \'' + city_to_remove_lab + '\'.');
      }
    
      State.Towns[where_id].lab = true;
      State.labs_count++;
      log('Lab has been build in the city \'' + where + '\'.');
    }
    
    return true;
  }

  function SilentNight() {
    State.is_silent_night = true;
    log('Silent Night happens after the current turn.');
    return true;
  }

  function Prediction(digits_str_arr) {
    var arr = [
      Number(digits_str_arr[0]),
      Number(digits_str_arr[1]),
      Number(digits_str_arr[2]),
      Number(digits_str_arr[3]),
      Number(digits_str_arr[4]),
      Number(digits_str_arr[5])
    ];

    var i=0;
    for(i=0; i<arr.length; i++) {
      if(Number.isNaN(arr[i]) || arr[i] < 1 || arr[i] > 6) {
        log('Incorrect arguments. Must be digits from 1 to 6 separated by whitespaces.');
        return false;
      }
    }

    // 1 - T1, 2 - T2, 3 - T3, 4 - T4, 5 - T5, 6 - T6
    // 3, 5, 4, 1, 6, 2
    var arrmap = [];
    for(i=0; i<6; i++) {
      arrmap.push(State.infect_deck[State.infect_deck.length-1-(arr[i]-1)]);
    }
    
    log('Six top cards of the infect deck are: ');
    for(i=0; i<6; i++) {
      State.infect_deck[State.infect_deck.length-1-i] = arrmap[i];
      log('\'' + getCardDispName(State.infect_deck[State.infect_deck.length-1-i]) + '\';');
    }

    return true;
  }

  function Immunity(card_to_remove) {
    var card_id = getCardIdByDispName(card_to_remove);
    
    var card_index = -1;      
    var fi1 = 0;
    
    for(fi1=0; fi1<State.infect_drop.length; fi1++) {
      if(State.infect_drop[fi1] == card_id) {
        card_index = fi1;
        break;
      }
    }
    
    if(card_id < 0) {
      log('Incorrect city name.');
      return false;
    } else if(card_index < 0) {
      log('Not in drop of infection card deck.');
      return false;
    } else {
      State.infect_drop[card_index] =
      State.infect_drop[State.infect_drop.length-1];
      State.infect_drop.pop();
      log('Infect deck card \'' + card_to_remove + '\' has been removed from the game.');
    }
    
    return true;
  }

  function CheckExtraCardsInHands() {
    // some player hit the card limit - he or she must drop extra card(s)
    
    var player_id = -1;
    var fi1 = 0;
    
    // find one of players, which have hit the card limit
    for(fi1=0; fi1<State.Players.length; fi1++) {
      if(State.Players[fi1].hand.length > State.HAND_SIZE_MAX) {
        player_id = fi1;
        break;
      }
    }

    if(player_id < 0) {
      // all players has good number of cards in their hands - end the command
      return true;
    }

    var diff = State.Players[player_id].hand.length - State.HAND_SIZE_MAX;
    log('Player \'' + State.Players[player_id].name + '\' has extra cards in hand (' + diff + ') and must drop them.');
    var hand_str = '';
    var i=0;
    for(i=0; i<State.Players[player_id].hand.length; i++) {
      hand_str += '\'' + getCardDispName(State.Players[player_id].hand[i]) + '\''
      if(i<State.Players[player_id].hand.length-1) {
        hand_str += ', ';
      }
    }
    hand_str += '.';
    log('Cards in hand: ' + hand_str);
    log('Type card names to drop (only this number of cards) divided by whitespaces:');
    log('');
    State.misc_multistep_request = true;
    State.misc_multistep_reason = 'PCL ';
    // then player types cards, and we process it in the request tail processing func
    return false;
  }

  function EPIDEMY(outbr_arr) {
    State.epidemy_id++;
    log('EPIDEMY! (No ' + State.epidemy_id + ')');
    
    State.dis_marker = State.dis_markers[State.epidemy_id];
    log('Disease marker: ' + State.dis_marker.toString() + ';');
    
    var infect = State.infect_deck[0];
    State.infect_drop.push(infect);
    State.infect_deck.shift();
    
    log('New city \'' + State.Towns[infect].name + '\' is infected by 3 \'' + State.Towns[infect].color + '\'.');
    
    var i=0;
    for(i=0; i<3; i++) {
      if(!infectTown(infect, State.Towns[infect].color, outbr_arr)) {
        return false;
      }
      if(outbr_arr.length > 0) {
        // outbreak in this town
        break;
      }
    }
    
    shuffleArr(State.infect_drop);
    for(i=0; i<State.infect_drop.length; i++) {
      State.infect_deck.push(State.infect_drop[i]);
    }
    State.infect_drop = [];
    return true;
  }

  function Lose(reason) {
    log('You lose because of \'' + reason + '\'');
    log('Type \'/start\' to start new game.');
    State.started = false;
  }

  function Win() {
    log('Congratulations! You\'ve created all of four remedies for each of those deadly disease. Now the World can live in calmness and health.');
    State.started = false;
  }

  function Help() {
    log('Available commands:');
    log('/help - display available commands (this message);');
    log('/start [players_number] [skill] - starts new game, [players_number] - \'2\', \'3\', \'4\' or empty, [skill] - \'easy\', \'medium\', \'heroic\' or empty;');
    log('/ways - available cities for the current player to drive to;');
    log('/drive \'CITY_NAME\' - current player moves to the city next to that player\'s pos;');
    log('/heal <\'COLOR_LETTER\'> - current player heals disease of color, defined by COLOR_LETTER (B for Blue, K - for Black, R - for Red, Y - for yellow), without COLOR_LETTER - disease of the city\'s color;');
    log('/turn - end of turn, next player takes turn;');
    log('/fly \'CITY_NAME\' - current player moves to the CITY_NAME, using the card of that city;');
    log('/warp \'CITY_NAME\' - current player moves to any city, using the card of the city that player stands in right now;');
    log('/move [who] [where_city_or_player] [cost] - (Dispatcher only) moves a player [who] to the city, using Drive, Direct or Chapter flight or to another player (Bring). Chooses the cheapest option. Cost (city card name) specifies, which flight to choose if can perform both.');
    log('/lab [city_name_to_remove_lab] - build a Lab in the current city. Discard the current city card, if not Engineer. Need to specify a city to remove lab from, if labs count exceeded.');
    log('/remedy \'COLOR_LETTER\' \'EXCLUDE_CARD1\' \'EXCLUDE_CARD2\' - current player invents the remedy in a city with the lab from disease of color indicated by COLOR_LETTER, using cards, excluding EXCLUDE_CARD1 and EXCLUDE_CARD2;');
    log('/cchange - current player takes or gives the card of the city that player stands in to another player, that stands in that city;');
    log('/redraw - (for Contingency Planner) take an Event card from the Help deck drop to use it again.');
    log('/migrate [dest_city] [city_card_to_drop] - (for Engineer) once per turn move to any city by discarding any city card.');
    log('/use [event_card_name] - use an Event card name, anybody holds right now');
    log('/info [key] - gives detailed game info. Type \'/info keys\' for all available keys.');
    log('/classinfo [class_name] - information about abilities of classes. Type with empty [class_name] to know the abilities of your class or ([class_name] == all) to know about all classes.');
    log('/me - detailed info about the current player.');
    
    log('/setpname [p_id] [p_name] - sets name of the player [p_id] (counting from the first player, first player is number 1) by the [p_name], that cannot be name of the other player or city;');
    log('/misc_clr - clears the screen.');
    log('/misc_map - makes map visible or not.');
    log('/misc_rules - game rules.');
    log('/misc_about - readme.');
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  //
  // body
  //
  
  Ans = '';

  var req_st = {
    command:'',
    arg1:'',
    arg2:'',
    arg3:''
  };

  var req_flat = '';

  // parse request
  var q = url.parse(req.url, true).query;
  if(q.cmd != undefined) {
    // structured
    req_st.command = q.cmd;
    if(q.l != undefined) {
      var length = q.l;
      var i=0;
      for(i=0; i<length; i++) {
        var tn = 't' + (i+1);
        var ecn = 'ec' + (i+1);
        var arg = '';
        
        if(q[tn] != undefined) {
          if(q[ecn] != undefined) {
            arg += '!';
          }
          arg += q[tn];
        }
        
        req_st['arg'+(i+1)] = arg;
        
        if(i >= 3) {
          // only 3 args allowed
          break;
        }
      }
    }
  } else {
    // flat
    if(q.l != undefined) {
      var length = q.l;
      var i=0;
      for(i=0; i<length; i++) {
        var tn = 't' + (i+1);
        var ecn = 'ec' + (i+1);
        var arg = '';
        
        if(q[tn] != undefined) {
          if(q[ecn] != undefined) {
            arg += '!';
          }
          arg += q[tn];
        }
        
        req_flat += '\'';
        req_flat += arg;
        req_flat += '\'';
        req_flat += ' ';
      }
    }
  }
  
  if(req_st.command.length > 0 || req_flat != '') {
    // load game state
  //  fs.readFile(storage_path, function(err, data) {
  //      if (err) throw err;
  //      State = JSON.parse(data);
  //  });
    
    if(State.misc_multistep_request) {
      //log('Input command arguments:');
      History.push('');
      if(process_tail()) {
        State.misc_multistep_request = false;
      }
      State.misc_action_id++;
    } else {
      
      // process one step (command)
      process_main();
    }
    
    // store game state
    //var odata = JSON.stringify(State);
    
    //fs.writeFile(storage_path, odata, function(err) {
    //  if (err) throw err;
    //});
  }
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //var qtres = State.misc_nospread ? State.misc_action_id : (State.misc_action_id-1);
  //if((q.gid != undefined && q.gid < State.misc_gid) || (q.hl != undefined && q.hl < qtres)) {
    // add history to let all users see
    // actions, performed by all other users
  //  var i=0;
  //  var str = '';
    
  //  var s_id = 0;
  //  if(q.gid != undefined && q.gid == State.misc_gid) {
  //    s_id = q.hl;
  //  }
  //  for(i=s_id; i<History.length; i++) {
  //    str += History[i];
  //    if(i<History.length-1) {
  //      str += '\n';
  //    }
  //  }
    
  //  Ans = str;
  //}
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  var ans_json = {game_id:-1, history_length:-1, text:''};
  ans_json.game_id = State.misc_game_id;
  ans_json.history_length = State.misc_action_id;
  ans_json.text = Ans;
  
  res.writeHead(200, {});
  res.write(JSON.stringify(ans_json));
  return res.end();
});

app.post('/gcd', function(req, res) {
  var q = url.parse(req.url, true).query;
  var str = '';

  if((q.gid != undefined && q.gid < State.misc_game_id) || (q.hl != undefined && q.hl < State.misc_action_id)) {
    console.log('gid = ' + q.gid + ', cgid = ' + State.misc_game_id + ', hl = ' + q.hl + 'chl = ' + State.misc_action_id + ';');
    // add history to let all users see
    // actions, performed by all other users
    var i=0;
    
    var s_id = 0;
    if(q.gid != undefined && q.gid == State.misc_game_id) {
      if(q.hl != undefined) {
        s_id = q.hl;
      }
    }
    for(i=s_id; i<History.length; i++) {
      str += History[i];
      if(i<History.length-1) {
        str += '\n';
      }
    }
  }
  
  var ans_json = {game_id:-1, history_length:-1, text:''};
  ans_json.game_id = State.misc_game_id;
  ans_json.history_length = State.misc_action_id;
  ans_json.text = str;
  
  res.writeHead(200, {});
  res.write(JSON.stringify(ans_json));
  return res.end();
});

var port = process.env.PORT || 5000;       
//var port = 5000;
app.listen(port);                           // Запускаем сервер на 5000 порту, если не указана переменная окружения "port" 
console.log("Listening at " + port);        // Пишем в консоль, что запустились