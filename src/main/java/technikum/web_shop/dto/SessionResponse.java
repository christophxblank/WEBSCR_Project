package technikum.web_shop.dto;

public class SessionResponse {
    private boolean authenticated;
    private String role;

    public SessionResponse() {}
    public SessionResponse(boolean authenticated, String role) {
        this.authenticated = authenticated;
        this.role = role;
    }
    public boolean isAuthenticated() { return authenticated; }
    public void setAuthenticated(boolean a) { this.authenticated = a; }
    public String getRole() { return role; }
    public void setRole(String r) { this.role = r; }
}
