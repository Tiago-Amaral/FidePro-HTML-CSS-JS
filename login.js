function mostrarMensagem(texto, tipo) {
  const div = document.getElementById("mensagemStatus");
  div.textContent = texto;
  div.className = "mensagem-status " + (tipo === "sucesso" ? "sucesso" : "erro");
  div.style.display = "block";

  // vai esconder a mensagem depois de 4 segundos
  setTimeout(() => {
    div.style.display = "none";
  }, 4000);
}

function fazerLogin() {
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;

  if (!email || !senha) {
    mostrarMensagem("Por favor, preencha todos os campos.", "erro");
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Login realizado com sucesso:", user);
      mostrarMensagem("Login realizado com sucesso!", "sucesso");
      
      setTimeout(() => {
        window.location.href = "./pages/home.html";
      }, 1500); // pausa de 1.5s antes de redirecionar
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error);
      if (error.code === "auth/user-not-found") {
        mostrarMensagem("Usuário não encontrado.", "erro");
      } else if (error.code === "auth/wrong-password") {
        mostrarMensagem("Senha incorreta.", "erro");
      } else {
        mostrarMensagem("Erro ao fazer login " /*+ error.message*/, "erro");
      }
    });
}
