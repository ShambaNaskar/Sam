//Go full screen of exit full screen functionality
document.getElementById('fullscreenBtn').addEventListener('click', function () {
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

    updateAnswerCounter();
}

function markForReview(questionId) {
    document.getElementById(`qbox${questionId.slice(1)}`).classList.toggle('markForReview');
    updateRevCounter();
}

function updateRevCounter() {
    const quesMarkedForRev = document.querySelectorAll('.markForReview');
    const revCounter = quesMarkedForRev.length;
    document.getElementById("revCounter").textContent = revCounter;
}

function updateAnswerCounter() {
    // Select all question divs with the class 'answered'
    const answeredQuestions = document.querySelectorAll('.answered');

    // Get the total count of answered questions
    const answeredCount = answeredQuestions.length;

    const notAnsweredCount = 200 - answeredCount;
    // Select the answerCounter div
    const answerCounterDiv = document.getElementById('answerCounter');

    document.getElementById("notAnsweredCounter").textContent = notAnsweredCount;

    // Update the content of the answerCounter div with the count
    answerCounterDiv.textContent = answeredCount;
}


const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const cancelSubmit = document.getElementById('cancelSubmit');
const atmToSubmit = document.getElementById('atmToSubmit');

atmToSubmit.addEventListener("click", function (event) {
    overlay.style.display = 'block';
    popup.style.display = 'flex';
})

document.getElementById("atmToSubmit2").addEventListener('click', function (event) {
    overlay.style.display = 'block';
    popup.style.display = 'flex';
})
cancelSubmit.addEventListener('click', function (event) {
    overlay.style.display = 'none';
    popup.style.display = 'none';
})

// Form submission and result calculation
function submitTest() {
    clearInterval(timerInterval);

    const form = document.getElementById('testForm');
    const formData = new FormData(form);
    let score = 0;

    // Example key for correct answers (to be replaced with actual correct answers)
    // const correctAnswers = {
    //     q1: 'A', q2: 'A', q3: 'A', q4: 'A', q5: 'A', q6: 'A', q7: '', q8: '', q9: '', q10: '', q11: '', q12: '', q13: '', q14: '', q15: '', q16: '', q17: '', q18: '', q19: '', q20: '', q21: '', q22: '', q23: '', q24: '', q25: '', q26: '', q27: '', q28: '', q29: '', q30: '', q31: '', q32: '', q33: '', q34: '', q35: '', q36: 'A', q37: 'A', q38: 'A', q39: 'A', q40: 'A', q41: 'A', q42: 'A', q43: 'A', q44: 'A', q45: 'A', q46: 'A', q47: 'A', q48: 'A', q49: 'A', q50: 'A', q51: '', q52: '', q53: '', q54: '', q55: '', q56: '', q57: '', q58: '', q59: '', q60: '', q61: '', q62: '', q63: '', q64: '', q65: '', q66: '', q67: '', q68: '', q69: '', q70: '', q71: '', q72: '', q73: '', q74: '', q75: '', q76: '', q77: '', q78: '', q79: '', q80: '', q81: '', q82: '', q83: '', q84: '', q85: '', q86: '', q87: '', q88: '', q89: '', q90: '', q91: '', q92: '', q93: '', q94: '', q95: '', q96: '', q97: '', q98: '', q99: '', q100: '', q101: '', q102: '', q103: '', q104: '', q105: '', q106: '', q107: '', q108: '', q109: '', q110: '', q111: '', q112: '', q113: '', q114: '', q115: '', q116: '', q117: '', q118: '', q119: '', q120: '', q121: '', q122: '', q123: '', q124: '', q125: '', q126: '', q127: '', q128: '', q129: '', q130: '', q131: '', q132: '', q133: '', q134: '', q135: '', q136: '', q137: '', q138: '', q139: '', q140: '', q141: '', q142: '', q143: '', q144: '', q145: '', q146: '', q147: '', q148: '', q149: '', q150: '', q151: '', q152: '', q153: '', q154: '', q155: '', q156: '', q157: '', q158: '', q159: '', q160: '', q161: '', q162: '', q163: '', q164: '', q165: '', q166: '', q167: '', q168: '', q169: '', q170: '', q171: '', q172: '', q173: '', q174: '', q175: '', q176: '', q177: '', q178: '', q179: '', q180: '', q181: '', q182: '', q183: '', q184: '', q185: '', q186: '', q187: '', q188: '', q189: '', q190: '', q191: '', q192: '', q193: '', q194: '', q195: '', q196: '', q197: '', q198: '', q199: '', q200: '',
    // };

    // Questions in Section B
    const sectionBQuestions = {
        physics: ['q36', 'q37', 'q38', 'q39', 'q40', 'q41', 'q42', 'q43', 'q44', 'q45', 'q46', 'q47', 'q48', 'q49', 'q50'],
        chemistry: ['q86', 'q87', 'q88', 'q89', 'q90', 'q91', 'q92', 'q93', 'q94', 'q95', 'q96', 'q97', 'q98', 'q99', 'q100'],
        biology: ['q136', 'q137', 'q138', 'q139', 'q140', 'q141', 'q142', 'q143', 'q144', 'q145', 'q146', 'q147', 'q148', 'q149', 'q150'],
        zoology: ['q186', 'q187', 'q188', 'q189', 'q190', 'q191', 'q192', 'q193', 'q194', 'q195', 'q196', 'q197', 'q198', 'q199', 'q200']
    };

    // Iterate over all form entries and calculate score for Section A
    for (let [name, value] of formData.entries()) {
        if (name in correctAnswers && !isInSectionB(name)) {
            if (correctAnswers[name] === value) {
                score += 4;
            } else {
                score -= 1;
            }
        }
    }

    // Handle Section B logic
    for (let section in sectionBQuestions) {
        let attempts = 0;
        for (let question of sectionBQuestions[section]) {
            if (formData.has(question)) {
                if (correctAnswers[question] === formData.get(question)) {
                    score += 4;
                } else {
                    score -= 1;
                }
                attempts++;
                if (attempts >= 10) break;
            }
        }
    }

    //hides clear response button when answer is submitted
    const clrresp = document.querySelectorAll('.qButton').forEach(button => {
        button.style.display = 'none';
    });


    const resultDiv = document.getElementById('result');
    resultDiv.textContent = ` ${score} / 720`;
    resultDiv.style.display = 'block';

    document.getElementById('submitBtn').style.display = 'none';
    popup.style.display = 'none';
    overlay.style.display = 'none';
    atmToSubmit.style.display = 'none';
    // clrresp.style.display = 'none'
    // clrresp.forEach(button => {
    //     button.style.display = 'none';
    // });

    const radioInputs = document.querySelectorAll('input[type="radio"]');

    // Iterate over each radio input and disable it
    radioInputs.forEach(radio => {
        radio.disabled = true;
    });
    const scoreCard = document.getElementById('scoreCard');
    scoreCard.style.display = 'flex';
    overlay.style.display = 'block';

    //Rank Prediction
    const rankMapping = [
        { score: 716, RankMsg: "<b>Your rank prediction is 1 - 67.</b><br>Your preparation is Excellent." },
        { score: 706, RankMsg: "<b>Your rank prediction is 68 - 100.</b><br>Great work! You're close to the top." },
        { score: 701, RankMsg: "<b>Your rank prediction is 100 - 200.</b><br>You're doing very well! Keep pushing." },
        { score: 680, RankMsg: "<b>You can reach the top. Your rank prediction is 500 - 1000.</b><br>Good job! With a bit more effort. " },
        { score: 672, RankMsg: "<b>Your rank prediction is 1000 - 1500.</b><br>You're on the right track. " },
        { score: 662, RankMsg: "<b>Your rank prediction is 2000 - 2500.</b><br>Solid performance! Keep working on your weak areas. " },
        { score: 658, RankMsg: "<b>Your rank prediction is 2500 - 3000.</b><br>You're doing well, but there's room for improvement. " },
        { score: 655, RankMsg: "<b>Your rank prediction is 3001 - 3500.</b><br>Stay focused and keep practicing. " },
        { score: 651, RankMsg: "<b>Your rank prediction is 3501 - 4000.</b><br>Keep up the hard work! " },
        { score: 648, RankMsg: "<b></b><br>You're making progress, continue the effort. Your rank prediction is 4001 - 4500." },
        { score: 646, RankMsg: "<b>Your rank prediction is 4501 - 5000.</b><br>Keep pushing, you're close! " },
        { score: 643, RankMsg: "<b>Your rank prediction is 5001 - 5500.</b><br>Stay motivated and practice more. " },
        { score: 641, RankMsg: "<b>Your rank prediction is 5501 - 6000.</b><br>You're improving, keep it up! " },
        { score: 638, RankMsg: "<b>Your rank prediction is 6001 - 6500.</b><br>Keep practicing and you'll see better results. " },
        { score: 636, RankMsg: "<b> Your rank prediction is 6501 - 7000.</b><br>You're on the right path, keep going." },
        { score: 634, RankMsg: "<b>Your rank prediction is 7001 - 7500.</b><br>Don't lose hope, keep practicing. " },
        { score: 632, RankMsg: "<b>Your rank prediction is 7501 - 8000.</b><br>You can improve with more focused preparation. " },
        { score: 631, RankMsg: "<b>Your rank prediction is 8001 - 8500.</b><br>Stay determined, you can do it! " },
        { score: 628, RankMsg: "<b>Your rank prediction is 8501 - 9000.</b><br>Keep going, and don't give up. " },
        { score: 627, RankMsg: "<b>Your rank prediction is 9001 - 9500.</b><br>Focus on strengthening your weak areas. " },
        { score: 625, RankMsg: "<b>Your rank prediction is 9501 - 10000.</b><br>You're doing well, but there's room for growth. " },
        { score: 598, RankMsg: "<b>Your rank prediction is 10001 - 20000.</b><br>You're on your way! Stay focused and consistent. " },
        { score: 569, RankMsg: "<b>Your rank prediction is 20001 - 35000.</b><br>With more practice, you can achieve a better rank. " },
        { score: 546, RankMsg: "<b>Your rank prediction is 35001 - 50000.</b><br>Keep working hard, and you'll improve. " },
        { score: 512, RankMsg: "<b>Your rank prediction is 50001 - 75000.</b><br>Don't get discouraged, keep practicing. " },
        { score: 495, RankMsg: "<b>Your rank prediction is 75001 - 90000.</b><br>Stay positive and keep trying. " },
        { score: 464, RankMsg: "<b>Your rank prediction is 90001 - 120000.</b><br>You're making progress, but you need more effort. " },
        { score: -Infinity, RankMsg: "<b>Your rank prediction is 120000+</b><br>Don't worry, you can improve with more practice.<br> " }
    ];

    let rankPrediction = rankMapping.find(range => score >= range.score).RankMsg;
    console.log(rankPrediction);

    document.getElementById("rankPrediction").innerHTML = rankPrediction;

    document.getElementById('questionNavContainerScore').innerHTML = `<h2> Score: ${score} </h2>`;
}

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

// Scroll to the specified question
// function scrollToQuestion(questionNumber) {
//     const questionElement = document.getElementById(`question${questionNumber}`);
//     questionElement.scrollIntoView({ behavior: 'smooth' });
// }
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

    updateAnswerCounter();
}

// const physicsTab = document.getElementById("physicsTab");

// const chemistryTab = document.getElementById("chemistryTab");

// const zoologyTab = document.getElementById("zoologyTab");

// const botanyTab = document.getElementById("botanyTab");

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

document.getElementById('closeScoreCard').addEventListener("click", function (event) {
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

