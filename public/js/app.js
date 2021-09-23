const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${e.target.elements.text.value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageTwo.textContent = data.error;
        messageOne.textContent = "";
      } else {
        messageOne.textContent = `It is currently ${data.currentTemp} degree Celcius, ${data.forecase}, at ${data.location} in  ${data.country}`;
        messageTwo.textContent = "";
      }
    });
  });
});
