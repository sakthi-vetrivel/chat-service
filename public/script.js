var socket = io.connect();

//update HTML to view new message
function addMessage(msg, pseudo) {
	$("#chatEntries").append('<label class="psuedo">' + pseudo + " : " + '</label><p class="msg">' + msg + '</p>');
}

function newChatter(pseudo) {
	$("#chatEntries").append('<div><label class="new-user">' + pseudo + " has joined the chat!" + '</label></div>');
}

function dead(pseudo) {
	$("#chatEntries").append('<div class="message"><label class="user-left">' + pseudo + " has left the chat." + '</label></div>');	
}

//called when a message is sent
function sentMessage() {
	//check if valid message
	if ($('#messageInput').val() != "") {
		//emit message to other members of chat
		socket.emit('message', $('#messageInput').val());
		//add message to chat
		var name = socket.pseudo;
		addMessage($('#messageInput').val(), name + " (me)");
		//reset input of the box
		$('#messageInput').val('');
	}
}

//set pseudonym of given user
function setPseudo() {
	//check if valid pseudo
	if ($('#pseudoInput').val() != "") {
		//emit this psuedonym to other members
		socket.emit('setPseudo', $('#pseudoInput').val());
		//restructure chat room to only show message box and previous messages
		$('#chatControls').show();
		$('#label').hide();
		$('#pseudoInput').hide();
		$('#pseudoSet').hide();
	}
}
socket.on('message', function(data) {
    addMessage(data['message'], data['pseudo']);
});

socket.on('joined', function(data) {
	newChatter(data['pseudo']);
	console.log("New User!");
});

socket.on('left', function(data) {
	dead(data['pseudo']);
	console.log("user left!");
});

$(function() {
    $("#chatControls").hide();
    $("#pseudoSet").click(function() {setPseudo()});
    $("#submit").click(function() {sentMessage();});
});