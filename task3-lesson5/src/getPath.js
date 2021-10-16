function getPath(el) {
    function getChildNumber(parent, element) {
        const children = parent.children;
        if (children.length === 0) {
            return element.nodeName;
        } else {
            return element.nodeName + ':nth-child(' + (Array.prototype.indexOf.call(children, element) + 1) + ')';
        }
    }

    let selector = '';
    let curEl = el;
    while (curEl.nodeName.toLowerCase() !== 'body' ) {
        selector = '>' + getChildNumber(curEl.parentNode, curEl) + selector;
        curEl = curEl.parentNode;
    }
    
    selector = 'BODY ' + selector;
    return selector;
}

module.exports = getPath;
