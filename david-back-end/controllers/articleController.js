const Article = require('../models/Article');

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    console.log('Fetching article with ID:', req.params.id);
    const article = await Article.findById(req.params.id);
    console.log('Found article:', article);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getArticles, getArticleById, createArticle, updateArticle, deleteArticle }; 