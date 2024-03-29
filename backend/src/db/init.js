import ConnectionModel from "../model/connection/index.js";
import ConversationModel from "../model/conversation/index.js";
import UserConversationModel from "../model/conversation/userConversation.js";
import MentorModel from "../model/mentor/index.js";
import MessageModel from "../model/message/index.js";
import SeekerModel from "../model/seeker/index.js";
import UserModel from "../model/user/index.js";
const initDb = async () => {
  await UserModel.sync({ force: false, alert: true });
  console.log("The table for the User model was just (re)created!");
  await SeekerModel.sync({ force: false, alert: true });
  console.log("The table for the Seeker model was just (re)created!");
  await MentorModel.sync({ force: false, alert: true });
  console.log("The table for the Mentor model was just (re)created!");
  await ConnectionModel.sync({ force: false, alert: true });
  console.log("The table for the Connection model was just (re)created!");

  await MessageModel.sync({ force: false, alert: true });
  console.log("The table for the Message model was just (re)created!");
  await ConversationModel.sync({ force: false, alert: true });
  console.log("The table for the Conversation model was just (re)created!");
  await UserConversationModel.sync({ force: false, alert: true });
  console.log("The table for the UserConversation model was just (re)created!");
};
export default initDb;
