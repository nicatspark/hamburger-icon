import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `hamburger-menu`
 * A hamburger menu icon that animates.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class HamburgerMenu extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;

  background-color: #ff5252;
	color: #fff;
  font-family: "Muli", sans-serif;
  font-size: 62.5%;
  margin: 0;
  padding: 0;
}
.container {
  align-items: center;
/*   background-color: rgba(0,0,0,0.1); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* left: 50%; */
  position: relative;
  /* top: 50%; */
  /* transform: translate(-50%,-50%); */
}
/*-------------------------------------------- separe */
.separe {
  background-color: #fff;
  border-radius: calc(2em/24);
  height: calc(2em/24);
  width: 100%;
}
/*-------------------------------------------- text */
.text-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  width: 100%;
}
.button {
  background-color: #ff5252;
  border-radius: 45px;
  cursor: pointer;
  margin: 0 10px;
  padding: 5px 15px;
}
.button:hover {
  background-color: #a53636;
}
.button-active {
  background-color: #a53636;
}
/*-------------------------------------------- icon */
.icon-box {
/*   background-color: rgba(0,0,0,0.1); */
  height: 2.5em;
  margin-bottom: 3.3em;
  position: relative;
  transform: rotate(0deg);
  transition-duration: 0.4s;
  transform-origin: center;
  transition-timing-function: cubic-bezier(.69,-0.49,.39,.97);
  width: calc(80em/24);
}
.line {
  background-color: #333;
  border-radius: calc(2em/24);
  height: calc(2em/24);
  min-height: 1px;
  left: 0;
  opacity: 1;
  position: absolute;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(.69,-0.49,.39,.97);
  width: calc(80em/24);
}
#line01 {
  top: 0;
}
#line02, #line03 {
  top: calc(50% - calc(1em/24));
}
#line04 {
  bottom: 0;
}
/*-------------------------------------------- animation */
/*------------------------------- left */
#line01.line01-left {
  left: calc(-3em/24);
  top: calc(50% - 8em/24);
  transform: rotate(-45deg);
  width: calc(20em/24);
}
#line04.line04-left {
  left: calc(-3em/24);
  bottom: calc(50% - 8em/24);
  transform: rotate(45deg);
  width: calc(20em/24);
}
/*------------------------------- right */
#line01.line01-right {
  left: calc(62em/24);
  top: calc(50% - 8em/24);
  transform: rotate(45deg);
  width: 0.83em;
}
#line04.line04-right {
  left: calc(62em/24);
  bottom: calc(50% - 8em/24);
  transform: rotate(-45deg);
  width: calc(20em/24);
}
/*------------------------------- close */
#line01.line01-close {
  left: 0;
  top: calc(50% - calc(1em/24));
  opacity: 0;
}
#line04.line04-close {
  bottom: calc(50% - calc(1em/24));
  left: 0;
  opacity: 0;
}
#line02.line02-close {
  transform: rotate(45deg); 
}
#line03.line03-close {
  transform: rotate(-45deg);
}
/*------------------------------- add */
.icon-box-add {
  transform: rotate(45deg) scale(0.7);
}
      </style>
      <h2>Hello [[prop1]]!</h2>
<div class="container">
  <div class="icon-box">
    <div id="line01" class="line"></div>
    <div id="line02" class="line"></div>
    <div id="line03" class="line"></div>
    <div id="line04" class="line"></div>
  </div>
  <div class="separe"></div>
  <div class="text-wrapper">
    <p id="left"  class="button">left</p>
    <p id="right" class="button">right</p>
    <p id="menu"  class="button">menu</p>
    <p id="close" class="button">close</p>
    <p id="add"   class="button">add</p>
  </div>
