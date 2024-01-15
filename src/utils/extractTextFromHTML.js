import he from "he";

export default function extractTextFromHTML(htmlString) {
  const decodedString = he.decode(htmlString);

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = decodedString;

  return tempDiv.textContent;
}
