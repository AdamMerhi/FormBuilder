package com.au.controller;

import com.au.model.Form;
import com.au.model.FormResponse;
import com.au.service.FormService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/forms")
public class FormController {

    private final FormService formService;

    public FormController(FormService formService) {
        this.formService = formService;
    }

    // ---------------------------
    // 1️⃣ Create a new form
    // ---------------------------
    @PostMapping
    public Map<String, String> createForm(@RequestBody Form form) {
        String formId = formService.saveForm(form);
        return Map.of(
            "formId", formId,
            "answerUrl", "/answer.html?formId=" + formId
        );
    }

    // ---------------------------
    // 2️⃣ Get a single form by ID
    // ---------------------------
    @GetMapping("/{id}")
    public ResponseEntity<Form> getForm(@PathVariable String id) {
        Form form = formService.getForm(id);
        if (form == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(form);
    }

    // ---------------------------
    // 3️⃣ Submit answers for a form
    // ---------------------------
    @PostMapping("/{id}/responses")
    public ResponseEntity<Void> submitResponse(
            @PathVariable String id,
            @RequestBody Map<String, String> answers) {

        Form form = formService.getForm(id);
        if (form == null) {
            return ResponseEntity.notFound().build();
        }

        formService.saveResponse(id, answers);
        return ResponseEntity.ok().build();
    }

    // ---------------------------
    // 4️⃣ List all responses for a form
    // ---------------------------
    @GetMapping("/{id}/responses")
    public ResponseEntity<List<FormResponse>> getResponses(@PathVariable String id) {
        Form form = formService.getForm(id);
        if (form == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(formService.getResponses(id));
    }

    // ---------------------------
    // 5️⃣ Optional: list all forms
    // ---------------------------
    @GetMapping
    public List<Form> getAllForms() {
        return formService.getAllForms();
    }
}
