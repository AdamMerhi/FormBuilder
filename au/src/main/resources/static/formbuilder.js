const addFieldBtn = document.getElementById("addFieldBtn");
const saveFormBtn = document.getElementById("saveFormBtn");
const fieldsContainer = document.getElementById("fieldsContainer");
const output = document.getElementById("output");
const formNameInput = document.getElementById("formName");

let fields = [];

addFieldBtn.addEventListener("click", () => {
  const fieldIndex = fields.length;
  
  const fieldDiv = document.createElement("div");
  fieldDiv.className = "field";
  fieldDiv.innerHTML = `
    <label>Question: <input type="text" class="fieldLabel"></label>
    <label>Field Name: <input type="text" class="fieldName"></label>
    <label>Type: 
      <select class="fieldType">
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="number">Number</option>
      </select>
    </label>
    <button type="button" class="removeFieldBtn">Remove</button>
  `;
  
  // Remove field button
  fieldDiv.querySelector(".removeFieldBtn").addEventListener("click", () => {
    fieldsContainer.removeChild(fieldDiv);
    fields.splice(fieldIndex, 1);
  });
  
  fieldsContainer.appendChild(fieldDiv);
  
  // Add a placeholder in fields array
  fields.push({ label: "", name: "", type: "text" });
});

// Save form button
saveFormBtn.addEventListener("click", () => {
  // Collect all field values
  const fieldDivs = document.querySelectorAll(".field");
  const formFields = [];
  
  fieldDivs.forEach(div => {
    const label = div.querySelector(".fieldLabel").value;
    const name = div.querySelector(".fieldName").value;
    const type = div.querySelector(".fieldType").value;
    
    if (label && name) {
      formFields.push({ label, name, type });
    }
  });
  
  const formName = formNameInput.value.trim();
  if (!formName) {
    alert("Form must have a name!");
    return;
  }
  
  // POST to backend
  fetch("/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: formName, fields: formFields })
  })
    .then(res => res.json())
    .then(data => {
      output.textContent = JSON.stringify(data, null, 2);
      formNameInput.value = "";
      fieldsContainer.innerHTML = "";
      fields = [];
      alert("Form created! Use the answerUrl to test it.");
    });
});
