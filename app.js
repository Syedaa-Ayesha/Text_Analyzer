let textArea = document.getElementById("editor");
console.log(textArea.innerText);

document.addEventListener("DOMContentLoaded", function () {
  let charCount = document.getElementById("c_counter");
  let wordCount = document.getElementById("w_counter");
  let sentenceCount = document.getElementById("sent_counter");
  let uniqueWord = document.getElementById("unq_word");

  textArea.addEventListener("input", () => {
    // Character counter
    let char_counter = textArea.innerText.length;
    charCount.innerHTML = `Character: ${char_counter}`;

    // Word counter
    let tValue = textArea.innerText.trim().split(/\s+/).filter(Boolean).length;
    wordCount.innerHTML = `Word: ${tValue}`;

    // Sentence count
    let stext = textArea.innerText;
    let sentences = stext.split(/[.!?]/).filter(Boolean);
    sentenceCount.innerHTML = `Sentence: ${sentences.length}`;

    // Unique word Counter
    let text = textArea.innerText.trim();
    let words = text.split(/\s+/).map((word) => word.toLowerCase());
    let uniqueWords = new Set(words); // Set is used for collect the unique
    let uniqueWordCountValue = uniqueWords.size;
    uniqueWord.innerHTML = `Unique Word: ${uniqueWordCountValue}`;
  });
});

let applyFont = () => {
  const fontSelector = document.getElementById("fontSelector");
  const selectedText = window.getSelection();

  // Check if text is selected
  if (
    !selectedText ||
    selectedText.isCollapsed ||
    selectedText.toString().trim() === ""
  ) {
    alert("Please select some text.");
    return;
  }

  // Get the selected font from the dropdown
  const selectedFont = fontSelector.value;
  const range = selectedText.getRangeAt(0);

  // Create a span element with the selected font style
  const span = document.createElement("span");
  span.style.fontFamily = selectedFont;
  span.textContent = range.toString();

  // Replace the selected text with the styled span
  range.deleteContents();
  range.insertNode(span);
};

