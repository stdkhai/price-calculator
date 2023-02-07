import {RenderCounter, RenderRows} from "./render.js"

var ranges = document.querySelectorAll('input[type="range"]');
let inputs = document.getElementsByTagName('input');


RenderRows();


for (let i of ranges) {
    RenderCounter(i)
    i.addEventListener('input', (e) =>{
       RenderCounter(e.target)
    });
}

for (let i of inputs) {
    i.addEventListener('input', () =>{
        RenderRows()
    });
}