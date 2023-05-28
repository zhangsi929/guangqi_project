/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-23 21:08:32
 * @LastEditTime: 2023-05-27 21:00:08
 * @FilePath: /guangqi/newbackend/models/schema/convoSchema.js
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
const mongoose = require("mongoose");
const mongoMeili = require("../plugins/mongoMeili");
const conversationPreset = require("./conversationPreset");
const convoSchema = mongoose.Schema(
  {
    conversationId: {
      type: String,
      unique: true,
      required: true,
      index: true,
      meiliIndex: true,
    },
    title: {
      type: String,
      default: "新对话",
      meiliIndex: true,
    },
    user: {
      type: String,
      default: null,
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    // google only
    examples: [{ type: mongoose.Schema.Types.Mixed }],
    ...conversationPreset,
    // for bingAI only
    jailbreakConversationId: {
      type: String,
      default: null,
    },
    conversationSignature: {
      type: String,
      default: null,
    },
    clientId: {
      type: String,
      default: null,
    },
    invocationId: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

if (process.env.MEILI_HOST && process.env.MEILI_MASTER_KEY) {
  convoSchema.plugin(mongoMeili, {
    host: process.env.MEILI_HOST,
    apiKey: process.env.MEILI_MASTER_KEY,
    indexName: "convos", // Will get created automatically if it doesn't exist already
    primaryKey: "conversationId",
  });
}

const Conversation =
  mongoose.models.Conversation || mongoose.model("Conversation", convoSchema);

module.exports = Conversation;
