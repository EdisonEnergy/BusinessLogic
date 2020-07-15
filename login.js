var authUser = {};
var loginWrapper = $("#loginWrapper");
var profileWrapper = $("#profileWrapper");
var clientWrapper = $("#clientWrapper");

async function login() {
  await firebase
    .auth()
    .signInWithEmailAndPassword($("#username").val(), $("#password").val())
    .catch(function(error) {
      alert(error.message);
    });
}

async function logout() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      authUser = {};
      resetProfile();
      profileWrapper.hide();
      clientWrapper.hide();
      loginWrapper.show();

      alert("Signed out Successfully");
    })
    .catch(function(error) {});
}

async function updateProfile() {
  var _usr = {};
  _usr.name = $("#pName").val();
  _usr.surname = $("#pSurname").val();
  _usr.email = $("#pEmail").val();
  _usr.contactNumber = $("#pContact").val();
  _usr.description = $("#pDescription").trumbowyg("html");

  const dbRef = firebase.database().ref();
  const userRef = dbRef.child("users/" + authUser.uid);
  await userRef
    .update(_usr)
    .then(() => {
      alert("Profile updated");
    })
    .catch(error => {
      console.log(error.message);
    });
}

async function createClient() {
  var clt = {};
  clt.id = $("#cName_C")
    .val()
    .split(" ")
    .join("");
  clt.name = $("#cName_C").val();
  clt.industry = $("#cIndustry_C").val();
  clt.email = $("#cEmail_C").val();
  clt.website = $("#cWebsite_C").val();
  clt.description = $("#cDescription_C").trumbowyg("html");

  firebase
    .database()
    .ref("clients/" + authUser.uid + "/" + clt.id)
    .set(clt)
    .then(x => {
      alert("Client Created");
      resetCreateClientUI();
      loadClients();
    })
    .catch(error => {});
}

async function loadClients() {
  const dbRef = firebase.database().ref();
  const cltRef = dbRef.child("clients/" + authUser.uid);
  $("#cListingName").empty();
  $("#cListingIndustry").empty();
  $("#cListingEmail").empty();
  cltRef.on("child_added", snap => {
    let clt = snap.val();
    $("#cListingName").append(
      "<div><a href='#' id='" + clt.id + "'>" + clt.name + "</a></div>"
    );
    $("#" + clt.id).click(function() {
      maintainClient(clt.id);
    });

    $("#cListingIndustry").append("<div>" + clt.industry + "</div>");
    $("#cListingEmail").append("<div>" + clt.email + "</div>");
  });
}

var currentClient = {};
async function maintainClient(cid) {
  resetMaintainClientUI();
  currentClient = {};

  const dbRef = firebase.database().ref();
  const cltRef = dbRef.child("clients/" + authUser.uid + "/" + cid);

  cltRef.on("value", snap => {
    let clt = snap.val();
    currentClient = clt;
    $("#cName_M").val(clt.name);
    $("#cIndustry_M").val(clt.industry);
    $("#cEmail_M").val(clt.email);
    $("#cWebsite_M").val(clt.website);
    $("#cDescription_M").trumbowyg("html", clt.description);
  });
}

async function updateClient() {
  currentClient.name = $("#cName_M").val();
  currentClient.industry = $("#cIndustry_M").val();
  currentClient.email = $("#cEmail_M").val();
  currentClient.website = $("#cWebsite_M").val();
  currentClient.description = $("#cDescription_M").trumbowyg("html");

  firebase
    .database()
    .ref("clients/" + authUser.uid + "/" + currentClient.id)
    .set(currentClient)
    .then(x => {
      alert("Client updated");
      loadClients();
      resetMaintainClientUI();
    })
    .catch(error => {
      console.log(error.message);
    });
}

function resetMaintainClientUI() {
  $("#cName_M").val("");
  $("#cIndustry_M").val("");
  $("#cEmail_M").val("");
  $("#cWebsite_M").val("");
  $("#cDescription_M").trumbowyg("empty");
}

function resetCreateClientUI() {
  $("#cName_C").val("");
  $("#cIndustry_C").val("");
  $("#cEmail_C").val("");
  $("#cWebsite_C").val("");
  $("#cDescription_C").trumbowyg("empty");
}

function resetProfile() {
  $("#pName").val("");
  $("#pSurname").val("");
  $("#pEmail").val("");
  $("#pContact").val("");
  $("#pDescription").trumbowyg("empty");
}

$(document).ready(function() {
  loginWrapper.show();
  profileWrapper.hide();
  clientWrapper.hide();

  $("#pDescription").trumbowyg();
  $("#cDescription_C").trumbowyg();
  $("#cDescription_M").trumbowyg();

  $("#login_button").click(function() {
    login();
    return false;
  });
  $("#logoutButton").click(function() {
    logout();
    return false;
  });
  $("#saveProfile").click(function() {
    updateProfile();
    return false;
  });
  $("#createClient").click(function() {
    createClient();
    return false;
  });
  $("#updateClient").click(function() {
    updateClient();
    return false;
  });

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      authUser = user;
      loginWrapper.hide();
      profileWrapper.show();
      clientWrapper.show();

      const dbRef = firebase.database().ref();
      const userRef = dbRef.child("users/" + user.uid);
      userRef.on("value", snap => {
        $("#pName").val(snap.val().name);
        $("#pSurname").val(snap.val().surname);
        $("#pEmail").val(snap.val().email);
        $("#pContact").val(snap.val().contactNumber);
        $("#pDescription").trumbowyg("html", snap.val().description);
      });
      loadClients();
    }
  });
});
