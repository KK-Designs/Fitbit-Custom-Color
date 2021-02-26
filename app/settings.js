import document from "document";
import { inbox } from "file-transfer";
import { readFileSync } from "fs";
import * as cbor from 'cbor';

export function initialize() {

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");

    let defaultSettings = {
        timeColor: '#0053fa',       
      };
      let settings = defaultSettings;
      
      //initialisation
      inbox.onnewfile = processInbox;
      //settings handling
      function loadSettings()
      {
        try {
          settings = readFileSync("settings.cbor", "cbor");
          transformSettings();
          mergeWithDefaultSettings();
        } catch (e) {
          console.log('No settings found, fresh install, applying default settings...');
          
          //apply default settings
          settings = defaultSettings;
        }
        
        console.log('Applying settings: ' + JSON.stringify(settings));
        applySettings();
      }
      
      function transformSettings() {
        //change all settings you want in another format as sent by the companion here
        if (settings.dateFormat) {
          settings.dateFormat = settings.dateFormat.values[0].name;
        }
      }
      
      function mergeWithDefaultSettings() {
        for (let key in defaultSettings) {
          if (!settings.hasOwnProperty(key)) {
            settings[key] = defaultSettings[key];
          }
        }
      }

      function applySettings() {
            
      let hexusage = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gm
      let regex = new RegExp(hexusage);

      if (settings.timeColor.name) {
        
        if (regex.test(settings.timeColor.name)) {
          myLabel.style.fill = settings.timeColor.name;        
        } else {
          myLabel.style.fill = defaultSettings.timeColor;
          return console.warn('Not a color hex code')
        }

      } else if(settings.timeColor.name == "default") {

        myLabel.style.fill = defaultSettings.timeColor;
        
      } else if(settings.timeColor.name == undefined) {

        myLabel.style.fill = settings.timeColor;

      }


      }
      
      //load stored settings if any at startup
      loadSettings();
      
      function processInbox()
      {
        let fileName;
        while (fileName = inbox.nextFile()) {
          console.log("File received: " + fileName);
      
          if (fileName === 'settings.cbor') {
              loadSettings();
          }
        }
      };

}