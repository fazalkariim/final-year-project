export function detectPoseAndSuggestions(poseName: string, keypoints: number[]): string[] {
    const suggestions: string[] = [];
  
    if (poseName === "Warrior") {
      suggestions.push("Straighten your back leg.");
      suggestions.push("Keep your arms parallel to the ground.");
    } else if (poseName === "Goddess") {
      suggestions.push("Open your knees wider.");
      suggestions.push("Lower your hips closer to the ground.");
    }
  
    return suggestions;
  }
  