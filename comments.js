// Create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment');

// Create a new comment
router.post('/create', function(req, res, next) {
  var comment = new Comment({
    username: req.body.username,
    comment: req.body.comment,
    date: new Date()
  });
  comment.save(function(err, comment) {
    if (err) {
      return next(err);
    }
    res.status(201).json(comment);
  });
});

// Get all comments
router.get('/', function(req, res, next) {
  Comment.find(function(err, comments) {
    if (err) {
      return next(err);
    }
    res.status(200).json(comments);
  });
});

// Get a single comment
router.get('/:id', function(req, res, next) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return next(err);
    }
    res.status(200).json(comment);
  });
});

// Update a comment
router.put('/:id/update', function(req, res, next) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return next(err);
    }
    comment.username = req.body.username;
    comment.comment = req.body.comment;
    comment.date = new Date();
    comment.save(function(err, comment) {
      if (err) {
        return next(err);
      }
      res.status(200).json(comment);
    });
  });
});

// Delete a comment
router.delete('/:id/delete', function(req, res, next) {
  Comment.findByIdAndRemove(req.params.id, req.body, function(err, comment) {
    if (err) {
      return next(err);
    }
    res.status(200).json(comment);
  });
});

module.exports = router;
