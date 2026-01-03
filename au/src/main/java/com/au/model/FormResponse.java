package com.au.model;

import java.util.Map;

public class FormResponse {

    private String formId;
    private Map<String, String> answers;

    public FormResponse() {}

    public FormResponse(String formId, Map<String, String> answers) {
        this.formId = formId;
        this.answers = answers;
    }

    public String getFormId() {
        return formId;
    }

    public void setFormId(String formId) {
        this.formId = formId;
    }

    public Map<String, String> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<String, String> answers) {
        this.answers = answers;
    }
}
