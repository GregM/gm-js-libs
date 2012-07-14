/**
 * 
 * z-index-list.js
 * Get JSON Object of all z-indexes on a given website when executing
 * zParser().run(). The result orders the elements in descending 
 * order by the z-index number.
 *
 *
 * Copyright (c) 2012 Gregory Mazurek <gregory.mazurek@gmail.com>
 * https://github.com/GregM/gm-js-libs
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

  var zParser = (function() {

    var
      zQueue = [],
      zJson = '{ "zindexes" : [ ',

      elClassName = function(el) {
        if ( el.className ) {
          return "." + el.className
        } else {
          return ""
        }
      },

      elId = function(el) {
        if ( el.id ) {
          elId = "#" + el.id
        } else {
          return ""
        }
      },

      generateJson = function(zQueue) {
        console.log("generate" + zQueue);
        for ( i = 0; i < (zQueue.length); i++) {
          console.log(zQueue[i]);
          zJson += '{'
                  + ' "z-index" : "' + zQueue[i][0]
                  + '", "elementTag" : "' + zQueue[i][1]
                  + '", "className" : "' + zQueue[i][2]
                  + '", "id" : "' + zQueue[i][3]
                  + '" }';
          if (i !== (zQueue.length - 1)) {
            zJson += ','
          }
        }
        zJson += '] }';
        return zJson
      },

      getDom = function() {
        return document.getElementsByTagName("*");
      },

      zIndexList = function(dom) {
        for ( i = 0; i < (dom.length - 1); i++ ) {
          if( dom[i].style.zIndex !== "" ) {
            zQueue.push( [ dom[i].style.zIndex, dom[i].tagName, elClassName(dom[i]), elId(dom[i]) ]);
          }
        }
        return zQueue;
      },

      sortDesc = function(a,b){
        return(b-a)
      },

      run = function() {
        zQueue = zIndexList(getDom());
        console.log( zQueue.sort(sortDesc) );
        return generateJson( zQueue.sort(sortDesc) );
      };

    return {
      run: run
    }

  });