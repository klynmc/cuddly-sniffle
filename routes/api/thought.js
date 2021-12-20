const router = require('express').Router()
//const Thought = require('../../models/Thought')
const { 
    getAllThoughts,
    //getThoughtById,
    addThought, 
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router.route('/thoughts').get(getAllThoughts);
router.route('/:userId').post(addThought);
router.route('/:userId/:thoughtId').delete(removeThought);
router.route('/:userId/:thoughtId').put(addReaction);
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

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
