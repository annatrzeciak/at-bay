const codes: { [key: string]: string } = {
  EMAIL_EXISTS: "Adres e-mail jest już używany przez inne konto.",
  "auth/weak-password": "Hasło musi mieć 6 lub więcej znaków.",
  "auth/invalid-email": "Adres e-mail jest źle sformatowany.",
  "auth/email-already-in-use": "Adres e-mail jest już używany przez inne konto.",
  "auth/user-not-found":'Nie znaleziono użytkownika z podanymi danymi.',
  "auth/wrong-password": 'Hasło jest nieprawidłowe.'
};

function translateErrorMessage(error: { code: string; message: string }) {
  const translation = codes[error.code];
  if (translation) return translation;
  return "Wystąpił błąd. Szczegóły błędu: " + error.message;
}

export default translateErrorMessage;
