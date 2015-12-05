/*
    keyboard.js

    Handles keyboard events during when the vehicle is set to "free" mode.
    References subroutines found in button.js.
*/

// Toggle value for enabling keyEventListener
var enableKeyboard = false;

// Timer intervals for arrow buttons
var key_up=     { timer: null, flag: false };
var key_down=   { timer: null, flag: false };
var key_left=   { timer: null, flag: false };
var key_right=  { timer: null, flag: false };
var key_stop_flag = false;
var key_detach_flag = false;

// Initialize keyboard event listeners
$(window).ready(function() {
  window.addEventListener("keydown",keyDownHandler, false);
        window.addEventListener("keyup",keyUpHandler, false);
});

/*
  Keyboard event handler:
    - Up, Down:
        Holding down will gradually toggle speed, and releasing it
        will maintain it at that speed.
    - Left, Right:
        Holding it will steer it towards that direction, but releasing it
        will straighten the wheels back to center position.
    - Stop (S):
        Will stop the vehicle acceleration/deacceleration.
    - Detach (T):
        Will stop the vehicle, and then set the vehicle mode to neutral.
        Also, keyboard will be disabled until mode is set to free again.
    - Measure (M):
        Invokes measure socket emit to server for Beacon RSSI.
    - Increment Partition (>):
*/
function keyDownHandler(event) {
  if (enableKeyboard) {
    event.preventDefault();

    // Identifies the button pressed.
    var keyPressed = event.keyCode;

    // Forward
    if (keyPressed == 38) {
      if (!key_up.flag) {
        socket.emit('esc increment');
        key_up.timer = setInterval(increESC, 200);
        key_up.flag = true;
      }
    }
    // Backwards
    else if (keyPressed == 40) {
      if (!key_down.flag) {
        socket.emit('esc decrement');
        key_down.timer = setInterval(decreESC, 200);
        key_down.flag = true;
      }
    }
    // Left
    else if (keyPressed == 37) {
      if (!key_left.flag) {
        key_left.timer = setInterval(leftServo, 5);
        key_left.flag = true;
      }
    }
    // Right
    else if (keyPressed == 39) {
      if (!key_right.flag) {
        key_right.timer = setInterval(rightServo, 5);
        key_right.flag = true;
      }
    }
    // Stop 'S'
    else if (keyPressed == 83) {
      socket.emit('esc release');
      // if (!key_stop_flag) {
      //   key_stop_flag = true;
      // }
    }
    // Detach 'T'
    else if (keyPressed == 84) {
      socket.emit('esc release');
      straighten();
      escRelease();
      socket.emit('set-mode', 0);
      key_detach_flag = false;
      enableKeyboard = false;
    }
    // Measure 'M'
    else if (keyPressed == 77) {
      measureBeacons();
    }
    // Javascript function should change $('#partition-shift').html()
    // Decrement Partition '<'
    else if (keyPressed == 188) {
      // TODO Decrement Partition
      var partition = $(document.getElementsByName("partition")).val();
      partition--;
      $(document.getElementsByName("partition")).val(partition);
      $('#currentPartition').text(partition);
    }
    // Increment Partition '>'
    else if (keyPressed == 190) {
      // TODO Decrement Partition
      var partition = $(document.getElementsByName("partition")).val();
      partition++;
      $(document.getElementsByName("partition")).val(partition);
      $('#currentPartition').text(partition);
    }

  }
}

function keyUpHandler(event) {
  if (enableKeyboard) {

    // Identifies the button pressed.
    var keyPressed = event.keyCode;

    // Forward
    if (keyPressed == 38) {
      clearInterval(key_up.timer);
      key_up.flag = false;
    }
    // Backward
    else if (keyPressed == 40) {
      clearInterval(key_down.timer);
      key_down.flag = false;
    }
    // Left
    else if (keyPressed == 37) {
      clearInterval(key_left.timer);
      key_left.flag = false;
      straighten();
    }
    // Right
    else if (keyPressed == 39) {
      clearInterval(key_right.timer);
      key_right.flag = false;
      straighten();
    }
    // // Stop
    // else if (keyPressed == 83) {
    // }
    // // Detach
    // else if (keyPressed == 84) {
    // }
  }
}

var increESC = function() { socket.emit('esc increment'); }
var decreESC = function() { socket.emit('esc decrement'); }
var leftServo = function() { socket.emit('servo left'); }
var rightServo = function() { socket.emit('servo right'); }