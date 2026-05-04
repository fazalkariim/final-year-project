import { NextResponse } from "next/server";
import { detectPoseAndSuggestions } from "@/utils/preprocess";

export async function POST(req: Request) {
  const body = await req.json();
  const { image } = body;

  if (!image) {
    return NextResponse.json({ error: "Image is required" }, { status: 400 });
  }

  const keypoints = Array.from({ length: 34 }, () => Math.random()); // Mock keypoints
  const pose_name = "Warrior";
  const confidence = 0.85;

  if (confidence < 0.7) {
    return NextResponse.json({
      pose_name: "No pose detected",
      confidence: 0,
      suggestions: [],
    });
  }

  const suggestions = detectPoseAndSuggestions(pose_name, keypoints);
  return NextResponse.json({ pose_name, confidence, suggestions });
}
