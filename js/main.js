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



