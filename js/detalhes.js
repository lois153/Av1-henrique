const detalhesDiv = document.getElementById("detalhes");
const loading = document.getElementById("loading");
const erro = document.getElementById("erro");

const API_KEY = "sL6ywns8zd1TLWoosmwByxGLlWM9H4tfqHQvCzpf";

const params = new URLSearchParams(window.location.search);

const marca = params.get("marca");
const modelo = params.get("modelo");

async function buscarDetalhes() {

  try {

    const resposta = await fetch(
      `https://api.api-ninjas.com/v1/cars?make=${marca}&model=${modelo}`,
      {
        headers: {
          "X-Api-Key": API_KEY
        }
      }
    );

    if (!resposta.ok) {
      throw new Error("Erro na API");
    }

    const dados = await resposta.json();

    loading.classList.add("d-none");

    if (!dados.length) {

      detalhesDiv.innerHTML = `
        <div class="alert alert-warning">
          Nenhum detalhe encontrado.
        </div>
      `;

      return;
    }

    const carro = dados[0];

    detalhesDiv.innerHTML = `
      <div class="card bg-dark text-light shadow">

        <img
          src="https://cdn.imagin.studio/getimage?customer=img&make=${carro.make}&modelFamily=${carro.model}"
          class="card-img-top marca-img"
          alt="${carro.model}"
        >

        <div class="card-body">

          <h1 class="mb-4">
            ${carro.make} ${carro.model}
          </h1>

          <div class="row">

            <div class="col-md-6">

              <p><strong>🚗 Ano:</strong> ${carro.year}</p>

              <p><strong>⛽ Combustível:</strong> ${carro.fuel_type}</p>

              <p><strong>⚙️ Transmissão:</strong> ${carro.transmission}</p>

              <p><strong>🔩 Cilindros:</strong> ${carro.cylinders}</p>

            </div>

            <div class="col-md-6">

              <p><strong>🚙 Tração:</strong> ${carro.drive}</p>

              <p><strong>🏙 Cidade MPG:</strong> ${carro.city_mpg}</p>

              <p><strong>🛣 Rodovia MPG:</strong> ${carro.highway_mpg}</p>

              <p><strong>📊 Média MPG:</strong> ${carro.combination_mpg}</p>

            </div>

          </div>

        </div>

      </div>
    `;

  } catch (error) {

    console.error(error);

    loading.classList.add("d-none");
    erro.classList.remove("d-none");
  }
}

buscarDetalhes();