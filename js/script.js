const carrosDiv = document.getElementById("carros");
const loading = document.getElementById("loading");
const erro = document.getElementById("erro");

const API_KEY = "sL6ywns8zd1TLWoosmwByxGLlWM9H4tfqHQvCzpf";

const marcas = [
  "audi",
  "bmw",
  "toyota",
  "honda",
  "nissan",
  "ford",
  "chevrolet",
  "hyundai",
  "kia",
  "mazda",
  "mercedes-benz",
  "volkswagen",
  "subaru",
  "mitsubishi",
  "jeep",
  "tesla",
  "ferrari",
  "lamborghini",
  "porsche",
  "bugatti"
];

async function carregarCarros() {
  try {
    loading.classList.remove("d-none");

    let todosCarros = [];

    const promessas = marcas.map(async (marca) => {
      try {
        const resposta = await fetch(
          `https://api.api-ninjas.com/v1/cars?make=${marca}`,
          {
            headers: {
              "X-Api-Key": API_KEY
            }
          }
        );

        if (!resposta.ok) return [];

        return await resposta.json();

      } catch {
        return [];
      }
    });

    const resultados = await Promise.all(promessas);

    resultados.forEach(lista => {
      todosCarros.push(...lista);
    });

    loading.classList.add("d-none");

    if (todosCarros.length === 0) {
      carrosDiv.innerHTML = `
        <div class="alert alert-warning">
          Nenhum carro encontrado.
        </div>
      `;
      return;
    }

    carrosDiv.innerHTML = "";

    todosCarros.forEach((carro) => {
      carrosDiv.innerHTML += `
        <div class="col-lg-4 col-md-6">
          <div class="card bg-dark text-light shadow h-100">

            <img
              src="https://cdn.imagin.studio/getimage?customer=img&make=${encodeURIComponent(carro.make)}&modelFamily=${encodeURIComponent(carro.model)}"
              class="card-img-top marca-img"
              alt="${carro.model}"
            >

            <div class="card-body d-flex flex-column">

              <h4 class="titulo-carro">${carro.make} ${carro.model}</h4>

              <p>🚗 Ano: ${carro.year}</p>

              <p>⛽ ${carro.fuel_type || "Não informado"}</p>

              <p>⚙️ ${carro.transmission || "Não informado"}</p>

              <a
                href="detalhes.html?marca=${encodeURIComponent(carro.make)}&modelo=${encodeURIComponent(carro.model)}"
                class="btn btn-warning mt-auto"
              >
                Ver detalhes
              </a>

            </div>

          </div>
        </div>
      `;
    });

    console.log("Total de carros carregados:", todosCarros.length);

  } catch (error) {
    console.error(error);

    loading.classList.add("d-none");
    erro.classList.remove("d-none");
  }
}

carregarCarros();