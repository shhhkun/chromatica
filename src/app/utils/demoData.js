const hexToRgb = (hex) => {
  // remove the '#'
  const strippedHex = hex.startsWith("#") ? hex.slice(1) : hex;

  // [arse the r, g, and b values
  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(4, 6), 16);

  // return as an array
  return [r, g, b];
};

export const demoPalettes = [
  {
    LightVibrant: "#c7c7b1", // bodies
    DarkVibrant: "#4d4d37",
  },
  {
    LightVibrant: "#91c3f4", // ocean blues
    DarkVibrant: "#055b98",
  },
  {
    LightVibrant: "#c7a1d7", // used to me
    DarkVibrant: "#1c2444",
  },
];

export const demoArtists = [
  {
    name: "Epik High",
    artistImageUrl: "/epikhigh.webp",
  },
  {
    name: "keshi",
    artistImageUrl: "/keshi.webp",
  },
  {
    name: "Sarah Kang",
    artistImageUrl: "/sarahkang.webp",
  },
  {
    name: "Joe Hisaishi",
    artistImageUrl: "/joe.webp",
  },
  {
    name: "Luke Chiang",
    artistImageUrl: "/lukechiang.webp",
  },
];

export const demoTracks = [
  {
    name: "Bodies", // 1
    albumArtUrl: "/bodies.webp",
    artist: "keshi",
    bgColor: { rgb: hexToRgb("#8c8474") },
  },
  {
    name: "ocean blues", // 2
    albumArtUrl: "/oceanblues.webp",
    artist: "demxntia",
    bgColor: { rgb: hexToRgb("#6e8ca0") },
  },
  {
    name: "Used To Me", // 3
    albumArtUrl: "/usedtome.webp",
    artist: "Luke Chiang",
    bgColor: { rgb: hexToRgb("#655d9c") },
  },
  {
    name: "Guilty", // 4
    albumArtUrl: "/guilty.webp",
    artist: "Dynamicduo",
    bgColor: { rgb: hexToRgb("#a07150") },
  },
  {
    name: "Never Tell", // 5
    albumArtUrl: "/nevertell.webp",
    artist: "Luke Chiang",
    bgColor: { rgb: hexToRgb("#6184a4") },
  },
  {
    name: "BRB", // 6
    albumArtUrl: "/brb.webp",
    artist: "Epik High",
    bgColor: { rgb: hexToRgb("#848474") },
  },
  {
    name: "From the Rain (Feat. Ahn Ye Eun)", // 7
    albumArtUrl: "/fromtherain.webp",
    artist: "Heize, Ahn Ye Eun",
    bgColor: { rgb: hexToRgb("#975355") },
  },
  {
    name: "One Summer Day", // 8
    albumArtUrl: "/onesummerday.webp",
    artist: "Joe Hisaishi",
    bgColor: { rgb: hexToRgb("#948067") },
  },
  {
    name: "in your arms", // 9
    albumArtUrl: "/inyourarms.webp",
    artist: "Saib",
    bgColor: { rgb: hexToRgb("#5e9570") },
  },
  {
    name: "HOME IS FAR AWAY", // 10
    albumArtUrl: "/homeisfaraway.webp",
    artist: "Epik High, OHHYUK",
    bgColor: { rgb: hexToRgb("#8c8c8c") },
  },
  {
    name: "11월1일 (feat. 김재석)", // 11
    albumArtUrl: "/nov1st.webp",
    artist: "Epik High, 김재석",
    bgColor: { rgb: hexToRgb("#9c7464") },
  },
  {
    name: "Some", // 12
    albumArtUrl: "/some.webp",
    artist: "BOL4",
    bgColor: { rgb: hexToRgb("#a48c64") },
  },
  {
    name: "ghosts", // 13
    albumArtUrl: "/ghosts.webp",
    artist: "Heiakim, Sachi Gomez",
    bgColor: { rgb: hexToRgb("#8f7268") },
  },
  {
    name: "MISSING U", // 14
    albumArtUrl: "/missingu.webp",
    artist: "LeeHi",
    bgColor: { rgb: hexToRgb("#a47c54") },
  },
  {
    name: "bittersweet", // 15
    albumArtUrl: "/bittersweet.webp",
    artist: "Sarah Kang, Luke Chiang",
    bgColor: { rgb: hexToRgb("#8c7455") },
  },
  {
    name: "light", // 16
    albumArtUrl: "/light.webp",
    artist: "wave to earth",
    bgColor: { rgb: hexToRgb("#7987aa") },
  },
  {
    name: "if it's not you", // 17
    albumArtUrl: "/ifitsnotyou.webp",
    artist: "PRYVT",
    bgColor: { rgb: hexToRgb("#747c84") },
  },
  {
    name: "Loving You From A Distance", // 18
    albumArtUrl: "/lovingyoufromadistance.webp",
    artist: "jomm, readyaimfire27",
    bgColor: { rgb: hexToRgb("#784d86") },
  },
  {
    name: "Reminiscence", // 19
    albumArtUrl: "/reminiscence.webp",
    artist: "Vanilla Mood",
    bgColor: { rgb: hexToRgb("#a99e57") },
  },
  {
    name: "Rain - Long Ver.", // 20
    albumArtUrl: "/rain.webp",
    artist: "Motohiro Hata",
    bgColor: { rgb: hexToRgb("#539f5a") },
  },
];
