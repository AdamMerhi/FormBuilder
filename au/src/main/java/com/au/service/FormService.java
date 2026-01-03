package com.au.service;

import com.au.model.Form;
import com.au.model.FormResponse;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FormService {

    private final Map<String, Form> forms = new HashMap<>();
    private final Map<String, List<FormResponse>> responses = new HashMap<>();

    public String saveForm(Form form) {
        String id = UUID.randomUUID().toString();
        form.setId(id);
        forms.put(id, form);
        responses.put(id, new ArrayList<>());
        return id;
    }

    public Form getForm(String id) {
        return forms.get(id);
    }

    public void saveResponse(String formId, Map<String, String> answers) {
        FormResponse response = new FormResponse(formId, answers);
        responses.get(formId).add(response);
    }

    public List<FormResponse> getResponses(String formId) {
        return responses.get(formId);
    }
}
