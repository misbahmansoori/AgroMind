import { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-green-700 to-green-500 text-white p-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2909/2909763.png"
            alt="AgroMind"
            className="w-32 mb-6"
          />

          <h1 className="text-4xl font-bold mb-4">
            AgroMind
          </h1>

          <p className="text-center text-green-100">
            AI Powered Smart Crop Disease Detection &
            Farming Assistant.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12">

          <div className="flex bg-green-100 rounded-full p-1 mb-8">

            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-2 rounded-full font-semibold transition ${
                isLogin
                  ? "bg-green-600 text-white"
                  : "text-green-700"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-2 rounded-full font-semibold transition ${
                !isLogin
                  ? "bg-green-600 text-white"
                  : "text-green-700"
              }`}
            >
              Register
            </button>

          </div>

          <h2 className="text-3xl font-bold text-green-700 mb-2">
            {isLogin ? "Welcome Back 👋" : "Create Account 🌱"}
          </h2>

          <p className="text-gray-500 mb-8">
            {isLogin
              ? "Login to continue using AgroMind."
              : "Register and start smart farming today."}
          </p>

          <form className="space-y-5">

            {!isLogin && (
              <div>
                <label className="block mb-2 text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            )}

            <div>
              <label className="block mb-2 text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block mb-2 text-gray-700">
                  Phone
                </label>

                <input
                  type="text"
                  placeholder="9876543210"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block mb-2 text-gray-700">
                  State
                </label>

                <input
                  type="text"
                  placeholder="Rajasthan"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            )}

            <div>
              <label className="block mb-2 text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="********"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block mb-2 text-gray-700">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="********"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            )}

            <button
              className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold"
            >
              {isLogin ? "Login" : "Register"}
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-green-600 font-semibold hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>

          </p>

        </div>

      </div>
    </div>
  );
}