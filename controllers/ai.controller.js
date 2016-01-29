function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function printTable(table) {
    console.log("@@@@@");
    for (i = 0; i < SIZE; i++) {
        process.stdout.write('@');
        for (j = 0; j < SIZE; j++) {
            process.stdout.write(table[i][j]);
        }
        process.stdout.write('@\n');
    }
    console.log("@@@@@");
};

function flatTable(table) {
    var res = ""
    for (i = 0; i < SIZE; i++) {
        for (j = 0; j < SIZE; j++) {
            res += table[i][j]
        }
    }
    return res;
}

function deflatTable(flatTable) {
    var table = new Array(SIZE);
    for (i = 0; i < SIZE; i++) {
        table[i] = new Array(SIZE);
        for (j = 0; j < SIZE; j++) {
            table[i][j] = flatTable[(i * SIZE) + j];
        }
    }
    return table;
}

exports.index = function (req, res) {
    res.send("Hello CodeHew Hackathoner!");
};

var SIZE = 3;
var ONGOING = 0;
var O_WIN = 1;
var X_WIN = 2;
var DRAW = 3;
var ERROR = -1;

exports.play = function (req, res) {
    var team = req.body.team;
    if (!team) {
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
    printTable(table);
    res.json({
        "status": 0,
        "table": flatTable(table)
    });
};

function checkFinish (table) {
    if (JSON.stringify(table[0]) == JSON.stringify(['O', 'O', 'O']) 
        || JSON.stringify(table[1]) == JSON.stringify(['O', 'O', 'O'])
        || JSON.stringify(table[2]) == JSON.stringify(['O', 'O', 'O'])
        || (table[0][0] == 'O' && table[0][1] == 'O' && table[0][2] == 'O')    
        || (table[1][0] == 'O' && table[1][1] == 'O' && table[1][2] == 'O')  
        || (table[2][0] == 'O' && table[2][1] == 'O' && table[2][2] == 'O')  
        || (table[0][0] == 'O' && table[1][1] == 'O' && table[2][2] == 'O')  
        || (table[2][0] == 'O' && table[1][1] == 'O' && table[0][2] == 'O')  ) {
        return O_WIN;
    } else if (JSON.stringify(table[0]) == JSON.stringify(['X', 'X', 'X']) || JSON.stringify(table[1]) == JSON.stringify(['X', 'X', 'X']) || JSON.stringify(table[2]) == JSON.stringify(['X', 'X', 'X'])
        || JSON.stringify(table[1]) == JSON.stringify(['X', 'X', 'X'])
        || JSON.stringify(table[2]) == JSON.stringify(['X', 'X', 'X'])
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
    // Winning Move
    // 1st row
    if (JSON.stringify(table[0]) == JSON.stringify([' ', 'O', 'O']) ) return [0, 0];
    if (JSON.stringify(table[0]) == JSON.stringify(['O', ' ', 'O']) ) return [0, 1];
    if (JSON.stringify(table[0]) == JSON.stringify(['O', 'O', ' ']) ) return [0, 2];
    // 2nd row
    if (JSON.stringify(table[1]) == JSON.stringify([' ', 'O', 'O']) ) return [1, 0];
    if (JSON.stringify(table[1]) == JSON.stringify(['O', ' ', 'O']) ) return [1, 1];
    if (JSON.stringify(table[1]) == JSON.stringify(['O', 'O', ' ']) ) return [1, 2];
    // 3rd row
    if (JSON.stringify(table[2]) == JSON.stringify([' ', 'O', 'O']) ) return [2, 0];
    if (JSON.stringify(table[2]) == JSON.stringify(['O', ' ', 'O']) ) return [2, 1];
    if (JSON.stringify(table[2]) == JSON.stringify(['O', 'O', ' ']) ) return [2, 2];
    // 1st column
    if (table[0][0] == ' ' && table[1][0] == 'O' && table[2][0] == 'O') return [0, 0];
    if (table[0][0] == 'O' && table[1][0] == ' ' && table[2][0] == 'O') return [1, 0];
    if (table[0][0] == 'O' && table[1][0] == 'O' && table[2][0] == ' ') return [2, 0];
    // 2nd column
    if (table[0][1] == ' ' && table[1][1] == 'O' && table[2][1] == 'O') return [0, 1];
    if (table[0][1] == 'O' && table[1][1] == ' ' && table[2][1] == 'O') return [1, 1];
    if (table[0][1] == 'O' && table[1][1] == 'O' && table[2][1] == ' ') return [2, 1];
    // 3rd column
    if (table[0][2] == ' ' && table[1][2] == 'O' && table[2][2] == 'O') return [0, 2];
    if (table[0][2] == 'O' && table[1][2] == ' ' && table[2][2] == 'O') return [1, 2];
    if (table[0][2] == 'O' && table[1][2] == 'O' && table[2][2] == ' ') return [2, 2];
    // diagonal
    if (table[0][0] == ' ' && table[1][1] == 'O' && table[2][2] == 'O') return [0, 0];
    if (table[0][0] == 'O' && table[1][1] == ' ' && table[2][2] == 'O') return [1, 1];
    if (table[0][0] == 'O' && table[1][1] == 'O' && table[2][2] == ' ') return [2, 2];
    if (table[0][2] == ' ' && table[1][1] == 'O' && table[2][0] == 'O') return [0, 2];
    if (table[0][2] == 'O' && table[1][1] == ' ' && table[2][0] == 'O') return [1, 1];
    if (table[0][2] == 'O' && table[1][1] == 'O' && table[2][0] == ' ') return [2, 0];

    // defensive move
    console.log(table[0]);
    // 1st row
    if (JSON.stringify(table[0]) == JSON.stringify([' ', 'X', 'X']) ) return [0, 0];
    if (JSON.stringify(table[0]) == JSON.stringify(['X', ' ', 'X']) ) return [0, 1];
    if (JSON.stringify(table[0]) == JSON.stringify(['X', 'X', ' ']) ) return [0, 2];
    // 2nd row
    if (JSON.stringify(table[1]) == JSON.stringify([' ', 'X', 'X']) ) return [1, 0];
    if (JSON.stringify(table[1]) == JSON.stringify(['X', ' ', 'X']) ) return [1, 1];
    if (JSON.stringify(table[1]) == JSON.stringify(['X', 'X', ' ']) ) return [1, 2];
    // 3rd row
    if (JSON.stringify(table[2]) == JSON.stringify([' ', 'X', 'X']) ) return [2, 0];
    if (JSON.stringify(table[2]) == JSON.stringify(['X', ' ', 'X']) ) return [2, 1];
    if (JSON.stringify(table[2]) == JSON.stringify(['X', 'X', ' ']) ) return [2, 2];
    // 1st column
    if (table[0][0] == ' ' && table[1][0] == 'X' && table[2][0] == 'X') return [0, 0];
    if (table[0][0] == 'X' && table[1][0] == ' ' && table[2][0] == 'X') return [1, 0];
    if (table[0][0] == 'X' && table[1][0] == 'X' && table[2][0] == ' ') return [2, 0];
    // 2nd column
    if (table[0][1] == ' ' && table[1][1] == 'X' && table[2][1] == 'X') return [0, 1];
    if (table[0][1] == 'X' && table[1][1] == ' ' && table[2][1] == 'X') return [1, 1];
    if (table[0][1] == 'X' && table[1][1] == 'X' && table[2][1] == ' ') return [2, 1];
    // 3rd column
    if (table[0][2] == ' ' && table[1][2] == 'X' && table[2][2] == 'X') return [0, 2];
    if (table[0][2] == 'X' && table[1][2] == ' ' && table[2][2] == 'X') return [1, 2];
    if (table[0][2] == 'X' && table[1][2] == 'X' && table[2][2] == ' ') return [2, 2];
    // diagonal
    if (table[0][0] == ' ' && table[1][1] == 'X' && table[2][2] == 'X') return [0, 0];
    if (table[0][0] == 'X' && table[1][1] == ' ' && table[2][2] == 'X') return [1, 1];
    if (table[0][0] == 'X' && table[1][1] == 'X' && table[2][2] == ' ') return [2, 2];
    if (table[0][2] == ' ' && table[1][1] == 'X' && table[2][0] == 'X') return [0, 2];
    if (table[0][2] == 'X' && table[1][1] == ' ' && table[2][0] == 'X') return [1, 1];


    var ret_x = getRandomInt(0, SIZE - 1);
    var ret_y = getRandomInt(0, SIZE - 1);
    while (table[ret_x][ret_y] != ' ') {
        ret_x = getRandomInt(0, SIZE - 1);
        ret_y = getRandomInt(0, SIZE - 1);
    }
    return [ret_x, ret_y];
}

exports.move = function (req, res) {
    if (!req.body.team) {
        console.log("Receive play command without team name");
        res.json({
            "status": ERROR,
            "message": "Please specify your team name"
        });
        return;
    }
    team = req.body.team;
    if (!req.body.table) {
        console.log("Receive play command without table");
        res.json({
            "status": ERROR,
            "message": "Please specify table"
        });
        return;
    }
    table = deflatTable(req.body.table);
    console.log("Team " + team + " moves");
    printTable(table);
    status = checkFinish(table);
    if (status == ONGOING) {
        next = nextMove(table);
        console.log(next);
        table[next[0]][next[1]] = 'O';
        console.log("I response to " + team + " with this move");
        printTable(table);
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
        'table': flatTable(table)
    });
};
