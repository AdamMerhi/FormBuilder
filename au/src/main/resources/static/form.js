let questionCount = 0;

function addField(type) {
  questionCount++;

  // Prompt for question text and variable name
  const questionText = prompt(`Enter the question text for question ${questionCount}:`);
  if (!questionText) return; // cancel if empty
  const varName = prompt(`Enter the variable name for this question (e.g., fullName):`);
  if (!varName) return;

  const form = document.getElementById('demoForm');

  // Create question container
  const div = document.createElement('div');
  div.className = 'question';
  div.innerHTML = `
    <label>
      ${questionText} (${type})<br>
      Variable name: <input type="text" value="${varName}" readonly>
      <button type="button" onclick="removeField(this)">Remove</button>
    </label>
  `;

  // Store metadata as attributes (optional for JSON export)
  div.dataset.type = type;
  div.dataset.varName = varName;
  div.dataset.label = questionText;

  form.appendChild(div);
}

function removeField(button) {
  button.parentElement.parentElement.remove();
}

// Export questions as JSON (structure of your form)
function submitForm() {
  const questions = Array.from(document.querySelectorAll('.question')).map(q => ({
    label: q.dataset.label,
    name: q.dataset.varName,
    type: q.dataset.type
  }));

  document.getElementById('output').innerText = JSON.stringify(questions, null, 2);

  // Optional: send to backend
  /*
  fetch('/forms/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questions)
  })
  */
}
