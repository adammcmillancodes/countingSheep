const app = {};

app.startCounting = () => {
  const expiryDate = new Date("Mar 01, 2021 03:00:00 EST").getTime();
  const timer = setInterval(function() {

    // Establishing timeline
    const current = new Date().getTime();
    const remaining = expiryDate - current;

    // Calculating units
    // I definitely Googled to make sure my math was correct
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

    // Creating string to print, accounting for singular/plural
    // I made the choice to include hours in the string even though it is absent from design
    // I felt ommitting the hours would be unclear to users
    // Realistically I would have had a conversation with Design and the solution would be implimented 
    document.getElementById("counter").innerHTML = `${days} ${days === 1 ? "day" : "days"} ${hours} ${hours === 1 ? `hour` : `hours`} ${minutes} min`;

    // Once the countdown is over, reset the text
    if (remaining < 0) {
      clearInterval(timer);
      document.getElementById("pencilCopy").innerHTML =
        "Try the Endy Mattress risk free.";
    }
  }, 1000);
}

// Opening the modal
app.triggerModal = () => {
  const body = document.getElementById("body");
  const modal = document.getElementById("exitButton");
  body.addEventListener("mouseleave", ()=> {
    document.getElementById("exitModal").style.display = "flex";
  }, {once: true})
}

// Hiding the modal
app.hideModal = () => {
  const exitButton = document.getElementById("exitButton");
  exitButton.addEventListener("click", ()=> {
    const exitModal = document.getElementById("exitModal");
    exitModal.remove()
  })
};

// Attaching event listeners
app.eventListeners = () => {
  // But only for Desktop users
  if(window.innerWidth >= 768){
    app.triggerModal();
    app.hideModal();
  }
}

// Initiating app
app.init = () => {
  app.startCounting();
  app.eventListeners();
}

// Document ready
(() => {
  app.init();
})();