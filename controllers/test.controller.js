import Test from "../models/test.js";

import connectDB from "../lib/db.mongodb.js";

export const getTests = async (req, res) => {
  try {
    const tests = await Test.find();

    return res.json({ message: "All test", data: tests });
  } catch (error) {
    console.log(error);
    return res.json({ message: error });
  }
};

export const getTest = async (req, res) => {
  const { id } = req.params;

  const test = await Test.findById(id);

  if (!test) {
    return res.json({ message: "This test is not found" });
  }

  return res.json({ test });
};

export const postTest = async (req, res) => {
  const { title, description, status /*userId*/ } = await req.body;

  const newTest = new Test({
    title,
    description,
    status,
    // user: userId,
  });

  newTest
    .save()
    .then((_) => {
      return res.status(200).json({ message: "success", data: newTest });
    })
    .catch((error) => {
      console.log(error);
      return res.json({ error });
    });
};

export const updateTest = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const test = await Test.findById(id);

  if (!test) {
    return res.json({ message: "This test is not found" });
  }

  test.title = title;
  test.description = description;
  test.status = status;

  test
    .save()
    .then((_) => {
      return res.status(200).json({ message: "success", data: test });
    })
    .catch((error) => {
      console.log(error);
      return res.json({ error });
    });
};

export const deleteTest = async (req, res) => {
  const { id } = req.params;

  const test = await Test.findByIdAndDelete(id);

  if (!test) {
    return res.json({ message: "This test is not found" });
  }

  return res.json({ message: "Delete test", data: test });
};

export default {
  getTests,
  getTest,
  postTest,
  updateTest,
  deleteTest,
};
