import Typewriter from "typewriter-effect";
import React from "react";

export const TypewritterEffect = () => {
  return (
    <>
      <Typewriter
        options={{
          strings: [
            "Planning your retirement",
            "Renovating your kitchen",
            "Going on your dream vacation",
          ],
          autoStart: true,
          loop: true,
        }}
      />
    </>
  );
};
