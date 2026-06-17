"use client";

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export default function Groupsession() {
  const [socket, setSocket] = useState<any>(null);
  const [role, setRole] = useState("join");
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // ✅ SOCKET FIX
  useEffect(() => {
    const socketIo = io({
      path: "/api/socket",
      transports: ["websocket"],
    });

    setSocket(socketIo);

    socketIo.on("chatMessage", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    socketIo.on("connect_error", (err) => {
      console.log("Socket error:", err.message);
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  // ---------------- STREAM ----------------
  const startStreaming = async () => {
    try {
      setIsStreaming(true);

      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      stream.getTracks().forEach((track) => {
        peerConnection.current?.addTrack(track, stream);
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Camera permission denied or not available");
    }
  };

  const stopStreaming = () => {
    setIsStreaming(false);

    streamRef.current?.getTracks().forEach((t) => t.stop());

    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    peerConnection.current?.close();
    peerConnection.current = null;
  };

  // ---------------- CONTROLS ----------------
  const toggleMic = () => {
    const audio = streamRef.current?.getAudioTracks()[0];
    if (audio) {
      audio.enabled = !audio.enabled;
      setIsMicOn(audio.enabled);
    }
  };

  const toggleCamera = () => {
    const video = streamRef.current?.getVideoTracks()[0];
    if (video) {
      video.enabled = !video.enabled;
      setIsCameraOn(video.enabled);
    }
  };

  // ---------------- CHAT ----------------
  const sendMessage = () => {
    if (!message.trim() || !socket) return;

    socket.emit("chatMessage", message);
    setMessages((prev) => [...prev, message]);
    setMessage("");
  };

  return (
    <div className="min-h-[519px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-4">

      {/* HEADER */}
      <div className="text-center mb-5">
        <h1 className="text-4xl font-black">Group Yoga Session</h1>
        <p className="text-slate-400 mt-2">
          Join, stream & meditate together
        </p>
      </div>

      {/* ROLE */}
      {!role && (
        <div className="flex justify-center">
          <button
            onClick={() => setRole("join")}
            className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-semibold shadow-lg"
          >
            Join Session
          </button>
        </div>
      )}

      {/* MAIN */}
      {role && (
        <div className="grid md:grid-cols-3 gap-6">

          {/* VIDEO SECTION */}
          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

            <div className="grid grid-cols-2 gap-4">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                className="h-72 w-full rounded-2xl bg-black border border-white/10"
              />
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="h-72 w-full rounded-2xl bg-black border border-white/10"
              />
            </div>

            {/* CONTROLS */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center">

              {!isStreaming ? (
                <button
                  onClick={startStreaming}
                  className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-semibold"
                >
                  Join Stream
                </button>
              ) : (
                <button
                  onClick={stopStreaming}
                  className="px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 font-semibold"
                >
                  Stop
                </button>
              )}

              <button
                onClick={toggleMic}
                className={`px-5 py-3 rounded-xl ${
                  isMicOn ? "bg-slate-700" : "bg-red-500"
                }`}
              >
                {isMicOn ? "Mute Mic" : "Unmute"}
              </button>

              <button
                onClick={toggleCamera}
                className={`px-5 py-3 rounded-xl ${
                  isCameraOn ? "bg-slate-700" : "bg-red-500"
                }`}
              >
                {isCameraOn ? "Camera Off" : "Camera On"}
              </button>
            </div>
          </div>

          {/* CHAT */}
          {isStreaming && (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl flex flex-col">

              <h2 className="text-xl font-bold mb-4">Live Chat</h2>

              <div className="flex-1 overflow-y-auto space-y-2 max-h-[400px]">
                {messages.map((msg, i) => (
                  <div key={i} className="bg-white/10 px-3 py-2 rounded-xl">
                    {msg}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-white/10"
                  placeholder="Type message..."
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-3 rounded-xl bg-blue-500 hover:bg-blue-600"
                >
                  Send
                </button>
              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
}