function createBook(title, rating, review){
    var book = document.createElement('div');
    book.classList.add("book-review");
    
    var titleElem = document.createElement('span');
    titleElem.textContent = title;
    
    var ratingElem = document.createElement('span');
    ratingElem.textContent = rating;
    
    var reviewElem = document.createElement('span');
    reviewElem.textContent = review;
    
    book.appendChild(titleElem);
    book.appendChild(ratingElem);
    book.appendChild(reviewElem);
        
    document.body.appendChild(book);
}

function createAll(filename){
    var reader = new FileReader();
    var content = reader.readAsText("../data/books.csv");
    
    alert(content);
//    var file = new File([''], "/../data/books.csv");
//    alert(file.name);
//    alert(file.size);
}