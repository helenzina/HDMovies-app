$('body').scrollspy({ target: ".navbar" })

/*show video*/
function playVid() {
  document.querySelector(".video-container").classList.add("show-video");
  document.getElementById("myvideo").play();
}

function pauseVid() {
  document.querySelector(".video-container").classList.remove("show-video");
  document.getElementById("myvideo").pause();
}

function toggleVideo() {
  const automatedVideo = document.querySelector('.home-video');
  const trailerVideo = document.getElementById('myvideo');
  const videoContainer = document.querySelector(".video-container");

  if (videoContainer.classList.contains("show-video")) {
    // If the trailer is currently playing, close it
    closeTrailer();
  } else {
    // If the trailer is not playing, play it
    // Pause the automated video
    automatedVideo.pause();
    automatedVideo.style.display = 'none';

    // Show the trailer video
    trailerVideo.style.display = 'block';
    trailerVideo.play();

    // Add the show-video class to the video container
    videoContainer.classList.add("show-video");
  }
}

function closeTrailer() {
  const automatedVideo = document.querySelector('.home-video');
  const trailerVideo = document.getElementById('myvideo');
  const videoContainer = document.querySelector(".video-container");

  // Pause the trailer video
  trailerVideo.pause();
  trailerVideo.style.display = 'none';

  // Show the automated video
  automatedVideo.style.display = 'block';
  automatedVideo.play();

  // Remove the show-video class from the video container
  videoContainer.classList.remove("show-video");
}

function showMenu() {
  document.getElementById("subMenu").classList.toggle("open-menu");
}

function showDropdown() {
  document.getElementById("dropMenu").classList.toggle("open-dropdown");

}

function hideDropdown() {
  document.getElementById("dropMenu").classList.remove("open-dropdown");
}


