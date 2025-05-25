const express = require('express');
const { getArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');

const router = express.Router();

router.route('/').get(getArticles).post(createArticle);
router.route('/:id').get(getArticleById).put(updateArticle).delete(deleteArticle);

module.exports = router; 