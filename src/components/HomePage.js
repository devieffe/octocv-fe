
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const steps = [
    { title: "Step 1", description: "Download your existing CV" },
    { title: "Step 2", description: "Select your career path" },
    { title: "Step 3", description: "Create your optimized CV" },
  ];

  return (
    <div className="container text-center py-5">
      <h2 className="mb-4">Welcome to the Enhanced AI-Generated CV Optimizer</h2>

      {/* Displaying all steps at once */}
      <div className="steps-container d-flex justify-content-center flex-wrap">
        {steps.map((step, index) => (
          <div
            key={index}
            className="step-card p-4 rounded-lg shadow m-2"
          >
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>

      {/* Get Started Button */}
      <div className="mt-4">
        <button className="btn btn-primary" onClick={() => navigate("/signup")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
