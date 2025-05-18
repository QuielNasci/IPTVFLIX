const SHEET_ID = "1fqA2MogJLVGv79skRGxiXKwzHDOv-K5b8p1G7DaYpgg";
const API_KEY = "AKfycbxkhWCGXyhqM3DdutwloZiMEdRUVhJ-SWBB6okanF36P2M_Zr_2fm-vVNyugCH-cWff";
const SHEET_NAME = "usuarios";

// Faixa onde os dados dos usuários estão, incluindo telefone (coluna D)
const RANGE = `${SHEET_NAME}!A2:E`; // A até E, pois agora temos uma coluna extra para telefone

// Função de login
async function login(email, senha) {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`);
  const data = await res.json();

  if (!data.values) {
    alert("Erro ao acessar o banco de dados.");
    return;
  }

  // Aqui, buscamos o usuário que combina com o email e senha
  const user = data.values.find(row => row[1] === email && row[2] === senha);
  
  if (user) {
    localStorage.setItem("userEmail", user[1]);
    localStorage.setItem("userName", user[0]);
    localStorage.setItem("userPhone", user[3]); // Armazena o telefone
    window.location.href = "cliente.html";
  } else {
    alert("Email ou senha incorretos.");
  }
}

// Função de cadastro
async function cadastrar(nome, email, senha, telefone) {
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A2:E2:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;
  
  const body = {
    values: [[nome, email, senha, telefone]], // O telefone vai para a 4ª coluna
  };

  const res = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
  } else {
    alert("Erro ao cadastrar. Verifique sua conexão ou permissões.");
  }
}

// Interações com formulários
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#loginForm");
  const cadastroForm = document.querySelector("#cadastroForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = loginForm.email.value;
      const senha = loginForm.senha.value;
      login(email, senha);
    });
  }

  if (cadastroForm) {
    cadastroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = cadastroForm.nome.value;
      const email = cadastroForm.email.value;
      const senha = cadastroForm.senha.value;
      const telefone = cadastroForm.telefone.value;
      cadastrar(nome, email, senha, telefone);
    });
  }
});
