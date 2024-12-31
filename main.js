const form = document.querySelector("form"),
  btn = document.getElementById("btn"),
  title = document.getElementById("title"),
  description = document.getElementById("description"),
  url = "https://javascript-apis.onrender.com";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Prevent the default form submission
  const email = document.getElementById("email").value;
  const description = document.getElementById("description").value;

  // Validate form fields
  if (!email || !description) {
    alert("All fields are required!");
    return;
  }

  // Create a payload object
  const payload = {
    email,
    description,
  };

  // Send data using fetch
  fetch(`${url}/test`, {
    method: "POST", // HTTP method
    headers: {
      "Content-Type": "application/json", // Inform the server that the payload is JSON
    },
    body: JSON.stringify(payload), // Convert the payload to JSON
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to submit the form.");
      }
      return response.json(); // Parse the response JSON
    })
    .then((data) => {
      console.log("Success:", data);
      alert("Form submitted successfully!");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was an error submitting the form.");
    });
});
