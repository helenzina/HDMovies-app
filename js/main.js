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

function showMenu(){
  document.getElementById("subMenu").classList.toggle("open-menu");
}

function showDropdown() {
  document.getElementById("dropMenu").classList.toggle("open-dropdown");

}

function hideDropdown() {
  document.getElementById("dropMenu").classList.remove("open-dropdown");
}