let applyCase = () => {
  const caseSelector = document.getElementById("caseSelector");
  const selectedCase = caseSelector.value;
  const selectedText = window.getSelection();

  // Check if text is selected
  if (
    !selectedText ||
    selectedText.isCollapsed ||
    selectedText.toString().trim() === ""
  ) {
    alert("Please select some text.");
    return;
  }

  const range = selectedText.getRangeAt(0);
  const selectedContent = range.toString();

  // Transform the text based on the selected case
  let transformedText = "";
  switch (selectedCase) {
    case "uppercase":
      transformedText = selectedContent.toUpperCase();
      break;
    case "lowercase":
      transformedText = selectedContent.toLowerCase();
      break;
    case "capitalize":
      transformedText = selectedContent
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
      break;
    case "camelcase":
      transformedText = selectedContent
        .split(" ")
        .map((word, index) =>
          index === 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");
      break;
    default:
      transformedText = selectedContent;
  }

  // Replace the selected text with the transformed text
  const span = document.createElement("span");
  span.textContent = transformedText;
  range.deleteContents();
  range.insertNode(span);
};

function makeBold() {
  const selectedText = window.getSelection();
  // Check if text is selected
  if (
    !selectedText ||
    selectedText.isCollapsed ||
    selectedText.toString().trim() === ""
  ) {
    alert("Please select some text.");
    return;
  }

  // Get the selected font from the dropdown
  const range = selectedText.getRangeAt(0);

  // Create a span element with the selected font style
  const span = document.createElement("span");
  span.style.fontStyle = document.execCommand("bold", false, null);
  span.textContent = range.toString();

  // Replace the selected text with the styled span
  range.deleteContents();
  range.insertNode(span);
}

function makeItalic() {
  const selectedText = window.getSelection();

  // Check if text is selected
  if (
    !selectedText ||
    selectedText.isCollapsed ||
    selectedText.toString().trim() === ""
  ) {
    alert("Please select some text.");
    return;
  }

  // Get the selected font from the dropdown
  const range = selectedText.getRangeAt(0);

  // Create a span element with the selected font style
  const span = document.createElement("span");
  span.style.fontStyle = document.execCommand("italic", false, null);
  span.textContent = range.toString();

  // Replace the selected text with the styled span
  range.deleteContents();
  range.insertNode(span);
}
function makeUnderline() {
  const selectedText = window.getSelection();

  // Check if text is selected
  if (
    !selectedText ||
    selectedText.isCollapsed ||
    selectedText.toString().trim() === ""
  ) {
    alert("Please select some text.");
    return;
  }

  // Get the selected font from the dropdown
  const range = selectedText.getRangeAt(0);

  // Create a span element with the selected font style
  const span = document.createElement("span");
  span.style.fontStyle = document.execCommand("underline", false, null);
  span.textContent = range.toString();

  // Replace the selected text with the styled span
  range.deleteContents();
  range.insertNode(span);
}
let fontSizeIncrement = () => {
  // Get the selected text
  const selectedText = window.getSelection();

  // Check if text is selected
  if (
    !selectedText ||
    selectedText.isCollapsed ||
    selectedText.toString().trim() === ""
  ) {
    alert("Please select some text.");
    return;
  }

  // Get the range of the selected text
  const range = selectedText.getRangeAt(0);

  // Check if the selected text is inside a contenteditable element
  const parentElement = range.commonAncestorContainer.parentElement;
  if (!parentElement || !parentElement.isContentEditable) {
    alert("Please select text.");
    return;
  }

  // Create a span element to wrap the selected text
  const span = document.createElement("span");

  const existingNode = range.commonAncestorContainer.parentNode;
  let currentSize;

  if (existingNode.nodeName === "SPAN" && existingNode.style.fontSize) {
    currentSize = parseFloat(existingNode.style.fontSize); // Get current font size from existing span
    currentSize += 2; // Increment font size
    existingNode.style.fontSize = currentSize + "px";
    return;
  } else {
    currentSize = window.getComputedStyle(parentElement).fontSize;
    currentSize = parseFloat(currentSize); // Convert "16px" to 16
  }

  const newSize = currentSize + 2;
  span.style.fontSize = newSize + "px";
  span.textContent = range.toString();

  // Replace the selected text with the styled span
  range.deleteContents();
  range.insertNode(span);
};
let fontSizeDecrement = () => {
  // Get the selected text
  const selectedText = window.getSelection();

  // Check if text is selected
  if (
    !selectedText ||
    selectedText.isCollapsed ||
    selectedText.toString().trim() === ""
  ) {
    alert("Please select some text.");
    return;
  }

  // Get the range of the selected text
  const range = selectedText.getRangeAt(0);

  // Check if the selected text is inside a contenteditable element
  const parentElement = range.commonAncestorContainer.parentElement;
  if (!parentElement || !parentElement.isContentEditable) {
    alert("Please select text.");
    return;
  }

  // Create a span element to wrap the selected text
  const span = document.createElement("span");

  const existingNode = range.commonAncestorContainer.parentNode;
  let currentSize;

  if (existingNode.nodeName === "SPAN" && existingNode.style.fontSize) {
    currentSize = parseFloat(existingNode.style.fontSize);
    currentSize -= 2;
    existingNode.style.fontSize = currentSize + "px";
    return;
  } else {
    currentSize = window.getComputedStyle(parentElement).fontSize;
    currentSize = parseFloat(currentSize); // Convert "16px" to 16
  }

  const newSize = currentSize + 2;

  span.style.fontSize = newSize + "px";
  span.textContent = range.toString();

  // Replace the selected text with the styled span
  range.deleteContents();
  range.insertNode(span);
};
let highlightLongestWord = () => {
  // Get the content from the editor
  const text = editor.innerText;

  // Split the content into words
  const words = text.split(/\s+/); // Split by spaces or line breaks

  // Find the longest word
  let longestWord = "";
  for (let word of words) {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }

  if (longestWord === "") {
    alert("No text found to highlight.");
    return;
  }

  // Highlight the longest word
  const regex = new RegExp(`\\b${longestWord}\\b`, "g");
  const highlightedText = text.replace(
    regex,
    `<span style="background-color: yellow;">${longestWord}</span>`
  );

  // Update the editor with the highlighted text
  editor.innerHTML = highlightedText;
};

let highlightShortestWord = () => {
  const editor = document.getElementById("editor");

  // Get the content from the editor
  const text = editor.innerText;

  // Split the content into words
  const words = text.split(/\s+/);

  let shortestWord = words[0] || "";

  // Find the shortest word
  for (let word of words) {
    if (word.length < shortestWord.length && word.trim() !== "") {
      shortestWord = word;
    }
  }

  // If no words are found
  if (shortestWord === "") {
    alert("No text found to highlight.");
    return;
  }

  // Highlight the shortest word
  let highlightedText = text.replace(
    new RegExp(`\\b${shortestWord}\\b`, "g"),
    `<span style="background-color: lightgreen;">${shortestWord}</span>`
  );

  editor.innerHTML = highlightedText;
};

let highlightSelectedWord = () => {
  // Get the selected text
  const selectedText = window.getSelection().toString();

  // Check if the user has selected any text
  if (!selectedText.trim()) {
    alert("Please select a word or text to highlight.");
    return;
  }

  const editor = document.getElementById("editor");

  // Get the content of the editor
  const content = editor.innerHTML;

  // Create a regular expression to match the selected text globally
  const regex = new RegExp(`\\b${selectedText}\\b`, "g");

  const highlightedContent = content.replace(
    regex,
    `<span style="background-color: orange; color: white;">${selectedText}</span>`
  );

  editor.innerHTML = highlightedContent;
};

let alignSelectedTextRight = () => {
  // Get the selected text
  const selectedText = window.getSelection();

  // Check if text is selected
  if (
    !selectedText ||
    selectedText.isCollapsed ||
    selectedText.toString().trim() === ""
  ) {
    alert("Please select some text to align.");
    return;
  }

  // Get the range of the selected text
  const range = selectedText.getRangeAt(0);

  // Create a span element to wrap the selected text
  const span = document.createElement("span");

  // Apply the right alignment style
  span.style.textAlign = "right";
  span.style.display = "block";
  span.textContent = range.toString();

  range.deleteContents();
  range.insertNode(span);
};
let alignSelectedTextleft = () => {
  // Get the selected text
  const selectedText = window.getSelection();

  // Check if text is selected
  if (
    !selectedText ||
    selectedText.isCollapsed ||
    selectedText.toString().trim() === ""
  ) {
    alert("Please select some text to align.");
    return;
  }

  // Get the range of the selected text
  const range = selectedText.getRangeAt(0);

  // Create a span element to wrap the selected text
  const span = document.createElement("span");

  // Apply the right alignment style
  span.style.textAlign = "left";
  span.style.display = "block";

  span.textContent = range.toString();

  range.deleteContents();
  range.insertNode(span);
};
let alignSelectedTextCenter = () => {
  // Get the selected text
  const selectedText = window.getSelection();

  // Check if text is selected
  if (
    !selectedText ||
    selectedText.isCollapsed ||
    selectedText.toString().trim() === ""
  ) {
    alert("Please select some text to align.");
    return;
  }

  // Get the range of the selected text
  const range = selectedText.getRangeAt(0);

  const span = document.createElement("span");

  span.style.textAlign = "center";
  span.style.display = "block";

  // Get the selected text and set it as the content of the span
  span.textContent = range.toString();

  range.deleteContents();
  range.insertNode(span);
};
let alignSelectedTextJustify = () => {
  // Get the selected text
  const selectedText = window.getSelection();

  // Check if text is selected
  if (
    !selectedText ||
    selectedText.isCollapsed ||
    selectedText.toString().trim() === ""
  ) {
    alert("Please select some text to align.");
    return;
  }

  // Get the range of the selected text
  const range = selectedText.getRangeAt(0);
  const span = document.createElement("span");

  span.style.textAlign = "justify";
  span.style.display = "block";
  span.textContent = range.toString();
  range.deleteContents();
  range.insertNode(span);
};
let highlightVowelsAndConsonants = () => {
  // Get the selected text
  const selectedText = window.getSelection();

  // Check if text is selected
  if (
    !selectedText ||
    selectedText.isCollapsed ||
    selectedText.toString().trim() === ""
  ) {
    alert("Please select some text.");
    return;
  }

  // Get the range of the selected text
  const range = selectedText.getRangeAt(0);
  const span = document.createElement("span");

  // Extract selected text
  const text = range.toString();

  // Define vowels and consonants regex
  const vowels = /[aeiouAEIOU]/g;
  const consonants = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g;

  // Find vowels and consonants
  const vowelMatches = text.match(vowels) || [];
  const consonantMatches = text.match(consonants) || [];

  // Highlight vowels and consonants
  let highlightedText = "";
  for (let char of text) {
    if (vowels.test(char)) {
      highlightedText += `<span style="color: green;">${char}</span>`;
    } else {
      highlightedText += char;
    }
  }
  // Set the span content
  span.innerHTML = highlightedText;
  range.deleteContents();
  range.insertNode(span);
  alert(
    `Vowels: ${vowelMatches.length}, Consonants: ${consonantMatches.length}`
  );
};
