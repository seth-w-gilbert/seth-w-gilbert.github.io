from browser import document, html, alert, console

boardRep = [['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','w','b','','',''],
            ['','','','b','w','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','','']]

whiteTurn = False


def createBoard():
    global boardRep
    boardDiv = document["game-board-py"]
    
    for i in range(0, 8):
        
        for j in range(0, 8):
            square = html.DIV(Class="game-square")
            square.setAttribute("data-x", j)
            square.setAttribute("data-y", i)
            
            populated = bool(boardRep[i][j])
            if(populated):
                isBlack = boardRep[i][j] == 'b'
                populate(square, isBlack)
            else:
                square.setAttribute('data-populated', False)
            
            square.bind("click", squareClick)
            boardDiv <= square
            

def squareClick(event):
    # TODO if not populated, place piece, depending on whose turn it is.
    #global variables
    global whiteTurn

    square = event.currentTarget
    x = int(square.dataset.x)
    y = int(square.dataset.y)
    populated = square.dataset.populated == "true"
    console.log(populated)
    
    if(not populated):
        populate(square, isBlack=True)
        makeMove()


def makeMove():
    # find the location of the correct available move.
    found = False
    i = 0
    while not found and i < 8:
        j = 0
        while not found and j < 8:
            if boardRep[i][j] == '':
                found = True
            else:
                j += 1
        if not found:
            i += 1

    # populate that location.
    square = document.querySelector('[data-x="' + str(j) + '"][data-y="' + str(i) + '"]')
    populate(square, isBlack=False)


def populate(square, isBlack):
    global boardRep
    square.setAttribute('data-populated', True)
    square.style={"cursor":"default"}
    x = int(square.dataset.x)
    y = int(square.dataset.y)
    piece = html.DIV(Class="game-piece")
    if(isBlack):
        piece.classList.add('piece-black')
        boardRep[y][x] = 'b'
    else:
        piece.classList.add('piece-white')
        boardRep[y][x] = 'w'
    
    square <= piece
    
#__main__

#set things in motion.
createBoard()
