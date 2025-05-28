const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field");

let charIndex = 0; 

function randomParagraph() {
    // this gets random number that will always be less than the paragraphs length
    let randIndex = Math.floor(Math.random() * paragraphs.length);
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
    if(characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
    } else {
        characters[charIndex].classList.add("incorrect");
    }
    charIndex++;
}

randomParagraph();
inpField.addEventListener("input", initTyping);