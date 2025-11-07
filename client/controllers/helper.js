import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
  });

export function getGreeting() {
  const currentTime = new Date().getHours(); 
  let greetingMessage = "";

  if (currentTime >= 5 && currentTime < 12) {
    greetingMessage = "Good Morning ";
  } else if (currentTime >= 18 || currentTime < 5) {
    greetingMessage = "Good Evening";
  } else if (currentTime >= 12 && currentTime < 18) {
    greetingMessage = "Good Afternoon";
  }
  return greetingMessage;
}
