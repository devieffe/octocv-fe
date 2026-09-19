import { useNavigate } from "react-router-dom";
import myImage from '../assets/HomePage/man.png';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-8  md:items-center">
        <div>
          <h1 className="block text-3xl font-bold text-blue-950 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
            Start your career with <span className="text-red-500">OctoCV</span>
          </h1>
          <p className="mt-3 text-lg text-blue-950 dark:text-neutral-400">
            Enhanced AI-Optimized CV Generator.
          </p>

          {/* Buttons */}
          <div className="mt-7 grid gap-3 w-full sm:inline-flex">
            <button
              onClick={() => navigate("/signup")}
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 focus:outline-hidden focus:bg-red-400 disabled:opacity-50 disabled:pointer-events-none"
            >
              Get started
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            <button
              onClick={() => navigate("/login")}
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-blue-950 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            >
              Login
            </button>
          </div>
          {/* End Buttons */}
        </div>
        {/* mobile pic */}
        <div className="Mobile w-[611.91px] h-[610.92px] relative rounded-[318.43px]">
          <div className="Rectangle769 w-[623.91px] h-[610.92px] left-0 top-0 absolute bg-red-500/20 rounded-[318.43px]" />
          <img src={myImage} alt="" className="rounded-[420px] scale-x-[-1]" />
        </div>
        {/* End mobile pic */}
      </div>
      {/* End Grid */}
    </div>
  );
};

export default HomePage;
