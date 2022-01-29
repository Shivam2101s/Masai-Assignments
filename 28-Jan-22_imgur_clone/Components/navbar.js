function navbar() {
    return `
    <div id="navbar">
    <img id="logo" onclick="goToHome()" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Imgur_Logo_Light.svg/1280px-Imgur_Logo_Light.svg.png" alt="">
     <button id="newPostbtn">
       <i class="fas fa-plus-square"></i>New post
     </button>
     <div id="searchDiv">
       <input
         id="searchBar"
         oninput="debounce(searchData,2000)"
         placeholder="Images, #tags, @users oh my!"
         type="text"
       />
       <i id="searchIcon" class="fas fa-search"></i>
     </div>
     <svg
       width="40"
       height="40"
       viewBox="0 -2 34 34"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
     >
       <title>Comment Leaderboard</title>
       <g fill="none" fill-rule="evenodd">
         <path d="M0 0h32v32H0z"></path>
         <g transform="translate(6.5 3)" stroke="#ffffff" stroke-width="2">
           <path
             d="M4 16.977v7.076l5.5-2.481 5.5 2.481v-7.076l-5.5 1.245L4 16.977z"
           ></path>
           <circle cx="9.5" cy="9.5" r="8.5"></circle>
         </g>
       </g>
     </svg>

     <button id="addFreeBtn">Go Ad-Free</button>
     <a href="#" id="signInLink">Sign in</a>
     <button id="signUpBtn">Sign up</button>
   </div>`
}
export {navbar};