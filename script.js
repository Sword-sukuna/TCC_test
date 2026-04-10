const API_ALUNOS = "https://tcc-alunos-api.vercel.app/api/alunos";
const API_BLOCOS = "https://tcc-alunos-api.vercel.app/api/blocos";

document.addEventListener("DOMContentLoaded", () => {
  carregarDashboard();
  carregarBlocos();

  document.getElementById("alunoForm").addEventListener("submit", cadastrarAluno);
  document.getElementById("blocoForm").addEventListener("submit", criarBloco);
});

async function cadastrarAluno(e) {
  e.preventDefault();

  const aluno = {
    nome: nome.value,
    idade: idade.value,
    email: email.value,
    curso: curso.value,
    bloco_id: bloco_id.value || null
  };

  await fetch(API_ALUNOS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aluno)
  });

  alert("Aluno cadastrado!");
  carregarDashboard();
}

async function criarBloco(e) {
  e.preventDefault();

  await fetch(API_BLOCOS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome_bloco: nome_bloco.value })
  });

  alert("Bloco criado!");
  carregarBlocos();
}

async function carregarDashboard() {
  const alunos = await fetch(API_ALUNOS).then(r => r.json());
  const blocos = await fetch(API_BLOCOS).then(r => r.json());

  document.getElementById("totalAlunos").textContent = alunos.length;
  document.getElementById("totalBlocos").textContent = blocos.length;

  renderBlocos(blocos, alunos);
}

async function carregarBlocos() {
  const blocos = await fetch(API_BLOCOS).then(r => r.json());

  bloco_id.innerHTML = '<option value="">Sem bloco</option>' +
    blocos.map(b => `<option value="${b.id}">${b.nome_bloco}</option>`).join("");
}

function renderBlocos(blocos, alunos) {
  const lista = document.getElementById("listaBlocos");

  lista.innerHTML = blocos.map(bloco => {
    const alunosBloco = alunos.filter(a => a.bloco_id == bloco.id);

    return `
      <div class="bloco-card">
        <h3>${bloco.nome_bloco}</h3>
        ${alunosBloco.map(a => `<p>${a.nome} - ${a.curso || "Sem curso"}</p>`).join("") || "<p>Sem alunos</p>"}
      </div>
    `;
  }).join("");
}
