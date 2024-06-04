import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { passwordStrength } from "check-password-strength";
import PasswordChecklist from "react-password-checklist";
import { validate } from "email-validator";

import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const { loading, signup } = useSignup();

  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
    //signup user here
  };

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordType(
      confirmPasswordType === "password" ? "text" : "password"
    );
  };

  const getColorClass = (strength) => {
    if (strength == 3) {
      return "text-green-500";
    } else if (strength == 2) {
      return "text-yellow-500";
    } else {
      return "text-red-500";
    }
  };


  const isFormComplete = () => {
    const { fullName, email, password, confirmPassword, gender } = inputs;
    return (
      fullName &&
      email &&
      password &&
      confirmPassword &&
      gender
      // && password === confirmPassword
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-800 bg-clip border border-gray-600">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign <span className="text-blue-500"> Up</span>
        </h1>

        <form
          className="flex flex-col mt-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full input input-bordered h-10 rounded-sm p-2"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text !mb-0">email</span>
            </label>
            <input
              type="email"
              required
              placeholder="email"
              className="w-full input input-bordered h-10 rounded-sm p-2 !mt-0"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            {!validate(inputs.email) && inputs.email.length >= 4 && (
              <div className="text-red-500 pl-2">Email is invalid</div>
            )}
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <div className="flex justify-end items-center">
              <input
                type={`${passwordType}`}
                required
                placeholder="password"
                className="w-full input input-bordered h-10 rounded-sm p-2 pr-8"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
              <span
                className="absolute flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {inputs.password.length >= 1 && (
                  <div
                    className={`pr-1 text-sm ${getColorClass(
                      passwordStrength(inputs.password).id
                    )}`}
                  >
                    {passwordStrength(inputs.password).value}
                  </div>
                )}
                {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <div className="flex justify-end items-center">
              <input
                type={`${confirmPasswordType}`}
                required
                placeholder="Confirm password"
                className="w-full input input-bordered h-10 rounded-sm p-2"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
              <span
                className="absolute flex items-center pr-3 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordType === "password" ? (
                  <FaEye />
                ) : (
                  <FaEyeSlash />
                )}
              </span>
            </div>
          </div>
          {inputs.password.length >= 1 && (
            <PasswordChecklist
              className="text-xs"
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={5}
              value={inputs.password}
              valueAgain={inputs.confirmPassword}
            />
          )}

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <Link
            className="flex align-center justify-center text-sm hover:underline hover:text-blue-400 mt-2 "
            to="/login"
          >
            Already have an account
          </Link>

          <div className="flex justify-center">
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading || !isFormComplete()}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;