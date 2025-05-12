package technikum.web_shop.dto;

public class SessionResponse {
    private boolean authenticated;
    private String role;
    private Long userId;

    public SessionResponse() {}
    public SessionResponse(boolean authenticated, String role, Long userId) {
        this.authenticated = authenticated;
        this.role = role;
        this.userId= userId;
    }
    public boolean isAuthenticated() { return authenticated; }
    public void setAuthenticated(boolean a) { this.authenticated = a; }
    public String getRole() { return role; }
    public void setRole(String r) { this.role = r; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
