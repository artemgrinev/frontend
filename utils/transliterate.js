export function transliterate(text) {
  const translitMap = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: "",
    ь: "",
  };

  const lowerCaseText = text.toLowerCase();

  return lowerCaseText
    .split("")
    .map((char) => translitMap[char] || char)
    .join("")
    .replace(/\s+/g, "-");
}
