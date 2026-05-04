"use client";

import React, { useState,useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Trash2, Pencil, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RoutineCreation() {
  const [routineName, setRoutineName] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [alarms, setAlarms] = useState<{ date: Date | undefined; time: string }[]>([
    { date: undefined, time: "" },
  ]);
  const [savedRoutine, setSavedRoutine] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
    const stored = localStorage.getItem("savedRoutine");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back into Date objects
      parsed.alarms = parsed.alarms.map((a: any) => ({
        ...a,
        date: a.date ? new Date(a.date) : undefined,
      }));
      setSavedRoutine(parsed);
    }
  }, []);


  const isFormComplete =
    routineName &&
    duration &&
    difficulty &&
    alarms.every((a) => a.date && a.time);



  const handleSave = () => {
  if (!isFormComplete)
    return alert("Please complete all alarm fields and routine details.");

  const routine = {
    routineName,
    duration,
    difficulty,
    alarms,
  };

  setSavedRoutine(routine);
  localStorage.setItem("savedRoutine", JSON.stringify(routine));

  setRoutineName("");
  setDuration("");
  setDifficulty("");
  setAlarms([{ date: undefined, time: "" }]);
  setIsEditing(false);
};

  const handleEdit = () => {
    if (!savedRoutine) return;
    setRoutineName(savedRoutine.routineName);
    setDuration(savedRoutine.duration);
    setDifficulty(savedRoutine.difficulty);
    setAlarms(savedRoutine.alarms);
    setSavedRoutine(null);
    setIsEditing(true);
  };

  const handleShare = () => {
  if (!savedRoutine) return;
  const routineText = JSON.stringify(savedRoutine, null, 2);

  navigator.clipboard.writeText(routineText).then(() => {
    alert("Routine copied to clipboard!");
  }).catch((err) => {
    alert("Failed to copy routine.");
    console.error(err);
  });
};


  return (
    <div className="p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Create New Routine
        </h1>

        {!savedRoutine && (
          <div className="space-y-4">
            <div>
              <Label>Routine Name</Label>
              <Input
                value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Duration</Label>
              <Select onValueChange={setDuration} value={duration} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {["5 min", "10 min", "15 min", "30 min", "45 min", "1 hour"].map(
                    (time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Difficulty Level</Label>
              <Select onValueChange={setDifficulty} value={difficulty} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Set Alarm(s)</Label>
              {alarms.map((alarm, index) => (
                <div key={index} className="flex gap-4 items-center mb-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !alarm.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {alarm.date ? format(alarm.date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={alarm.date}
                        onSelect={(newDate) => {
                          const newAlarms = [...alarms];
                          newAlarms[index].date = newDate!;
                          setAlarms(newAlarms);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Input
                    type="time"
                    value={alarm.time}
                    onChange={(e) => {
                      const newAlarms = [...alarms];
                      newAlarms[index].time = e.target.value;
                      setAlarms(newAlarms);
                    }}
                    className="w-32"
                  />

                  {index > 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const updated = alarms.filter((_, i) => i !== index);
                        setAlarms(updated);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  )}
                </div>
              ))}

              {alarms.length < 4 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setAlarms([...alarms, { date: undefined, time: "" }])
                  }
                >
                  + Add another alarm
                </Button>
              )}
            </div>

            <Button className="w-full" onClick={handleSave}>
              Save Routine
            </Button>
          </div>
        )}

        {savedRoutine && (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold text-center">Saved Routine</h2>
            <div className="bg-blue-50 p-4 rounded-xl shadow-sm space-y-3">
              <p>
                <strong>Name:</strong> {savedRoutine.routineName}
              </p>
              <p>
                <strong>Duration:</strong> {savedRoutine.duration}
              </p>
              <p>
                <strong>Difficulty:</strong> {savedRoutine.difficulty}
              </p>
              <div>
                <strong>Alarms:</strong>
                <ul className="list-disc ml-6 mt-1">
                  {savedRoutine.alarms.map(
                    (alarm: { date: Date; time: string }, i: number) => (
                      <li key={i}>
                        {alarm.date
                          ? `${format(new Date(alarm.date), "PPP")} at ${
                              alarm.time
                            }`
                          : "No date"}{" "}
                      </li>
                    )
                  )}
                </ul>
              </div>


             <div className="flex justify-end gap-4 mt-4">
  <Button variant="ghost" size="icon" onClick={handleEdit}>
    <Pencil className="h-5 w-5" />
  </Button>

  <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost" size="icon">
        <Share2 className="h-5 w-5 text-blue-500" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-44 space-y-2">
      <p className="text-sm font-semibold">Share via</p>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(
          `Check out my Yoga Routine:\n\n${JSON.stringify(savedRoutine, null, 2)}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-green-600 hover:underline"
      >
        WhatsApp
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          "https://example.com" // Replace with your website URL if needed
        )}&quote=${encodeURIComponent(
          `My Yoga Routine:\n${savedRoutine.routineName}, ${savedRoutine.duration}, ${savedRoutine.difficulty}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-blue-600 hover:underline"
      >
        Facebook
      </a>
    </PopoverContent>
  </Popover>

  <Button
    variant="ghost"
    size="icon"
    onClick={() => setSavedRoutine(null)}
  >
    <Trash2 className="h-5 w-5 text-red-500" />
  </Button>
</div>



            </div>
          </div>
        )}
      </div>
    </div>
  );
}
