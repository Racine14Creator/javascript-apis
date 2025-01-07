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
    .then(() => {
      return res.json({ message: "Votre e-mail est enregistree", email });
    })
    .catch((error) => {
      return res.json({ message: error });
    });
  return res.json({ message: "Get Post Sub" });
};

export const getSub = async (req, res) => {
  try {
    const { id } = req.params;
    const sub = await Subscriber.findById(id);

    return res.json({ message: "Get one sub", data: sub });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateSub = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = subSchema.parse(req.body);

    const emailExist = await Subscriber.findOne({ email });

    if (emailExist) {
      return res.json({ message: "Cet e-mail est déjà utilisé" }).status(400);
    }

    await Subscriber.updateOne({ _id: id }, { email });

    const updatedSub = await Subscriber.findById(id);

    return res.json({ message: "Update sub", data: updatedSub });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSub = async (req, res) => {
  try {
    const { id } = req.params;

    const sub = await Subscriber.findByIdAndDelete(id);

    return res.json({ message: "Delete Sub", data: sub });
  } catch (error) {
    console.log(error);
  }
};

export default {
  getSubs,
  getSub,
  postSub,
  updateSub,
  deleteSub,
};
