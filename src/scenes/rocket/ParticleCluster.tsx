import React from "react";
import MovingParticle from "./Particles";

const ParticleCluster = () => {
  return (
    <>
      {Array(5)
        .fill(null)
        .map((_, idx) => (
          <MovingParticle key={idx} />
        ))}
    </>
  );
};

export default ParticleCluster;
