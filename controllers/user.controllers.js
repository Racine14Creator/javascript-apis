import { z } from "zod";
import User from "../models/user.js";

// Définir un schéma Zod pour la validation
const userSchema = z.object({
  username: z
    .string()
    .min(3, "Le nom d'utilisateur doit comporter au moins 3 caractères")
    .max(20, "Le nom d'utilisateur ne peut pas dépasser 20 caractères")
    .regex(
      /^[a-zA-Z0-9_]*$/,
      "Le nom d'utilisateur ne peut contenir que des lettres, chiffres et underscores"
    ),
  email: z.string().email("L'adresse e-mail est invalide"),
  role: z.enum(["user", "admin"], "Le rôle doit être 'user' ou 'admin'"),
  password: z
    .string()
    .min(6, "Le mot de passe doit comporter au moins 6 caractères"),
});

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
  try {
    // Valider les données de la requête avec Zod
    const { username, email, role, password } = userSchema.parse(req.body);

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet e-mail est déjà utilisé" });
    }

    // Créer un nouvel utilisateur
    const newUser = new User({ username, email, role, password });
    await newUser.save();
    res
      .status(201)
      .json({ message: "Utilisateur créé avec succès", user: newUser });
  } catch (error) {
    // Gérer les erreurs de validation ou autres erreurs
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation échouée",
        errors: error.errors.map((err) => err.message),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
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