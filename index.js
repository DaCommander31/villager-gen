const commandSchema = {
  base: "/summon villager",
  parts: [
    {
      "id": "type",
      "nbtPath": "VillagerData.type",
      "quote": false,
      "default": "plains"
    },
    {
      "id": "profession",
      "nbtPath": "VillagerData.profession",
      "quote": false,
      "default": "none"
    },
    {
      "id": "level",
      "nbtPath": "VillagerData.level",
      "quote": false,
      "default": 1
    },
    {
      "id": "no_ai",
      "nbtPath": "NoAI",
      "quote": false,
      "default": false,
    },
    {
      "id": "age",
      "nbtPath": "Age",
      "quote": false,
      "default": 0,
    }
  ]
};

function playClick() {
  const audio = new Audio();
  audio.src = "./sounds/click.mp3";
  audio.volume = 0.2;
  audio.play();
}

function nbtToString(obj) {
  if (typeof obj !== "object") return obj;
  const parts = Object.entries(obj).map(([key, value]) => `${key}:${nbtToString(value)}`);
  return `{${parts.join(",")}}`;
}

function buildNBT() {
  const nbt = {};
  commandSchema.parts.forEach(part => {
    const element = document.getElementById(part.id);
    if (!element) return;

    var value = element.value;
    if (value === "" || value == null) return;
    
    if (element.type === "checkbox") {
      value = element.checked;
    }

    if (value == part.default) return;

    const path = part.nbtPath.split(".");
    let current = nbt;

    for (let i = 0; i < path.length - 1; i++) {
      const segment = path[i];
      current[segment] = current[segment] || {};
      current = current[segment];
    }

    current[path[path.length - 1]] = part.quote ? `"${value}"` : value;
  });

  return nbt
}

function generateCommand() {
    const nbt = buildNBT();
  const nbtString = nbtToString(nbt);
  const coords = document.getElementById("coords").value || "~ ~ ~";
  return nbtString !== "{}" ? `${commandSchema.base} ${coords} ${nbtString}` : `${commandSchema.base} ${coords}`;
}

function generate() {
  const audio = new Audio();
  audio.src = "./sounds/press.mp3";
  audio.volume = 0.2;
  audio.play();

  var output = document.getElementById("output");

  output.style.visibility = 'visible';

  output.innerHTML = generateCommand();
}