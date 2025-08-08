// API functions for password reset functionality

import { baseUrl } from "@/lib/envfile";

const API_BASE_URL = `${baseUrl}/api/v1/auth`;

/**
 * Send forgot password email
 * @param {string} email - User's email address
 * @returns {Promise<Object>} API response
 */
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/forgot-password/host/web`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send reset email');
    }

    return {
      success: true,
      data,
      message: data.message || 'Reset email sent successfully'
    };
  } catch (error) {
    console.error('Forgot password error:', error);
    return {
      success: false,
      error: error.message || 'Network error occurred'
    };
  }
};

/**
 * Reset password with token
 * @param {string} token - Reset token from email
 * @param {string} password - New password
 * @returns {Promise<Object>} API response
 */
export const resetPassword = async (token, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reset-password/host/${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to reset password');
    }

    return {
      success: true,
      data,
      message: data.message || 'Password reset successfully'
    };
  } catch (error) {
    console.error('Reset password error:', error);
    return {
      success: false,
      error: error.message || 'Network error occurred'
    };
  }
};