/*
 * Dogs API React Application
 * Author: Salavuddin Shaik
 * Course: Software Architecture and Design - Lewis University
 * Based on Brad Schiff's tutorial: "Dogs, JavaScript & An API 🐶 Fetch, Promises & Async Await"
 */

import { useState, useEffect, useRef } from "react";
import { AuthProvider } from "./AuthContext.jsx";
import Login from "./components/Login.jsx";
import "./App.css";

function DogApp() {
  // State for breeds list
  const [breeds, setBreeds] = useState({});
  // State for selected breed
  const [selectedBreed, setSelectedBreed] = useState("Choose a dog breed");
  // State for images array
  const [images, setImages] = useState([]);
  // State for current slides being displayed
  const [currentSlides, setCurrentSlides] = useState([]);
  // Track current position in images array
  const [currentPosition, setCurrentPosition] = useState(0);

  // Refs for timers
  const timerRef = useRef(null);
  const deleteTimeoutRef = useRef(null);

  // Fetch breed list on component mount
  useEffect(() => {
    async function fetchBreeds() {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        setBreeds(data.message);
      } catch (e) {
        console.log("There was a problem fetching the breed list.");
      }
    }
    fetchBreeds();
  }, []);

  // Load images when breed is selected
  useEffect(() => {
    async function loadImages() {
      if (selectedBreed && selectedBreed !== "Choose a dog breed") {
        try {
          const response = await fetch(
            `https://dog.ceo/api/breed/${selectedBreed}/images`
          );
          const data = await response.json();
          setImages(data.message);
          setCurrentPosition(0);
        } catch (e) {
          console.log("There was a problem fetching the images.");
        }
      }
    }
    loadImages();
  }, [selectedBreed]);

  // Setup slideshow when images change
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (deleteTimeoutRef.current) clearTimeout(deleteTimeoutRef.current);

    if (images.length === 0) {
      setCurrentSlides([]);
      return;
    }

    if (images.length === 1) {
      setCurrentSlides([
        { id: 0, url: images[0] },
        { id: 1, url: "" },
      ]);
      return;
    }

    setCurrentSlides([
      { id: 0, url: images[0] },
      { id: 1, url: images[1] },
    ]);
    setCurrentPosition(2);

    timerRef.current = setInterval(() => {
      setCurrentPosition((prev) => {
        const nextPos = prev >= images.length ? 0 : prev;

        setCurrentSlides((prevSlides) => {
          const newSlides = [
            ...prevSlides,
            { id: Date.now(), url: images[nextPos] },
          ];

          deleteTimeoutRef.current = setTimeout(() => {
            setCurrentSlides((slides) => slides.slice(1));
          }, 1000);

          return newSlides;
        });

        return nextPos + 1 >= images.length ? 0 : nextPos + 1;
      });
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (deleteTimeoutRef.current) clearTimeout(deleteTimeoutRef.current);
    };
  }, [images]);

  const handleBreedChange = (e) => {
    setSelectedBreed(e.target.value);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>🐕 Infinite Dog App - Sprint 6</h1>
        <p>Lewis Instructional Software Architecture</p>

        {/* Authentication Section */}
        <Login />

        <div className="breed">
          <select onChange={handleBreedChange} value={selectedBreed}>
            <option value="Choose a dog breed">Choose a dog breed</option>
            {Object.keys(breeds).map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="slideshow">
        {currentSlides.map((slide) => (
          <div
            key={slide.id}
            className="slide"
            style={{
              backgroundImage: slide.url ? `url('${slide.url}')` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DogApp />
    </AuthProvider>
  );
}

export default App;
