"use client";

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// grop session

export default function Groupsession() {
  const [socket, setSocket] = useState<any>(null);
  const [role, setRole] = useState(""); // "host" or "join"
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const socketIo = io("http://localhost:3000", { path: "/api/socket" });
    setSocket(socketIo);

    socketIo.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const startStreaming = async () => {
    setIsStreaming(true);
    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    streamRef.current = stream;
    stream.getTracks().forEach((track) => peerConnection.current?.addTrack(track, stream));

    if (localVideoRef.current) localVideoRef.current.srcObject = stream;
  };

  const stopStreaming = () => {
    setIsStreaming(false);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    peerConnection.current?.close();
    peerConnection.current = null;
  };

  const toggleMic = () => {
    const audioTrack = streamRef.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
    }
  };

  const toggleCamera = () => {
    const videoTrack = streamRef.current?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsCameraOn(videoTrack.enabled);
    }
  };

  const sendMessage = () => {
    if (message.trim() === "" || !socket) return;
  
    // Emit the message
    socket.emit("chatMessage", message);
  
    // Show own message immediately
    setMessages((prev) => [...prev, message]);
  
    // Clear input
    setMessage("");
  
  
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-5">
      <h1 className="text-2xl font-bold mb-4">Live Yoga Group Session</h1>

      {/* Select Role */}
      {!role && (
        <div className="mb-4 flex items-center justify-center space-x-7 ">
          {/* <p className="text-lg mb-2">Select your role:</p> */}
          {/* <button onClick={() => setRole("host")} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Host a Session
          </button> */}
          <button onClick={() => setRole("join")} className="bg-green-500 text-white px-4 py-2 rounded">
            Join a Session
          </button>
        </div>
      )}

      {/* Video Streaming */}
      {role && (
  <div className="flex gap-6 mt-6">
    {/* Left Side: Video and Controls */}
    <div className="flex-1">
      <div className="flex gap-4 mb-4">
        <video ref={localVideoRef} autoPlay playsInline className="w-1/2 border rounded-lg" />
        <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2 border rounded-lg" />
      </div>

      <div className="flex gap-4">
        {!isStreaming ? (
          <button
            onClick={startStreaming}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            join Stream
          </button>
        ) : (
          <button
            onClick={stopStreaming}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Stop Streaming
          </button>
        )}

        <button
          onClick={toggleMic}
          className={`px-4 py-2 rounded ${isMicOn ? "bg-gray-500" : "bg-red-500 text-white"}`}
        >
          {isMicOn ? "Mute Mic" : "Unmute Mic"}
        </button>

        <button
          onClick={toggleCamera}
          className={`px-4 py-2 rounded ${isCameraOn ? "bg-gray-500" : "bg-red-500 text-white"}`}
        >
          {isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
        </button>
      </div>
    </div>

    {/* Right Side: Chat Box */}
    {/* Right Side: Chat Box - Only show when streaming */}
{isStreaming && (
  <div className="w-1/3  p-4 rounded  h-fit">
    <h2 className="text-xl font-semibold mb-2">Live Chat</h2>
    <div className="h-64 overflow-y-auto border p-2 rounded bg-white mb-2">
      {messages.map((msg, index) => (
        <p key={index} className="text-sm p-1 rounded mb-1 border-b">
          {msg}
        </p>
      ))}
    </div>
    <div className="flex">
    <input
  type="text"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }}
  className="flex-1 p-2 border rounded"
  placeholder="Type a message..."
/>

      <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
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
