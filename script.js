const bookArray = [];

function Book(title, author, genre, desc, pages, releaseDate, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.desc = desc;
    this.pages = pages;
    this.releaseDate = releaseDate;
    this.read = read;
}

function addBookToArray(bookData) {
    const newBook = new Book(bookData.title,
                             bookData.author,
                             bookData.genre,
                             bookData.desc,
                             bookData.pages,
                             bookData.releaseDate,
                             bookData.read)

    bookArray.push(newBook);
}

const bookData1 = {
    title: "Will Smith",
    author: "Will Smith",
    genre: "Autobiography",
    desc: "The all time best selling autobiography of a hollywood movie star Will Smith",
    pages: 460,
    releaseDate: 2019,
    read: "read"
}

const bookData2 = {
    title: "Elon Musk",
    author: "Some Guy",
    genre: "Autobiography",
    desc: "This fantastic book captures all the hardships of being an innovative giants against all odds...",
    pages: 690,
    releaseDate: 2023,
    read: "unread"
}

addBookToArray(bookData1);
addBookToArray(bookData2);

Book.prototype.toggleRead = function() {    
    if(this.read === "unread") {
        this.read = "read";
    }
}

Array.prototype.render = function() {
    const section = document.querySelector("section");
    const nodeList = this.map((item, index) => {

        const div = document.createElement("div");
        div.classList.add("card");
        div.setAttribute("data-index", index);

        const h3 = document.createElement("h3");
        h3.classList.add("title");
        h3.textContent = item.title;
        div.appendChild(h3);

        const del = document.createElement("span");
        del.classList.add("mdi");
        del.classList.add("mdi-close");
        div.appendChild(del);

        const p1 = document.createElement("p");
        p1.classList.add("author");
        p1.textContent = item.author;
        div.appendChild(p1);

        const p2 = document.createElement("p");
        p2.classList.add("genre");
        p2.textContent = item.genre;
        div.appendChild(p2);

        const p3 = document.createElement("p");
        p3.classList.add("desc");
        p3.textContent = item.desc;
        div.appendChild(p3);

        const p4 = document.createElement("p");
        p4.classList.add("pages");
        p4.textContent = item.pages;
        div.appendChild(p4);
        
        const readButton = document.createElement("button");
        readButton.classList.add("read");
        if(item.read === "read") {
            readButton.classList.add("read-read");
        }
        readButton.textContent = item.read;
        div.appendChild(readButton);

        const p5 = document.createElement("p");
        p5.classList.add("released");
        p5.textContent = item.releaseDate;
        div.appendChild(p5);

        return div;
    })
    
    document.querySelectorAll("section .card").forEach( item => item.remove());
    nodeList.forEach(item => section.appendChild(item));

}

bookArray.render();

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
        title: e.target[0].value,
        author: e.target[1].value,
        genre: e.target[2].value,
        desc: e.target[3].value,
        pages: e.target[4].value,
        releaseDate: e.target[5].value,
        read: "unread"
    }
    
    addBookToArray(formData);
    bookArray.render();

})

const section = document.querySelector("section");
section.addEventListener("click", (e) => {
    
    if(e.target.className === "mdi mdi-close") {
        const cardIndex = e.target.parentNode.dataset.index;
        bookArray.splice(cardIndex, 1);
        bookArray.render();
    }

    if(e.target.className === "read") {
        const cardIndex = e.target.parentNode.dataset.index;
        bookArray[cardIndex].toggleRead();
        bookArray.render();
    }


})




