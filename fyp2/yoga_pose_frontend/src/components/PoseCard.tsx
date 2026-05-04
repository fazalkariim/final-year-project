interface PoseCardProps {
    poseData: {
      pose_name: string;
      confidence: number;
      suggestions: string[];
    };
  }
  
  const PoseCard: React.FC<PoseCardProps> = ({ poseData }) => {
    return (
      <div className="border rounded-lg p-4 shadow-md bg-white">
        <h2 className="text-xl font-semibold">Detected Pose: {poseData.pose_name}</h2>
        <p className="text-gray-700">Confidence: {poseData.confidence.toFixed(2)}</p>
        <h3 className="text-lg mt-4 font-medium">Suggestions:</h3>
        <ul className="list-disc pl-6 text-gray-600">
          {poseData.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default PoseCard;
  