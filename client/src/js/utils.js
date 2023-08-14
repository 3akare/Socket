// Handles in-message notifcation sound
export const notifSound = new Audio("./audio/boing.mp3");
export function notification(sound) {
  sound.play();
}
