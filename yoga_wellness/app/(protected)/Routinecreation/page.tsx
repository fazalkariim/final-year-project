"use client";

import React, { useState, useEffect } from "react";
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
import { CalendarIcon, Trash2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

type Alarm = {
  date: Date | undefined;
  time: string;
};

type Routine = {
  routineName: string;
  duration: string;
  difficulty: string;
  alarms: Alarm[];
};

export default function RoutineCreation() {
  const [routineName, setRoutineName] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [alarms, setAlarms] = useState<Alarm[]>([
    { date: undefined, time: "" },
  ]);

  const [savedRoutine, setSavedRoutine] = useState<Routine | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("savedRoutine");
    if (stored) {
      setSavedRoutine(JSON.parse(stored));
    }
  }, []);

  const isFormComplete =
    routineName &&
    duration &&
    difficulty &&
    alarms.every((a) => a.date && a.time);

  const handleSave = () => {
    if (!isFormComplete) return alert("Complete all fields!");

    const routine: Routine = {
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
  };

  const handleEdit = () => {
    if (!savedRoutine) return;

    setRoutineName(savedRoutine.routineName);
    setDuration(savedRoutine.duration);
    setDifficulty(savedRoutine.difficulty);
    setAlarms(savedRoutine.alarms);
    setSavedRoutine(null);
  };

  return (
    <div className="min-h-[519px] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">

        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Yoga Routine Creator
        </h1>

        {!savedRoutine ? (
          <div className="space-y-5">

            <div>
              <Label className="text-white">Routine Name</Label>
              <Input
                className="mt-1 bg-white/10 text-white border-white/20"
                value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-white">Duration</Label>
              <Select onValueChange={setDuration}>
                <SelectTrigger className="bg-white/10 text-white border-white/20">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {["5 min", "10 min", "15 min", "30 min", "1 hour"].map(
                    (t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white">Difficulty</Label>
              <Select onValueChange={setDifficulty}>
                <SelectTrigger className="bg-white/10 text-white border-white/20">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {["Beginner", "Intermediate", "Advanced"].map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* ALARMS */}
            <div>
              <Label className="text-white">Alarms</Label>

              {alarms.map((a, i) => (
                <div key={i} className="flex gap-3 items-center mt-2">

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "bg-white/10 text-white border-white/20",
                          !a.date && "text-gray-300"
                        )}
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {a.date ? format(a.date, "PPP") : "Pick Date"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={a.date}
                        onSelect={(d) => {
                          setAlarms((prev) =>
                            prev.map((item, idx) =>
                              idx === i ? { ...item, date: d } : item
                            )
                          );
                        }}
                      />
                    </PopoverContent>
                  </Popover>

                  <Input
                    type="time"
                    className="w-28 bg-white/10 text-white border-white/20"
                    value={a.time}
                    onChange={(e) => {
                      const copy = [...alarms];
                      copy[i] = { ...copy[i], time: e.target.value };
                      setAlarms(copy);
                    }}
                  />

                  {i > 0 && (
                    <Trash2
                      className="text-red-400 cursor-pointer"
                      onClick={() =>
                        setAlarms(alarms.filter((_, idx) => idx !== i))
                      }
                    />
                  )}
                </div>
              ))}

              <Button
                onClick={() =>
                  setAlarms([...alarms, { date: undefined, time: "" }])
                }
                className="mt-3 bg-white/10 text-white border border-white/20"
              >
                + Add Alarm
              </Button>
            </div>

            <Button
              onClick={handleSave}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              Save Routine
            </Button>

          </div>
        ) : (
          <div className="text-white space-y-4">

            <h2 className="text-xl text-center font-semibold">
              Saved Routine
            </h2>

            <div className="bg-white/10 p-4 rounded-xl space-y-2">
              <p><b>Name:</b> {savedRoutine.routineName}</p>
              <p><b>Duration:</b> {savedRoutine.duration}</p>
              <p><b>Level:</b> {savedRoutine.difficulty}</p>
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={handleEdit}>
                <Pencil />
              </Button>

              <Button variant="ghost" onClick={() => setSavedRoutine(null)}>
                <Trash2 className="text-red-400" />
              </Button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}