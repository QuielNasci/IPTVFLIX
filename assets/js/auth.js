document.addEventListener('DOMContentLoaded', function() {
  // Formulário de Cadastro
  const form = document.getElementById("signup-form");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar o comportamento padrão de envio do formulário

    // Pegando os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("new-email").value;
    const senha = document.getElementById("new-password").value;
    const telefone = document.getElementById("telefone").value;

    // Criando a URL com os parâmetros para o Google Apps Script
    const url = `https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbzGVXx_pfBJxW_LSl0eR3WxsT_WkbZ4thFjwrCHdkhXcEvgnJkDiNU2sQ8LCWCv9ASG/exec/exec?action=cadastro&nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}&telefone=${encodeURIComponent(telefone)}`;

    // Enviando a requisição GET para o Google Apps Script
    fetch(url)
      .then(response => response.text())
      .then(data => {
        // Exibir mensagem de sucesso ou erro
        document.getElementById("mensagem").textContent = data;
      })
      .catch(error => {
        // Exibir mensagem de erro
        document.getElementById("mensagem").textContent = "Erro ao cadastrar usuário: " + error.message;
      });
  });
});
