/*
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>

    <button type="button" class="btn btn-link">Link</button>
*/

function Button(options) {
    options = options || {};
    var elem;

    var style = options.style ||'btn-primary', // btn-outline-primary
        size = options.size || 'btn-sm',
        text = options.text || 'text';

    this.create = function() {
        elem = document.createElement('button');
        elem.setAttribute('type', 'button');
        return elem;
    }

    this.render = function() {
        elem.className = `btn ${style} ${size}`;
        elem.innerHTML = text;
    }
}