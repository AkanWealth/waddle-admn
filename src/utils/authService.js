import { baseUrl } from "../lib/envfile";
import axios from "axios";
class AuthService {
    constructor() {
        this.baseURL = baseUrl;
    }

    // Get stored tokens
    getAccessToken() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('access_token');
        }
        return null;
    }

    getRefreshToken() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('refresh_token');
        }
        return null;
    }

    // Store tokens
    setTokens(accessToken, refreshToken) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
        }
    }

    // Clear tokens
    clearTokens() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_data');
        }
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.getAccessToken();
    }

    // Login method
    async login(email, password) {
        try {
            const response = await axios.post(
                `${this.baseURL}/api/v1/auth/signin/host`,
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            const data = response.data;

            if (response.status === 200) {
                this.setTokens(data.access_token, data.refresh_token);
                return { success: true, data };
            } else {
                return { success: false, error: data.message || 'Login failed' };
            }
        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    error.message ||
                    "Network error. Please try again.",
            };
        }
    }

    // Refresh access token
    async refreshAccessToken() {
        const refreshToken = this.getRefreshToken();

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await axios.post(
                `${this.baseURL}/api/v1/auth/refresh`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${refreshToken}`,
                    },
                }
            );

            const data = response.data;

            if (response.status === 200) {
                this.setTokens(data.access_token, data.refresh_token || refreshToken);
                return data.access_token;
            } else {
                this.clearTokens();
                throw new Error('Token refresh failed');
            }
        } catch (error) {
            this.clearTokens();
            throw error;
        }
    }

    // Get user profile
    async getUserProfile() {
        return this.makeAuthenticatedRequest('/api/v1/host/me');
    }

    // Make authenticated API requests
    // async makeAuthenticatedRequest(endpoint, options = {}) {
    //     let accessToken = this.getAccessToken();

    //     if (!accessToken) {
    //         throw new Error('No access token available');
    //     }

    //     const makeRequest = async (token) => {
    //         return fetch(`${this.baseURL}${endpoint}`, {
    //             ...options,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //                 ...options.headers,
    //             },
    //         });
    //     };

    //     try {
    //         let response = await makeRequest(accessToken);

    //         // If token is expired, try to refresh it
    //         if (response.status === 401) {
    //             try {
    //                 accessToken = await this.refreshAccessToken();
    //                 response = await makeRequest(accessToken);
    //             } catch (refreshError) {
    //                 // Refresh failed, redirect to login
    //                 this.logout();
    //                 throw new Error('Authentication expired. Please login again.');
    //             }
    //         }

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(errorData.message || 'Request failed');
    //         }

    //         return response.json();
    //     } catch (error) {
    //         throw error;
    //     }
    // }

async makeAuthenticatedRequest(endpoint, options = {}) {
    let accessToken = this.getAccessToken();

    if (!accessToken) {
        throw new Error('No access token available');
    }

    const makeRequest = async (token) => {
        return fetch(`${this.baseURL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers,
            },
        });
    };

    try {
        let response = await makeRequest(accessToken);

        // If token is expired, try to refresh it
        if (response.status === 401) {
            try {
                accessToken = await this.refreshAccessToken();
                response = await makeRequest(accessToken);
            } catch (refreshError) {
                this.logout();
                throw new Error('Authentication expired. Please login again.');
            }
        }

        if (!response.ok) {
            // Try to parse error as JSON, but fallback to text if empty
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                errorData = { message: await response.text() };
            }
            throw new Error(errorData.message || 'Request failed');
        }

        // Handle empty response (e.g., 204 No Content)
        if (response.status === 204) return;

        const text = await response.text();
        if (!text) return;
        return JSON.parse(text);
    } catch (error) {
        throw error;
    }
}





    // Logout
    logout() {
        this.clearTokens();
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }
}

export const authService = new AuthService();