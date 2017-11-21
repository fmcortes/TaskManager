const Tag = require('../models/tag.model');

exports.getTags = async (req, res) => {
   const tags = await Tag.find({});
   res.send(tags);
};

exports.postTag = async (req, res) => {
   const tag = new Tag(req.body);
   try {
      await tag.save();
      res.json({ message: 'Tag successfully created!', tag });
   } catch (err) {
      res.status(422).send(err);
   }
};

exports.getTag = async (req, res) => {
   try {
      const tag = await Tag.findById(req.params.id);
      res.json(tag);
   } catch (err) {
      res.status(422).send(err);
   }
};

exports.updateTag = async (req, res) => {
   try {
      const tag = await Tag.findById({ _id: req.params.id });
      const obj = await Object.assign(tag, req.body).save();
      res.json({ message: 'Tag updated!', tag });
   } catch (err) {
      res.status(422).send(err);
   }
};

exports.deleteTag = async (req, res) => {
   try {
      const result = await Tag.remove({ _id: req.params.id });
      res.json({ message: 'Tag successfully deleted!', result });
   } catch (err) {
      res.status(422).send(err);
   }
};
