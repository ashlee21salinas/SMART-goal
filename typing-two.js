const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    time = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span"),
    tryAgainBtn = document.querySelector("button");


let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

function randomParagraph() {
    // this gets random number that will always be less than the paragraphs length
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    // this gets random text from array and splits all characters
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) { // ended right here at 33:19
        if (!isTyping) { // once timer starts it wont reset every click
            timer = setInterval(initTimer, 1000)
            isTyping = true;
        }
        // this is for if the user types no character or uses backspace
        if (typedChar == null) {
            charIndex--;
            // this is only used if char is incor
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else {
            if (characters[charIndex].innerText === typedChar) {
                // if user types correct key the adds the correct class other types incorrect
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");


        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        // if value is 0, empty, or infinite then it's value is 0
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerHTML = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes; // cpm will not count minstakes
    } else {
        inpField.value = "";
        clearInterval(timer);
    }

}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
    } else {
        clearInterval(timer)
    }
}

function resetGame() {
    // calls loadPragraph function and resets each thing back to 0 on the page
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
    time.innerText = timeLeft;
    mistakeTag.innerHTML = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);