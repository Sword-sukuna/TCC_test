const API_ALUNOS = "https://tcc-alunos-api.vercel.app/api/alunos";
const API_BLOCOS = "https://tcc-alunos-api.vercel.app/api/blocos";

document.addEventListener("DOMContentLoaded", () => {
  const alunoForm = document.getElementById("alunoForm");
  const blocoForm = document.getElementById("blocoForm");

  // só adiciona se existir
  if (alunoForm) {
    alunoForm.addEventListener("submit", cadastrarAluno);
  }

  if (blocoForm) {
    blocoForm.addEventListener("submit", criarBloco);
  }

  carregarDashboard();
  carregarBlocos();
});

async function cadastrarAluno(e) {
  e.preventDefault();

  const aluno = {
    nome: document.getElementById("nome").value,
    idade: document.getElementById("idade").value,
    email: document.getElementById("email").value,
    curso: document.getElementById("curso").value,
    bloco_id: document.getElementById("bloco_id").value || null
  };

  await fetch(API_ALUNOS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(aluno)
  });

  alert("Aluno cadastrado!");
  e.target.reset();

  carregarDashboard();
}

async function criarBloco(e) {
  e.preventDefault();

  const nomeBloco = document.getElementById("nome_bloco").value;

  await fetch(API_BLOCOS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome_bloco: nomeBloco
    })
  });

  alert("Bloco criado!");
  e.target.reset();

  carregarBlocos();
  carregarDashboard();
}

async function carregarDashboard() {
  const lista = document.getElementById("listaBlocos");
  const totalAlunos = document.getElementById("totalAlunos");
  const totalBlocos = document.getElementById("totalBlocos");

  if (!lista || !totalAlunos || !totalBlocos) return;

  const alunos = await fetch(API_ALUNOS).then(r => r.json());
  const blocos = await fetch(API_BLOCOS).then(r => r.json());

  totalAlunos.textContent = alunos.length;
  totalBlocos.textContent = blocos.length;

  lista.innerHTML = blocos.map(bloco => {
    const alunosBloco = alunos.filter(a => a.bloco_id == bloco.id);

    return `
      <div class="bloco-card">
        <h3>${bloco.nome_bloco}</h3>
        ${
          alunosBloco.length
            ? alunosBloco.map(a => `<p>${a.nome} - ${a.curso || "Sem curso"}</p>`).join("")
            : "<p>Sem alunos</p>"
        }
      </div>
    `;
  }).join("");
}

async function carregarBlocos() {
  const select = document.getElementById("bloco_id");
  if (!select) return;

  const blocos = await fetch(API_BLOCOS).then(r => r.json());

  select.innerHTML =
    `<option value="">Sem bloco</option>` +
    blocos.map(b => `<option value="${b.id}">${b.nome_bloco}</option>`).join("");
}
