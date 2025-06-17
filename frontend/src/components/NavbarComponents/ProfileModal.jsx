import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import {
  FaUser, FaCog, FaPaintBrush, FaSignOutAlt, FaExchangeAlt,
} from "react-icons/fa";

Modal.setAppElement("#root");

const ProfileModal = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
  if (isOpen) {
    // Wait a tick to let localStorage update
    setTimeout(() => {
      const username = localStorage.getItem("username");
      console.log("Fetched username:", username);
      if (!username) {
        setError("Username not found. Please log in again.");
        return;
      }

      axios
        .get(`http://localhost:8080/api/auth/user/details?username=${username}`)
        .then((res) => setUser(res.data))
        .catch(() => setError("Failed to load user data."));
    }, 100); // 🔁 short delay (100ms)
  }
}, [isOpen]);



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-xl p-4 shadow-xl w-80 mx-auto mt-20 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
    >
      {error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : !user ? (
        <div className="text-center py-8">
  <svg className="animate-spin h-5 w-5 mx-auto text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
  </svg>
</div>

      ) : user.error ? (
        <div className="text-center py-8 text-red-500">{user.error}</div>
      ) : (
        <>
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-12 h-12 rounded-full border"
            />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded">
              <FaUser />
              <span>Profile</span>
            </div>
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded">
              <FaCog />
              <span>Account settings</span>
            </div>
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded">
              <FaPaintBrush />
              <span>Theme</span>
            </div>
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded">
              <FaExchangeAlt />
              <span>Switch account</span>
            </div>
            <div
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded text-red-600"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
                onClose();
              }}
            >
              <FaSignOutAlt />
              <span>Log out</span>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ProfileModal;