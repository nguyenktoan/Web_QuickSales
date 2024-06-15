"use client";
import { useState, useEffect } from "react";
import { Howl } from "howler";

const CheckOut = ({}) => {
  useEffect(() => {
    // Play success sound
    const sound = new Howl({
      src: ["/sounds/success-sound.mp3"],
      volume: 2,
    });
    sound.play();
  }, []);

  const animatePath = () => {
    const path = document.querySelector(".success-check-mark"); // Target the path element
    if (!path) return; // Handle potential errors

    const length = path.getTotalLength();

    // Clear any previous transition
    path.style.transition = path.style.WebkitTransition = "none";

    // Set up the starting positions
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.fill = "transparent"; // Hide initial path

    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path.getBoundingClientRect();

    // Define the transition
    path.style.transition = path.style.WebkitTransition =
      "stroke-dashoffset 2s ease-in-out, fill 0.5s ease-in-out 2s";

    // Go!
    path.style.strokeDashoffset = "0";
    path.style.fill = "#fff"; // Fill color after path animation
  };

  useEffect(() => {
    animatePath(); // Start animation on component mount
  }, []);

  return (
    <div className="fixed inset-0 px-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="relative w-full max-w-md px-5 py-10 mx-auto text-center bg-white rounded-md shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 fill-green-500 left-1/2"
          viewBox="0 0 60 60"
        >
          {/* Circle */}
          <circle cx="30" cy="30" r="29" className="success-circle" />

          {/* Check mark path */}
          <path
            className="success-check-mark"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            d="m24.262 42.07-6.8-6.642a1.534 1.534 0 0 1 0-2.2l2.255-2.2a1.621 1.621 0 0 1 2.256 0l4.048 3.957 11.353-17.26a1.617 1.617 0 0 1 2.2-.468l2.684 1.686a1.537 1.537 0 0 1 .479 2.154L29.294 41.541a3.3 3.3 0 0 1-5.032.529z"
          />
        </svg>

        <div className="mt-8">
          <h3 className="flex-1 text-2xl font-semibold">Great!</h3>
          <p className="mt-2 text-sm text-gray-500">
            Your payment was successful! <br />
          </p>
          <div className="relative mt-8">
            <button
              type="button"
              className="px-6 py-2.5 mt-4 w-full rounded text-white text-sm font-semibold border-none outline-none bg-green-500 hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
