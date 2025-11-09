const verbs = [
  { first: "be", second: "was / were", third: "been", uzbek: "bo‘lmoq" },
  {
    first: "become",
    second: "became",
    third: "become",
    uzbek: "bo‘lmoq, aylanish",
  },
  { first: "begin", second: "began", third: "begun", uzbek: "boshlamoq" },
  { first: "break", second: "broke", third: "broken", uzbek: "sindirmoq" },
  { first: "bring", second: "brought", third: "brought", uzbek: "olib kelmoq" },
  { first: "buy", second: "bought", third: "bought", uzbek: "sotib olmoq" },
  { first: "catch", second: "caught", third: "caught", uzbek: "tutmoq" },
  { first: "choose", second: "chose", third: "chosen", uzbek: "tanlamoq" },
  { first: "come", second: "came", third: "come", uzbek: "kelmoq" },
  { first: "cost", second: "cost", third: "cost", uzbek: "narxi bo‘lmoq" },
];

const verbsRow = document.getElementById("verbsRow");
const nextIcon = document.getElementById("nextIcon");

let currentRow = 0;

// Create buttons for all first forms
verbs.forEach((verb, index) => {
  const btn = document.createElement("button");
  btn.textContent = verb.first;
  btn.classList.add("verb-btn");
  btn.dataset.index = index;
  verbsRow.appendChild(btn);
});

// Speak function
function speakWord(word, callback) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  utterance.onend = callback;
  speechSynthesis.speak(utterance);
}

// Show next row with second & third forms
function showNextRow(rowStart) {
  nextIcon.classList.remove("show");
  const rowVerbs = verbs.slice(rowStart, rowStart + 3); // 3 verbs per row
  let delay = 0;

  rowVerbs.forEach((verb, i) => {
    setTimeout(() => {
      const secondEl = document.createElement("span");
      secondEl.className = "verb-shape";
      secondEl.textContent = verb.second;
      verbsRow.appendChild(secondEl);
      secondEl.style.opacity = 1;

      speakWord(verb.second, () => {
        setTimeout(() => {
          const thirdEl = document.createElement("span");
          thirdEl.className = "verb-shape";
          thirdEl.textContent = verb.third;
          verbsRow.appendChild(thirdEl);
          thirdEl.style.opacity = 1;

          speakWord(verb.third, () => {});
        }, 1600);
      });

      // Show Uzbek translation after row ends
      if (i === rowVerbs.length - 1) {
        setTimeout(() => {
          const uzEl = document.createElement("span");
          uzEl.className = "uzbek-translation";
          uzEl.textContent = rowVerbs.map((v) => v.uzbek).join(" | ");
          verbsRow.appendChild(uzEl);
          uzEl.style.opacity = 1;
          nextIcon.classList.add("show");
        }, 3200);
      }
    }, delay);

    delay += 3200; // 1.6s + 1.6s per verb
  });
}

// Click next icon to continue
nextIcon.addEventListener("click", () => {
  currentRow += 3;
  if (currentRow < verbs.length) {
    showNextRow(currentRow);
  } else {
    nextIcon.textContent = "✔ All done!";
  }
});

// Speak first form on click
verbsRow.querySelectorAll(".verb-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    const index = btn.dataset.index;
    speakWord(verbs[index].first, () => {});
  })
);
