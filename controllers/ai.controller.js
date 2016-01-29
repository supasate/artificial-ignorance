function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var SIZE = 3;
var ONGOING = 0;
var O_WIN = 1;
var X_WIN = 2;
var DRAW = 3;
var ERROR = -1;

exports.play = function (req, res) {
    var team = req.body.team;
    console.log(req.body);
    if (team == "") {
        console.log("Receive play command without team name");
        res.json({
            "status": ERROR,
            "message": "Please specify your team name"
        });
        return;
    }
    var table = new Array(SIZE);
    for (i = 0; i < SIZE; i++) {
        table[i] = new Array(3);
        for (j = 0; j < SIZE; j++) {
            table[i][j] = ' ';
        }
    }
    table[getRandomInt(0, SIZE - 1)][getRandomInt(0, SIZE - 1)] = 'O';
    console.log("==== Welcome " + team + ", this is my first move ====");
    console.log(table);
    res.json({
        "status": 0,
        "table": JSON.stringify(table)
    });
};

function checkFinish (table) {
    if (table[0] == ['O', 'O', 'O'] 
        || table[1] == ['O', 'O', 'O'] 
        || table[2] == ['O', 'O', 'O']
        || (table[0][0] == 'O' && table[0][1] == 'O' && table[0][2] == 'O')    
        || (table[1][0] == 'O' && table[1][1] == 'O' && table[1][2] == 'O')  
        || (table[2][0] == 'O' && table[2][1] == 'O' && table[2][2] == 'O')  
        || (table[0][0] == 'O' && table[1][1] == 'O' && table[2][2] == 'O')  
        || (table[2][0] == 'O' && table[1][1] == 'O' && table[0][2] == 'O')  ) {
        return O_WIN;
    } else if (table[0] == ['X', 'X', 'X'] || table[1] == ['X', 'X', 'X'] || table[2] == ['X', 'X', 'X']
        || table[1] == ['X', 'X', 'X'] 
        || table[2] == ['X', 'X', 'X']
        || (table[0][0] == 'X' && table[0][1] == 'X' && table[0][2] == 'X')    
        || (table[1][0] == 'X' && table[1][1] == 'X' && table[1][2] == 'X')  
        || (table[2][0] == 'X' && table[2][1] == 'X' && table[2][2] == 'X')  
        || (table[0][0] == 'X' && table[1][1] == 'X' && table[2][2] == 'X')  
        || (table[2][0] == 'X' && table[1][1] == 'X' && table[0][2] == 'X')  ) {
        return X_WIN;
    } else {
        for (i = 0; i < SIZE; i++) {
            for (j = 0; j < SIZE; j++) {
                if (table[i][j] == ' ') {
                    return ONGOING;
                }
            }
        }
        return DRAW;
    }
}

