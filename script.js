const text = document.getElementById('text')
const submit = document.getElementById('submit')
const options = document.getElementById('voice')
let synth = speechSynthesis
let isSpeaking = true

function voiceSpeech(){
    for(let voice of synth.getVoices()){
        let option = document.createElement('option')
        option.text = voice.name
        options.add(option)
    }
}

synth.addEventListener('voiceschanged',voiceSpeech)

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name == options.value){
            utterance.voice = voice
        }
    }
    speechSynthesis.speak(utterance)
}

submit.addEventListener('click',(e) => {
    e.preventDefault();
    if(!synth.speaking) {
        textToSpeech(text.value)
    }
    if(isSpeaking){
        synth.resume()
        isSpeaking = false;
        submit.innerHTML = 'Stop'
    }else {
        synth.pause()
        isSpeaking = true;
        submit.innerHTML = 'Start'
    }
    setInterval(() => {
        if(!isSpeaking && !synth.speaking){
            isSpeaking = true
            submit.innerHTML = 'Covert'
        }   
    });
})