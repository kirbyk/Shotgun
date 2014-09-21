function toggleOptions(el) {
    el = el.parentNode.parentNode;
    var opt;
    for (var i = 0; i < el.parentNode.childNodes.length; i++) {
        console.log(el.parentNode.childNodes[i]);
        if (el.parentNode.childNodes[i].className.indexOf('item-options') > -1) {
          opt = el.parentNode.childNodes[i];
          break;
        }
    }
    if (el.className.indexOf('open') <= -1) {
        el.className = el.className + " open";
        opt.className = opt.className.replace( /(?:^|\s)invisible(?!\S)/g , '' );
    }
    else {
        opt.className = opt.className + " invisible";
        el.className = el.className.replace( /(?:^|\s)open(?!\S)/g , '' );
    }
}