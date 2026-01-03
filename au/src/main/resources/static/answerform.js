// answerForm.js

// Get the formId from URL query parameters
const params = new URLSearchParams(window.location.search);
const formId = params.get("formId");

// DOM elements
const formTitle = document.getElementById("status"); // renamed from 'status'
const formContainer = document.getElementById("formContainer");
const output = document.getElementById("output");

// If no formId, show error and stop
if (!formId) {
  formTitle.textContent = "No formId provided";
  throw new Error("Missing formId");
}

// Fetch the form definition from backend
fetch(`/api/forms/${formId}`)
  .then(res => {
    if (!res.ok) throw new Error("Form not found");
    return res.json();
  })
  .then(form => {
    // Set form title
    formTitle.textContent = form.name;
    renderForm(form);
  })
  .catch(err => {
    formTitle.textContent = err.message;
  });

// Function to render the form dynamically
function renderForm(form) {
  // Clear any previous form
  formContainer.innerHTML = "";

  // Create a new <form> element
  const formEl = document.createElement("form");

  // Add fields
  form.fields.forEach(field => {
    const label = document.createElement("label");
    label.textContent = field.label + ": ";

    const input = document.createElement("input");
    input.type = field.type;
    input.name = field.name;
    input.required = true;

    label.appendChild(input);
    formEl.appendChild(label);
    formEl.appendChild(document.createElement("br"));
  });

  // Add submit button
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Submit Answers";
  formEl.appendChild(submitBtn);

  // Handle form submission
  formEl.addEventListener("submit", e => {
    e.preventDefault();

    const data = {};
    new FormData(formEl).forEach((value, key) => {
      data[key] = value;
    });

    // POST answers to backend
    fetch(`/api/forms/${formId}/responses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(() => {
      output.textContent = JSON.stringify(
        { formId, answers: data },
        null,
        2
      );
    });
  });

  // Add the form to the page
  formContainer.appendChild(formEl);
}
