const strings: { [key: string]: string } = {
  red: "czerwony",
  black: "czarny",
  blue: "niebieski",
  pink: "różowy",
  green: "zielony",
  white: "biały"
};

function translateToPolish(string: string) {
  const translation = strings[string.toLowerCase()];
  if (translation) return translation;
  return "";
}

export default translateToPolish;
