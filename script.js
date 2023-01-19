const playerHambuergerBtn = document.getElementById("playerHambuergerBtn");
const playerSearchBtnAction = document.getElementById("playerSearchBtnAction");
const playerSearchBtn = document.getElementById("playerSearchBtn");
const centerAlbumImage = document.getElementById("centerAlbumImage");
const songNameData = document.getElementById("songNameData");
const songEndData = document.getElementById("songEndData");
const playerShuffleBtn = document.getElementById("playerShuffleBtn");
const playerReverseBtn = document.getElementById("playerReverseBtn");
const playerFowardeBtn = document.getElementById("playerFowardBtn");
const playerRepeatBtn = document.getElementById("playerRepeatBtn");
const songAudio = document.getElementById("songAudio");

const playerPlayBtn = document
  .getElementById("playerPlayBtn")
  .addEventListener("click", playMusic);

playerSearchBtn.addEventListener("click", () => {
  playerSearchBtnAction.click();
});
