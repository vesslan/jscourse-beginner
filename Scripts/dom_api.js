!window.HTMLElement && (HTMLElement = Element); // IE8

/** 
 * @function getElemsByTag
 * 
 * Returns all matched elements by their tag name
 *
 * @param ancestor   {Element}   element, default `document`
 * @param tag        {String}    tag name, default '*'
 *
 * @returns          {Array}     Elements collection
**/
function getElemsByTag( ancestor, tag ) {
   tag      = tag       || '*';  // get all elements by default
   ancestor = ancestor  || document;
   return ancestor.getElementsByTagName( tag );
}

/** 
 * @function getPrevious
 * 
 * Returns previous sibling, ignoring white space
 *
 * @param elem {HTMLElement}  The element whose previous sibling we want to get
 *
 * @returns {HTMLElement}
**/
function getPrevious( elem ) {
   do {
      elem = elem.previousSibling;
   } while ( elem && ! elem.tagName );
   return elem;
}

/** 
 * @function getNext
 * 
 * Returns next sibling, ignoring white space
 *
 * @param elem {HTMLElement}  The element whose next sibling we want to get
 *
 * @returns {HTMLElement}
**/
function getNext( elem ) {
   do {
      elem = elem.nextSibling;
   } while ( elem && ! elem.tagName );
   return elem;
}

/** 
 * @function getChildren
 * 
 * Returns element's children, ignoring white space
 *
 * @param elem {HTMLElement}  The element whose children (HTML elements) we want to get
 *
 * @returns {Array}
**/
function getChildren( elem ) {
   var children = [].slice.call( elem.childNodes );
   return children.filter( function ( child ) {
      return !! child.tagName;
   });
}

// Adding these methods to HTMLElement.prototype
[
   'getElemsByTag',
   'getPrevious',
   'getNext',
   'getChildren'
].forEach( function ( fn ) {
   HTMLElement.prototype[ fn ] = function () {
      var args = [].slice.call( arguments );
      args.unshift( this );
      return window[ fn ].apply( null, args );
   }
});

