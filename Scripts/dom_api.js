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
   return toArray( ancestor.getElementsByTagName( tag ) );
}

/** 
 * @function getElemsByClass
 * 
 * Returns all matched elements having class name(s)
 *
 * @param ancestor   {Element}   element, default `document`
 * @param name       {String}    class name(s)
 *
 * @returns          {Array}     Elements collection
**/
function getElemsByClass( ancestor, name ) {
   ancestor = ancestor  || document;
   if ( ancestor.getElementsByClassName ) {
      // API natively supported
      return [].slice.call( ancestor.getElementsByClassName( name ) );
   }
   return toArray( getElemsByTag( '*', ancestor ) ).filter( function ( elem ) {
      var classes = name.split(' ');
      for ( var i=0; i<classes.length; i += 1 ) {
         if ( ! classes[i] ) {
            continue;
         }
         if ( elem.className.split(' ').indexOf( classes[i] ) == -1 ) {
            return false;
         }
      }
      return true;
   });
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

/** 
 * @function getAttributes
 * 
 * Returns attributes' values by given attribute names (Array)
 * 
 * @param  {HTMLElement}   elem  HTML Element whose attributes' values we want
 * @param  {Array}         attrs Array of attribute names
 * 
 * @returns {Array}  Attributes' values
 */
function getAttributes( elem, attrs ) {
   var values = [];   // here we keep attribute values
   for ( var i=0, l=attrs.length; i<l; i += 1 ) {
      values.push( elem.getAttribute( attrs[i] ) );
   }
   return values;
}

/** 
 * @function setAttributes
 * 
 * Sets multiple attributes' values
 * 
 * @param {HTMLElement} elem  HTML Element whose attributes' values we want to set
 * @param {Object}      pairs Hash - attribute_name:attribute_value pairs
 */
function setAttributes( elem, pairs ) {
   for ( var name in pairs ) {
      if ( pairs.hasOwnProperty( name ) ) {
         elem.setAttribute( name, pairs[ name ] );
      }
   }
}

// Adding these methods to HTMLElement.prototype
[
   'getElemsByTag',
   'getElemsByClass',
   'getPrevious',
   'getNext',
   'getChildren',
   'getAttributes',
   'setAttributes'
].forEach( function ( fn ) {
   HTMLElement.prototype[ fn ] = function () {
      var args = [].slice.call( arguments );
      args.unshift( this );
      return window[ fn ].apply( null, args );
   }
});

