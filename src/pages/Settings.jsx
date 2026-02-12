import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import './Settings.css';

const Settings = () => {
  const { settings, updateSettings, setCurrentPage } = useApp();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    newPassword: '',
    confirm: ''
  });

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirm) {
      alert('Passwords do not match!');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    alert('Password changed successfully!');
    setShowPasswordModal(false);
    setPasswordForm({ current: '', newPassword: '', confirm: '' });
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone!')) {
      alert('Account deletion initiated...');
    }
  };

  return (
    <div className="settings-page">
      <div className="container">
        <div className="page-header">
          <button
            className="btn-icon"
            onClick={() => setCurrentPage('profile')}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="page-title">Settings</h1>
          <div style={{ width: '44px' }}></div>
        </div>

        <div className="settings-section glass-card">
          <h3 className="section-title">
            <i className="fas fa-user"></i>
            Account Settings
          </h3>
          <div className="settings-item">
            <div className="setting-info">
              <div className="setting-label">Password</div>
              <div className="setting-desc">Change your account password</div>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => setShowPasswordModal(true)}
            >
              Change
            </button>
          </div>
          <div className="settings-item">
            <div className="setting-info">
              <div className="setting-label">Email Notifications</div>
              <div className="setting-desc">Receive updates via email</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => updateSettings({ emailNotifications: e.target.checked })}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="settings-item">
            <div className="setting-info">
              <div className="setting-label">Push Notifications</div>
              <div className="setting-desc">Receive push notifications</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => updateSettings({ pushNotifications: e.target.checked })}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-section glass-card">
          <h3 className="section-title">
            <i className="fas fa-shield-alt"></i>
            Privacy Settings
          </h3>
          <div className="settings-item">
            <div className="setting-info">
              <div className="setting-label">Social Profile Visibility</div>
              <div className="setting-desc">Who can see your social profile</div>
            </div>
            <select
              className="setting-select"
              value={settings.socialVisibility}
              onChange={(e) => updateSettings({ socialVisibility: e.target.value })}
            >
              <option value="public">Public</option>
              <option value="followers">Followers Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="settings-item">
            <div className="setting-info">
              <div className="setting-label">Professional Profile Visibility</div>
              <div className="setting-desc">Who can see your professional profile</div>
            </div>
            <select
              className="setting-select"
              value={settings.professionalVisibility}
              onChange={(e) => updateSettings({ professionalVisibility: e.target.value })}
            >
              <option value="public">Public</option>
              <option value="connections">Connections Only</option>
              <option value="recruiters">Recruiters Only</option>
            </select>
          </div>
        </div>

        <div className="settings-section glass-card danger-zone">
          <h3 className="section-title">
            <i className="fas fa-exclamation-triangle"></i>
            Danger Zone
          </h3>
          <div className="settings-item">
            <div className="setting-info">
              <div className="setting-label">Logout</div>
              <div className="setting-desc">Sign out of your account</div>
            </div>
            <button
              className="btn btn-secondary"
              onClick={handleLogout}
            >
              <i className="fas fa-right-from-bracket"></i>
              Logout
            </button>
          </div>
          <div className="settings-item">
            <div className="setting-info">
              <div className="setting-label">Delete Account</div>
              <div className="setting-desc danger-text">
                Permanently delete your account and all data
              </div>
            </div>
            <button
              className="btn btn-danger"
              onClick={handleDeleteAccount}
            >
              <i className="fas fa-trash"></i>
              Delete
            </button>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal glass-card slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Change Password</h2>
              <button
                className="btn-icon"
                onClick={() => setShowPasswordModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handlePasswordSubmit} className="modal-form">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  required
                  placeholder="Enter current password"
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                  placeholder="Enter new password"
                  minLength="8"
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  required
                  placeholder="Confirm new password"
                  minLength="8"
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
