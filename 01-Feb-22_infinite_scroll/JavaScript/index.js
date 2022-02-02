let container = document.getElementById("container");

// let displayContent = 25;
let counter = 1;

function LoadData(displayContent = 25) {
  let i = 0;

  while (i < displayContent) {
    let p = document.createElement("p");
    p.innerHTML = `Masai Student ${counter}`;
    counter++;
    container.append(p);
    // console.log(`its loop ${i + 1}`);
    i++;
  }
}

LoadData();

// to load more data from the list when we reach the bottom

window.addEventListener("scroll", () => {
  console.log("scrolled", window.scrollY); //scrolled from top
  console.log(window.innerHeight); //visible part of screen
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    LoadData();
  }
});