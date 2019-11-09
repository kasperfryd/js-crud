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

  let divContainer = document.createElement("ol");
  
  for (data in responseAsJson){
    let list = document.createElement("li");
    list.append("ID: " + responseAsJson[data].id + " - ");
    list.append("Username: " +responseAsJson[data].username + " - ");
    list.append("Email: " +responseAsJson[data].email + " - ");
    list.append("Password: " +responseAsJson[data].passwrd + " - ");
    divContainer.append(list);
  }
  mainContainer.append(divContainer);
  
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});
}

/** Fetch a single user with ID and display it */
function fetchSingleUser(){
  clearAll();
  //mainContainer = "";
  let dataID = 0;
  dataID = document.getElementById("idfield").value;
  console.log(dataID);
  let urlSingle = 'http://localhost/rest-api/entry.php/?ID='+dataID;
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
    let divContainer = document.createElement("ol");
  
    console.log(responseAsJson);
    for (data in responseAsJson){
      let list = document.createElement("li");
      list.append("ID: " + responseAsJson[data].id + " - ");
      list.append("Username: " + responseAsJson[data].username + " - ");
      list.append("Email: " + responseAsJson[data].email + " - ");
      list.append("Password: " + responseAsJson[data].passwrd + " - ");
      divContainer.append(list);
    }
    mainContainer.append(divContainer);
  
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});
}

/** Update a user with a certain id */
function updateUser(confirm){
 
  if (confirm){
  clearAll();
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
}

/** Set boolean confirm to false */
function deny(){
  confirmed = false;
  deleteBox.innerHTML = " "
}

/** Create a new user with name, email and password */
function createUser(){
  clearAll();

  dataID = document.getElementById("id").value;
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

}

/** Clear all data from the view */
function clearAll(){
  mainContainer.innerHTML = " ";
}
