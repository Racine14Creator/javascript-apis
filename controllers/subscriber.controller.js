import { z } from "zod";

import Subscriber from "../models/sub.js";

const subSchema = z.object({
  email: z.string().email("L'address e-mail est invalid"),
});
export const getSubs = async (req, res) => {
  try {
    const subs = await Subscriber.find();
    return res.json({ data: subs, message: "All Subs" });
  } catch (error) {
    console.log(error);
    return res.json({ message: error });
  }
};

export const postSub = async (req, res) => {
  const { email } = subSchema.parse(req.body);

  const existingSub = await Subscriber.findOne({ email });

  if (existingSub) {
    return res.json({ message: "Cet e-mail est déjà utilisé" }).status(400);
  }

  const newSub = new Subscriber({
    email,
  });
  newSub
    .save()
    .then((_) => {
      return res.json({ message: "Votre e-mail est enregistree", email });
    })
    .catch((error) => {
      return res.json({ message: error });
    });
  return res.json({ message: "Get Post Sub" });
};

export const getSub = async (req, res) => {
  return res.json({ message: "Get one sub" });
};

export const updateSub = async (req, res) => {
  return res.json({ message: "Update sub" });
};

export const deleteSub = async (req, res) => {
  return res.json({ message: "Delete Sub" });
};

export default {
  getSubs,
  getSub,
  postSub,
  updateSub,
  deleteSub,
};
