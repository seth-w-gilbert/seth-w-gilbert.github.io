var navHTML =  `<a href="index.html" id="title">Seth Gilbert</a>

                <a id="reading" href="reading.html" class="link">Reading List</a>
                <a id="flipsy" href="flipsy.html" class="link">Flipsy</a>
                <a id="resume" href="files/resume.pdf" class="link" target="_blank">Resume</a>`;

var navbar = document.createElement('div');
navbar.innerHTML = navHTML;
navbar.classList.add("navContainer");

function addSelected(linkName){
    document.getElementById(linkName).classList.add("selected");
}