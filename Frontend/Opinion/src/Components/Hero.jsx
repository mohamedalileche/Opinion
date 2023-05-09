import React from "react";
import ReactTypingEffect from "react-typing-effect";

const Hero = () => {
  return (
    <div className="text-white">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-[#00df9a] font-bold p-2">
          Avec SkillsBuilders, découvrez une nouvelle façon d'apprendre
        </p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          Apprenez où que vous soyez.
        </h1>
        <div className="flex justify-center items-center ">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
            Une formation.
          </p>
          <ReactTypingEffect
            className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-4"
            text={["20% Theorie", "80% Pratique"]}
            eraseSpeed={120}
            eraseDelay={120}
            typingDelay={20}
          />
        </div>
        <p className=" md:text-2xl text-xl font-bold text-gray-500">
          SkillBuilders a récemment ajouté une formation virtuelle.
        </p>
        <button className="bg-[#00df9a] w-[220px] rounded-md font-medium my-6 mx-auto py-3 text-black ">
          découvrir les formations
        </button>
      </div>
    </div>
  );
};

export default Hero;
