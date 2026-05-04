import { useState } from "react";
import PoseCard from "@/components/PoseCard";

const PosePage: React.FC = () => {
  const [poseData, setPoseData] = useState<any | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const base64Image = await toBase64(file);
    const response = await fetch("/pose/api/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image }),
    });

    const data = await response.json();
    setPoseData(data);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pose Detection</h1>
      <input type="file" onChange={handleImageUpload} className="mb-4" />
      {poseData && <PoseCard poseData={poseData} />}
    </div>
  );
};

export default PosePage;
