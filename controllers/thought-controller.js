const { User, Thought } = require('../models');

const thoughtApi = {
    addThought ({ params, body }, res) {
        console.log(body)
        Thought.create(body)
         .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
         .then(dbUserData => {
             if (!dbUserData) {
                 res.status(404).json({ message: 'No user found with this id!' })
                 return;
            }
            res.json(dbUserData);
         })
          .catch(err => res.json(err));
    },
    addReaction ({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
         .then(dbUserData => {
             if (!dbUserData) {
                 res.status(404).json({ message: 'No user found with this id!' });
                return;
             }
            res.json(dbUserData)
         })
         .catch(err => res.json(err));
    },
    removeReaction ({ params, body }) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            {new: true}
        )
         .then(dbUserData => res.json(dbUserData))
         .catch(err => res.json(err))
    },
    removeComment({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId})
         .then(deletedThought => {
             if (!deletedThought) {
                 return res.status(404).json({ message: 'No thoughts with this id!' })
            }
            return User.findOneAndUpdate (
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
          .then(dbUserData => {
              if (!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id!' })
                  return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
    }
};

module.exports = thoughtApi;