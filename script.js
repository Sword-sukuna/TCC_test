const API = "https://tcc-alunos-api.vercel.app/api/alunos";

// cadastrar
document.getElementById("alunoForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const aluno = {
    nome: document.getElementById("nome").value,
    idade: document.getElementById("idade").value,
    email: document.getElementById("email").value,
    curso: document.getElementById("curso").value
  };

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(aluno)
  });

  const data = await res.json();
  alert(data.message);

  buscarAlunos();
});

// buscar
async function buscarAlunos() {
  const nome = document.getElementById("buscar").value;
  const res = await fetch(`${API}?nome=${nome}`);
  const alunos = await res.json();

  document.getElementById("lista").innerHTML = alunos
    .map(a => `
      <p>
        <strong>${a.nome}</strong><br>
        ${a.curso || "Sem curso"}<br>
        ${a.email || ""}
      </p>
    `)
    .join("");
}
