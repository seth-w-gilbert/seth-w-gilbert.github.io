from browser import document, html, alert

def createBoard():
    #TODO initialize the board with the 4 starting pieces.
    
    boardDiv = document["game-board"]
    
    for i in range(0, 8):
        
        for j in range(0, 8):
            square = html.DIV(Class="game-square")
            square.setAttribute("data-x", i)
            square.setAttribute("data-y", j)
            square.bind("click", squareClick)
            boardDiv <= square
            
            
            

def squareClick(event):
    # TODO do something with the coordinates.
    x = event.target.getAttribute("data-x")
    y = event.target.getAttribute("data-y")
    alert("(" + x + ", " + y + ")")
    
    
#__main__

#set things in motion.
createBoard()