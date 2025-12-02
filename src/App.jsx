/*
 * Dogs API React Application
 * Author: Salavuddin Shaik
 * Course: Software Architecture and Design - Lewis University
 * Sprint 7 - With Firebase Authentication & Firestore
 */

import { useState, useEffect, useRef } from "react";
import { AuthProvider } from "./AuthContext.jsx";
import Login from "./components/Login.jsx";
import "./App.css";

function DogApp() {
  const [breeds, setBreeds] = useState({});
  const [selectedBreed, setSelectedBreed] = useState("Choose a dog breed");
  const [images, setImages] = useState([]);
  const [currentSlides, setCurrentSlides] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);

  const timerRef = useRef(null);
  const deleteTimeoutRef = useRef(null);

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
        <h1>🐕 DogsAPICloudArchitecture</h1>
        <p className="subtitle">
          Lewis Instructional Software Architecture - Sprint 7
        </p>
        <p className="team">
          Team: Salavuddin Shaik, Dhrumil, Abhirekha Thimmasani
        </p>

        {/* Authentication Section */}
        <Login />

        <div className="breed">
          <label
            style={{
              color: "#fff",
              marginBottom: "10px",
              display: "block",
              fontSize: "16px",
            }}
          >
            🔍 Select a breed to explore:
          </label>
          <select onChange={handleBreedChange} value={selectedBreed}>
            <option value="Choose a dog breed">Choose a dog breed</option>
            {Object.keys(breeds).map((breed) => (
              <option key={breed} value={breed}>
                {breed.charAt(0).toUpperCase() + breed.slice(1)}
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

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#1a1a2e",
          color: "#888",
          fontSize: "14px",
        }}
      >
        <p>© 2025 DogsAPICloudArchitecture | Lewis University</p>
        <p>Built with React, Firebase, Azure & ❤️</p>
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
