export const getSubs = async (req, res) => {
  return res.json({ message: "Get subs" });
};

export const postSub = async (req, res) => {
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
