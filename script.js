const API = "https://seu-projeto.vercel.app/api/alunos";

document.getElementById("alunoForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const aluno = {
    nome: nome.value,
    idade: idade.value,
    email: email.value,
    curso: curso.value
  };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aluno)
  });

  alert("Aluno cadastrado!");
});

async function buscarAlunos() {
  const nomeBusca = document.getElementById("buscar").value;
  const res = await fetch(`${API}?nome=${nomeBusca}`);
  const dados = await res.json();

  document.getElementById("lista").innerHTML = dados
    .map(a => `<p>${a.nome} - ${a.curso}</p>`)
    .join("");
}
