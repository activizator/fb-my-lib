const functions = require('firebase-functions');

exports.moderator = functions.database.ref('/books/{bookId}').onWrite((change) => {
  const book = change.after.val();

  if (book && book.description === '') {
    return change.after.ref.update({
      description: 'Скоро здесь будет описание…'
    });
  }
  return null;
});