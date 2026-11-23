const form = document.getElementById("searchForm");
const input = document.getElementById("pokemonInput");
const message = document.getElementById("message");
const card = document.getElementById("pokemonCard");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  searchPokemon();
});

async function searchPokemon() {
  const name = input.value.trim().toLowerCase();

  if (name === "") {
    message.textContent = "Please enter a Pokémon name or number.";
    return;
  }

  card.hidden = true;
  message.textContent = "Loading Pokémon...";

  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + encodeURIComponent(name));

    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const data = await response.json();

    document.getElementById("pokemonNumber").textContent = "Pokédex #" + data.id;
    document.getElementById("pokemonName").textContent = data.name.replaceAll("-", " ");
    document.getElementById("pokemonTypes").textContent = "Type: " + data.types.map(function(item) {
      return item.type.name;
    }).join(" / ");

    document.getElementById("pokemonHeight").textContent = (data.height / 10) + " m";
    document.getElementById("pokemonWeight").textContent = (data.weight / 10) + " kg";
    document.getElementById("pokemonHP").textContent = data.stats[0].base_stat;
    document.getElementById("pokemonAttack").textContent = data.stats[1].base_stat;
    document.getElementById("pokemonDefense").textContent = data.stats[2].base_stat;

    const artwork = data.sprites.other["official-artwork"].front_default;
    const image = document.getElementById("pokemonImage");
    image.src = artwork || data.sprites.front_default || "";
    image.alt = data.name + " artwork";

    message.textContent = "";
    card.hidden = false;
  } catch (error) {
    message.textContent = "Couldn't find that Pokémon. Try another name or number.";
  }
}
