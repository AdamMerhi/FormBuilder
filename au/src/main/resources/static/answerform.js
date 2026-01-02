const formDefinition = [
  { label: "What is your full name?", name: "fullName", type: "text" },
  { label: "What is your email?", name: "email", type: "email" },
  { label: "How old are you?", name: "age", type: "number" }
];

const form = document.getElementById('userForm');

// Dynamically create inputs based on the form definition
formDefinition.forEach(field => {
  const div = document.createElement('div');
  div.className = 'field';
  div.innerHTML = `
    <label>${field.label}: <input name="${field.name}" type="${field.type}"></label>
  `;
  form.appendChild(div);
});

// Collect answers on submit
function submitUserForm() {
  const answers = Object.fromEntries(new FormData(form).entries());
  document.getElementById('output').innerText = JSON.stringify(answers, null, 2);

  // Optional: send to backend
  /*
  fetch('/forms/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answers)
  })
  .then(res => res.json())
  .then(data => console.log("Server response:", data));
  */
}
