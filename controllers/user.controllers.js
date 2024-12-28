// Fonction pour récupérer tous les utilisateurs
export const getUsers = async (req, res) => {
  res.json({ message: "Getting all users", status: 200, data: [] });
};

// Fonction pour récupérer un utilisateur spécifique
export const getUser = (req, res) => {
  const { id } = req.params;

  res.json({ id });
};

// Fonction pour créer un utilisateur
export const createUser = async (req, res) => {
  const { username, email, role } = req.body;
  res.send("Create User");
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  res.send("Update User");
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async (req, res) => {
  res.send("Delete User");
};

// Exporter toutes les fonctions comme un objet
export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
