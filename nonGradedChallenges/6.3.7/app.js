document.addEventListener('DOMContentLoaded', function() {
  function changeBackground(x, y) {
    blueColor = Math.floor(x*255/window.innerWidth);
    redColor = Math.floor(y*255/window.innerHeight);
    const color = `rgb(${redColor}, 0, ${blueColor})`;
    document.body.style.backgroundColor = color;
  }
  let evt = document.addEventListener("pointermove", function(event) {
    changeBackground(event.x, event.y)
  });
})