const  getPath = el => {
    function getChildNumber(parent, element) {
        const children = parent.children;
        let classNameSelector = '';
        let nthChildSelector = '';
        if (element.className) {
            classNameSelector = '.' + element.className;
        }
        if (children.length !== 0) {
            nthChildSelector = ':nth-child(' + (Array.from(children).indexOf(element) + 1) + ')';
            
        }
        return element.nodeName + classNameSelector + nthChildSelector;
    }

    let selector = '';
    let curEl = el;
    while (!curEl.id && curEl.nodeName.toLowerCase() !== 'body' ) {
        selector = '>' + getChildNumber(curEl.parentNode, curEl) + selector;
        curEl = curEl.parentNode;
    }

    if (curEl.id) {
        return '#' + curEl.id + selector;
    }
    
    selector = 'BODY' + selector;
    return selector;
}

module.exports = getPath;
