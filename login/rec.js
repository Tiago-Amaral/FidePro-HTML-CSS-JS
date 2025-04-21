function recuperarSenha() {
  const email = document.getElementById("recuperarEmail").value;
  const messageDiv = document.getElementById("mensagemStatus");

  // Limpar mensagens anteriores
  messageDiv.style.display = "none";
  messageDiv.classList.remove("sucesso", "erro");

  if (!email) {
    messageDiv.textContent = "Por favor, preencha o campo de email.";
    messageDiv.classList.add("erro");
    messageDiv.style.display = "block";
    return;
  }

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      messageDiv.textContent = "Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.";
      messageDiv.classList.add("sucesso");
      messageDiv.style.display = "block";

      // Ocultar a mensagem após 5 segundos
      setTimeout(() => {
        messageDiv.style.display = "none";
      }, 5000);
    })
    .catch((error) => {
      console.error("Erro ao enviar email de recuperação:", error.message);
      let mensagem = "";

      switch (error.code) {
        case "auth/user-not-found":
          mensagem = "Usuário não encontrado. Verifique o email digitado.";
          break;
        case "auth/invalid-email":
          mensagem = "Email inválido.";
          break;
        default:
          mensagem = "Erro ao tentar recuperar a senha.";
      }

      messageDiv.textContent = mensagem;
      messageDiv.classList.add("erro");
      messageDiv.style.display = "block";

      // Ocultar a mensagem após 5 segundos
      setTimeout(() => {
        messageDiv.style.display = "none";
      }, 5000);
    });
}
