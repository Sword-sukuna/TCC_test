const API = "https://tcc-alunos-api.vercel.app/api/alunos";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("alunoForm");
  const btnBuscar = document.getElementById("btnBuscar");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const aluno = {
      nome: document.getElementById("nome").value,
      idade: document.getElementById("idade").value,
      email: document.getElementById("email").value,
      curso: document.getElementById("curso").value
    };

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(aluno)
      });

      const data = await res.json();
      alert(data.message || "Aluno cadastrado!");

      form.reset();
      buscarAlunos();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar");
    }
  });

  btnBuscar.addEventListener("click", buscarAlunos);

  async function buscarAlunos() {
    try {
      const nome = document.getElementById("buscar").value;
      const res = await fetch(`${API}?nome=${nome}`);
      const alunos = await res.json();

      document.getElementById("lista").innerHTML = alunos
        .map(a => `
          <p>
            <strong>${a.nome}</strong><br>
            Curso: ${a.curso || "Sem curso"}<br>
            Email: ${a.email || "Sem email"}
          </p>
        `)
        .join("");
    } catch (error) {
      console.error("Erro ao buscar:", error);
    }
  }

  // já carrega lista ao abrir
  buscarAlunos();
});
