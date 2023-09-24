import styles from "./App.module.css";
import React, { useState, useEffect } from "react";
import Typewriter from "./Animations/TypeWriter.js";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [containerName, setContainerName] = useState("");
  const [predictionResult, setPredictionResult] = useState("");
  const [answer, setAnswer] = useState("");
  const [promptAnswer, setPromptAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(10);
  const [response, setResponse] = useState("");
  const [showBigContainer, setShowBigContainer] = useState(false);
  const [showRules, setRules] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [colorIndex, setColorIndex] = useState(0);
  const [showCategoryContainer, setShowCategoryContainer] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [isTrue4, setTrue4] = useState(false);
  const [isTrue3, setTrue3] = useState(false);
  const [isTrue2, setTrue2] = useState(false);
  const [isTrue1, setTrue1] = useState(false);
  const [Lost, setLost] = useState(false);
  const [winner, setWinner] = useState(false);
  const [lost, setlost] = useState(false);
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [question4, setQuestion4] = useState("");

  const [difficulty, setDifficulty] = useState(["medium", "hard"]);
  const [difficulty1, setDifficulty1] = useState([]);
  // Event handler to handle changes in the dropdown selection
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const colors = [
    "text-red-500",
    "text-blue-500",
    "text-green-500",
    "text-yellow-500",
    "text-purple-500",
  ];

  const handleStartClick = () => {
    // Set showBigContainer to true when the "Start" button is clicked
    setShowBigContainer(true);
    fetchQuestion();
    setShowCategoryContainer(false);
    setRules(false);
  };

  const handleRulesClick = () => {
    // Set showBigContainer to true when the "Start" button is clicked
    setShowBigContainer(false);
    setRules(true);
    fetchQuestion();
    setShowCategoryContainer(false);
  };
  function refreshPage() {
    window.location.reload();
  }
  const handleCategoryClick = () => {
    // Set showBigContainer to true when the "Start" button is clicked
    setShowCategoryContainer(true);
    setShowBigContainer(false);
    setRules(false);
  };

  function deleteHeartDiv() {
    const heartElement = document.querySelector(".heart"); // Find the element with the class "heart1"
    if (heartElement) {
      heartElement.parentNode.removeChild(heartElement); // Remove the element from its parent
    } else {
      setLost(true);
    }
  }

  function deleteevrything() {
    const heartElement = document.querySelector(".whole-site"); // Find the element with the class "heart1"
    if (heartElement) {
      heartElement.parentNode.removeChild(heartElement); // Remove the element from its parent
    } else {
      setLost(true);
    }
  }

  const CheckAnswer = () => {
    // Check conditions for each question and set the corresponding state variable to true

    if (question1 === answer) {
      setTrue1(true);
      console.log("Setting true1 to true");
    }
    if (question2 === answer) {
      setTrue2(true);
      console.log("Setting true2 to true");
    }
    if (question3 === answer) {
      setTrue3(true);
      console.log("Setting true3 to true");
    }
    if (question4 === answer) {
      setTrue4(true);
      console.log("Setting true4 to true");
    }
    if (userAnswer === answer) {
      if (score === 10) {
        deleteevrything();
        setWinner(true);
        setTimeout(() => {
          refreshPage();
        }, 5000);
      }
      if (difficulty1 === "medium") {
        setScore(score + 1);
      } else {
        setScore(score + 2);
      }
    } else {
      deleteHeartDiv();
      if (Lost) {
        setlost(true);
        setTimeout(() => {
          refreshPage();
        }, 5000);
      }
      if (score > 0) {
        setScore(score - 1);
      }
    }

    // Use setTimeout to reset the state variables to false after a delay (2 seconds)
    setTimeout(() => {
      setTrue1(false);
      setTrue2(false);
      setTrue3(false);
      setTrue4(false);
    }, 3000);

    // Fetch the next question

    fetchQuestion();
  };

  const handleTypingComplete = (message) => {
    setResponse(score); // Update the response state
  };
  const generateQuestions = () => {
    const numbers = [0, 1, 2, 3];
    const shuffledNumbers = [];

    while (numbers.length > 0) {
      const randomIndex = Math.floor(Math.random() * numbers.length); // Generate a random index
      const selectedNumber = numbers.splice(randomIndex, 1)[0];
      shuffledNumbers.push(selectedNumber);
    }
    console.log(incorrectAnswers[0] + "");
    console.log(incorrectAnswers[shuffledNumbers[0]]);
    setQuestion1(incorrectAnswers[shuffledNumbers[0]]);
    setQuestion2(incorrectAnswers[shuffledNumbers[1]]);
    setQuestion3(incorrectAnswers[shuffledNumbers[2]]);
    setQuestion4(incorrectAnswers[shuffledNumbers[3]]);
  };

  const fetchQuestion = () => {
    setIsLoading(true);
    const randomIndex = Math.floor(Math.random() * 2);
    fetch(
      "https://opentdb.com/api.php?amount=1&type=multiple&category=" +
        selectedOption +
        "&difficulty=" +
        difficulty[randomIndex],
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("URL is not downloadable");
        }
      })
      .then((data) => {
        setDifficulty1(difficulty[randomIndex]);
        const incorrectAnswersArray = data.results[0].incorrect_answers;
        setIncorrectAnswers([]);
        console.log(incorrectAnswersArray);
        // Declare newIncorrectAnswers before using it
        const newIncorrectAnswers = [
          ...incorrectAnswersArray,
          data.results[0].correct_answer,
        ];

        setIncorrectAnswers(newIncorrectAnswers);
        setAnswer(data.results[0].correct_answer);

        console.log(data.results[0].correct_answer + "COOORREECTT");

        setIsLoading(false);

        if (data.results && data.results[0] && data.results[0].question) {
          // Check if the string contains &quot;
          if (data.results[0].question.includes("&quot;")) {
            // Replace &quot; with "
            const output_string = data.results[0].question.replace(
              /&quot;/g,
              '"',
            );
            setPredictionResult(output_string);
          } else {
            // No replacement needed, use the original string
            setPredictionResult(data.results[0].question);
          }
          setAnswer(data.results[0].correct_answer);
          setIsLoading(false);
          setCurrentQuestion(currentQuestion + 1); // Update the current question
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      generateQuestions();
    }
  }, [isLoading]);
  useEffect(() => {
    // Rotate through colors in a loop with a delay
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 5000); // Change color every 1 second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <div class="whole-site">
        <div class="text-5xl font-extrabold ...">
          <span
            class={`bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 ${styles["instruction"]}`}
          >
            Hello world,
          </span>
          <p class={styles["intro-sizing"]}>
            If you win 10 times, you emerge victorious; otherwise, you must
            start over 😁.
          </p>
        </div>

        {showBigContainer && (
          <div className={styles["center-score"]}>
            <h1 class="font-mono"> Score: {score} |</h1>
            <div class="heart">💚</div>
            <div class="heart">💚</div>
            <div class="heart">💚</div>
          </div>
        )}

        {showRules && (
          <div className={styles["center-score"]}>
            <div class="font-mono">🥇 Hard questions: 2 points |</div>
            <div class="font-mono">🥈Medium questions: 1 point</div>
          </div>
        )}

        <section id="container-menu" className={styles["container-menu1"]}>
          <button
            className={`bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${styles["menu-button"]}`}
            onClick={handleRulesClick}
          >
            Rules
          </button>
          <button
            className={`bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${styles["menu-button"]}`}
            onClick={handleStartClick}
          >
            Start
          </button>

          <button
            className={`bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${styles["menu-button"]}`}
            onClick={handleCategoryClick}
          >
            Category
          </button>
        </section>

        {showCategoryContainer && (
          <>
            <div
              className={`animate-pulse ${colors[colorIndex]} ${styles["category-title"]} ${styles["intro-sizing"]}`}
            >
              <h2>Categories</h2>
            </div>
            <select
              value={selectedOption}
              onChange={handleDropdownChange}
              className={styles["selection-container"]}
            >
              <option value="10">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="21">Sports</option>
              <option value="25">Art</option>
              <option value="27">Animals</option>
            </select>
          </>
        )}

        {showBigContainer && (
          <div className={styles["big-container"]}>
            <div className={styles["image-upload-container"]}>
              {/* Your image upload UI */}
            </div>

            <div
              className={`border-4 border-indigo-600 ${styles["prediction-container"]} ${styles["slide-in"]}`}
            >
              <h1 className={styles["question-text"]}>{predictionResult}</h1>
            </div>
            <div className={styles["center-container"]}>
              <button
                className={`${styles["center-button"]} ${styles["true-button"]}`}
                onClick={() => setUserAnswer("True")}
              >
                True
              </button>
              <button
                className={`${styles["center-button"]} ${styles["false-button"]}`}
                onClick={() => setUserAnswer("False")}
              >
                False
              </button>
            </div>

            <div className={styles["center-container-multiple"]}>
              <button
                className={
                  isTrue1
                    ? `${styles["center-button"]} px-4 py-4 bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-400 mt-1 ${styles["true-color"]}`
                    : `${styles["center-button"]} px-4 py-4 bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-400 mt-1 `
                }
                onClick={() => setUserAnswer(question1)}
              >
                <p>{question1}</p>
              </button>
              <button
                className={
                  isTrue2
                    ? `${styles["center-button"]} px-4 py-4 bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-400 mt-1 ${styles["true-color"]}`
                    : `${styles["center-button"]} px-4 py-4 bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-400 mt-1 `
                }
                onClick={() => setUserAnswer(question2)}
              >
                <p>{question2}</p>
              </button>
              <button
                className={
                  isTrue3
                    ? `${styles["center-button"]} px-4 py-4 bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-400 mt-1 ${styles["true-color"]}`
                    : `${styles["center-button"]} px-4 py-4 bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-400 mt-1 `
                }
                onClick={() => setUserAnswer(question3)}
              >
                <p>{question3}</p>
              </button>
              <button
                className={
                  isTrue4
                    ? `${styles["center-button"]} px-4 py-4 bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-400 mt-1 ${styles["true-color"]}`
                    : `${styles["center-button"]} px-4 py-4 bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-400 mt-1 `
                }
                onClick={() => setUserAnswer(question4)}
              >
                <p>{question4}</p>
              </button>
            </div>

            <div class={styles["center-submit"]}>
              <button
                className={`bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105" ${styles["submit-button"]} shadow-2xl`}
                onClick={() => CheckAnswer()}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        <div class="text-5xl font-extrabold ..."></div>

        <p>{promptAnswer}</p>
      </div>
      {winner && (
        <p className={styles["center-score"]}>🏆 WINNER CHICKEN DINNER</p>
      )}

      {lost && <p className={styles["center-score"]}>YOU LOST 😔</p>}
    </div>
  );
}

export default App;
