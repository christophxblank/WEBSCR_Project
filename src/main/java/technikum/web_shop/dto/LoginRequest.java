package technikum.web_shop.dto;

public class LoginRequest {
    private String identifier;
    private String password;
    private boolean rememberMe;

    // Getter und Setter
    public String getIdentifier() { return identifier; }
    public void setIdentifier(String identifier) { this.identifier = identifier; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public boolean isRememberMe() { return rememberMe; }
    public void setRememberMe(boolean rememberMe) { this.rememberMe = rememberMe; }
}