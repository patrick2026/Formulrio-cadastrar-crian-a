// Função para preencher as cidades baseadas no estado
function preencherCidades() {
  const estadoSelecionado = document.getElementById("state").value;
  const cidadeSelect = document.getElementById("city");

  // Limpa as opções anteriores de cidade
  cidadeSelect.innerHTML =
    '<option value="" disabled selected>Escolha a cidade</option>';

  if (estadoSelecionado) {
    // Fazendo a requisição para a API IBGE para buscar as cidades do estado selecionado
    fetch(
      `https://servicodados.ibge.gov.br/api/v2/localidades/estados/${estadoSelecionado}/municipios`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar cidades");
        }
        return response.json();
      })
      .then((cidades) => {
        // Preenche o select com as cidades retornadas
        cidades.forEach((cidade) => {
          const option = document.createElement("option");
          option.value = cidade.nome;
          option.textContent = cidade.nome;
          cidadeSelect.appendChild(option);
        });
      })
      .catch((error) => {
        console.error(error);
        // Se houver erro, adicione uma opção com mensagem de erro
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "Erro ao carregar cidades";
        cidadeSelect.appendChild(option);
      });
  }
}

// Adiciona o evento para quando o estado for alterado
document.getElementById("state").addEventListener("change", preencherCidades);
