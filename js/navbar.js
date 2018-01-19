var navHTML =  `<a href="index.html" id="title">Title</a>

                <a id="reading" href="reading.html" class="link">Reading List</a>
                <a id="resume" href="resume.html" class="link">Resume</a>
                <a id="flipsy" href="flipsy.html" class="link">Flipsy</a>

                <span id="icon">&#10700;</span>`;

var navbar = document.createElement('div');
navbar.innerHTML = navHTML;
navbar.classList.add("navContainer");

function addSelected(linkName){
    document.getElementById(linkName).classList.add("selected");
}