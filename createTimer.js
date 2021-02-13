
function createElement(tag, attrs = {}, content = []) {
    const element = document.createElement(tag);
  
    for (const attr in attrs) {
      const value = attrs[attr];
      element.setAttribute(attr, value);
    }
  
    if (!Array.isArray(content)) {
      content = [content];
    }
  
    content.forEach(child => element.append(child));
  
    return element;
  }
  
  function getElement(selector) {
      return document.querySelector(selector);
  }
  
  // Разбивает общее количество миллисекунд на отдельные составляющие
  function parseTime(totalMilliseconds) {
    const milliseconds = totalMilliseconds % 1000;
    const totalSeconds = (totalMilliseconds - milliseconds) / 1000;
  
    const seconds = totalSeconds % 60;
    const totalMinutes = (totalSeconds - seconds) / 60;
  
    const minutes = totalMinutes % 60;
    const hours = (totalMinutes - minutes) / 60;
  
    return [hours, minutes, seconds, milliseconds];
  }
  
  // Добавление нулей в начало числа
  function zeros(value, length) {
    return value.toString().padStart(length, '0');
  }
  
  // Классы секундомеров
  class Timer {
    constructor() {
      this.timerObj = null;
      this.status = 0;
      this.time = 0;
    }
	
		
  handleTime() {
    if (this.status == 1) {
      this.timerObj = setTimeout(() => { 
				this.time++;
				const [hours, minutes, seconds, milliseconds] = parseTime(this.time);
				const hour = zeros(hours, 2);
				const min = zeros(minutes, 2);
				const sec = zeros(seconds, 2);
				const mill = zeros(milliseconds, 3);
				//console.log('milliseconds', mill);

       
      
        this.timer.querySelector('.clock').innerHTML = `${hour}:${min}:${sec}.${mill}`;
        this.handleTime();
      }, 1);
    }
  }
  
    start() {
      this.status = 1;
      this.timer.querySelector('.start').disabled = true;	
      this.handleTime();
    }
    
    stop() {
        this.status = 0;
        this.timer.querySelector('.start').disabled = false;
    }
    
  reset() {
      clearTimeout(this.timerObj); 
      this.status = 0;
      this.time = 0;
      this.timer.querySelector('.start').disabled = false;
      this.timer.querySelector('.clock').innerHTML = '00:00:00.000';
    }
  }
  
  class TimerUI extends Timer {
    constructor(parent) {
      super();
  
      this.createClock();
      this.createButtons();
      this.createParent();
  
      parent.append(this.timer);
    }
    
    createClock() {
    	this.clock = createElement('div', { class: 'clock' }, '00:00:00.000');
    }
    
    createParent() {
      this.timer = createElement('div', { class: 'timer' }, [this.clock, this.b1, this.b2, this.b3, this.b4]);
    }
    
    createButtons() {
			const createIcon = (iconName) => createElement('i', { class: `fas fa-${iconName}` });
				
      this.b1 = createElement('button', { class: 'start btn btn-secondary' }, createIcon('play'));
      this.b2 = createElement('button', { class: 'btn btn-secondary' }, createIcon('pause'));
      this.b3 = createElement('button', { class: 'btn btn-secondary' }, createIcon('undo'));
      this.b4 = createElement('button', { class: 'btn btn-secondary' }, createIcon('trash'));
      
      this.b1.addEventListener('click', () => this.start());
      this.b2.addEventListener('click', () => this.stop());
      this.b3.addEventListener('click', () => this.reset());
      this.b4.addEventListener('click', () => this.remove());
    }
  
    start() {
      super.start();
    }
    
    stop() {
      super.stop();
    }
    
    reset() {
      super.reset();
    }
  
    remove() {
      this.timer.remove();
    }
  }
  
  // Стартовый код
  (function (parent) {
      let timers = [];
    
    const addButton = createButton('success', 'add', 'plus');
    const removeAllButton = createButton('danger', 'remove-all', 'trash');
  
    addButton.addEventListener('click', createTimer);
    removeAllButton.addEventListener('click', removeAllTimers);
  
    const controls = createElement('div', { class: 'timers-control' }, [addButton, removeAllButton]);
    const timersWrapper = createElement('div', { id: 'timers' });
  
    const wrapper = createElement('div', {}, [controls, timersWrapper]);
  
      parent.append(wrapper);
    
    function createTimer() {
        const timer = new TimerUI(timersWrapper);
      timers.push(timer);
    }
    function removeAllTimers() {
      timers.forEach(timer => timer.remove());
      timers = [];
    }
  
       function createButton(buttonStyle, className, iconName) {
      const icon = createElement('i', { class: `fas fa-${iconName}` });
        return createElement('button', { class: `btn btn-${buttonStyle} ${className}` }, icon);
    }
  })(getElement('body'));
  