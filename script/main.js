let urlAll = 'http://localhost/rest-api/entry.php/';

let mainContainer = document.getElementById("main");

/** Fetch all users and display them */
function fetchAll(){
clearAll();
fetch(urlAll)
.then(function(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  // Read the response as json.
  return response.json();
})
.then(function(responseAsJson) {
  // Do stuff with the JSON

  let divContainer = document.createElement("div");
  divContainer.classList.add("maingrid");
  
  let grid1 = document.createElement("div");
  let grid2 = document.createElement("div");
  let grid3 = document.createElement("div");
  let grid4 = document.createElement("div");

  for (data in responseAsJson){
    let list = document.createElement("li");
    list.classList.add("griditem");
    list.append("ID: " + responseAsJson[data].id + " ");
    grid1.append(list);
  }

  for (data in responseAsJson){
    let list = document.createElement("li");
    list.classList.add("griditem");
    list.append("Username: " +responseAsJson[data].username + " ");
    grid2.append(list);
  }

  for (data in responseAsJson){
    let list = document.createElement("li");
    list.classList.add("griditem");
    list.append("Email: " +responseAsJson[data].email+ " ");
    grid3.append(list);
  }  

  for (data in responseAsJson){
    let list = document.createElement("li");
    list.classList.add("griditem");
    list.append("Password: " +responseAsJson[data].passwrd + " ");
    grid4.append(list);
  }

  mainContainer.append(grid1);
  mainContainer.append(grid2);
  mainContainer.append(grid3);
  mainContainer.append(grid4);
  
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});
}

/** Fetch a single user with ID and display it */
function fetchSingleUser(){
  clearAll();
  let dataID = "";
  dataID = document.getElementById("idfield").value;
  let urlSingle = 'http://localhost/rest-api/entry.php/?ID='+dataID;
  if (!dataID == ""){
   
  
  fetch(urlSingle)
  .then (function(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    // Read the response as json.
    return response.json();
  })
  .then(function(responseAsJson) {
    // Do stuff with the JSON
    let divContainer = document.createElement("div");
    divContainer.classList.add("maingrid");
    
    let grid1 = document.createElement("div");
    let grid2 = document.createElement("div");
    let grid3 = document.createElement("div");
    let grid4 = document.createElement("div");
  
    for (data in responseAsJson){
      let list = document.createElement("li");
      list.classList.add("griditem");
      list.append("ID: " + responseAsJson[data].id + " ");
      grid1.append(list);
    }
  
    for (data in responseAsJson){
      let list = document.createElement("li");
      list.classList.add("griditem");
      list.append("Username: " +responseAsJson[data].username + " ");
      grid2.append(list);
    }
  
    for (data in responseAsJson){
      let list = document.createElement("li");
      list.classList.add("griditem");
      list.append("Email: " +responseAsJson[data].email+ " ");
      grid3.append(list);
    }  
  
    for (data in responseAsJson){
      let list = document.createElement("li");
      list.classList.add("griditem");
      list.append("Password: " +responseAsJson[data].passwrd + " ");
      grid4.append(list);
    }
  
    mainContainer.append(grid1);
    mainContainer.append(grid2);
    mainContainer.append(grid3);
    mainContainer.append(grid4);
    
  
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});
  }
  else{
    let divContainer = document.createElement("div");
    divContainer.innerHTML = '<h2>You need to enter a valid id</h2>';
    mainContainer.append(divContainer);
  }
}

/** Update a user with a certain id */
function updateUser(confirm){
  clearAll(); 
  let check = checkInputs();
  if (check == ""){
  if (confirm){

  //fetchSingleUser();

  dataID = document.getElementById("id").value;

  const data = JSON.stringify ({
    "userid": dataID,
    "username": document.getElementById("username").value,
    "useremail": document.getElementById("email").value,
    "userpassword": document.getElementById("password").value
   })
   
   let urlSingle = 'http://localhost/rest-api/entry.php/?ID='+dataID;


fetch(urlSingle, {
  method: 'PUT',
  body: 
    data
}) .then (function(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
 
  let confirmBox = document.createElement("div");
    confirmBox.innerHTML = '<h2>User has been updated</h2>'
    mainContainer.append(confirmBox); 
  // Read the response as json.
})}
  else{
    let confirmBox = document.createElement("div");
    confirmBox.innerHTML = '<h2>Are you sure you want to update user?</h2><br><input type="button" value="Update" onclick="confirmUpdate()"><input type="button" value="Cancel" onclick="deny()">'
    mainContainer.append(confirmBox); 
  }
  }
  else{
    let confirmBox = document.createElement("h2");
    confirmBox.innerHTML = check;
    mainContainer.append(confirmBox);
  }
}

let confirmed = false;

/** Delete a user with a certain id */
function deleteUser(confirm){
  console.log(confirm);

  if (confirm){
    clearAll();
    dataID = document.getElementById("idfield").value;
    let urlSingle = 'http://localhost/rest-api/entry.php/?ID='+dataID;
    confirmBox = document.createElement("div");
    confirmBox.innerHTML = " User has been deleted.";
    mainContainer.append(confirmBox);
  
  fetch(urlSingle, {
    method: 'DELETE'
  })
  .then (function(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    // Read the response as json.
  })
  }
  else{
    let confirmBox = document.createElement("div");
    confirmBox.innerHTML = '<h2>Are you sure you want to delete user?</h2><br><input type="button" value="Delete" onclick="confirmDelete()"><input type="button" value="Cancel" onclick="deny()">'
    mainContainer.append(confirmBox);
    
  }
}

/** Confirm delete function and Set boolean confirm to true */
function confirmDelete(){
  confirmed = true;
  deleteUser(confirmed);
}
/** Confirm update function and Set boolean confirm to true */
function confirmUpdate(){
  confirmed = true;
  updateUser(confirmed);
  clearForm();
}

/** Set boolean confirm to false */
function deny(){
  confirmed = false;
  clearAll();
}

/** Create a new user with name, email and password */
function createUser(){
  clearAll();

  //dataID = document.getElementById("id").value;
  let check = checkInputs();
  if (check == ""){
  const data = JSON.stringify ({

    "username": document.getElementById("username").value,
    "useremail": document.getElementById("email").value,
    "userpassword": document.getElementById("password").value
   })
   
   let url = 'http://localhost/rest-api/entry.php/';

fetch(url, {
  method: 'POST',
  body: 
    data
})

confirmBox = document.createElement("div");
confirmBox.innerHTML = '<h2>User has been added</h2>'
mainContainer.append(confirmBox);
clearForm();
}
else {
  confirmBox = document.createElement("h2");
confirmBox.innerHTML = check;
mainContainer.append(confirmBox);
}
}

/** Clear all data from the view */
function clearAll(){
  mainContainer.innerHTML = " ";
  //clearForm();
}

function toggleMenu(classname){
  console.log(classname);
  elem = document.getElementsByClassName(classname);
  for (el of elem){
  console.log(el);
  el.classList.toggle("hidden");
  }
}


function clearForm(){
  inputs = document.getElementsByClassName("input");
  for (i of inputs){
  i.value = "";
  }
}

function checkInputs(){
  let inputs = document.getElementsByClassName("input");
  for (let i of inputs){
  if (i.value == ""){
    let msg = "Error! You need to fill in all fields";
    return msg;
  }
  else{
    let msg = "";
    return msg;
  }
  }
}