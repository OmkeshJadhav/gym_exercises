import React, { useState, useEffect } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";
import Pagination from "./Pagination";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(12);

  // Get current exercises
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises?limit=50",
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=50`,
          exerciseOptions
        );
      }

      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart]);

  useEffect(() => {
    // Reset to first page when exercises or bodyPart changes
    setCurrentPage(1);
  }, [exercises, bodyPart]);

  return (
    <div className="w-screen">
      <p className="font-bold text-4xl mx-10 mb-5">Showing Exercises</p>
      <div className="flex justify-around flex-wrap pr-6">
        {currentExercises.map((exercise, index) => {
          // console.log(exercise);
          return <ExerciseCard key={index} exercise={exercise} />;
        })}
      </div>

      {/* Pagination */}
      <div className="mt-3 ">
        {exercises.length > exercisesPerPage && (
          <Pagination
            exercisesPerPage={exercisesPerPage}
            totalExercises={exercises.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Exercises;
