from browser import document, html, alert, console

boardRep = [['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','w','b','','',''],
                ['','','','b','w','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','','']]


def createBoard():
    #TODO initialize the board with the 4 starting pieces.
    
    boardDiv = document["game-board-py"]
    
    for i in range(0, 8):
        
        for j in range(0, 8):
            square = html.DIV(Class="game-square")
            square.setAttribute("data-x", i)
            square.setAttribute("data-y", j)
            
            populated = bool(boardRep[j][i])
            if(populated):
                piece = html.DIV(Class="game-piece")
                if(boardRep[j][i] == 'w'):
                    piece.setAttribute("class", piece.getAttribute("class") + " piece-white")
                else:
                    piece.setAttribute("class", piece.getAttribute("class") + " piece-black")
                square <= piece
            
            square.setAttribute('data-populated', populated)
            
            square.bind("click", squareClick)
            boardDiv <= square
            

def squareClick(event):
    # TODO if not populated, place piece, depending on whose turn it is.
    square = event.target
    x = int(square.dataset.x)
    y = int(square.dataset.y)
    populated = square.dataset.populated == "True"
    
    if(!populated):
        alert('not populated')
    
    #console.log(str(boardRep[y][x]))
    #console.log('populated: ' + str(populated))
    #alert(f'({x:d}, {y:d})')
    
#__main__

#set things in motion.
createBoard()
