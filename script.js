const playerHamburgerBtn = document.getElementById("playerHamburgerBtn");
const playerSearchBtnAction = document.getElementById("playerSearchBtnAction");
const playerSearchBtn = document.getElementById("playerSearchBtn");
const centerAlbumImage = document.getElementById("centerAlbumImage");
const SONG_NAME_DATA = document.getElementById("songNameData");
const SONG_ARTIST_DATA = document.getElementById("songArtistData");
const SONG_START_DATA = document.getElementById("songStartData");
const songEndData = document.getElementById("songEndData");
const SONG_PROGRESS_BAR = document.getElementById("songProgressBar");
const playerShuffleBtn = document.getElementById("playerShuffleBtn");
const playerReverseBtn = document.getElementById("playerReverseBtn");
const playerPlayBtn = document.getElementById("playerPlayBtn");
const playerPauseBtn = document.getElementById("playerPauseBtn");
const playerFowardeBtn = document.getElementById("playerFowardBtn");
const playerRepeatBtn = document.getElementById("playerRepeatBtn");
const MUSIC_PLAYER = document.getElementById("musicPlayer");

const AUDIO_QUEUE = document.getElementById("queueContainer");

let isPlaying = false;
let isRepeat = false;
let isQueueVisible = false;
let isSelected = false;

const audio = document.createElement("audio");

playerRepeatBtn.addEventListener("click", () => {
  isRepeat ? (isRepeat = false) : (isRepeat = true);
  console.log(isRepeat);
});

function fancyTimeFormat(duration) {
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  return ret;
}

function playSong(audio) {
  playerPlayBtn.addEventListener("click", () => {
    audio.play();
    isPlaying = true;
    playerPlayBtn.style.display = "none";
    playerPauseBtn.style.display = "flex";
  });
}
function pauseSong(audio) {
  playerPauseBtn.addEventListener("click", () => {
    audio.pause();
    isPlaying = false;
    playerPlayBtn.style.display = "flex";
    playerPauseBtn.style.display = "none";
  });
}
function songReset(i) {
  SONG_PROGRESS_BAR.value = 0;
  audio.currentTime = 0;
  isSelected = false;
  isPlaying = false;
  audio.currentTime = 0;
  playerPlayBtn.style.display = "flex";
  playerPauseBtn.style.display = "none";
}
function selectedSong(i) {
  const SELECTED_SONG_ID = document.getElementById(`songContainer${[i]}`);
  isSelected
    ? ((isSelected = false), (SELECTED_SONG_ID.style.backgroundColor = "none"))
    : ((isSelected = true),
      (SELECTED_SONG_ID.style.backgroundColor = "#9198e564"));
}
function onSongEnd(audio) {
  audio.addEventListener("ended", () => {
    isPlaying = false;
    audio.currentTime = 0;
    playerPlayBtn.style.display = "flex";
    playerPauseBtn.style.display = "none";
  });
}

function loop() {
  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    playSong(audio);
  });
}

// ------------- PLAYLIST ----------- //

playerHamburgerBtn.addEventListener("click", () => {
  isQueueVisible
    ? ((centerAlbumImage.style.display = "flex"),
      (AUDIO_QUEUE.style.display = "none"),
      (isQueueVisible = false))
    : ((centerAlbumImage.style.display = "none"),
      (AUDIO_QUEUE.style.display = "flex"),
      (isQueueVisible = true));
});

//PLAYLIST//
const playlistSongHtml = (i) => {
  const songElement = document.createElement("div");
  const songElementHtml = `<div class="song-container" id='songContainer${[i]}'>
            <div class="song-left-container">
              <img src="./assets/images/flamingosis-cover-image.jpg" alt="Album cover image">
            </div>

            <div class="song-right-container">
              <div class="song-title-data">${
                playerSearchBtnAction.files[i].name
              }</div>
              <div class="song-artist-data"></div>
            </div>
          </div>`;
  songElement.innerHTML = songElementHtml;
  AUDIO_QUEUE.appendChild(songElement);

  songElement.addEventListener("click", () => {
    const URL_OBJ_SELECTED_SONG = URL.createObjectURL(
      playerSearchBtnAction.files[i]
    );
    audio.src = URL_OBJ_SELECTED_SONG;
    SONG_NAME_DATA.textContent = playerSearchBtnAction.files[i].name;
    songReset(i);
    playSong(audio);
  });
};

playerSearchBtnAction.addEventListener("change", () => {
  const urlObj = URL.createObjectURL(playerSearchBtnAction.files[0]);
  audio.src = urlObj;

  audio.addEventListener("load", () => {
    URL.revokeObjectURL(urlObj);
  });
  SONG_NAME_DATA.textContent = playerSearchBtnAction.files[0].name;
  const currentFiles = playerSearchBtnAction.files;
  AUDIO_QUEUE.innerHTML = "";

  for (let i = 0; i < currentFiles.length + 1; i++) {
    if (i < currentFiles.length) {
      playlistSongHtml(i);
    }
  }

  playSong(audio);
  pauseSong(audio);
  onSongEnd(audio);

  audio.addEventListener("canplay", () => {
    SONG_START_DATA.textContent = "0:00";

    playerRepeatBtn.addEventListener("click", () => {
      isRepeat ? (audio.loop = true) : (audio.loop = false);
    });

    SONG_PROGRESS_BAR.addEventListener("change", () => {
      audio.currentTime = (SONG_PROGRESS_BAR.value * audio.duration) / 100;
    });

    audio.addEventListener("timeupdate", () => {
      SONG_START_DATA.textContent = fancyTimeFormat(audio.currentTime);
      SONG_PROGRESS_BAR.value = (audio.currentTime * 100) / audio.duration;
    });

    songEndData.textContent = fancyTimeFormat(audio.duration);
    SONG_PROGRESS_BAR.max = fancyTimeFormat(audio.duration);
  });
});
