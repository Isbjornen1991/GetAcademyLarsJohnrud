function fixText(inputText) {
  let tempText = inputText.trim();

  return (inputText =
    tempText[0].toUpperCase() +
    tempText.slice(1).toLowerCase().trimStart().trimEnd());
}
