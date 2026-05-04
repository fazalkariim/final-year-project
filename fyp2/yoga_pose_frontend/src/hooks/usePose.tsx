import { useState } from "react";

const usePose = () => {
  const [poseData, setPoseData] = useState<any | null>(null);

  const detectPose = async (image: string) => {
    const response = await fetch("/pose/api/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });

    const data = await response.json();
    setPoseData(data);
    return data;
  };

  return { poseData, detectPose };
};

export default usePose;
