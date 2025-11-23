/*
 * Dogs API React Application
 * Author: Salavuddin Shaik
 * Course: Software Architecture and Design - Lewis University
 * Based on Brad Schiff's tutorial: "Dogs, JavaScript & An API 🐶 Fetch, Promises & Async Await"
 */

import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // State for breeds list
  const [breeds, setBreeds] = useState({});
  // State for selected breed
  const [selectedBreed, setSelectedBreed] = useState("");
  // State for images array
  const [images, setImages] = useState([]);
  // State for current slides being displayed
  const [currentSlides, setCurrentSlides] = useState([]);
  // Track current position in images array
  const [currentPosition, setCurrentPosition] = useState(0);

  // Refs for timers (like your timer and deleteFirstPhotoDelay variables)
  const timerRef = useRef(null);
  const deleteTimeoutRef = useRef(null);

  // Fetch breed list on component mount (replaces your start() function)
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
  }, []); // Empty array = run once when component loads

  // Load images when breed is selected (replaces your loadByBreed function)
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
  }, [selectedBreed]); // Run whenever selectedBreed changes

  // Setup slideshow when images change (replaces your createSlideshow function)
  useEffect(() => {
    // Clear existing timers
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

    // Initialize with first two images
    setCurrentSlides([
      { id: 0, url: images[0] },
      { id: 1, url: images[1] },
    ]);
    setCurrentPosition(2);

    // Start slideshow timer (like your setInterval)
    timerRef.current = setInterval(() => {
      setCurrentPosition((prev) => {
        const nextPos = prev >= images.length ? 0 : prev;

        setCurrentSlides((prevSlides) => {
          const newSlides = [
            ...prevSlides,
            { id: Date.now(), url: images[nextPos] },
          ];

          // Remove first slide after transition
          deleteTimeoutRef.current = setTimeout(() => {
            setCurrentSlides((slides) => slides.slice(1));
          }, 1000);

          return newSlides;
        });

        return nextPos + 1 >= images.length ? 0 : nextPos + 1;
      });
    }, 3000);

    // Cleanup function (runs when component unmounts or images change)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (deleteTimeoutRef.current) clearTimeout(deleteTimeoutRef.current);
    };
  }, [images]);

  // Handle breed selection (replaces your onchange attribute)
  const handleBreedChange = (e) => {
    setSelectedBreed(e.target.value);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Infinite Dog App - Team Sprint 5</h1>
        <div className="breed">
          <select onChange={handleBreedChange} value={selectedBreed}>
            <option>Choose a dog breed</option>
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

export default App;
