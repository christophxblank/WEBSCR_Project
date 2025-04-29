package technikum.web_shop.dto;

import java.util.List;

public class AuthResponse {
    private boolean success;
    private List<String> errors;

    public AuthResponse() {}

    public AuthResponse(boolean success, List<String> errors) {
        this.success = success;
        this.errors = errors;
    }

    // Getter und Setter
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public List<String> getErrors() { return errors; }
    public void setErrors(List<String> errors) { this.errors = errors; }
}