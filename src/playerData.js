import localforage from "localforage";

let initData = [
  {
    id: "10",
    name: "Lionel Messi",
    age: "35",
    img: "messi.jpg",
    team: "PSG",
    leagues: "Ligue 1",
    nationality: "Argentina",
    desc: "Messi has endorsed sportswear company Adidas since 2006. According to France Football, he was the world's highest-paid footballer for five years out of six between 2009 and 2014. ",
  },
  {
    id: "7",
    name: "Critiano Ronaldo",
    age: "37",
    img: "ronaldo.jpg",
    team: "Al-Nassr",
    leagues: "Saudi Pro League",
    nationality: "Portugal",
    desc: "Cristiano Ronaldo dos Santos Aveiro GOIH ComM (Portuguese pronunciation: [kɾiʃˈtjɐnu ʁɔˈnaɫdu]; born 5 February 1985) is a Portuguese professional footballer who plays as a forward for and captains both Saudi Professional League club Al Nassr and the Portugal national team ",
  },

  {
    id: "11",
    name: "Neymar Jr",
    age: "32",
    img: "neymar.jpg",
    team: "PSG",
    leagues: "Ligue 1",
    nationality: "Brazil",
    desc: "Neymar da Silva Santos Júnior (born 5 February 1992), known as Neymar, is a Brazilian professional footballer who plays as a forward for Ligue 1 club Paris Saint-Germain and the Brazil national team.",
  },
  {
    id: "9",
    name: "Erling Haaland",
    age: "22",
    img: "haaland.jpg",
    team: "Manchester City",
    leagues: "Premier League",
    nationality: "Norway",
    desc: "Haaland has won several individual awards and broken various records during his career. During the 2019–20 season with Salzburg",
  },
  {
    id: "1",
    name: "Alison Becker",
    age: "26",
    img: "alison.jpg",
    team: "Liverpool",
    leagues: "Premier League",
    nationality: "Brazil",
    desc: "Becker joined Internacional's academy in 2002, progressing through the youth set up before making his senior debut in 2013",
  },
  {
    id: "17",
    name: "kevin de bruyne",
    age: "31",
    img: "kevin d.jpg",
    team: "Manchester City",
    leagues: "Premier League",
    nationality: "Brazil",
    desc: "De Bruyne began his career at Genk, where he was a regular player when they won the 2010–11 Belgian Pro League.",
  },

  {
    id: "29",
    name: "Kylian Mbappé",
    age: "31",
    img: "mbappe.jpg",
    team: "Paris Saint-Germain",
    leagues: "Ligue 1",
    nationality: "France",
    desc: "Mbappé was named to the FIFA FIFPro World11 in 2018, 2019 and 2022, the UEFA Team of the Year in 2018.",
  },
  {
    id: "4",
    name: "Virgil van Dijk",
    age: "31",
    img: "vandijk.jpg",
    team: "Liverpool",
    leagues: "Premier League",
    nationality: "Netherlands",
    desc: "Van Dijk represented the Netherlands at under-19 and under-21 levels. He made his senior international debut for the Netherlands in 2015 and assumed full captaincy of the national team in March 2018. ",
  },
  {
    id: "20",
    name: "Mohamed Salah",
    age: "31",
    img: "salah.jpg",
    team: "Liverpool",
    leagues: "Premier League",
    nationality: "Egypt",
    desc: "Salah started his senior career in 2010 playing for Al Mokawloon, departing in 2012 to join Basel, where he won two Swiss Super League titles. ",
  },
  {
    id: "27",
    name: "Sadio Mane",
    age: "31",
    img: "mane.jpg",
    team: "Bayern Munich",
    leagues: "Bundesliga",
    nationality: "Senegal",
    desc: "Mané signed for fellow Premier League club Liverpool in 2016, for a reported fee of £34 million. He helped the side reach back-to-back UEFA Champions League Finals in 2018 and 2019. ",
  },
  {
    id: "66",
    name: "Trent Alexander-Arnold",
    age: "25",
    img: "trent.jpg",
    team: "Liverpool",
    leagues: "Premier League",
    nationality: "English",
    desc: "Alexander-Arnold joined Liverpool's academy in 2004 and captained the club across its youth levels. He made his senior debut in 2016. ",
  },
];

export async function getPlayers(query) {
  await fakeNetwork(`getProducts:${query}`);
  let players = await localforage.getItem("players");
  if (!players) {
    players = await genInitPlayers();
  }
  if (query) {
    players = players.filter(
      (e) => e.name && e.name.toLowerCase().indexOf(query) !== -1
    );
  }
  return players;
}

export async function createProduct(newPlayers) {
  await fakeNetwork();
  let players = await getPlayers();
  if (!players) players = [];
  if (
    !newPlayers ||
    (newPlayers.id && players.findIndex((e) => e.id === newPlayers.id) !== -1)
  ) {
    throw new Error("Error in inserting new product " + newPlayers);
  }
  if (!newPlayers.id) {
    let id = genId();
    newPlayers = { id, ...newPlayers };
  }
  players.unshift(newPlayers);
  await set(players);
  return newPlayers;
}

export const genId = () => Math.random().toString(36).substring(2, 9);

export async function getPlayer(id) {
  await fakeNetwork(`player:${id}`);
  let players = await localforage.getItem("players");
  let player = players.find((player) => player.id === id);
  return player ?? null;
}

export async function updatePlayer(id, updates) {
  await fakeNetwork();
  console.log(id);
  let players = await localforage.getItem("players");
  let player = players.find((player) => player.id === id);
  if (!player) throw new Error("No product found for", id);
  Object.assign(player, updates); // Object assign update and merge new data to old one
  await set(players);
  return player;
}

export async function deletePlayer(id) {
  let players = await localforage.getItem("players");
  let index = players.findIndex((player) => player.id === id);
  if (index > -1) {
    players.splice(index, 1);
    await set(players);
    return true;
  }
  return false;
}

async function genInitPlayers() {
  await set(initData);
  return initData;
}

function set(players) {
  return localforage.setItem("players", players);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
