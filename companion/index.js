/*
 * Entry point for the companion app
 */
import { localStorage } from "local-storage";
import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me } from "companion";
import { outbox } from "file-transfer";
import * as cbor from 'cbor';

console.log("Companion code started");

//Do color settings
let settings = { };

function initialize() {
  //make sure the stored settings are up to date
  restoreSettings();
}

function sendSettingsToWatch() {
  outbox.enqueue('settings.cbor', cbor.encode(settings))
        .then(ft => console.log('settings sent'))
        .catch(error => console.log("Error sending settings: " + error));
}

// A user changes settings
settingsStorage.onchange = evt => {
  settings[evt.key] = JSON.parse(evt.newValue);
  sendSettingsToWatch();
};

// Restore any previously saved settings
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key) {
      var value = settingsStorage.getItem(key);
      try {
        settings[key] = JSON.parse(value);
      }
      catch(ex) {
        settings[key] = value;
      }
    }
  }
}

//restore old previous settings on load
initialize();