</div>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'hamburger-menu',
      },
      shape: {
        type: String,
        value: 'hamburger-icon',
        reflectToAttribute: true,
        observe: "_handleChange",
      }
    };
  }

  _handleChange() {
    switch(this.shape){
      case 'hamburger-icon':
        this.buttonClose_fn();
      case 'arrow-left':
        this.buttonLeft_fn();
      case 'arrow-right':
        this.buttonRight_fn();
      case 'close':
        this.buttonMenu_fn();
      case 'add':
        this.buttonAdd_fn();
      default:
        this.buttonClose_fn();
    }
  }

  constructor() {
    super();
    this.buttonLeft_fn = this.buttonLeft_fn.bind(this);
    this.buttonRight_fn = this.buttonRight_fn.bind(this);
    this.buttonMenu_fn = this.buttonMenu_fn.bind(this);
    this.buttonClose_fn = this.buttonClose_fn.bind(this);
    this.buttonAdd_fn = this.buttonAdd_fn.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.init();
  }

  init() {
    Object.prototype.addClass = function(classname) {
      this.classList.add(classname);
    }
    Object.prototype.removeClass = function(classname) {
      this.classList.remove(classname);
    }

    const {
      buttonLeft,
      buttonRight,
      buttonMenu,
      buttonClose,
      buttonAdd,
    } = this.viewModel();

    buttonLeft.addEventListener('click', this.buttonLeft_fn);
    buttonRight.addEventListener('click', this.buttonRight_fn);
    buttonMenu.addEventListener('click', this.buttonMenu_fn);
    buttonClose.addEventListener('click', this.buttonClose_fn);
    buttonAdd.addEventListener('click', this.buttonAdd_fn);
  }

  viewModel() {
    const host = this;
    const iconBox =   $('.icon-box');
    const line01  =   $('#line01');
    const line02  =   $('#line02');
    const line03  =   $('#line03');
    const line04  =   $('#line04');
    
    const buttonLeft  =   $('#left');
    const buttonRight =   $('#right');
    const buttonMenu  =   $('#menu');
    const buttonClose =   $('#close');
    const buttonAdd   =   $('#add');
    return {
      iconBox,
      line01,
      line02,
      line03,
      line04,
      buttonLeft,
      buttonRight,
      buttonMenu,
      buttonClose,
      buttonAdd,
    }
    function $(selector) {
      return host.shadowRoot.querySelector(selector);
    }
  }

  buttonLeft_fn() {
    const _ = this.viewModel();
    _.buttonLeft.   addClass      ('button-active');
    _.line01.       addClass      ('line01-left');
    _.line04.       addClass      ('line04-left');
    
    _.buttonRight.  removeClass   ('button-active');
    _.buttonMenu.   removeClass   ('button-active');
    _.buttonClose.  removeClass   ('button-active');
    _.buttonAdd.    removeClass   ('button-active');
    _.line01.       removeClass   ('line01-right');
    _.line04.       removeClass   ('line04-right');
    _.line01.       removeClass   ('line01-close');
    _.line02.       removeClass   ('line02-close');
    _.line03.       removeClass   ('line03-close');
    _.line04.       removeClass   ('line04-close');
    _.iconBox.      removeClass   ('icon-box-add');
  }

  buttonRight_fn() {
    const _ = this.viewModel();
    _.buttonRight.  addClass      ('button-active');
    _.line01.       addClass      ('line01-right');
    _.line04.       addClass      ('line04-right');
    
    _.buttonLeft.   removeClass   ('button-active');
    _.buttonMenu.   removeClass   ('button-active');
    _.buttonClose.  removeClass   ('button-active');
    _.buttonAdd.    removeClass   ('button-active');
    _.line01.       removeClass   ('line01-left');
    _.line04.       removeClass   ('line04-left');
    _.line01.       removeClass   ('line01-close');
    _.line02.       removeClass   ('line02-close');
    _.line03.       removeClass   ('line03-close');
    _.line04.       removeClass   ('line04-close');
    _.iconBox.      removeClass   ('icon-box-add');
  }

  buttonMenu_fn() {
    const _ = this.viewModel();
    _.buttonMenu.  addClass      ('button-active');

    _.buttonLeft.   removeClass   ('button-active');
    _.buttonRight.  removeClass   ('button-active');
    _.buttonClose.  removeClass   ('button-active');
    _.buttonAdd.    removeClass   ('button-active');
    _.line01.       removeClass   ('line01-left');
    _.line04.       removeClass   ('line04-left');
    _.line01.       removeClass   ('line01-right');
    _.line04.       removeClass   ('line04-right');
    _.line01.       removeClass   ('line01-close');
    _.line02.       removeClass   ('line02-close');
    _.line03.       removeClass   ('line03-close');
    _.line04.       removeClass   ('line04-close');
    _.line01.       removeClass   ('line01-add');
    _.line04.       removeClass   ('line04-add');
    _.iconBox.      removeClass   ('icon-box-add');
  }

  buttonClose_fn() {
    const _ = this.viewModel();
    _.buttonClose.  addClass      ('button-active');
    _.line01.       addClass      ('line01-close');
    _.line02.       addClass      ('line02-close');
    _.line03.       addClass      ('line03-close');
    _.line04.       addClass      ('line04-close');

    _.buttonLeft.   removeClass   ('button-active');
    _.buttonRight.  removeClass   ('button-active');
    _.buttonMenu.   removeClass   ('button-active');
    _.buttonAdd.    removeClass   ('button-active');
    _.line01.       removeClass   ('line01-left');
    _.line04.       removeClass   ('line04-left');
    _.line01.       removeClass   ('line01-right');
    _.line04.       removeClass   ('line02-right');
    _.iconBox.      removeClass   ('icon-box-add');
  }

  buttonAdd_fn(){
    const _ = this.viewModel();
    _.buttonAdd.    addClass      ('button-active');
    _.line01.       addClass      ('line01-close');
    _.line02.       addClass      ('line02-close');
    _.line03.       addClass      ('line03-close');
    _.line04.       addClass      ('line04-close');
    _.iconBox.      addClass      ('icon-box-add');

    _.buttonLeft.   removeClass   ('button-active');
    _.buttonRight.  removeClass   ('button-active');
    _.buttonMenu.   removeClass   ('button-active');
    _.buttonAdd.    removeClass   ('button-active');
    _.line01.       removeClass   ('line01-left');
    _.line04.       removeClass   ('line04-left');
    _.line01.       removeClass   ('line01-right');
    _.line04.       removeClass   ('line02-right');
  }
}

window.customElements.define('hamburger-menu', HamburgerMenu);
