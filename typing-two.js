const typingText = document.querySelector(".typing-text");

function randomParagraph() {
    // this gets random number that will always be less than the paragraphs length
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    console.log(paragraphs[randIndex].split(""));
}

randomParagraph();