var socket = io.connect();

//update HTML to view new message
function addMessage(msg, pseudo) {
	$("#chatEntries").append('<div class="message"><p>' + pseudo + " : " + msg + '</p></div>');
}

//called when a message is sent
function sentMessage() {
	//check if valid message
	if ($('#messageInput').val() != "") {
		//emit message to other members of chat
		socket.emit('message', $('#messageInput').val());
		//add message to chat
		addMessage($('#messageInput').val(), "Me");
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
		$('#pseudoInput').hide();
		$('#pseudoSet').hide();
	}
}
socket.on('message', function(data) {
    addMessage(data['message'], data['pseudo']);
});

$(function() {
    $("#chatControls").hide();
    $("#pseudoSet").click(function() {setPseudo()});
    $("#submit").click(function() {sentMessage();});
});