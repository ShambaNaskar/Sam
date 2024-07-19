//Go full screen of exit full screen functionality
document.getElementById('fullscreenBtn').addEventListener('click', function() {
    document.getElementById('fullscreenBtn').innerHTML = '<img id="myImage" src="exit-fullscreen.svg" alt="New Image">'
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.getElementById('fullscreenBtn').innerHTML = '<img id="myImage" src="Go-full-screen.svg" alt="New Image">';
        document.exitFullscreen();
    }
});


// Timer functionality
let time = 3 * 60 * 60 + 20 * 60; // 3 hours 20 minutes in seconds
const timerElement = document.getElementById('timer');

function updateTimer() {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    timerElement.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (time > 0) {
        time--;
    } else {
        clearInterval(timerInterval);
        alert("Time's up!");
        submitTest();
    }
}

const timerInterval = setInterval(updateTimer, 1000);

// Clear response functionality
function clearResponse(questionId) {
    const options = document.getElementsByName(questionId);
    options.forEach(option => option.checked = false);
    document.getElementById(`qbox${questionId.slice(1)}`).classList.remove('answered');
}

const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const cancelSubmit = document.getElementById('cancelSubmit');
const atmToSubmit = document.getElementById('atmToSubmit');

atmToSubmit.addEventListener("click", function (event) {
    overlay.style.display = 'block';
    popup.style.display = 'flex';
})

document.getElementById("atmToSubmit2").addEventListener('click', function(event){
    overlay.style.display = 'block';
    popup.style.display = 'flex';
})
cancelSubmit.addEventListener('click', function (event) {
    overlay.style.display = 'none';
    popup.style.display = 'none';
})

// Helper function to check if a question is in Section B
function isInSectionB(questionId) {
    const sectionBQuestions = [].concat(
        ['q36', 'q37', 'q38', 'q39', 'q40', 'q41', 'q42', 'q43', 'q44', 'q45', 'q46', 'q47', 'q48', 'q49', 'q50'],
        ['q86', 'q87', 'q88', 'q89', 'q90', 'q91', 'q92', 'q93', 'q94', 'q95', 'q96', 'q97', 'q98', 'q99', 'q100'],
        ['q136', 'q137', 'q138', 'q139', 'q140', 'q141', 'q142', 'q143', 'q144', 'q145', 'q146', 'q147', 'q148', 'q149', 'q150'],
        ['q186', 'q187', 'q188', 'q189', 'q190', 'q191', 'q192', 'q193', 'q194', 'q195', 'q196', 'q197', 'q198', 'q199', 'q200']
    );

    return sectionBQuestions.includes(questionId);
}

// Scroll to the specified question with an offset
function scrollToQuestion(questionNumber) {
    const questionElement = document.getElementById(`question${questionNumber}`);
    const offsetPosition = questionElement.getBoundingClientRect().top + window.scrollY - 50;
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}


// Mark a question as answered
function markAnswered(questionNumber) {
    const qBoxElement = document.getElementById(`qbox${questionNumber}`);
    qBoxElement.classList.add('answered');
}

const physicsTab = document.getElementById("physicsTab");

const chemistryTab = document.getElementById("chemistryTab");

const zoologyTab = document.getElementById("zoologyTab");

const botanyTab = document.getElementById("botanyTab");

const physicsButton = document.getElementById("physicsButton");

const chemistryButton = document.getElementById("chemistryButton");

const zoologyButton = document.getElementById("zoologyButton");

const botanyButton = document.getElementById("botanyButton");
const navSubject = document.getElementsByClassName("navSubject");
physicsButton.addEventListener("click", function (event) {
    physicsTab.style.display = "flex";
    chemistryTab.style.display = "none";
    zoologyTab.style.display = "none";
    botanyTab.style.display = "none";
})

chemistryButton.addEventListener("click", function (event) {
    physicsTab.style.display = "none";
    chemistryTab.style.display = "flex";
    zoologyTab.style.display = "none";
    botanyTab.style.display = "none";
})

zoologyButton.addEventListener("click", function (event) {
    physicsTab.style.display = "none";
    chemistryTab.style.display = "none";
    zoologyTab.style.display = "flex";
    botanyTab.style.display = "none";
})

botanyButton.addEventListener("click", function (event) {
    physicsTab.style.display = "none";
    chemistryTab.style.display = "none";
    zoologyTab.style.display = "none";
    botanyTab.style.display = "flex";
})

const menuButton = document.getElementById("menuButton");
const navSubOpen = document.getElementById("navSubOpen");
const navSubClose = document.getElementById("navSubClose");
const questionNavContainer = document.getElementById("questionNavContainer");

navSubOpen.addEventListener("click", function (event) {
    navSubClose.style.display = "flex";
    navSubOpen.style.display = "none";
    questionNavContainer.style.display = "flex";
})

navSubClose.addEventListener("click", function (event) {
    navSubClose.style.display = "none";
    navSubOpen.style.display = "flex";
    questionNavContainer.style.display = "none";
})

document.getElementById('closeScoreCard').addEventListener("click", function(event){
    scoreCard.style.display = 'none';
    overlay.style.display = 'none';

    document.getElementById('questionNavContainerScore').style.display = "block";
})
// Select all buttons with the class 'subjectButton'
const subjectButtons = document.querySelectorAll('.subjectButton');

// Add event listener to each subject button
subjectButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all subject buttons
        subjectButtons.forEach(btn => btn.classList.remove('active'));

        // Add 'active' class to the clicked subject button
        button.classList.add('active');
    });
});

