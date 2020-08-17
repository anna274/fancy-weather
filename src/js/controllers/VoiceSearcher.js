/* eslint-disable no-undef */
import { Searcher } from './Searcher';
import { setError } from '../helpers/setters';


export class VoiceSearcher extends Searcher {
  constructor(form, microphone) {
    super(form);
    this.microphone = microphone;
    this.microphone.addEventListener('click', this.microphoneHendler.bind(this));
    this.recognition = null;
    this.initRecognition();
  }

  initRecognition() {
    if (window.SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.addRecognitionEvents();
    } else if (window.webkitSpeechRecognition) {
      // eslint-disable-next-line new-cap
      this.recognition = new webkitSpeechRecognition();
      this.addRecognitionEvents();
    }
  }

  startSpeechRecognition() {
    this.microphone.classList.add('active');
  }

  endSpeechRecognition() {
    this.microphone.classList.remove('active');
  }

  resultOfSpeechRecognition(event) {
    const query = event.results[0][0].transcript;
    this.form.querySelector('.input').value = query;
    this.form.onsubmit();
  }

  microphoneHendler() {
    if (this.recognition) {
      if (!this.microphone.classList.contains('active')) {
        this.recognition.start();
      } else {
        this.microphone.classList.remove('active');
        this.recognition.abort();
      }
    } else {
      setError('Your browzer does not support speech recognition');
    }
  }

  addRecognitionEvents() {
    this.recognition.addEventListener('start', this.startSpeechRecognition.bind(this));
    this.recognition.addEventListener('end', this.endSpeechRecognition.bind(this));
    this.recognition.addEventListener('result', this.resultOfSpeechRecognition.bind(this));
  }
}
