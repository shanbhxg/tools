async function searchTools() {
  const searchValue = document.getElementById("search-bar").value;
  const teamsData = await fetchTeamsData();

  teamsData.forEach(team => {
    let softwareTools = team.softwareTools;
    softwareTools.forEach(tool => {
      let toolName = tool.name.toLowerCase();
      if (toolName.includes(searchValue)) {
        displayToolDetails(tool);
      }
    });
  });
}

// authentication
const nav = document.querySelector(".nav"),
  searchIcon = document.querySelector("#searchIcon"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");

searchIcon.addEventListener("click", () => {
  nav.classList.toggle("openSearch");
  nav.classList.remove("openNav");
  if (nav.classList.contains("openSearch")) {
    return searchIcon.classList.replace("uil-search", "uil-times");
  }
  searchIcon.classList.replace("uil-times", "uil-search");
});

navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
  nav.classList.remove("openSearch");
  searchIcon.classList.replace("uil-times", "uil-search");
});
navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
});


// teams display
async function fetchTeamsData() {
  try {
    const response = await fetch('teamsData.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching teams data:', error);
    return [];
  }
}

async function displayTeams() {
  const teamsData = await fetchTeamsData();

  let teamList = document.getElementById("team-list").getElementsByTagName("ul")[0];
  teamList.innerHTML = "";

  teamsData.forEach(team => {
    let teamItem = document.createElement("li");
    teamItem.classList.add("team-item");
    teamItem.textContent = team.name;
    teamItem.onclick = () => handleTeamSelection(team);
    teamList.appendChild(teamItem);
  });
}

function displayTools(team) {
  let softwareToolsList = document.createElement("ul");
  softwareToolsList.classList.add("software-tools-list");
  team.softwareTools.forEach(tool => {
    let toolItem = document.createElement("li");
    toolItem.classList.add("tool-item");
    toolItem.textContent = tool.name;
    toolItem.onclick = () => displayToolDetails(tool);
    softwareToolsList.appendChild(toolItem);
  });
  
  let teamList = document.getElementById("team-list").getElementsByTagName("ul")[0];
  let selectedTeamItem = teamList.querySelector('.selected');
  let nextSibling = selectedTeamItem.nextSibling;
  
  if (nextSibling && nextSibling.classList.contains('software-tools-list')) {
    selectedTeamItem.parentNode.removeChild(nextSibling);
  } else {
    teamList.insertBefore(softwareToolsList, selectedTeamItem.nextSibling);
  }
}

function displayToolDetails(tool) {
  let toolDetails = document.getElementById("tool-details");
  toolDetails.innerHTML = ""; // Clear previous content

  let toolFields = tool.fields;
  Object.keys(toolFields).forEach(fieldName => {
    let fieldItem = document.createElement("div");
    fieldItem.classList.add("field-item");
    if (toolFields[fieldName]) {
      fieldItem.innerHTML = `<strong>${fieldName}:</strong> ${toolFields[fieldName]}`;
    }
    toolDetails.appendChild(fieldItem);
  });
}

function handleTeamSelection(team) {
  let allTeamItems = document.querySelectorAll(".team-item");
  allTeamItems.forEach(item => item.classList.remove("selected"));
  let clickedTeamItem = event.target;
  clickedTeamItem.classList.add("selected");
  displayTools(team);
}

displayTeams();
