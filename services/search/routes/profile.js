import express from 'express';
import elastic from '../elastic';

const router = express.Router();
export default router;

const index = 'profile';

router.put('/:type/:id', (req, res) => {
  elastic.index({
    index: index,
    type: req.params.type,
    id: req.params.id,
    body: req.body
  })
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

router.delete('/:type/:id', (req, res) => {
  elastic.delete({
    index: index,
    type: req.params.type,
    id: req.params.id
  })
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

// Bulk update/insert
router.post('/:type', (req, res) => {
  const body = [];
  req.body.forEach(profile => {
    // Bulk API requires metadata before each document
    body.push({ index: { _index: index, _type: req.params.type, _id: profile.id} });
    delete profile.id;
    // TODO prepare document
    body.push(profile);
  });

  elastic.bulk({
    body: body
  });
  // TODO logging

  res.sendStatus(202);
});
