// DeliveryForm.js
import React, { useEffect } from "react";
import { ErrorMessage } from "../../validation/Validations";
import api from "../../api";

const DeliveryForm = ({
  formData,
//   setFormData,
  errors,
//   setErrors,
  divisions,
  setDivisions,
  districts,
  setDistricts,
  upazilas,
  setUpazilas,
  handleChange
}) => {

  // Fetch divisions
  useEffect(() => {
    if (!divisions.length) {
      api.get("/api/divisions")
        .then(res => setDivisions(res.data))
        .catch(err => console.error(err));
    }
  }, [divisions, setDivisions]);

  // Fetch districts when division changes
  useEffect(() => {
    if (!formData.division) return;
    api.get(`/api/districts/${formData.division}`)
      .then(res => setDistricts(res.data))
      .catch(err => console.error(err));
  }, [formData.division, setDistricts]);

  // Fetch upazilas when district changes
  useEffect(() => {
    if (!formData.district) return;
    api.get(`/api/upazilas/${formData.district}`)
      .then(res => setUpazilas(res.data))
      .catch(err => console.error(err));
  }, [formData.district, setUpazilas]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Delivery Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your first and last name"
            className={`w-full p-3 border rounded-lg ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          <ErrorMessage message={errors.fullName} />
        </div>

        {/* Region / Division */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
          <select
            name="division"
            value={formData.division}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Division</option>
            {divisions.map(d => (
              <option key={d._id} value={d._id}>{d.name}</option>
            ))}
          </select>
          {errors.division && (
            <p className="text-red-500 text-xs mt-1">{errors.division}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Please enter your phone number"
            className={`w-full p-3 border rounded-lg ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* City / District */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            disabled={!districts.length}
          >
            <option value="">Select District</option>
            {districts.map(d => (
              <option key={d._id} value={d._id}>{d.name}</option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-500 text-xs mt-1">{errors.district}</p>
          )}
        </div>

        {/* House */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Building / House No / Floor / Street
          </label>
          <input
            type="text"
            name="house"
            value={formData.house}
            onChange={handleChange}
            placeholder="House# 123, Street# 123, ABC Road"
            className={`w-full p-3 border rounded-lg ${
              errors.house ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.house && (
            <p className="text-red-500 text-xs mt-1">{errors.house}</p>
          )}
        </div>

        {/* Upazila */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Area / Upazila</label>
          <select
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            disabled={!upazilas.length}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Upazila</option>
            {upazilas.map(u => (
              <option key={u._id} value={u._id}>{u.name}</option>
            ))}
          </select>
          {errors.upazila && (
            <p className="text-red-500 text-xs mt-1">{errors.upazila}</p>
          )}
        </div>

        {/* Landmark */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Landmark / Nearby Place</label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark || ""}
            onChange={handleChange}
            placeholder="Please enter"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your full address"
            className={`w-full p-3 border rounded-lg ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;