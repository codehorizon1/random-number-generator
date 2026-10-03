import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [maxNumber, setMaxNumber] = useState(100);
  const [inputLimit, setInputLimit] = useState("100");
  const [generationCount, setGenerationCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const intervalRef = useRef(null);

  const generateRandomNumber = () => {
    if (isGenerating) return;

    const finalNumber =
      Math.floor(Math.random() * maxNumber) + 1;

    setIsGenerating(true);

    let counter = 0;

    intervalRef.current = setInterval(() => {
      const temporaryNumber =
        Math.floor(Math.random() * maxNumber) + 1;

      setRandomNumber(temporaryNumber);

      counter++;

      if (counter >= 8) {
        clearInterval(intervalRef.current);

        setRandomNumber(finalNumber);

        setGenerationCount(
          (previousCount) => previousCount + 1
        );

        setIsGenerating(false);
      }
    }, 70);
  };


  const handleLimitChange = (event) => {
    const value = event.target.value;

    // Allow the input to be temporarily empty
    setInputLimit(value);
  };


  const setLimit = () => {
    const value = Number(inputLimit);

    if (!Number.isInteger(value)) {
      return;
    }

    if (value < 1) {
      return;
    }

    if (value > 1000000) {
      return;
    }

    setMaxNumber(value);

    setRandomNumber(null);

    setGenerationCount(0);
  };


  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      setLimit();
    }
  };


  return (
    <main className="app">

      {/* Ambient Background */}
      <div className="ambient-shape shape-one"></div>
      <div className="ambient-shape shape-two"></div>

      {/* Background Grid */}
      <div className="background-grid"></div>


      {/* Header */}
      <header className="header">

        <div className="brand">
          RNDM
        </div>

        <div className="project-number">
          PROJECT / 01
        </div>

      </header>


      {/* Hero */}
      <section className="hero">

        <div className="hero-heading">

          <span>RANDOM</span>

          <span>NUMBER</span>

          <span>GENERATOR</span>

        </div>


        <div className="hero-description">

          <span className="description-line"></span>

          <p>
            A simple experiment in randomness.
            <br />
            Set a limit and generate a number.
          </p>

        </div>

      </section>


      {/* Number Section */}
      <section className="number-section">

        <div className="number-decoration">

          {/* Circular Rings */}
          <div className="orbit orbit-one"></div>

          <div className="orbit orbit-two"></div>


          {/* Markers */}
          <div className="marker marker-top"></div>

          <div className="marker marker-bottom"></div>


          {/* Number */}
          <div className="number-wrapper">

            {/* Status */}
            <div className="number-status">

              <span
                className={`status-dot ${
                  randomNumber !== null
                    ? "active"
                    : ""
                }`}
              ></span>

              <span>
                {isGenerating
                  ? "GENERATING"
                  : randomNumber === null
                  ? "WAITING"
                  : "GENERATED"}
              </span>

            </div>


            {/* Number */}
            <div
              className={`number ${
                isGenerating
                  ? "number-generating"
                  : ""
              }`}
            >

              {randomNumber === null ? (
                "00"
              ) : (
                <span
                  key={randomNumber}
                  className="number-value"
                >
                  {randomNumber}
                </span>
              )}

            </div>


            {/* Empty State */}
            {randomNumber === null && (
              <p className="empty-message">
                No number generated yet
              </p>
            )}


            {/* Generation Counter */}
            <div className="generation-count">

              GENERATIONS /{" "}

              {String(generationCount).padStart(
                2,
                "0"
              )}

            </div>

          </div>

        </div>

      </section>


      {/* Controls */}
      <section className="controls">


        {/* Current Range */}
        <div className="range">

          <span className="range-label">
            RANGE
          </span>

          <strong>
            01 — {maxNumber}
          </strong>

        </div>


        {/* Limit Input */}
        <div className="limit-control">

          <label htmlFor="limit">
            MAXIMUM LIMIT
          </label>


          <div className="limit-input-wrapper">

            <input
              id="limit"
              type="number"
              min="1"
              max="1000000"
              value={inputLimit}
              onChange={handleLimitChange}
              onKeyDown={handleInputKeyDown}
              disabled={isGenerating}
              placeholder="100"
            />


            <button
              className="set-button"
              onClick={setLimit}
              disabled={
                isGenerating ||
                inputLimit === ""
              }
            >
              SET
            </button>

          </div>

        </div>


        {/* Generate Button */}
        <button
          className="generate-button"
          onClick={generateRandomNumber}
          disabled={isGenerating}
          aria-label="Generate a random number"
        >

          <span>
            {isGenerating
              ? "Generating..."
              : "Generate Number"}
          </span>

          <span className="arrow">
            ↗
          </span>

        </button>

      </section>


      {/* Footer */}
      <footer className="footer">

        <span>
          RANDOMNESS, SIMPLIFIED.
        </span>

        <span>
          © 2026 RNDM
        </span>

      </footer>

    </main>
  );
}

export default App;