function nextMove (table) {
    if (table[0] == [' ', 'O', 'O'] ) return [0, 0];
    if (table[0] == ['O', ' ', 'O'] ) return [0, 1];
    if (table[0] == ['O', 'O', ' '] ) return [0, 2];
    if (table[1] == [' ', 'O', 'O'] ) return [1, 0];
    if (table[1] == ['O', ' ', 'O'] ) return [1, 1];
    if (table[1] == ['O', 'O', ' '] ) return [1, 2];
    if (table[2] == [' ', 'O', 'O'] ) return [2, 0];
    if (table[2] == ['O', ' ', 'O'] ) return [2, 1];
    if (table[2] == ['O', 'O', ' '] ) return [2, 2];
    if (table[0][0] == ' ' && table[0][1] == 'O' && table[0][2] == 'O') return [0, 0];
    if (table[0][0] == 'O' && table[0][1] == ' ' && table[0][2] == 'O') return [0, 1];
    if (table[0][0] == 'O' && table[0][1] == 'O' && table[0][2] == ' ') return [0, 2];
    if (table[1][0] == ' ' && table[1][1] == 'O' && table[1][2] == 'O') return [1, 0];
    if (table[1][0] == 'O' && table[1][1] == ' ' && table[1][2] == 'O') return [1, 1];
    if (table[1][0] == 'O' && table[1][1] == 'O' && table[1][2] == ' ') return [1, 2];
    if (table[2][0] == ' ' && table[2][1] == 'O' && table[2][2] == 'O') return [2, 0];
    if (table[2][0] == 'O' && table[2][1] == ' ' && table[2][2] == 'O') return [2, 1];
    if (table[2][0] == 'O' && table[2][1] == 'O' && table[2][2] == ' ') return [2, 2];
    if (table[0][0] == ' ' && table[1][1] == 'O' && table[2][2] == 'O') return [0, 0];
    if (table[2][0] == ' ' && table[1][1] == 'O' && table[0][2] == 'O') return [2, 0];
    if (table[2][2] == ' ' && table[1][1] == 'O' && table[0][0] == 'O') return [2, 2];
    if (table[0][2] == ' ' && table[1][1] == 'O' && table[2][0] == 'O') return [0, 2];


    if (table[0] == [' ', 'X', 'X'] ) return [0, 0];
    if (table[0] == ['X', ' ', 'X'] ) return [0, 1];
    if (table[0] == ['X', 'X', ' '] ) return [0, 2];
    if (table[1] == [' ', 'X', 'X'] ) return [1, 0];
    if (table[1] == ['X', ' ', 'X'] ) return [1, 1];
    if (table[1] == ['X', 'X', ' '] ) return [1, 2];
    if (table[2] == [' ', 'X', 'X'] ) return [2, 0];
    if (table[2] == ['X', ' ', 'X'] ) return [2, 1];
    if (table[2] == ['X', 'X', ' '] ) return [2, 2];
    if (table[0][0] == ' ' && table[0][1] == 'X' && table[0][2] == 'X') return [0, 0];
    if (table[0][0] == 'X' && table[0][1] == ' ' && table[0][2] == 'X') return [0, 1];
    if (table[0][0] == 'X' && table[0][1] == 'X' && table[0][2] == ' ') return [0, 2];
    if (table[1][0] == ' ' && table[1][1] == 'X' && table[1][2] == 'X') return [1, 0];
    if (table[1][0] == 'X' && table[1][1] == ' ' && table[1][2] == 'X') return [1, 1];
    if (table[1][0] == 'X' && table[1][1] == 'X' && table[1][2] == ' ') return [1, 2];
    if (table[2][0] == ' ' && table[2][1] == 'X' && table[2][2] == 'X') return [2, 0];
    if (table[2][0] == 'X' && table[2][1] == ' ' && table[2][2] == 'X') return [2, 1];
    if (table[2][0] == 'X' && table[2][1] == 'X' && table[2][2] == ' ') return [2, 2];
    if (table[0][0] == ' ' && table[1][1] == 'X' && table[2][2] == 'X') return [0, 0];
    if (table[2][0] == ' ' && table[1][1] == 'X' && table[0][2] == 'X') return [2, 0];
    if (table[2][2] == ' ' && table[1][1] == 'X' && table[0][0] == 'X') return [2, 2];
    if (table[0][2] == ' ' && table[1][1] == 'X' && table[2][0] == 'X') return [0, 2];


    var ret_x = getRandomInt(0, SIZE);
    var ret_y = getRandomInt(0, SIZE);
    while (table[ret_x][ret_y] != ' ') {
        ret_x = getRandomInt(0, SIZE);
        ret_y = getRandomInt(0, SIZE);
    }
    return [ret_x, ret_y];
}

exports.move = function (req, res) {
    team = req.body.team;
    table = JSON.parse(req.body.table);
    console.log("Team " + team + " moves");
    console.log(table);
    status = checkFinish(table);
    if (status == ONGOING) {
        next = nextMove(table);
        table[next[0]][next[1]] = 'O';
        console.log("I response to " + team + " with this move");
        console.log(table);
        status = checkFinish(table);
    } 
    
    if (status == DRAW) {
        console.log("===== DRAW WITH " + team + " ====");
    } else if (status == X_WIN) {
        console.log("===== I LOSE TO " + team + ", SO SADDD ====");
    } else if (status == O_WIN) {
        console.log("===== I WIN!, SORRY NA JA " + team + " ==== ");
    }
    res.json({
        'status': status,
        'table': JSON.stringify(table)
    });
};
