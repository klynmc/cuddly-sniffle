const router = require('express').Router()
//const Thought = require('../../models/Thought')
const { 
    getAllThoughts,
    getThoughtById,
    addThought, 
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts).post(addThought);
router.route('/:id').delete(removeThought).get(getThoughtById);
router.route('/:thoughtId/reactions').put(addReaction);
router.route('/:thoughtId/reactons/:reactionId').delete(removeReaction);

/* router 
 .route('/')
 .get(getAllThoughts)
 .post(addThought)
 .post(addReaction);

router
 .route('/:id')
 //.get(getThoughtById)
 .put(addReaction)
 .delete(removeThought)
 .delete(removeReaction); */

module.exports = router;
