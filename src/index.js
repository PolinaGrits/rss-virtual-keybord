import "./assets/style.css";
import keyData from "./keydata.js";

let container = document.createElement("div");
    container.className = "container";
    document.body.append(container);

let titleKeyboard = document.createElement("div");
    titleKeyboard.className = "titleKeyboard";
    document.body.append(titleKeyboard);

let h1= document.createElement("H1");
    h1.innerHTML = "RSS VIRTUAL KEYBOARD";
    titleKeyboard.appendChild(h1);

let resultInput = document.createElement("textarea");
    resultInput.className = "resultInput";
    document.body.append(resultInput);

let keyboard = document.createElement("div");
    keyboard.className = "keyboard";
    keyboard.id = "keyboard";
    document.body.append(keyboard);
  
let system = document.createElement("p");
    system.className = "text";
    system.innerHTML = "Клавиатура создана в операционной системе Windows";
    document.body.append(system);

let langChanged= document.createElement("p");
    langChanged.className = "text";
    langChanged.innerHTML = "Для переключения языка комбинация: левыe shift + alt";
    document.body.append(langChanged);

let capsToggler = false;

for (let i = 0; i < 5; i++){
  let keyboardRow = document.createElement("div");
  keyboardRow.className = "keyboard_row";
  keyboardRow.id = `keyboard_row${i}`;
  keyboard.appendChild(keyboardRow);
}


function startKeyboard(){
  let out = "";
  for (let j = 0; j < keyData.length; j++) {
    for(let i = 0; i < keyData[j].length; i++) {
      out = `<div class = "${keyData[j][i].class}" >` + `${keyData[j][i].key.en}` + "</div>";
      document.querySelector(`#keyboard_row${j}`).innerHTML += out;
    }
  }
}
startKeyboard();


function initRu(){
  let out = "";
  for (let j = 0; j < keyData.length; j++) {
    for(let i = 0; i < keyData[j].length; i++) {
        out = `<div class = "${keyData[j][i].class}" >` + `${keyData[j][i].key.ru}` + "</div>";
        document.querySelector(`#keyboard_row${j}`).innerHTML += out;
      }
  }
  capsToggler = false;
}

function initEn(){
  let out = "";
  for (let j = 0; j < keyData.length; j++) {
    for(let i = 0; i < keyData[j].length; i++) {
        out = `<div class = "${keyData[j][i].class}" >` + `${keyData[j][i].key.en}` + "</div>";
        document.querySelector(`#keyboard_row${j}`).innerHTML += out;
      }
  }
  capsToggler = false;
}

document.addEventListener("keydown", function(event){
  if (event.shiftKey && event.altKey){
    if (document.documentElement.lang === "en"){
      document.documentElement.setAttribute("lang", "ru");
      keyboard.innerHTML = "";
      for (let i = 0; i < 5; i++){
        let keyboardRow = document.createElement("div");
        keyboardRow.className = "keyboard_row";
        keyboardRow.id = `keyboard_row${i}`;
        keyboard.appendChild(keyboardRow);
      }
      initRu();
      
    } else if (document.documentElement.lang === "ru"){
      document.documentElement.setAttribute("lang", "en");
      keyboard.innerHTML = "";
      for (let i = 0; i < 5; i++){
        let keyboardRow = document.createElement("div");
        keyboardRow.className = "keyboard_row";
        keyboardRow.id = `keyboard_row${i}`;
        keyboard.appendChild(keyboardRow);
      }
      initEn();
    }
  }
});

keyboard.addEventListener("click", (event) => {
  for (let j = 0; j < keyData.length; j++) {
    for(let i = 0; i < keyData[j].length; i++) {
      if (event.target && event.target.classList.value == keyData[j][i].class && !(keyData[j][i].noType)) {
        resultInput.value += `${event.target.textContent}`;
      }
    }
  }
});



