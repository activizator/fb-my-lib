const functions = require('firebase-functions');

const moderator = require('./moderator');
exports.moderator = moderator.moderator;

const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: true }));

const collectionName = 'books';
const db = admin.database(); // default db

app.get('/', async (req, res) => {  
  return res.json(await db.ref(collectionName).get());
});

app.get('/:id', async (req, res) => {
  return res.json(await db.ref(collectionName).child(req.params.id).get());
});

app.post('/', async (req, res) => {
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  } = req.body;
  const book = { title, description, authors, favorite, fileCover, fileName };
  const result = await db.ref(collectionName).push(book);
  return res.json({status: 'added', id: result.key});
});

app.put('/:id', async (req, res) => {
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  } = req.body;
  const book = { title, description, authors, favorite, fileCover, fileName };
  try {
    await db.ref(collectionName).child(req.params.id).update(book);
    return res.json({status: 'updated'});
  } catch (e) {
    res.status(500).json({status: 'error'});
  }
});

app.delete('/:id', async (req, res) => {
  try {
    await db.ref(collectionName).child(req.params.id).remove();
    return res.json({status: 'deleted'});
  } catch (e) {
    res.status(500).json({status: 'error'});
  }
});

exports.myLibApi = functions.https.onRequest(app);
