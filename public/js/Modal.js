/*
 * jquery библиотекасын пайдаланбаған дұрыс еді
 * 
 *  Тәуелділіктер:
 *    jQuery
**/ 

function Modal(opt) {

  opt = opt || {};     // option

  // private
  var options = {
    backdrop: opt.backdrop ? true : false,                    // boolean
    animation: opt.animation || '',                           // string
    centered: opt.centered ? 'modal-dialog-centered' : '',    // string
    size: opt.size || 'modal-xl',                             // string
    title: opt.title || 'IT IS TITLE',                        // string
    container: opt.container || 'frame'                       // string
  };

  var elem,         // Контейнердің объектісіне link     type Javascript Object
      modal,        // Модалға линк                      type Javascript Object
      body = {},    // Body линк                         type Javascript Object
      footer = {};  // Footer линк                       type Javascript Object

  // methods
  this.getOptions = function() {
    return options;
  }

  this.show = function () {
    $(modal).modal({ 'show': true, 'backdrop': options.backdrop });
  }

  this.hide = function () {
    $(modal).modal('hide');
  }

  this.create = function () {
    elem = document.createElement('div');
    elem.classList.add(options.container);
    this.render();
  }

  this.render = function() {
    let html = generateHTML();
    elem.insertAdjacentHTML('beforeend', html);
    modal = elem.firstElementChild;

    body["body"] = modal.querySelector('.modal-body');
    footer["footer"] = modal.querySelector('.modal-footer');

    document.body.appendChild(elem);
  }

  this.body = {
    append: function(elem, name) {
      body[name] = elem;
      return body["body"].append(elem);
    }
  };

  this.footer = {
    append: function(elem, name) {
      footer[name] = elem;
      return footer["footer"].append(elem);
    }
  };

  // this.render = function(name) {
  //   func.call()
  // }

  function generateHTML() {
    let html = `<div id="mymodal" class="modal ${options.animation}" tabindex="-1" role="dialog">` +
      `<div class="modal-dialog ${options.centered} ${options.size}" role="document">` +
      `<div class="modal-content"><div class="modal-header">` +
      `<h5 class="modal-title">${options.title}</h5>` +
      `<button type="button" class="close" data-dismiss="modal" aria-label="Close">` +
      `<span aria-hidden="true">&times;</span> </button> </div>` +
      `<div class="modal-body"> </div>` +   // бұл жерге бодиге қойылатын объектіні ойластырау керек
      `<div class="modal-footer">` +        // осы жерге футерге қойылатын объектіні ойластыру керек
      `</div></div> </div> </div>`;

      return html;

  }

}