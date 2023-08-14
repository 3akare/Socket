// Handles in-message notifcation sound
export function notification(){
    const notif = new Audio('./audio/boing.mp3');
    notif.play();
}
