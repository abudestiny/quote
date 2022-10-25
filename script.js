const quoteText = document.querySelector(".quote");
quoteBtn = document.querySelector("button");
authorName = document.querySelector(".author .name");
soundBtn = document.querySelector(".sound");
copyBtn = document.querySelector(".copy");
shareBtn = document.querySelector(".share");

function randomQuote() {
    quoteBtn.classList.add("loading")
    quoteBtn.innerHTML = "Loading Quote..."
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        console.log(result)
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.innerText = "New Quote"
        quoteBtn.classList.remove("loading")
    });
}

// share btn

shareBtn.addEventListener('click', event => {

    // Check for Web Share api support
    if (navigator.share) {
        // Browser supports native share api
        navigator.share({
                title: 'Quote of the Day',
                text: quoteText.innerText + ' -- ' + authorName.innerText,
            }).then(() => console.log("Successful share"))
            .catch((error) => console.log("Error sharing", error));
    } else {
        // Fallback
        alert("The current browser does not support the share function. Please, manually share the link")
    }
});

// audio reading

soundBtn.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(quoteText.innerText + 'by' + authorName.innerText);
    speechSynthesis.speak(utterance);
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText + ' -- ' + authorName.innerText)

    alert("Quote copied to clipboard")
});

quoteBtn.addEventListener("click", randomQuote);