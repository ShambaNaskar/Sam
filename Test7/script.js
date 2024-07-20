



// Form submission and result calculation
function submitTest() {
    clearInterval(timerInterval);

    const form = document.getElementById('testForm');
    const formData = new FormData(form);
    let score = 0;

    // Example key for correct answers (to be replaced with actual correct answers)
    const correctAnswers = {
        q1: 'A', q2: 'A', q3: 'A', q4: 'A', q5: 'A', q6: 'A', q7: '', q8: '', q9: '', q10: '', q11: '', q12: '', q13: '', q14: '', q15: '', q16: '', q17: '', q18: '', q19: '', q20: '', q21: '', q22: '', q23: '', q24: '', q25: '', q26: '', q27: '', q28: '', q29: '', q30: '', q31: '', q32: '', q33: '', q34: '', q35: '', q36: 'A', q37: 'A', q38: 'A', q39: 'A', q40: 'A', q41: 'A', q42: 'A', q43: 'A', q44: 'A', q45: 'A', q46: 'A', q47: 'A', q48: 'A', q49: 'A', q50: 'A', q51: '', q52: '', q53: '', q54: '', q55: '', q56: '', q57: '', q58: '', q59: '', q60: '', q61: '', q62: '', q63: '', q64: '', q65: '', q66: '', q67: '', q68: '', q69: '', q70: '', q71: '', q72: '', q73: '', q74: '', q75: '', q76: '', q77: '', q78: '', q79: '', q80: '', q81: '', q82: '', q83: '', q84: '', q85: '', q86: '', q87: '', q88: '', q89: '', q90: '', q91: '', q92: '', q93: '', q94: '', q95: '', q96: '', q97: '', q98: '', q99: '', q100: '', q101: '', q102: '', q103: '', q104: '', q105: '', q106: '', q107: '', q108: '', q109: '', q110: '', q111: '', q112: '', q113: '', q114: '', q115: '', q116: '', q117: '', q118: '', q119: '', q120: '', q121: '', q122: '', q123: '', q124: '', q125: '', q126: '', q127: '', q128: '', q129: '', q130: '', q131: '', q132: '', q133: '', q134: '', q135: '', q136: '', q137: '', q138: '', q139: '', q140: '', q141: '', q142: '', q143: '', q144: '', q145: '', q146: '', q147: '', q148: '', q149: '', q150: '', q151: '', q152: '', q153: '', q154: '', q155: '', q156: '', q157: '', q158: '', q159: '', q160: '', q161: '', q162: '', q163: '', q164: '', q165: '', q166: '', q167: '', q168: '', q169: '', q170: '', q171: '', q172: '', q173: '', q174: '', q175: '', q176: '', q177: '', q178: '', q179: '', q180: '', q181: '', q182: '', q183: '', q184: '', q185: '', q186: '', q187: '', q188: '', q189: '', q190: '', q191: '', q192: '', q193: '', q194: '', q195: '', q196: '', q197: '', q198: '', q199: '', q200: '',
    };

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

    document.getElementById('questionNavContainerScore').innerHTML = `<h2> Score: ${score} </h2>`;

    //Adjust the position of full screen button when submitted
    fullscreenBtn.style.margin = '10px 0 0 0';
}


// Scroll to the specified question
// function scrollToQuestion(questionNumber) {
//     const questionElement = document.getElementById(`question${questionNumber}`);
//     questionElement.scrollIntoView({ behavior: 'smooth' });
// }
