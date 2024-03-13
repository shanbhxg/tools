let teamsData = [
    { id: 1, name: "Team A", tools: ["Tool 1", "Tool 2", "Tool 3"] },
    { id: 2, name: "Team B", tools: ["Tool 4", "Tool 5"] },
    { id: 3, name: "Team C", tools: ["Tool 6"] }
  ];
  
  function displayTeams() {
    let teamList = document.getElementById("team-list").getElementsByTagName("ul")[0];
    let teamRadioButtons = document.getElementById("team-radio-buttons");
    teamList.innerHTML = ""; 
    teamRadioButtons.innerHTML = ""; 
  
    teamsData.forEach(team => {
      let teamItem = document.createElement("li");
      teamItem.classList.add("team-item");
      teamItem.textContent = team.name;
      teamItem.onclick = () => handleTeamSelection(teamItem);
      teamList.appendChild(teamItem);
  
      // TEAM SELECTION
      let radioBtn = document.createElement("input");
      radioBtn.setAttribute("type", "radio");
      radioBtn.setAttribute("name", "team");
      radioBtn.setAttribute("value", team.name);
      radioBtn.id = "team-" + team.id;
      let label = document.createElement("label");
      label.setAttribute("for", "team-" + team.id);
      label.textContent = team.name;
      teamRadioButtons.appendChild(radioBtn);
      teamRadioButtons.appendChild(label);
    });
  }
  
  function displayTools(team) { // selected team display
    let toolsList = document.getElementById("tools-list");
    toolsList.innerHTML = ""; 
  
    team.tools.forEach(tool => {
      let toolItem = document.createElement("div");
      toolItem.classList.add("tool-item");
      toolItem.textContent = tool;
      toolsList.appendChild(toolItem);
    });
  }
  
  function addNewTool() {
    let selectedTeamName = document.querySelector('input[name="team"]:checked');
    if (!selectedTeamName) {
      alert("Please select a team first.");
      return;
    }
  
    selectedTeamName = selectedTeamName.value;
    let newToolInput = document.getElementById("new-tool-input");
    let newToolName = newToolInput.value.trim();
  
    if (newToolName === "") { // validation
      alert("Please enter a tool name.");
      return;
    }
  
    let selectedTeam = teamsData.find(team => team.name === selectedTeamName);
    selectedTeam.tools.push(newToolName);
    displayTools(selectedTeam);
    newToolInput.value = "";
  }
  
  function handleTeamSelection(teamItem) {
    let allTeamItems = document.querySelectorAll(".team-item");
    allTeamItems.forEach(item => item.classList.remove("selected"));
    teamItem.classList.add("selected");
  
    let selectedTeamName = teamItem.textContent;
    let selectedTeam = teamsData.find(team => team.name === selectedTeamName);
    displayTools(selectedTeam);
  }
  
  displayTeams();
  document.getElementById("addToolBtn").addEventListener("click", addNewTool);
  