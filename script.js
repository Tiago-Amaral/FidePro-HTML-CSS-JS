import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

import { firebaseConfig } from './firebase-config.js'; // Verifique o caminho correto para o arquivo

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// formulário
const form = document.getElementById("clienteForm");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cliente = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    cidade: document.getElementById("cidade").value,
    nascimento: document.getElementById("nascimento").value,
  };

  const compra = {
    produto: document.getElementById("produto").value,
    categoria: document.getElementById("categoria").value,
    duracao: parseInt(document.getElementById("duracao").value),
    quantidade: parseInt(document.getElementById("quantidade").value),
    preco: parseFloat(document.getElementById("preco").value),
    data: document.getElementById("dataCompra").value,
  };

  try {
    const snapshot = await getDocs(collection(db, "clientes"));
    const existente = snapshot.docs.find(doc => doc.data().telefone === cliente.telefone);

    if (existente) {
      const clienteRef = doc(db, "clientes", existente.id);
      await updateDoc(clienteRef, {
        compras: arrayUnion(compra)
      });
    } else {
      cliente.compras = [compra];
      await addDoc(collection(db, "clientes"), cliente);
    }

    alert("Cliente e compra salvos com sucesso!");
    form.reset();
  } catch (error) {
    console.error("Erro ao salvar cliente:", error);
    alert("Erro ao salvar cliente no banco de dados.");
  }
});

// Login
window.fazerLogin = function () {
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;

  signInWithEmailAndPassword(auth, email, senha)
    .then(() => window.location.href = "../pages/home.html")
    .catch(error => alert("Erro: " + error.message));
};

// Cadastro
window.fazerCadastro = function () {
  const email = document.getElementById("cadastroEmail").value;
  const senha = document.getElementById("cadastroSenha").value;

  createUserWithEmailAndPassword(auth, email, senha)
    .then(() => {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "index.html";
    })
    .catch(error => alert("Erro: " + error.message));
};

// Recuperar Senha
window.recuperarSenha = function () {
  const email = document.getElementById("recuperarEmail").value;

  sendPasswordResetEmail(auth, email)
    .then(() => alert("Email de recuperação enviado!"))
    .catch(error => alert("Erro: " + error.message));
};
