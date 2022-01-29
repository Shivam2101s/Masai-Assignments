let container = document.getElementById("container")

function appendData() {
  let data = JSON.parse(localStorage.getItem("data"));
  console.log("Single Img Data", data);

  let title = document.createElement("p");
  title.setAttribute("class", "newTitle");
  title.innerHTML = data.title;

  let userDetail = document.createElement("div");
  userDetail.setAttribute("class", "userDetail");
 

  let div1 = document.createElement("div");
  div1.setAttribute("class","userIcon")
  div1.innerHTML = data.account_url[0];

  let div2 = document.createElement("div");
  div2.setAttribute("class", "div2");
  
  let username = document.createElement("p");
  username.setAttribute("class","username");
  username.innerHTML = data.account_url;

  let view = document.createElement("p");
  view.setAttribute("class", "views")
  view.innerHTML = `${data.views} Views`;

  div2.append(username, view);


  let div3 = document.createElement("div");
  div3.setAttribute("class", "div3");
  
  let img = document.createElement("img");
  img.setAttribute("class","singleImg")
  img.src = data?.images?.[0].link

  div3.append(img);

  let des = document.createElement("p");
  des.setAttribute("class", "des");
  des.innerHTML = data?.images?.[0].description;
  
  userDetail.append(div1, div2);

  container.append(title, userDetail,div3,des);
}
appendData();

function goToHome() {
    window.location.assign("../index.html");
}