document.addEventListener("keydown", (event) => {
  for (let j = 0; j < keyData.length; j++) {
    for(let i = 0; i < keyData[j].length; i++) {
        if (event.key == `${keyData[j][i].key.ru}` ||
            event.key == `${keyData[j][i].key.en}` ||
            event.key == `${keyData[j][i].shift.ru}` ||
            event.key == `${keyData[j][i].shift.en}` && !document.querySelector("textarea:focus")) {
          if ("noType" in keyData[j][i]) {
            resultInput.value += "";
          } else {
            resultInput.value += `${event.key}`;
          }
      }
    }
  }
});

function capsOn(){
  if(capsToggler === false) {
    let out = "";
    for (let j = 0; j < keyData.length; j++) {
      for(let i = 0; i < keyData[j].length; i++) {
        if (document.documentElement.lang === "en"){
          if (keyData[j][i].caps) {
            out = `<div class = "${keyData[j][i].class}" >` + `${keyData[j][i].caps.en}` + "</div>";
          } else {
            out = `<div class = "${keyData[j][i].class}" >` + `${keyData[j][i].shift.en}` + "</div>"; 
          }
          document.querySelector(`#keyboard_row${j}`).innerHTML += out;
        } else if (document.documentElement.lang === "ru"){
          if (keyData[j][i].caps) {
            out = `<div class = "${keyData[j][i].class}" >` + `${keyData[j][i].caps.ru}` + "</div>";
          } else {
            out = `<div class = "${keyData[j][i].class}" >` + `${keyData[j][i].shift.ru}` + "</div>";
          }
          document.querySelector(`#keyboard_row${j}`).innerHTML += out;
        }
      }
    }
    capsToggler = true;
  } else {
    if (document.documentElement.lang === "en") {
      initEn();
      capsToggler = false;
    } else {
      initRu();
      capsToggler = false;
    }
  }
    
}

document.addEventListener("keydown", (event) => {
    if (event.key == "CapsLock") {
      keyboard.innerHTML = "";
      for (let i = 0; i < 5; i++){
      let keyboardRow = document.createElement("div");
      keyboardRow.className = "keyboard_row";
      keyboardRow.id = `keyboard_row${i}`;
      keyboard.appendChild(keyboardRow);
    }
    capsOn();
  } 
});

function shiftOn(){
  if(capsToggler === false) {let out = "";
    for (let j = 0; j < keyData.length; j++) {
      for(let i = 0; i < keyData[j].length; i++) {
        if (document.documentElement.lang === "en"){
          out = `<div class = "${keyData[j][i].class}" >` + `${keyData[j][i].shift.en}` + "</div>"; 
          document.querySelector(`#keyboard_row${j}`).innerHTML += out;
        } else if (document.documentElement.lang === "ru"){
          out = `<div class = "${keyData[j][i].class}" >` + `${keyData[j][i].shift.ru}` + "</div>";
          document.querySelector(`#keyboard_row${j}`).innerHTML += out;
        }
      }
    }
    capsToggler = true;
  
  }
}
function shiftOff() {
    if (document.documentElement.lang === "en") {
      initEn();
    } else {
      initRu();
    }
    capsToggler = false;
  }

document.addEventListener("keydown", (event) => {
    if (event.key == "Shift") {
      keyboard.innerHTML = "";
    for (let i = 0; i < 5; i++){
      let keyboardRow = document.createElement("div");
      keyboardRow.className = "keyboard_row";
      keyboardRow.id = `keyboard_row${i}`;
      keyboard.appendChild(keyboardRow);
    }
    shiftOn();  
  } 
});

document.addEventListener("keyup", (event) => {
  if (event.key == "Shift") {
    keyboard.innerHTML = "";
    for (let i = 0; i < 5; i++){
      let keyboardRow = document.createElement("div");
      keyboardRow.className = "keyboard_row";
      keyboardRow.id = `keyboard_row${i}`;
      keyboard.appendChild(keyboardRow);
    }
  shiftOff();  
} 
});


function tabOn(){
  resultInput.value += "    ";
}

document.addEventListener("keydown", (event) => {
  if (event.key == "Tab") {
    tabOn();
  }
});


