import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    gender: "male",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.age) {
      alert("All fields are required!");
      return;
    }
    console.log("User Registered:", formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-indigo-600">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          {/* Avatar Placeholder */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-semibold">
              U
            </div>
          </div>

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 font-serif;"
          />

          {/* Gender */}
          <div className="flex space-x-4 font-serif">
            <label className="flex items-center space-x-2 font-serif">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <span>Female</span>
            </label>
          </div>

          {/* Age Selection */}
          <select
            name="age"
            required
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option value="" disabled>Select Age Group</option>
            <option value="18-below">18 or Below</option>
            <option value="19-25">19 - 25</option>
            <option value="25-35">25 - 35</option>
            <option value="35-45">35 - 45</option>
            <option value="45-above">45 or Above</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
