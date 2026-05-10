const marcasDiv = document.getElementById("marcas")
const carrosDiv = document.getElementById("carros")
const resultadoMarcas = document.getElementById("resultadoMarcas")

const areaCarros = document.getElementById("areaCarros")

const loading = document.getElementById("loading")
const erro = document.getElementById("erro")
const pesquisa = document.getElementById("pesquisa")

const marcas = [
  "bmw",
  "audi",
  "toyota",
  "honda",
  "nissan",
  "ferrari",
  "lamborghini",
  "porsche",
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
  "bugatti"
]

function mostrarMarcas(){

  marcas.forEach(marca => {

    marcasDiv.innerHTML += `

      <div class="col-md-3">

        <div class="card bg-dark text-light shadow h-100">

          <div class="card-body text-center d-flex flex-column">

            <h3 class="text-capitalize mb-4">
              ${marca}
            </h3>

            <button
              class="btn btn-warning mt-auto"
              onclick="buscarCarros('${marca}')"
            >
              Ver carros
            </button>

          </div>

        </div>

      </div>

    `
  })
}

async function buscarCarros(marca){

  carrosDiv.innerHTML = ""

  areaCarros.classList.remove("d-none")

  loading.classList.remove("d-none")

  erro.classList.add("d-none")

  try{

    const resposta = await fetch(
      `https://api.api-ninjas.com/v1/cars?make=${marca}`,
      {
        headers:{
          "X-Api-Key":"sL6ywns8zd1TLWoosmwByxGLlWM9H4tfqHQvCzpf"
        }
      }
    )

    const dados = await resposta.json()

    loading.classList.add("d-none")

    if(!dados || dados.length === 0){

      carrosDiv.innerHTML = `
        <div class="alert alert-warning">
          Nenhum carro encontrado.
        </div>
      `

      return
    }

    dados.slice(0,12).forEach(carro => {

      carrosDiv.innerHTML += `

        <div class="col-md-4">

          <div class="card bg-dark text-light shadow h-100">

            <img
              src="https://cdn.imagin.studio/getimage?customer=img&make=${carro.make}&modelFamily=${carro.model}"
              class="card-img-top marca-img"
            >

            <div class="card-body d-flex flex-column">

              <h3>${carro.make}</h3>

              <p class="info">
                ${carro.model}
              </p>

              <p>Ano: ${carro.year}</p>

              <p>Combustível: ${carro.fuel_type}</p>

              <p>Transmissão: ${carro.transmission}</p>

              <a
                href="detalhes.html?marca=${carro.make}&modelo=${carro.model}"
                class="btn btn-warning mt-auto"
              >
                Ver detalhes
              </a>

            </div>

          </div>

        </div>

      `
    })

  }catch(error){

    console.log(error)

    loading.classList.add("d-none")

    erro.classList.remove("d-none")
  }
}

function fecharCarros(){

  areaCarros.classList.add("d-none")

  carrosDiv.innerHTML = ""
}

pesquisa.addEventListener("keydown", (e) => {

  if(e.key === "Enter"){

    const marca = pesquisa.value.toLowerCase()

    resultadoMarcas.innerHTML = `

      <div class="col-md-4">

        <div class="card bg-dark text-light shadow h-100">

          <div class="card-body text-center d-flex flex-column">

            <h3 class="text-capitalize mb-4">
              ${marca}
            </h3>

            <button
              class="btn btn-warning mt-auto"
              onclick="buscarCarros('${marca}')"
            >
              Ver carros
            </button>

          </div>

        </div>

      </div>

    `
  }
})

mostrarMarcas()