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
  --line-color: currentcolor;
  --line-thickness: var(--line-width, calc(2em/24));
  --icon-width: calc(80em/24);
  display: inline;
  font-size: 62.5%;
  margin: 0;
  padding: 0;
  width: var(--icon-width);
  height: var(--icon-width);
}
.container {
  width: var(--icon-width);
  height: var(--icon-width);
  display: flex;
  justify-content: center;
  align-items: center;
}
/*-------------------------------------------- icon */
.icon-box {
/*   background-color: rgba(0,0,0,0.1); */
  height: 2.5em;
  position: relative;
  transform: rotate(0deg);
  transition-duration: 0.4s;
  transform-origin: center;
  transition-timing-function: cubic-bezier(.69,-0.49,.39,.97);
  width: calc(80em/24);
}
.line {
  background-color: var(--line-color);
  border-radius: calc(2em/24);
  height: var(--line-thickness);
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
  top: calc(50% - calc(1em/24) - var(--line-thickness)/4);
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
  left: calc(63em/24);
  top: calc(50% - 8em/24);
  transform: rotate(45deg);
  width: calc(20em/24);
}
#line04.line04-right {
  left: calc(63em/24);
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
<div class="container">
  <div class="icon-box">
    <div id="line01" class="line"></div>
    <div id="line02" class="line"></div>
    <div id="line03" class="line"></div>
    <div id="line04" class="line"></div>
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
        observer: "_handleChange",
      }
    };
  }

  _handleChange() {
    switch(this.shape){
      case 'hamburger-icon':
        this.buttonMenu_fn();
        break;
      case 'arrow-left':
        this.buttonLeft_fn();
        break;
      case 'arrow-right':
        this.buttonRight_fn();
        break;
      case 'close':
        this.buttonClose_fn();
        break;
      case 'add':
        this.buttonAdd_fn();
        break;
      default:
        this.buttonMenu_fn();
    }
  }

  constructor() {
    super();
    Object.prototype.addClass = function(classname) {
      this.classList.add(classname);
    }
    Object.prototype.removeClass = function(classname) {
      this.classList.remove(classname);
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this._handleChange();
  }

  viewModel() {
    const host = this;
    const iconBox =   $('.icon-box');
    const line01  =   $('#line01');
    const line02  =   $('#line02');
    const line03  =   $('#line03');
    const line04  =   $('#line04');
    return {
      iconBox,
      line01,
      line02,
      line03,
      line04,
    }
    function $(selector) {
      return host.shadowRoot.querySelector(selector);
    }
  }

  buttonLeft_fn() {
    const _ = this.viewModel();
    _.line01.       addClass      ('line01-left');
    _.line04.       addClass      ('line04-left');

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
    _.line01.       addClass      ('line01-right');
    _.line04.       addClass      ('line04-right');

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
    _.line01.       addClass      ('line01-close');
    _.line02.       addClass      ('line02-close');
    _.line03.       addClass      ('line03-close');
    _.line04.       addClass      ('line04-close');

    _.line01.       removeClass   ('line01-left');
    _.line04.       removeClass   ('line04-left');
    _.line01.       removeClass   ('line01-right');
    _.line04.       removeClass   ('line02-right');
    _.iconBox.      removeClass   ('icon-box-add');
  }

  buttonAdd_fn(){
    const _ = this.viewModel();
    _.line01.       addClass      ('line01-close');
    _.line02.       addClass      ('line02-close');
    _.line03.       addClass      ('line03-close');
    _.line04.       addClass      ('line04-close');
    _.iconBox.      addClass      ('icon-box-add');

    _.line01.       removeClass   ('line01-left');
    _.line04.       removeClass   ('line04-left');
    _.line01.       removeClass   ('line01-right');
    _.line04.       removeClass   ('line02-right');
  }
}

window.customElements.define('hamburger-menu', HamburgerMenu);
