let container = document.getElementById("container");

let counter = 1;
async function getData() {
  let d = await fetch(
    `https://api.imgur.com/3/gallery/hot/viral/${counter}/month?showViral=true&mature=true&album_previews=true`,
    {
      method: "GET",
      headers: { Authorization: "Client-ID 1fd2c328438be83" },
    }
  );
  let { data } = await d.json();
  appendData(data);
  counter++;
}

getData();

function appendData(d) {
  d.forEach((data) => {
    // console.log(data);
    if (
      data?.images?.[0]?.link &&
      (data?.images?.[0].type == "image/jpeg" ||
        data?.images?.[0].type == "image/gif" ||
        data?.images?.[0].type == "image/png")
    ) {
      let datadiv = document.createElement("div");
      datadiv.addEventListener("click", function () {
        openOneImg(data);
      });
      datadiv.setAttribute("class", "dataDiv");
      let img = document.createElement("img");
      img.src = data?.images?.[0].link;
      let name = document.createElement("p");
      name.setAttribute("class", "imgTitle");
      name.innerText = data.title;
      let bottomDiv = document.createElement("div");
      bottomDiv.setAttribute("class", "bottomDiv");

      let vote = document.createElement("p");
      vote.innerHTML = `🡅 ${data.ups} 🡇`;

      let detailDiv = document.createElement("div");
      detailDiv.setAttribute("class", "detailDiv");

      let comment = document.createElement("p");
      comment.innerHTML = `<i class="far fa-comment-alt"></i> ${data.comment_count}`;

      let views = document.createElement("p");
      views.innerHTML = `<i class="far fa-eye"></i> ${Math.round(
        data.views / 1000
      )}K`;
      detailDiv.append(vote, comment, views);
      bottomDiv.append(name, detailDiv);
      datadiv.append(img, bottomDiv);
      container.append(datadiv);
    }
  });
}

async function openOneImg(d) {
  console.log(d);
  localStorage.setItem("data", JSON.stringify(d));
  window.location.assign("./HTML/singleImg.html")
}

async function searchData() {
  let text = document.getElementById("searchBar").value;
  if (text.length >= 3) {
    let d = await fetch(`https://api.imgur.com/3/gallery/t/${text}/top/all`, {
      method: "GET",
      headers: { Authorization: "Client-ID 1fd2c328438be83" },
    });
    let { data } = await d.json();

    container.innerHTML = null;
    // console.log(data);
    appendSearchData(data);
  }
}

function appendSearchData(d) {
  if (d.items) {
    d?.items?.forEach((data) => {
      // console.log(data);
      if (
        data?.images?.[0].link &&
        (data?.images?.[0].type == "image/jpeg" ||
          data?.images?.[0].type == "image/gif" ||
          data?.images?.[0].type == "image/png")
      ) {
        let datadiv = document.createElement("div");
        datadiv.setAttribute("class", "dataDiv");
        datadiv.addEventListener("click", function () {
          openOneImg(data);
        });

        let img = document.createElement("img");
        img.src = data?.images?.[0].link;
        let name = document.createElement("p");
        name.setAttribute("class", "imgTitle");
        name.innerText = data.title;
        let bottomDiv = document.createElement("div");
        bottomDiv.setAttribute("class", "bottomDiv");

        let vote = document.createElement("p");
        vote.innerHTML = `🡅 ${data.ups} 🡇`;

        let detailDiv = document.createElement("div");
        detailDiv.setAttribute("class", "detailDiv");

        let comment = document.createElement("p");
        comment.innerHTML = `<i class="far fa-comment-alt"></i> ${data.comment_count}`;

        let views = document.createElement("p");
        views.innerHTML = `<i class="far fa-eye"></i> ${Math.round(
          data.views / 1000
        )}K`;
        detailDiv.append(vote, comment, views);
        bottomDiv.append(name, detailDiv);
        datadiv.append(img, bottomDiv);
        container.append(datadiv);
      }
    });
  } else {
    let body = document.getElementById("body");
    let img = document.createElement("img");
    img.setAttribute("class", "noDataImg");
    img.src =
      "https://cdn.dribbble.com/users/379146/screenshots/6676501/infinity_2.gif";
    body.append(img);
  }
}

var timerId;

function debounce(func, delay) {
  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(function () {
    func();
  }, delay);
}

function goToHome() {
  window.location.assign("./index.html");
}

function goToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

let goToTopBtn = document.getElementById("goToTopBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTopBtn.style.display = "block";
  } else {
    goToTopBtn.style.display = "none";
  }
}

//----------Infinite scroll

window.addEventListener("scroll", () => {
  console.log("scrolled", window.scrollY); //scrolled from top
  console.log(window.innerHeight); //visible part of screen
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    getData();
  }
});