function bckspace(){
  let bcksp = String(resultInput.value);
    bcksp = bcksp.slice(0, -1);
    resultInput.value = bcksp;
    if (document.querySelector("textarea").selectionStart === 0) return;
}

function delOn(){
  let del = String(resultInput.value);
  del = del.slice(0, -2) + del.slice(-1);
  resultInput.value = del;
  if (document.querySelector("textarea").selectionStart === document.querySelector("textarea").value.length) return;
}


keyboard.addEventListener("mousedown", (event) => {
  if (event.target && event.target.textContent == "Backspace"){
    bckspace();
  }
  if (event.target && event.target.textContent == "Del"){
    delOn();
  }
  if (event.target && event.target.textContent == "CapsLock") {
    keyboard.innerHTML = "";
    for (let i = 0; i < 5; i++){
    let keyboardRow = document.createElement("div");
    keyboardRow.className = "keyboard_row";
    keyboardRow.id = `keyboard_row${i}`;
    keyboard.appendChild(keyboardRow);
    }
    capsOn();
  }
  if (event.target && event.target.textContent == "Tab") {
    tabOn(); 
  }
  
});

keyboard.addEventListener("mousedown", keyOn);
keyboard.addEventListener("mouseup", keyOff);

function keyOn(event) {
  if ((event.target.classList.contains("key"))) {
    event.target.classList.add("active");
  }
}

function keyOff(event) {
  if (event.target.classList.contains("key")) {
    event.target.classList.remove("active");
  }
}


document.addEventListener("keydown", (event) => {
  for (let j = 0; j < keyData.length; j++) {
    for(let i = 0; i < keyData[j].length; i++) {
      if (event.code == `${keyData[j][i].code}`) {
        for (let key in keyData[j][i]){
          if (key == "class"){
            let keys = document.getElementsByClassName(`${keyData[j][i].code}`);
            for (const key of keys) {
              key.classList.add("active");
            }
          }
        }
      }
    }
  }
});

document.addEventListener("keyup", (event) => {
  for (let j = 0; j < keyData.length; j++) {
    for(let i = 0; i < keyData[j].length; i++) {
      if (event.code == `${keyData[j][i].code}`) {
        for (let key in keyData[j][i]){
          if (key == "class"){
            let keys = document.getElementsByClassName(`${keyData[j][i].code}`);
            for (const key of keys) {
              key.classList.remove("active");
            }
          }
        }
      }
    }
  }
});


keyboard.addEventListener("mousedown", (event)=> {
  if (event.target && event.target.textContent == "Shift"){
    keyboard.innerHTML = "";
    for (let i = 0; i < 5; i++){
      let keyboardRow = document.createElement("div");
      keyboardRow.className = "keyboard_row";
      keyboardRow.id = `keyboard_row${i}`;
      keyboard.appendChild(keyboardRow);
    }
    let out = "";
    for (let j = 0; j < keyData.length; j++) {
      for(let i = 0; i < keyData[j].length; i++) {
        if (document.documentElement.lang === "en"){
          out = `<div class = "${keyData[j][i].class}" >` + `${keyData[j][i].shift.en}` + "</div>"; 
          document.querySelector(`#keyboard_row${j}`).innerHTML += out;
        } else if (document.documentElement.lang === "ru"){
          out = `<div class = "${keyData[j][i].class}" >` + `${keyData[j][i].shift.ru}` + "</div>";
          document.querySelector(`#keyboard_row${j}`).innerHTML += out;
        }
      }
    }
  }
});


keyboard.addEventListener("mouseup", (event)=> {
  if (event.target && event.target.textContent == "Shift") {
    keyboard.innerHTML = "";
    for (let i = 0; i < 5; i++){
      let keyboardRow = document.createElement("div");
      keyboardRow.className = "keyboard_row";
      keyboardRow.id = `keyboard_row${i}`;
      keyboard.appendChild(keyboardRow);
    }
    if (document.documentElement.lang === "en") {
      initEn();
    } else {
      initRu();
    }
  }
});

