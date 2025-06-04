"use client"
import React from "react";

import { useState, useEffect } from "react"
import { Database, Globe, Settings, Sliders, PlayCircle, HelpCircle, Plane, Home, Play, ArrowUp, MapPin, Compass, Power, AlertTriangle, BarChart2, Layers, ChevronRight, Wifi, Clock, Shield, Zap, Cpu, Menu, X } from 'lucide-react'
import { FaBolt, FaCog, FaEnvelope, FaPlane, FaChartBar } from "react-icons/fa";
import DroneMap from "./DroneMap"
import NavButton from "./NavButton"
import ActionButton from "./ActionButton"
import TabButton from "./TabButton"
import TelemetryItem from "./TelemetryItem"

export default function DivyalinkInterface({ logs, telemetry, land, takeoff, changeAltitude }) {
  const [connected, setConnected] = useState(false)
  const [currentTime, setCurrentTime] = useState("00:00:00")
  const [activeTab, setActiveTab] = useState("DATA")
  const [isArmed, setIsArmed] = useState(false)
  const [flyHereMode, setFlyHereMode] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [activeTabButton, setActiveTabButton] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [droneData, setDroneData] = useState({
    altitude: 120.5,
    groundSpeed: 15.3,
    verticalSpeed: 1.2,
    yaw: 45.0,
    satellites: 8,
  })

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date()
      const time = date.toLocaleTimeString()
      setCurrentTime(time)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Handle navigation button clicks
  const handleNavClick = (tabName) => {
    setActiveTab(tabName)
    setSidebarOpen(false)
    setTimeout(() => setStatusMessage(""), 3000)
  }

  // Handle tab button clicks
  const handleTabButtonClick = (tabName) => {
    setActiveTabButton(tabName)
    setTimeout(() => setStatusMessage(""), 3000)
  }

  // Toggle arm/disarm
  const toggleArmed = () => {
    setIsArmed(!isArmed)
    setStatusMessage(isArmed ? "Drone disarmed successfully." : "Drone armed successfully. Ready for flight.")
    setTimeout(() => setStatusMessage(""), 3000)
  }

  // Handle action buttons
  const handleTakeoff = () => {
    setStatusMessage("Takeoff initiated. Ascending to 10m altitude.")
    setTimeout(() => setStatusMessage(""), 3000)
  }

  const handleLand = () => {
    setStatusMessage("Landing sequence initiated. Preparing for descent.")
    setTimeout(() => setStatusMessage(""), 3000)
  }

  const handleMissionStart = () => {
    setStatusMessage("Mission started. Executing pre-programmed flight plan.")
    setTimeout(() => setStatusMessage(""), 3000)
  }

  const handleReturnHome = () => {
    setStatusMessage("Return to home activated. Returning to launch point.")
    setTimeout(() => setStatusMessage(""), 3000)
  }

  const handleChangeAltitude = () => {
    setStatusMessage("Altitude change requested. Adjusting flight level.")
    setTimeout(() => setStatusMessage(""), 3000)
  }

  const toggleFlyHereMode = () => {
    setFlyHereMode(!flyHereMode)
    setStatusMessage(
      flyHereMode ? "Fly Here mode deactivated." : "Fly Here mode activated. Click on map to set destination.",
    )
    setTimeout(() => setStatusMessage(""), 3000)
  }

  // Sidebar navigation items
  const navItems = [
    { id: "DATA", label: "DATA", icon: <Database size={22} /> },
    { id: "PLAN", label: "PLAN", icon: <Globe size={22} /> },
    { id: "SETUP", label: "SETUP", icon: <Settings size={22} /> },
    { id: "CONFIG", label: "CONFIG", icon: <Sliders size={22} /> },
    { id: "SIMULATION", label: "SIMULATION", icon: <PlayCircle size={22} /> },
    { id: "HELP", label: "HELP", icon: <HelpCircle size={22} /> },
  ]

  return (
    <div className="fixed inset-0 flex flex-col bg-black text-white select-none font-sans">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center bg-gradient-to-r from-slate-900/90 via-gray-900/80 to-slate-800/90 p-4 border-b border-slate-700/30 shadow-2xl backdrop-blur-md">
        {/* Left Section: Hamburger Menu */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-full text-slate-100 bg-gradient-to-br from-slate-800/50 to-slate-700/50 hover:from-slate-700/70 hover:to-slate-600/70 hover:text-white transition-all duration-300 shadow-lg hover:shadow-glow"
        >
          <Menu size={24} />
        </button>

        {/* Right Section: Branding and Connection Status */}
        <div className="flex items-center space-x-6">
          <div className="relative text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 tracking-tighter animate-gradient-shift">
            DIVYALINK
            <span className="absolute -bottom-2 left-0 text-xs text-slate-200 font-light tracking-widest opacity-90">
              by Vayunotics
            </span>
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-teal-500/30 blur-xl opacity-70 animate-pulse-slow"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-teal-500/20 blur-md opacity-50 animate-pulse-slow"></div>
          </div>
          <div className="flex items-center space-x-4 bg-gradient-to-br from-slate-900/80 to-gray-950/80 px-5 py-3 rounded-2xl border border-slate-600/50 shadow-xl backdrop-blur-lg hover:shadow-glow transition-all duration-300">
            <select className="bg-transparent text-slate-100 text-sm font-semibold focus:outline-none cursor-pointer appearance-none pr-8 hover:text-white transition-colors duration-200">
              <option value="115200">115200</option>
              <option value="57600">57600</option>
              <option value="9600">9600</option>
            </select>
            <div className="h-6 w-px bg-gradient-to-b from-cyan-500/60 to-transparent"></div>
            <div
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => setConnected(!connected)}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  connected
                    ? "bg-emerald-400 shadow-glow animate-pulse-fast"
                    : "bg-red-400 shadow-md"
                }`}
              ></div>
              <span className="text-sm font-semibold text-cyan-200 group-hover:text-white transition-colors duration-200">
                {connected ? "LINKED" : "CONNECT"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Message Bar */}
      {statusMessage && (
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-2 text-center text-sm font-medium shadow-md">
          <div className="max-w-4xl mx-auto flex items-center justify-center space-x-2">
            <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500/50 animate-[progress_3s_ease-in-out]"></div>
            </div>
            <span className="whitespace-nowrap">{statusMessage}</span>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900/95 to-gray-900/90 border-r border-slate-700/50 shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b border-slate-700/50">
          <div className="text-xl font-bold text-cyan-300">Navigation</div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-full text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 text-white font-medium'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <span className={`${activeTab === item.id ? 'text-cyan-400' : ''}`}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/3 border-r border-slate-800/50 flex flex-col bg-gradient-to-b from-slate-900 to-gray-900 shadow-xl">
      {/* Attitude Indicator with enhanced visual effects */}
      <div className="relative h-1/2 bg-gradient-to-b from-slate-950 via-gray-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative w-80 h-80">
            {/* Improved 3D Sphere Effect with subtle glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800/70 to-slate-950/90 border border-slate-700/40 shadow-lg shadow-cyan-900/20" />

            {/* Enhanced Horizon Disk with better contrast */}
            <div className="absolute inset-0 rounded-full overflow-hidden transform-gpu">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-700/60 via-blue-500/30 to-amber-600/50 backdrop-blur-md" />
              <div className="absolute inset-0 border border-cyan-500/40 rounded-full shadow-inner shadow-cyan-900/30" />
            </div>

            {/* Improved Crosshair with subtle animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-0.5 bg-cyan-400 rounded-full animate-pulse-slow opacity-80" />
              <div className="h-24 w-0.5 bg-cyan-400 rounded-full animate-pulse-slow opacity-80" />
            </div>

            {/* More visible Pitch Lines */}
            <div className="absolute top-[40%] inset-x-0 h-px bg-cyan-400/40" />
            <div className="absolute top-[45%] inset-x-0 h-px bg-cyan-400/60" />
            <div className="absolute top-[55%] inset-x-0 h-px bg-cyan-400/60" />
            <div className="absolute top-[60%] inset-x-0 h-px bg-cyan-400/40" />

            {/* Enhanced Status Overlay with subtle glass effect */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950/95 to-transparent backdrop-blur-md border-t border-slate-700/20">
              <div className="flex justify-between items-center px-4">
                <div
                  className={`text-sm font-semibold tracking-wider ${
                    isArmed ? "text-emerald-400" : "text-red-400"
                  } flex items-center space-x-2`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isArmed
                        ? "bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50"
                        : "bg-red-500 animate-pulse shadow-sm shadow-red-500/50"
                    }`}
                  />
                  <span>{isArmed ? "ARMED" : "DISARMED"}</span>
                </div>
                <div className="text-sm text-cyan-300 font-semibold tracking-wider">
                  {telemetry.altitude || 0}m
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Improved with better contrast and visual feedback */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-slate-950 via-gray-900 to-slate-900 border-t border-slate-700/50 backdrop-blur-xl shadow-xl z-40">
        <div className="flex justify-around items-center py-4 px-6 max-w-7xl mx-auto">
          <TabButton
            label="Quick"
            icon={<FaBolt size={22} className="text-cyan-400" />}
            active={activeTabButton === "Quick"}
            onClick={() => handleTabButtonClick("Quick")}
          />
          <TabButton
            label="Actions"
            icon={<FaCog size={22} className="text-cyan-400" />}
            active={activeTabButton === "Actions"}
            onClick={() => handleTabButtonClick("Actions")}
          />
          <TabButton
            label="Messages"
            icon={<FaEnvelope size={22} className="text-cyan-400" />}
            active={activeTabButton === "Messages"}
            onClick={() => handleTabButtonClick("Messages")}
          />
          <TabButton
            label="FlightPlan"
            icon={<FaPlane size={22} className="text-cyan-400" />}
            active={activeTabButton === "FlightPlan"}
            onClick={() => handleTabButtonClick("FlightPlan")}
          />
          <TabButton
            label="Status"
            icon={<FaChartBar size={22} className="text-cyan-400" />}
            active={activeTabButton === "Status"}
            onClick={() => handleTabButtonClick("Status")}
          />
        </div>
      </div>

      {/* Left Side Content - Only display when a tab is active */}
      <div className="flex-1 overflow-auto">
        {activeTabButton ? (
          <>
            {activeTabButton === "Actions" ? (
              <div className="p-5 pb-24 space-y-6 bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900">
                <div className="grid grid-cols-2 gap-4">
                  <ActionButton
                    icon={
                      <Plane className="transform hover:scale-110 transition-transform" size={24} />
                    }
                    label="TAKEOFF"
                    onClick={takeoff}
                    className="bg-gradient-to-br from-emerald-700 to-emerald-900 hover:from-emerald-600 hover:to-emerald-800 shadow-lg shadow-emerald-900/30"
                  />
                  <ActionButton
                    icon={
                      <Plane
                        className="transform rotate-180 hover:scale-110 transition-transform"
                        size={24}
                      />
                    }
                    label="LAND"
                    onClick={land}
                    className="bg-gradient-to-br from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 shadow-lg shadow-amber-900/30"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <ActionButton
                    icon={
                      <Play className="transform hover:scale-110 transition-transform" size={24} />
                    }
                    label="MISSION START"
                    onClick={handleMissionStart}
                    className="bg-gradient-to-br from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 shadow-lg shadow-blue-900/30"
                  />
                  <ActionButton
                    icon={
                      <Home className="transform hover:scale-110 transition-transform" size={24} />
                    }
                    label="RETURN HOME"
                    onClick={handleReturnHome}
                    className="bg-gradient-to-br from-indigo-700 to-indigo-900 hover:from-indigo-600 hover:to-indigo-800 shadow-lg shadow-indigo-900/30"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <ActionButton
                    icon={
                      <ArrowUp
                        className="transform hover:scale-110 transition-transform"
                        size={24}
                      />
                    }
                    label="CHANGE ALTITUDE"
                    onClick={changeAltitude}
                    className="bg-gradient-to-br from-violet-700 to-violet-900 hover:from-violet-600 hover:to-violet-800 shadow-lg shadow-violet-900/30"
                  />
                  <ActionButton
                    icon={
                      <MapPin
                        className="transform hover:scale-110 transition-transform"
                        size={24}
                      />
                    }
                    label="FLY HERE"
                    onClick={toggleFlyHereMode}
                    className={`${
                      flyHereMode
                        ? "bg-gradient-to-br from-pink-700 to-pink-900 hover:from-pink-600 hover:to-pink-800 shadow-lg shadow-pink-900/30"
                        : "bg-gradient-to-br from-cyan-700 to-cyan-900 hover:from-cyan-600 hover:to-cyan-800 shadow-lg shadow-cyan-900/30"
                    }`}
                  />
                </div>
              </div>
            ) : activeTabButton === "Messages" ? (
              <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900">
                <div className="bg-slate-800 p-3 text-center font-semibold text-slate-200 border-b border-slate-700/50 backdrop-blur-md flex items-center justify-center space-x-2 shadow-md">
                  <BarChart2 size={16} className="text-cyan-400" />
                  <span className="tracking-wider">SYSTEM MESSAGES</span>
                </div>
                <div className="p-5 pb-24 space-y-3 flex-1 overflow-auto">
                  {logs.map((log, index) => (
                    <div
                      key={index}
                      className="p-4 bg-slate-800/80 rounded-xl hover:bg-slate-700/80 transition-all duration-200 border border-slate-700/40 shadow-md hover:shadow-lg hover:shadow-cyan-900/10"
                    >
                      <div className="text-xs text-cyan-400 flex items-center space-x-2">
                        <Clock size={12} />
                        <span>{new Date().toLocaleTimeString()}</span>
                      </div>
                      <div className="text-sm text-slate-200 mt-1 leading-relaxed">{log}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeTabButton === "FlightPlan" ? (
              <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900">
                <div className="bg-slate-800 p-3 text-center font-semibold text-slate-200 border-b border-slate-700/50 backdrop-blur-md flex items-center justify-center space-x-2 shadow-md">
                  <Layers size={16} className="text-cyan-400" />
                  <span className="tracking-wider">FLIGHT PLAN EDITOR</span>
                </div>
                <div className="p-5 pb-24 flex-1 overflow-auto space-y-5">
                  <div>
                    <div className="text-sm font-semibold text-slate-200 mb-3 flex items-center space-x-2 pl-1">
                      <MapPin size={14} className="text-cyan-400" />
                      <span className="tracking-wider">WAYPOINTS</span>
                    </div>
                    <div className="space-y-3">
                      {["Waypoint 1", "Waypoint 2", "Waypoint 3"].map((wp, i) => (
                        <div
                          key={i}
                          className="p-4 bg-slate-800/80 rounded-xl flex justify-between items-center border border-slate-700/40 hover:bg-slate-700/80 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-cyan-900/10"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-cyan-500/20">
                              {i + 1}
                            </div>
                            <span className="text-sm text-slate-200 font-medium">{wp}</span>
                          </div>
                          <span className="text-xs text-slate-400 font-mono">28.61{i + 3}9, 77.20{i + 9}0</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200 mb-3 flex items-center space-x-2 pl-1">
                      <Settings size={14} className="text-cyan-400" />
                      <span className="tracking-wider">MISSION PARAMETERS</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/40 shadow-md hover:shadow-lg hover:bg-slate-700/80 transition-all duration-300">
                        <div className="text-xs text-slate-400">Altitude</div>
                        <div className="text-sm text-slate-200 flex items-center space-x-1 mt-1 font-medium">
                          <ArrowUp size={12} className="text-cyan-400" />
                          <span>50 meters</span>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/40 shadow-md hover:shadow-lg hover:bg-slate-700/80 transition-all duration-300">
                        <div className="text-xs text-slate-400">Speed</div>
                        <div className="text-sm text-slate-200 flex items-center space-x-1 mt-1 font-medium">
                          <Zap size={12} className="text-cyan-400" />
                          <span>15 m/s</span>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/40 shadow-md hover:shadow-lg hover:bg-slate-700/80 transition-all duration-300">
                        <div className="text-xs text-slate-400">Mission Type</div>
                        <div className="text-sm text-slate-200 flex items-center space-x-1 mt-1 font-medium">
                          <Compass size={12} className="text-cyan-400" />
                          <span>Survey</span>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/40 shadow-md hover:shadow-lg hover:bg-slate-700/80 transition-all duration-300">
                        <div className="text-xs text-slate-400">Duration</div>
                        <div className="text-sm text-slate-200 flex items-center space-x-1 mt-1 font-medium">
                          <Clock size={12} className="text-cyan-400" />
                          <span>~15 minutes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 rounded-xl text-white font-semibold flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-102 shadow-lg shadow-blue-900/30 border border-blue-500/20">
                    <Shield size={16} className="text-cyan-200" />
                    <span className="tracking-wider">SAVE FLIGHT PLAN</span>
                  </button>
                </div>
              </div>
            ) : activeTabButton === "Status" ? (
              <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900">
                <div className="bg-slate-800 p-3 text-center font-semibold text-slate-200 border-b border-slate-700/50 backdrop-blur-md flex items-center justify-center space-x-2 shadow-md">
                  <AlertTriangle size={16} className="text-cyan-400" />
                  <span className="tracking-wider">SYSTEM STATUS</span>
                </div>
                <div className="p-5 pb-24 flex-1 overflow-auto space-y-5">
                  <div className="p-5 bg-slate-800/90 rounded-xl border border-slate-700/40 shadow-lg">
                    <div className="text-sm font-semibold text-slate-200 mb-3 flex items-center space-x-2">
                      <Cpu size={14} className="text-cyan-400" />
                      <span className="tracking-wider">HARDWARE</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg hover:bg-slate-700/50 transition-all duration-200">
                        <span className="text-slate-300 flex items-center space-x-2">
                          <Cpu size={14} className="text-cyan-400" />
                          <span>CPU</span>
                        </span>
                        <span className="text-emerald-400 flex items-center space-x-3">
                          <div className="w-20 h-2 bg-slate-600/80 rounded-full overflow-hidden shadow-inner">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                              style={{ width: "32%" }}
                            />
                          </div>
                          <span className="font-medium">32%</span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg hover:bg-slate-700/50 transition-all duration-200">
                        <span className="text-slate-300 flex items-center space-x-2">
                          <Layers size={14} className="text-cyan-400" />
                          <span>Memory</span>
                        </span>
                        <span className="text-emerald-400 flex items-center space-x-3">
                          <div className="w-20 h-2 bg-slate-600/80 rounded-full overflow-hidden shadow-inner">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                              style={{ width: "45%" }}
                            />
                          </div>
                          <span className="font-medium">45%</span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg hover:bg-slate-700/50 transition-all duration-200">
                        <span className="text-slate-300 flex items-center space-x-2">
                          <Database size={14} className="text-cyan-400" />
                          <span>Storage</span>
                        </span>
                        <span className="text-emerald-400 font-medium">12GB free</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg hover:bg-slate-700/50 transition-all duration-200">
                        <span className="text-slate-300 flex items-center space-x-2">
                          <Zap size={14} className="text-cyan-400" />
                          <span>Temperature</span>
                        </span>
                        <span className="text-amber-400 font-medium">42°C</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-slate-800/90 rounded-xl border border-slate-700/40 shadow-lg">
                    <div className="text-sm font-semibold text-slate-200 mb-3 flex items-center space-x-2">
                      <Settings size={14} className="text-cyan-400" />
                      <span className="tracking-wider">SENSORS</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg hover:bg-slate-700/50 transition-all duration-200">
                        <span className="text-slate-300 flex items-center space-x-2">
                          <Globe size={14} className="text-cyan-400" />
                          <span>GPS</span>
                        </span>
                        <span className="text-emerald-400 font-medium">8 satellites</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg hover:bg-slate-700/50 transition-all duration-200">
                        <span className="text-slate-300 flex items-center space-x-2">
                          <Compass size={14} className="text-cyan-400" />
                          <span>IMU</span>
                        </span>
                        <span className="text-emerald-400 font-medium">Calibrated</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg hover:bg-slate-700/50 transition-all duration-200">
                        <span className="text-slate-300 flex items-center space-x-2">
                          <ArrowUp size={14} className="text-cyan-400" />
                          <span>Barometer</span>
                        </span>
                        <span className="text-emerald-400 font-medium">Normal</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg hover:bg-slate-700/50 transition-all duration-200">
                        <span className="text-slate-300 flex items-center space-x-2">
                          <Compass size={14} className="text-cyan-400" />
                          <span>Compass</span>
                        </span>
                        <span className="text-amber-400 font-medium">Needs Calibration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // "Quick" tab or any default telemetry view
              <div className="p-5 pb-24 bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900">
                <div className="grid grid-cols-2 gap-4">
                  <TelemetryItem
                    label="ALTITUDE (m)"
                    value={telemetry.altitude || 0}
                    color="text-cyan-400"
                    icon={<ArrowUp size={16} className="text-cyan-400" />}
                  />
                  <TelemetryItem
                    label="GROUNDSPEED (m/s)"
                    value={telemetry.groundSpeed || 0}
                    color="text-blue-400"
                    icon={<Zap size={16} className="text-blue-400" />}
                  />
                  <TelemetryItem
                    label="DIST TO WP (m)"
                    value="0.00"
                    color="text-violet-400"
                    icon={<MapPin size={16} className="text-violet-400" />}
                  />
                  <TelemetryItem
                    label="YAW (deg)"
                    value={telemetry.yaw || 0}
                    color="text-amber-400"
                    icon={<Compass size={16} className="text-amber-400" />}
                  />
                  <TelemetryItem
                    label="VERTICAL SPEED (m/s)"
                    value={telemetry.verticalSpeed || 0}
                    color="text-emerald-400"
                    icon={<ArrowUp size={16} className="text-emerald-400" />}
                  />
                  <TelemetryItem
                    label="LATITUDE"
                    value={telemetry.latitude || 0}
                    color="text-indigo-400"
                    icon={<Globe size={16} className="text-indigo-400" />}
                  />
                  <TelemetryItem
                    label="LONGITUDE"
                    value={telemetry.longitude || 0}
                    color="text-indigo-400"
                    icon={<Globe size={16} className="text-indigo-400" />}
                  />
                  <TelemetryItem
                    label="HEADING"
                    value={telemetry.heading || 0}
                    color="text-pink-400"
                    icon={<Compass size={16} className="text-pink-400" />}
                  />
                </div>
                <div className="mt-8 flex justify-center">
                  <button
                    className={`px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center space-x-3 hover:scale-105 ${
                      isArmed
                        ? "bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 shadow-lg shadow-red-900/30 border border-red-600/30"
                        : "bg-gradient-to-r from-emerald-700 to-emerald-900 hover:from-emerald-600 hover:to-emerald-800 shadow-lg shadow-emerald-900/30 border border-emerald-600/30"
                    }`}
                    onClick={toggleArmed}
                  >
                    <Power size={20} className={isArmed ? "text-red-300" : "text-emerald-300"} />
                    <span className="tracking-wider">{isArmed ? "DISARM" : "ARM"}</span>
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          // Nothing is shown on the left side until a tab is selected.
          <div className="flex items-center justify-center h-full text-slate-400">
            <span className="text-lg">Select a tab below to view details</span>
          </div>
        )}
      </div>
    </div>

        {/* Right Panel with modern styling */}
        <div className="w-2/3 bg-slate-900 flex flex-col">
          {activeTab === "PLAN" ? (
            <DroneMap
              dronePosition={[28.6139, 77.209]}
              droneData={telemetry}
              batteryLevel={75}
              connectionStatus={{
                baud: 115200,
                port: "COM4",
                status: connected ? "CONNECTED" : "DISCONNECTED",
              }}
            />
          ) : activeTab === "SETUP" ? (
            // Setup View with modern styling
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-900 to-slate-800">
              <div className="w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-6 text-cyan-300 text-center flex items-center justify-center space-x-2">
                  <Settings size={20} className="text-cyan-400" />
                  <span>DRONE SETUP</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/70 p-4 rounded-lg border border-slate-700/50 shadow-lg">
                    <h3 className="text-lg font-bold mb-4 text-cyan-300 flex items-center space-x-2">
                      <Sliders size={16} className="text-cyan-400" />
                      <span>FLIGHT PARAMETERS</span>
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-300 mb-1 flex items-center space-x-1">
                          <ArrowUp size={12} />
                          <span>Maximum Altitude</span>
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="500"
                          defaultValue="120"
                          className="w-full h-2 bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500"
                          onChange={() => {
                            setStatusMessage("Maximum altitude updated.")
                            setTimeout(() => setStatusMessage(""), 3000)
                          }}
                        />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>10m</span>
                          <span>120m</span>
                          <span>500m</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-300 mb-1 flex items-center space-x-1">
                          <Zap size={12} />
                          <span>Maximum Speed</span>
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          defaultValue="10"
                          className="w-full h-2 bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500"
                          onChange={() => {
                            setStatusMessage("Maximum speed updated.")
                            setTimeout(() => setStatusMessage(""), 3000)
                          }}
                        />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>1m/s</span>
                          <span>10m/s</span>
                          <span>20m/s</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-300 mb-1 flex items-center space-x-1">
                          <Home size={12} />
                          <span>Return Altitude</span>
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="200"
                          defaultValue="50"
                          className="w-full h-2 bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500"
                          onChange={() => {
                            setStatusMessage("Return altitude updated.")
                            setTimeout(() => setStatusMessage(""), 3000)
                          }}
                        />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>10m</span>
                          <span>50m</span>
                          <span>200m</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/70 p-4 rounded-lg border border-slate-700/50 shadow-lg">
                    <h3 className="text-lg font-bold mb-4 text-cyan-300 flex items-center space-x-2">
                      <Shield size={16} className="text-cyan-400" />
                      <span>SAFETY SETTINGS</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                        <label className="text-sm flex items-center space-x-1">
                          <MapPin size={12} className="text-cyan-400" />
                          <span>Geofencing</span>
                        </label>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-slate-700">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                            onChange={() => {
                              setStatusMessage("Geofencing toggled.")
                              setTimeout(() => setStatusMessage(""), 3000)
                            }}
                          />
                          <span className="block w-6 h-6 bg-cyan-500 rounded-full transform translate-x-6 peer-checked:translate-x-6 peer-checked:bg-cyan-500 transition-all shadow-md"></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                        <label className="text-sm flex items-center space-x-1">
                          <Home size={12} className="text-cyan-400" />
                          <span>Return on Low Battery</span>
                        </label>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-slate-700">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                            onChange={() => {
                              setStatusMessage("Return on low battery toggled.")
                              setTimeout(() => setStatusMessage(""), 3000)
                            }}
                          />
                          <span className="block w-6 h-6 bg-cyan-500 rounded-full transform translate-x-6 peer-checked:translate-x-6 peer-checked:bg-cyan-500 transition-all shadow-md"></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                        <label className="text-sm flex items-center space-x-1">
                          <AlertTriangle size={12} className="text-cyan-400" />
                          <span>Obstacle Avoidance</span>
                        </label>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-slate-700">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                            onChange={() => {
                              setStatusMessage("Obstacle avoidance toggled.")
                              setTimeout(() => setStatusMessage(""), 3000)
                            }}
                          />
                          <span className="block w-6 h-6 bg-cyan-500 rounded-full transform translate-x-6 peer-checked:translate-x-6 peer-checked:bg-cyan-500 transition-all shadow-md"></span>
                        </div>
                      </div>

                      <div className="p-2 bg-slate-700/30 rounded">
                        <label className="block text-sm text-slate-300 mb-1 flex items-center space-x-1">
                          <Zap size={12} className="text-cyan-400" />
                          <span>Low Battery Threshold</span>
                        </label>
                        <div className="flex items-center">
                          <input
                            type="number"
                            min="10"
                            max="50"
                            defaultValue="20"
                            className="w-16 bg-slate-700 p-1 rounded border border-slate-600 focus:outline-none focus:border-cyan-500 text-center"
                            onChange={() => {
                              setStatusMessage("Battery threshold updated.")
                              setTimeout(() => setStatusMessage(""), 3000)
                            }}
                          />
                          <span className="ml-2">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-md font-bold shadow-lg shadow-blue-700/20 flex items-center space-x-2 transition-all"
                    onClick={() => {
                      setStatusMessage("Settings saved successfully.")
                      setTimeout(() => setStatusMessage(""), 3000)
                    }}
                  >
                    <Shield size={16} />
                    <span>SAVE SETTINGS</span>
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === "CONFIG" ? (
            // Config View with modern styling
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-900 to-slate-800">
              <div className="w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-6 text-cyan-300 text-center flex items-center justify-center space-x-2">
                  <Sliders size={20} className="text-cyan-400" />
                  <span>ADVANCED CONFIGURATION</span>
                </h2>

                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-slate-800/70 p-4 rounded-lg border border-slate-700/50 shadow-lg">
                    <h3 className="text-lg font-bold mb-4 text-cyan-300 flex items-center space-x-2">
                      <Cpu size={16} className="text-cyan-400" />
                      <span>FLIGHT CONTROLLER</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-300 mb-1 flex items-center space-x-1">
                            <ChevronRight size={12} className="text-cyan-400" />
                            <span>PID Roll P</span>
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            defaultValue="0.15"
                            className="w-full bg-slate-700 p-2 rounded border border-slate-600 focus:outline-none focus:border-cyan-500"
                            onChange={() => {
                              setStatusMessage("PID Roll P updated.")
                              setTimeout(() => setStatusMessage(""), 3000)
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-300 mb-1 flex items-center space-x-1">
                            <ChevronRight size={12} className="text-cyan-400" />
                            <span>PID Roll I</span>
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            defaultValue="0.05"
                            className="w-full bg-slate-700 p-2 rounded border border-slate-600 focus:outline-none focus:border-cyan-500"
                            onChange={() => {
                              setStatusMessage("PID Roll I updated.")
                              setTimeout(() => setStatusMessage(""), 3000)
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-300 mb-1 flex items-center space-x-1">
                            <ChevronRight size={12} className="text-cyan-400" />
                            <span>PID Pitch P</span>
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            defaultValue="0.15"
                            className="w-full bg-slate-700 p-2 rounded border border-slate-600 focus:outline-none focus:border-cyan-500"
                            onChange={() => {
                              setStatusMessage("PID Pitch P updated.")
                              setTimeout(() => setStatusMessage(""), 3000)
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-300 mb-1 flex items-center space-x-1">
                            <ChevronRight size={12} className="text-cyan-400" />
                            <span>PID Pitch I</span>
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            defaultValue="0.05"
                            className="w-full bg-slate-700 p-2 rounded border border-slate-600 focus:outline-none focus:border-cyan-500"
                            onChange={() => {
                              setStatusMessage("PID Pitch I updated.")
                              setTimeout(() => setStatusMessage(""), 3000)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/70 p-4 rounded-lg border border-slate-700/50 shadow-lg">
                    <h3 className="text-lg font-bold mb-4 text-cyan-300 flex items-center space-x-2">
                      <Settings size={16} className="text-cyan-400" />
                      <span>SENSOR CALIBRATION</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 p-2 rounded shadow-lg shadow-blue-700/20 flex items-center justify-center space-x-2 transition-all"
                          onClick={() => {
                            setStatusMessage("Accelerometer calibration started. Keep drone level.")
                            setTimeout(() => setStatusMessage(""), 3000)
                          }}
                        >
                          <Compass size={16} className="text-cyan-200" />
                          <span>Calibrate Accelerometer</span>
                        </button>
                        <button
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 p-2 rounded shadow-lg shadow-blue-700/20 flex items-center justify-center space-x-2 transition-all"
                          onClick={() => {
                            setStatusMessage("Compass calibration started. Rotate drone in all axes.")
                            setTimeout(() => setStatusMessage(""), 3000)
                          }}
                        >
                          <Compass size={16} className="text-cyan-200" />
                          <span>Calibrate Compass</span>
                        </button>
                        <button
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 p-2 rounded shadow-lg shadow-blue-700/20 flex items-center justify-center space-x-2 transition-all"
                          onClick={() => {
                            setStatusMessage("ESC calibration started. Remove propellers first!")
                            setTimeout(() => setStatusMessage(""), 3000)
                          }}
                        >
                          <Settings size={16} className="text-cyan-200" />
                          <span>Calibrate ESCs</span>
                        </button>
                        <button
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 p-2 rounded shadow-lg shadow-blue-700/20 flex items-center justify-center space-x-2 transition-all"
                          onClick={() => {
                            setStatusMessage("Radio calibration started. Move all sticks to extremes.")
                            setTimeout(() => setStatusMessage(""), 3000)
                          }}
                        >
                          <Wifi size={16} className="text-cyan-200" />
                          <span>Calibrate Radio</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-md font-bold shadow-lg shadow-blue-700/20 flex items-center space-x-2 transition-all"
                    onClick={() => {
                      setStatusMessage("Configuration saved successfully.")
                      setTimeout(() => setStatusMessage(""), 3000)
                    }}
                  >
                    <Shield size={16} className="text-cyan-200" />
                    <span>SAVE CONFIGURATION</span>
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === "SIMULATION" ? (
            // Simulation View with modern styling
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-900 to-slate-800">
              <div className="w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-6 text-cyan-300 text-center flex items-center justify-center space-x-2">
                  <PlayCircle size={20} className="text-cyan-400" />
                  <span>FLIGHT SIMULATION</span>
                </h2>

                <div className="bg-slate-800/70 p-6 rounded-lg mb-6 border border-slate-700/50 shadow-lg">
                  <p className="text-center mb-6 text-slate-300">
                    Test your flight plans and drone configurations in a safe simulated environment before real-world
                    deployment.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-cyan-300 flex items-center space-x-2">
                        <Globe size={16} className="text-cyan-400" />
                        <span>ENVIRONMENT SETTINGS</span>
                      </h3>

                      <div>
                        <label className="block text-sm text-slate-300 mb-1 flex items-center space-x-1">
                          <Compass size={12} className="text-cyan-400" />
                          <span>Wind Speed</span>
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          defaultValue="5"
                          className="w-full h-2 bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500"
                          onChange={() => {
                            setStatusMessage("Wind speed updated in simulation.")
                            setTimeout(() => setStatusMessage(""), 3000)
                          }}
                        />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>0 m/s</span>
                          <span>5 m/s</span>
                          <span>20 m/s</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-300 mb-1 flex items-center space-x-1">
                          <Compass size={12} className="text-cyan-400" />
                          <span>Wind Direction</span>
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="359"
                          defaultValue="180"
                          className="w-full h-2 bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500"
                          onChange={() => {
                            setStatusMessage("Wind direction updated in simulation.")
                            setTimeout(() => setStatusMessage(""), 3000)
                          }}
                        />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>0°</span>
                          <span>180°</span>
                          <span>359°</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                        <label className="text-sm flex items-center space-x-1">
                          <Globe size={12} className="text-cyan-400" />
                          <span>GPS Errors</span>
                        </label>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-slate-700">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            onChange={() => {
                              setStatusMessage("GPS errors toggled in simulation.")
                              setTimeout(() => setStatusMessage(""), 3000)
                            }}
                          />
                          <span className="block w-6 h-6 bg-cyan-500 rounded-full peer-checked:translate-x-6 transition-all shadow-md"></span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-cyan-300 flex items-center space-x-2">
                        <Play size={16} className="text-cyan-400" />
                        <span>SIMULATION CONTROLS</span>
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        <button
                          className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 p-3 rounded font-bold shadow-lg shadow-emerald-700/20 flex items-center justify-center space-x-2 transition-all"
                          onClick={() => {
                            setStatusMessage("Simulation started.")
                            setTimeout(() => setStatusMessage(""), 3000)
                          }}
                        >
                          <Play size={16} className="text-emerald-200" />
                          <span>START</span>
                        </button>
                        <button
                          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 p-3 rounded font-bold shadow-lg shadow-red-700/20 flex items-center justify-center space-x-2 transition-all"
                          onClick={() => {
                            setStatusMessage("Simulation stopped.")
                            setTimeout(() => setStatusMessage(""), 3000)
                          }}
                        >
                          <Power size={16} className="text-red-200" />
                          <span>STOP</span>
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-300 mb-1 flex items-center space-x-1">
                          <Clock size={12} className="text-cyan-400" />
                          <span>Simulation Speed</span>
                        </label>
                        <input
                          type="range"
                          min="0.5"
                          max="5"
                          step="0.5"
                          defaultValue="1"
                          className="w-full h-2 bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500"
                          onChange={() => {
                            setStatusMessage("Simulation speed updated.")
                            setTimeout(() => setStatusMessage(""), 3000)
                          }}
                        />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>0.5x</span>
                          <span>1x</span>
                          <span>5x</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700/50 shadow-lg">
                  <h3 className="text-lg font-bold mb-4 text-cyan-300 text-center flex items-center justify-center space-x-2">
                    <BarChart2 size={16} className="text-cyan-400" />
                    <span>SIMULATION RESULTS</span>
                  </h3>

                  <div className="h-48 bg-slate-900/80 rounded-lg mb-4 flex items-center justify-center border border-slate-700/50">
                    <p className="text-slate-500 flex items-center space-x-2">
                      <BarChart2 size={16} />
                      <span>Simulation data will appear here</span>
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-md font-bold shadow-lg shadow-blue-700/20 flex items-center space-x-2 transition-all"
                      onClick={() => {
                        setStatusMessage("Simulation report generated.")
                        setTimeout(() => setStatusMessage(""), 3000)
                      }}
                    >
                      <BarChart2 size={16} className="text-cyan-200" />
                      <span>GENERATE REPORT</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === "HELP" ? (
            // Help View with modern styling
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-900 to-slate-800">
              <div className="w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-6 text-cyan-300 text-center flex items-center justify-center space-x-2">
                  <HelpCircle size={20} className="text-cyan-400" />
                  <span>DIVYALINK HELP CENTER</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/70 p-4 rounded-lg border border-slate-700/50 shadow-lg">
                    <h3 className="text-lg font-bold mb-4 text-cyan-300 flex items-center space-x-2">
                      <Play size={16} className="text-cyan-400" />
                      <span>QUICK START GUIDE</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
                        <div className="font-bold flex items-center space-x-2">
                          <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold">
                            1
                          </div>
                          <span>Connect Your Drone</span>
                        </div>
                        <p className="text-sm text-slate-300 ml-7">
                          Use the CONNECT button in the top right to establish connection with your drone.
                        </p>
                      </div>
                      <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
                        <div className="font-bold flex items-center space-x-2">
                          <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold">
                            2
                          </div>
                          <span>Check Flight Status</span>
                        </div>
                        <p className="text-sm text-slate-300 ml-7">
                          Verify all systems are green in the DATA tab before proceeding.
                        </p>
                      </div>
                      <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
                        <div className="font-bold flex items-center space-x-2">
                          <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold">
                            3
                          </div>
                          <span>Plan Your Mission</span>
                        </div>
                        <p className="text-sm text-slate-300 ml-7">
                          Use the PLAN tab to set waypoints and configure your flight path.
                        </p>
                      </div>
                      <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
                        <div className="font-bold flex items-center space-x-2">
                          <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold">
                            4
                          </div>
                          <span>Arm and Fly</span>
                        </div>
                        <p className="text-sm text-slate-300 ml-7">
                          Use the ARM button to prepare for takeoff, then use TAKEOFF to begin your mission.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/70 p-4 rounded-lg border border-slate-700/50 shadow-lg">
                    <h3 className="text-lg font-bold mb-4 text-cyan-300 flex items-center space-x-2">
                      <HelpCircle size={16} className="text-cyan-400" />
                      <span>SUPPORT RESOURCES</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
                        <div className="font-bold flex items-center space-x-2">
                          <Database size={14} className="text-cyan-400" />
                          <span>Documentation</span>
                        </div>
                        <p className="text-sm text-slate-300 ml-6">
                          Access comprehensive user manuals and technical documentation.
                        </p>
                        <button
                          className="mt-2 px-3 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded text-sm shadow-md flex items-center space-x-1 ml-6"
                          onClick={() => {
                            setStatusMessage("Opening documentation...")
                            setTimeout(() => setStatusMessage(""), 3000)
                          }}
                        >
                          <Database size={12} className="text-cyan-200" />
                          <span>View Docs</span>
                        </button>
                      </div>
                      <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
                        <div className="font-bold flex items-center space-x-2">
                          <PlayCircle size={14} className="text-cyan-400" />
                          <span>Video Tutorials</span>
                        </div>
                        <p className="text-sm text-slate-300 ml-6">Watch step-by-step guides for common operations.</p>
                        <button
                          className="mt-2 px-3 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded text-sm shadow-md flex items-center space-x-1 ml-6"
                          onClick={() => {
                            setStatusMessage("Opening video tutorials...")
                            setTimeout(() => setStatusMessage(""), 3000)
                          }}
                        >
                          <PlayCircle size={12} className="text-cyan-200" />
                          <span>Watch Videos</span>
                        </button>
                      </div>
                      <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
                        <div className="font-bold flex items-center space-x-2">
                          <HelpCircle size={14} className="text-cyan-400" />
                          <span>Contact Support</span>
                        </div>
                        <p className="text-sm text-slate-300 ml-6">Get help from our technical support team.</p>
                        <button
                          className="mt-2 px-3 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded text-sm shadow-md flex items-center space-x-1 ml-6"
                          onClick={() => {
                            setStatusMessage("Opening support contact form...")
                            setTimeout(() => setStatusMessage(""), 3000)
                          }}
                        >
                          <HelpCircle size={12} className="text-cyan-200" />
                          <span>Contact Us</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-slate-800/70 p-4 rounded-lg border border-slate-700/50 shadow-lg">
                  <h3 className="text-lg font-bold mb-4 text-cyan-300 flex items-center justify-center space-x-2">
                    <HelpCircle size={16} className="text-cyan-400" />
                    <span>FREQUENTLY ASKED QUESTIONS</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
                      <div className="font-bold flex items-center space-x-2">
                        <ChevronRight size={14} className="text-cyan-400" />
                        <span>How do I calibrate my drone?</span>
                      </div>
                      <p className="text-sm text-slate-300 ml-6">
                        Navigate to the CONFIG tab and use the calibration buttons under Sensor Calibration.
                      </p>
                    </div>
                    <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
                      <div className="font-bold flex items-center space-x-2">
                        <ChevronRight size={14} className="text-cyan-400" />
                        <span>What should I do if connection fails?</span>
                      </div>
                      <p className="text-sm text-slate-300 ml-6">
                        Check your USB connection, verify COM port settings, and ensure your drone is powered on.
                      </p>
                    </div>
                    <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
                      <div className="font-bold flex items-center space-x-2">
                        <ChevronRight size={14} className="text-cyan-400" />
                        <span>How can I update firmware?</span>
                      </div>
                      <p className="text-sm text-slate-300 ml-6">
                        Use the SETUP tab and look for the Firmware Update section to check for and install updates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-800">
              <div className="w-full h-full flex flex-col">
                <div className="h-1/6 border-b border-slate-700/50"></div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                      DIVYALINK
                    </h1>
                    <div className="text-2xl font-bold text-slate-200 mb-2">DRONE CONTROL SYSTEM</div>
                    <span className="text-xl text-slate-400">by Vayunotics</span>
                    <div className="mt-8 flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse flex items-center justify-center">
                        <Plane size={32} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-1/6 border-t border-slate-700/50"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close sidebar when clicked outside on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}