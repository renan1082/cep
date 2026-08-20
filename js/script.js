const btnConsultar = document.querySelector(".btn-consultar");
const btnLimpar = document.querySelector(".btn-limpar");
btnConsultar.addEventListener("click", consultarCEP);

async function consultarCEP() {
  const cep = document.querySelector("#cep").value.replace(/\D/g, "");
  if (cep.length !== 8) {
    alert("Digite um CEP válido!");
    return;
  }
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();
    if (dados.erro) {
      alert("CEP não encontrado!");
      return;
    }

    document.querySelector(".resultado").innerHTML = `
<p><strong>CEP:</strong> ${dados.cep}</p>
<p><strong>Logradouro:</strong> ${dados.logradouro}</p>
<p><strong>Bairro:</strong> ${dados.bairro}</p>
<p><strong>Cidade:</strong> ${dados.localidade}</p>
<p><strong>Estado:</strong> ${dados.uf}</p>
       `;
  } catch (erro) {
    console.error(erro);
    alert("Erro ao consultar o CEP.");
  }
}
btnLimpar.addEventListener("click", limpar);
function limpar() {
  document.querySelector("#cep").value = "";
  document.querySelector(".resultado").innerHTML = `
<p><strong>CEP:</strong></p>
<p><strong>Logradouro:</strong></p>
<p><strong>Bairro:</strong></p>
<p><strong>Cidade:</strong></p>
<p><strong>Estado:</strong></p>
   `;
}
