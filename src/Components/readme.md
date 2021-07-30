socket.on("connect", () => {}); //for connection
console.log("socket: ", socket); // gives socketid

socket.emit("texted", { message });//emit : sending to server

//on : receiving from server
socket.on("welcome", (message) => {
console.log(message);
});
