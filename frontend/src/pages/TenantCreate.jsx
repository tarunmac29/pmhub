import React, { useState } from "react";
import axios from "axios";

const TenantCreate = () => {
  const [tenantName, setTenantName] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/tenants", {
        tenantName,
        status,
      });
      setMessage("Tenant created: " + response.data.tenantName);
      setTenantName("");
      setStatus("ACTIVE");
    } catch (err) {
      setMessage("Error creating tenant");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Tenant</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Tenant Name</label>
        <input
          className="w-full p-2 border mb-4 rounded"
          value={tenantName}
          onChange={(e) => setTenantName(e.target.value)}
          required
        />
        <label className="block mb-2">Status</label>
        <select
          className="w-full p-2 border mb-4 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Create Tenant
        </button>
      </form>
      {message && <div className="mt-4 text-green-600">{message}</div>}
    </div>
  );
};

export default TenantCreate;
