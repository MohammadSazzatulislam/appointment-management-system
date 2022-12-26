import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaUserAlt, FaMailBulk, FaLock } from "react-icons/fa";
import { UserAuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { user, signUpNewUser, updateName, googleSignIn } =
    useContext(UserAuthContext);
  const [signUpError, setSignUpError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // sign up with email and password
  const onSubmit = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;

    signUpNewUser(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user?.uid) {
          updateName(name)
            .then(() => {
              navigate(from, { replace: true });
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        }
        console.log(user);
        // ...
      })
      .catch((error) => {
        setSignUpError(error.message);
      });
  };

  // sign up with google
  const handleGoogle = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        if (user?.uid) {
          navigate(from, { replace: true });
        }
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
            Sign Up To Your Account
          </div>
          <button
            onClick={handleGoogle}
            className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200"
          >
            <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500">
              <FaGoogle className="w-5 h-5"></FaGoogle>
            </span>
            <span>Sign Up with Google</span>
          </button>
          <div className="relative mt-10 h-px bg-gray-300">
            <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
              <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                Or Sign Up With Email
              </span>
            </div>
          </div>
          <div className="mt-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="name"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Your Full Name:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <FaUserAlt className="h-6 w-6"></FaUserAlt>
                  </div>

                  <input
                    {...register("name", { required: true })}
                    id="name"
                    type="name"
                    name="name"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Your full Name"
                  />
                </div>
                {errors.name && (
                  <small className="text-red-500">{errors.name?.message}</small>
                )}
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <FaMailBulk className="h-6 w-6"></FaMailBulk>
                  </div>

                  <input
                    {...register("email", { required: true })}
                    id="email"
                    type="email"
                    name="email"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="E-Mail Address"
                  />
                </div>
                {errors.email && (
                  <small className="text-red-500">
                    {errors.email?.message}
                  </small>
                )}
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <FaLock className="h-6 w-6"></FaLock>
                    </span>
                  </div>

                  <input
                    {...register("password", { required: true })}
                    id="password"
                    type="password"
                    name="password"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Password"
                  />
                </div>
                <small className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  password must be at least 6 characters or above
                </small>

                {errors.password && (
                  <small className="text-red-500">
                    {errors.password?.message}
                  </small>
                )}
                {signUpError && (
                  <small className="text-red-500">{signUpError}</small>
                )}
              </div>

              <div className="flex items-center mb-6 -mt-4">
                <div className="flex ml-auto">
                  <p className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">
                    Forgot Your Password?
                  </p>
                </div>
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">SignUp</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center mt-6">
            <div className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
              <span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </span>
              <span className="ml-2 flex gap-2 items-center">
                Already have an account?
                <Link to="/signin">
                  <span className="underline">Sign In</span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
