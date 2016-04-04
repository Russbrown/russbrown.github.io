---
layout: post
title:  "Strict Mode"
date:   2016-04-04 09:00:00
categories: js
---

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

Strict mode is a part of ECMAScript 5 and is a way to tell the browser to use a stricter, more error prone mode of javascript. In a nutshell, strict mode changes previously accepted mistakes into errors. It also restricts some keywords in anticipation of future ECMAScript versions.

Strict mode can be applied to entire scripts or just specific functions but since compiling strict and non-strict scripts can be problematic and confusing, it is recommended to apply it on a function-by-function basis.

### How to do it

####Invoking strict mode:

<pre><code class="language-js">
    function strict(){
        'use strict';
        // some code here
    }
</code></pre>

###What it does

Impossible to accidentally create global variables.

<pre><code class="language-js">
    "use strict";
                            // Assuming a global variable mistypedVariable exists
    mistypedVaraible = 17;  // this line throws a ReferenceError due to the 
                            // misspelling of variable
</code></pre>

Assigning properties to a variable that are not allowed throws an error.

e.g. NaN is a non-writable global variable, normally assigning to NaN does nothing, in Strict Mode it throws an error.

<pre><code class="language-js">
    'use strict';
    // Assignment to a non-writable property
    var obj1 = {};
    Object.defineProperty(obj1, "x", { value: 42, writable: false });
    obj1.x = 9;                     // throws a TypeError
</code></pre>

Deleting undeletable properties throws an error.

<pre><code class="language-js">
    "use strict";
    delete Object.prototype;        // throws a TypeError
</code></pre>

Duplicate property names are a syntax error in strict mode.

<pre><code class="language-js">
    "use strict";
    var o = { p: 1, p: 2 };         // !!! syntax error
</code></pre>

Function parameter names must be unique.

<pre><code class="language-js">
    function sum(a, a, c){          // !!! syntax error
      "use strict";
      return a + b + c;             // wrong if this code ran
    }
</code></pre>

Octal syntax is forbidden. 

<pre><code class="language-js">
    "use strict";
    var sum = 015 +                 // !!! syntax error
              197 +
              142;
</code></pre>

Setting properties on [primitives](https://developer.mozilla.org/en-US/docs/Glossary/primitive) is forbidden.

<pre><code class="language-js">
    (function() {
    "use strict";

    false.true = "";                // TypeError
    (14).sailing = "home";          // TypeError
    "with".you = "far away";        // TypeError

    })();
</code></pre>

Strict mode prohibits function statements not at the top level of a script or function.

<pre><code class="language-js">
    "use strict";
    if (true){
      function f() { }              // !!! syntax error
      f();
    }

    for (var i = 0; i < 5; i++){
      function f2() { }             // !!! syntax error
      f2();
    }

    function baz(){                 // kosher
      function eit() { }            // also kosher
    }
</code></pre>

In strict mode, you can't name or use variables or arguments with these names: **implements**, **interface**, **let**, **package**, **private**, **protected**, **public**, **static**, and **yield** since they are reserved keywords.