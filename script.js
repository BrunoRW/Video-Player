// CREATE -------------------------------



// head 
const head = document.querySelectorAll("head")[0];

// local create bplayer 
const local_create_bplayer = document.querySelectorAll(`${local_bplayer}`)[0];
local_create_bplayer.style.position = "relative";

// link style css
const link_style = document.createElement("link");
link_style.rel = "stylesheet";
link_style.href = "style.css";
head.append(link_style);


// container all 
const content = document.createElement('div');
content.id = "content";
content.onclick = ()=> {pause()};
local_create_bplayer.append(content);

// container player
const content_bplayer = document.createElement('div');
content_bplayer.id = "content-bplayer";
content_bplayer.onclick = ()=> {pause(); viewFull()};
local_create_bplayer.append(content_bplayer);

// video
const video = document.createElement('video');
video.id = "video-bplayer";
video.src = url;
video.controls = 0;
content_bplayer.append(video);

// out settings
const out_sets = document.createElement('div');
out_sets.id = "out-sets";
out_sets.onclick = (e)=>{
    e.preventDefault();
    return false;
}
local_create_bplayer.append(out_sets);

// play & pause bt 
const bts_pp = document.createElement('div');
bts_pp.onclick = ()=> {pause()};
bts_pp.id = "bts-pp";
out_sets.append(bts_pp);

const tempo_span = document.createElement('span');
tempo_span.id = "tempo";
out_sets.append(tempo_span);

// play icon
const play_icon = '<svg class="icon" xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-play" viewBox="0 0 240 240" focusable="false"><path d="M62.8,199.5c-1,0.8-2.4,0.6-3.3-0.4c-0.4-0.5-0.6-1.1-0.5-1.8V42.6c-0.2-1.3,0.7-2.4,1.9-2.6c0.7-0.1,1.3,0.1,1.9,0.4l154.7,77.7c2.1,1.1,2.1,2.8,0,3.8L62.8,199.5z"></path></svg>';
const pause_icon = '<svg class="icon" xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-pause" viewBox="0 0 240 240" focusable="false"><path d="M100,194.9c0.2,2.6-1.8,4.8-4.4,5c-0.2,0-0.4,0-0.6,0H65c-2.6,0.2-4.8-1.8-5-4.4c0-0.2,0-0.4,0-0.6V45c-0.2-2.6,1.8-4.8,4.4-5c0.2,0,0.4,0,0.6,0h30c2.6-0.2,4.8,1.8,5,4.4c0,0.2,0,0.4,0,0.6V194.9z M180,45.1c0.2-2.6-1.8-4.8-4.4-5c-0.2,0-0.4,0-0.6,0h-30c-2.6-0.2-4.8,1.8-5,4.4c0,0.2,0,0.4,0,0.6V195c-0.2,2.6,1.8,4.8,4.4,5c0.2,0,0.4,0,0.6,0h30c2.6,0.2,4.8-1.8,5-4.4c0-0.2,0-0.4,0-0.6V45.1z"></path></svg>';
bts_pp.innerHTML = play_icon;

// slider
const range = document.createElement('input');
range.type = "range";
range.id = "range-bplayer";
range.value = 0;
out_sets.append(range);


const volume_range = document.createElement('input');
volume_range.type = "range";
volume_range.id = "vol-range";
volume_range.max = 1;
volume_range.value = 0;
volume_range.step = "0.01";
out_sets.append(volume_range);


// loading
const loadingc = document.createElement('div');
loadingc.classList.add("lds-dual-ring");
loadingc.id = "loading";
local_create_bplayer.append(loadingc);


// tempo
const tempo = document.getElementById("tempo");



// FUNCTIONS -------------------------------

// time 

let timeD = ()=> {
    const time = new Date().getTime();
    return time;
}


// clear screen - last evt 

var lastEvt = 0;

const lastSetEvt = ()=> {
    lastEvt = timeD();
}
const checkEvt = (e)=> {
    if(lastEvt + e < timeD()){
        return true;
    } else {
        return false;
    }
}

document.body.onmousemove = ()=> {
    if(checkEvt(200)){
        lastSetEvt();
    }
}

const defineEvt = setInterval(()=> {
    if(checkEvt(3000)){
        out_sets.style.opacity = 0;
        local_create_bplayer.style.cursor = "none";
    } else {
        out_sets.style.opacity = 1;
        local_create_bplayer.style.cursor = "default";
    }
},100)
 

// pause instance
var ispaused = true;

// pause or play
const pause = (e)=> {
    if(ispaused == true){
        video.play();
        ispaused = false;
        bts_pp.innerHTML = pause_icon;
    } else {
        video.pause();
        ispaused = true;
        bts_pp.innerHTML = play_icon;
    }
};

const setMaxDuration = ()=>{
    range.max = video.duration;
}

range.onchange = ()=> {
    video.currentTime = range.value;
}

const interval = setInterval(()=>{
    if(range.value >= video.currentTime && range.value != 0 && ispaused == false){
        loadingc.style.display = "block";
    } else {
        loadingc.style.display = "none";
    }
    tempo.innerText = `${Math.floor(video.currentTime / 60 * 100) / 100} / ${Math.floor(video.duration / 60 * 100) / 100}`;
    range.value = video.currentTime;
    setMaxDuration();    
},1000)

// fullscreen 

var arr = [];
var fullscreen = false;

const viewFull = ()=> {
    arr.unshift(timeD());

    if(arr[1]+200 > arr[0]){
        if(fullscreen == false){
            local_create_bplayer.requestFullscreen();
            fullscreen = true;
        } else {
            if(document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
              }
            fullscreen = false;
        }
        arr = [];
    }
}


// set volume
var localVolume = localStorage.bwplayer_vol;
if(!localVolume){
    var volume = 0.5;
} else {
    var volume = localStorage.bwplayer_vol;
}

volume_range.oninput = ()=> {
    video.volume = volume_range.value;
    localStorage.bwplayer_vol = volume_range.value;
}

volume_range.value = volume;
video.volume = volume;
