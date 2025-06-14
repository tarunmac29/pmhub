import React from "react";
import Modal from "react-modal";
import {
  FaUser,
  FaCog,
  FaPaintBrush,
  FaSignOutAlt,
  FaExchangeAlt,
} from "react-icons/fa";

Modal.setAppElement("#root");

const ProfileModal = ({ isOpen, onClose }) => {
  const user = {
    name: "Tarun Machhi",
    email: "tarunmachhi29@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=56",
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-xl p-4 shadow-xl w-80 mx-auto mt-20 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
    >
      {/* User Info */}
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

      {/* Menu Options */}
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
            onClose(); // close modal after logout
          }}
        >
          <FaSignOutAlt />
          <span>Log out</span>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
