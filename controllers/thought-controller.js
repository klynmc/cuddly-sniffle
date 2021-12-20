const { User, Thought } = require('../models');

/* const thoughtApi = {
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtData => {res.json(dbThoughtData) })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
    },
    addThought ({ params, body }, res) {
        console.log(body)
        Thoughts.create(body)
         .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
         .then(dbThoughtData => {
             if (!dbThoughtData) {
                 res.status(404).json({ message: 'No user found with this id!' })
                 return;
            }
            res.json(dbThoughtData);
         })
          .catch(err => res.json(err));
    },
    addReaction ({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            { $push: { thoughts: body }},
            { new: true, runValidators: true }
        )
         .then(dbThoughtData => {
             if (!dbThoughtData) {
                 res.status(404).json({ message: 'No user found with this id!' });
                return;
             }
            res.json(dbThoughtData)
         })
         .catch(err => res.json(err));
    },
    removeReaction ({ params, body }) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            { $pull: { thoughts: { reactionId: params.reactionId } } },
            {new: true}
        )
         .then(dbThoughtData => res.json(dbThoughtData))
         .catch(err => res.json(err))
    },
    removeThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id})
         .then(deletedThought => {
             if (!deletedThought) {
                 return res.status(404).json({ message: 'No thoughts with this id!' })
            }
            return User.findOneAndUpdate (
                { _id: params.userId },
                { $pull: { thoughts: params.id } },
                { new: true }
            );
        })
          .then(dbThoughtData => {
              if (!dbThoughtData) {
                  res.status(404).json({ message: 'No user found with this id!' })
                  return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    }
}; */

const thoughtApi = {
    //get all Users
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .select('-__v')
    /* .sort({ _id: -1 }) */
    .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},

getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      /* .sort({ _id: -1 }) */
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateThought ({ params, body}, res) {
    Thought.findOneAndUpdate({_id: params.id}, body, { new: true, runValidators: true })
     .then(dbThoughtData => {
         if (!dbThoughtData) {
             res.status(404).json({ message: 'No thought found with this id!' })
             return;
        }
        res.json(dbThoughtData);
     })
      .catch(err => res.json(err));
  },

  addThought ({ params, body }, res) {
    Thought.create(body)
     .then(({ username, _id }) => {
        return User.findOneAndUpdate(
            { username: username },
            { $push: { thoughts: _id } },
            { new: true, runValidators: true }
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
            { _id: params.id },
            { $push: { thoughts: body }},
            { new: true, runValidators: true }
        )
         .then(dbThoughtData => {
             if (!dbThoughtData) {
                 res.status(404).json({ message: 'No thought found with this id!' });
                return;
             }
            res.json(dbThoughtData)
         })
         .catch(err => res.json(err));
    },
    removeReaction ({ params, body }) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { thoughts: { reactionId: params.reactionId } } },
            {new: true}
        )
         .then(dbThoughtData => res.json(dbThoughtData))
         .catch(err => res.json(err))
    },
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id})
     .then(deletedThought => {
         if (!deletedThought) {
             return res.status(404).json({ message: 'No thoughts with this id!' })
        }
        return User.findOneAndUpdate (
            { username: username },
            { $pull: { thoughts: params.id } },
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
}

module.exports = thoughtApi;