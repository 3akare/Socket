// Handles in-message notifcation sound
export function notification(){
    const notif = new Audio('./public/audio/boing.mp3');
    notif.play();
}
