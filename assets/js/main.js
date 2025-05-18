import { desafios } from "./desafios.js";
import { projetos } from "./projetos.js";

const navigation = document.querySelector("#navigation");
const backToTopButton = document.querySelector("#backToTopButton");
const toggle = document.querySelector("#sw-checkbox");
const projectsSection = document.querySelector("#projects .wrapper");

const notebook_1 = document.querySelector("#notebook-1");
const notebook_2 = document.querySelector("#notebook-2");
const notebook_2_white = document.querySelector("#notebook-2-white");
const vidro = document.querySelector("#vidro");

const SHEET_ID = "1fqA2MogJLVGv79skRGxiXKwzHDOv-K5b8p1G7DaYpgg";
const API_KEY = "AKfycbwNpa2A0aoW8zaepdn7KVCdCU2tqB4v9bAY6kIuoufX_nz2pZOUZFYG9f3_2_d0WReM";
const SHEET_NAME = "usuarios";

// Faixa onde os dados dos usuários estão
const RANGE = `${SHEET_NAME}!A2:D`;

// Função de login
async function login(email, senha) {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/{RANGE}:append?valueInputOption=USER_ENTERED&key={API_KEY}
`);
  const data = await res.json();

  if (!data.values) {
    alert("Erro ao acessar o banco de dados.");
    return;
  }

  const user = data.values.find(row => row[1] === email && row[2] === senha);
  if (user) {
    localStorage.setItem("userEmail", user[1]);
    localStorage.setItem("userName", user[0]);
    window.location.href = "cliente.html";
  } else {
    alert("Email ou senha incorretos.");
  }
}

// Função de cadastro
async function cadastrar(nome, email, senha, telefone) {
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A2:D2:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;
  
  const body = {
    values: [[nome, email, senha, telefone]],
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


window.addEventListener("load", function begin() {
  projetos(projectsSection);
  const desafioBtn = document.querySelector("#desafio");

  desafioBtn.addEventListener("click", () => {
    desafios(projectsSection);
    document
      .querySelector("#backToProjectsBtn")
      .addEventListener("click", begin);
  });
});

window.addEventListener("scroll", onScroll);
onScroll();

window.onload = setTimeout(() => {
  notebook_1.style.opacity = 0;

  notebook_1.style.animation = "none";
  notebook_2.style.animation = "none";
  notebook_2_white.style.animation = "none";
  vidro.style.animation = "none";
}, 4000);

function onScroll() {
  showNavOnScroll();
  showBackToTopButtonOnScroll();

  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(projects);
  activateMenuAtCurrentSection(knowledge);
  activateMenuAtCurrentSection(contact);
}

function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;

  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`);

  menuElement.classList.remove("active");

  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

openMenu();
function openMenu() {
  const openBtns = document.querySelectorAll(".open");
  openBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.add("menu-expanded");
    });
  });
}

closeMenu();
function closeMenu() {
  const closeBtns = document.querySelectorAll(".close");
  closeBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.remove("menu-expanded");
    });
  });
}

ScrollReveal({
  origin: "bottom",
  distance: "50px",
  duration: 1000,
}).reveal(
  `#home, 
  #home img, 
  #about, 
  #about header, 
  #about p,
  #about img,
  #projects,
  #projects header,
  #projects .card,
  #knowledge,
  #knowledg header,
  #knowledg .card,
  #contact,
  #contact header`
);

toggle.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");
});
