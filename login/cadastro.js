function fazerCadastro() {
  const email = document.getElementById("cadastroEmail").value;
  const senha = document.getElementById("cadastroSenha").value;

  function mostrarMensagem(texto, tipo) {
    const div = document.getElementById("mensagemStatus");
    div.textContent = texto;
    div.className = "mensagem-status " + (tipo === "sucesso" ? "sucesso" : "erro");
    div.style.display = "block";

    setTimeout(() => {
      div.style.display = "none";
    }, 4000);
  }

  firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(userCredential => {
      mostrarMensagem("Cadastro realizado com sucesso!", "sucesso");

      setTimeout(() => {
        window.location.href = "../index.html"; // Redireciona após mostrar a mensagem
      }, 1500);
    })
    .catch(error => {
      console.error("Erro ao cadastrar:", error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          mostrarMensagem("Este e-mail já está em uso.", "erro");
          break;
        case 'auth/invalid-email':
          mostrarMensagem("E-mail inválido.", "erro");
          break;
        case 'auth/weak-password':
          mostrarMensagem("A senha deve ter pelo menos 6 caracteres.", "erro");
          break;
        default:
          mostrarMensagem("Erro ao realizar cadastro.", "erro");
      }
    });
}
