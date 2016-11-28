document.addEventListener('DOMContentLoaded', function(event) {
  if(!localStorage.accessToken){
    window.location.href = "/";
  }
}
