// const Reaction = require("../models/Reaction");
// const mongoose = require("mongoose");
// exports.reactPost = async (req, res) => {
//   try {
//     const { postId, reaction } = req.body;
//     const check = await Reaction.findOne({
//       postRef: postId,
//       reactedBy: mongoose.Types.ObjectId(req.user.id),
//     });
//     if (check == null) {
//       const newReaction = new React({
//         reaction: reaction,
//         postRef: postId,
//         reactedBy: req.user.id,
//       });
//       await newReaction.save();
//     } else {
//       if (check.reaction == reaction) {
//         await Reaction.findByIdAndRemove(check._id);
//       } else {
//         await Reaction.findByIdAndUpdate(check._id, {
//           reaction: reaction,
//         });
//       }
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
