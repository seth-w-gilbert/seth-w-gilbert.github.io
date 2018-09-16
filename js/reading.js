function createBook(bookData){
    var book = document.createElement('tr');
    
    for(var i = 0; i < bookData.length; i++){
        var elem = document.createElement('td');
        elem.textContent = bookData[i];
        
        book.appendChild(elem);
    }
    
    var tbody = document.querySelector('#read-books-slot');
    tbody.appendChild(book);
}

function createAll(filename){
    
}