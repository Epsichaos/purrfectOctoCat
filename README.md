purrfectOctoCat
===============

Description
-----------
*purrfectOctoCat* in a mobile application for lifestyle optimization. Enter your habits, your tasks, and you will be able to find out how your time is organized.

Librairies
----------

- Ionic framework
- Chart.js
- angular-chart
- ngCordova & SQLite

Installation
------------

- **SQLite** : Install cordova plugin : `cordova plugin add https://github.com/brodysoft/Cordova-SQLitePlugin.git`, then add the include in your *index.html* `<script src="js/ng-cordova.min.js"></script>` and include `ngCordova` in your angular module `angular.module('starter', ['ionic', 'ngCordova'])`. Don't forget to pass `$cordovaSQLite` in the angular function and to wrap your database declaration in the `$ionicPlatform.ready(function() { });`.

- **Chart.js & angular-chart** : Install with Bower : `bower install angular-chart.js --save` (or download the source file), then include it in your index.html `<script src="bower_components/angular-chart.js/dist/angular-chart.js"></script>`. Don't forget to include `chart.js` in your angular module `angular.module('myModule', ['chart.js'])`. Add the CSS `<link rel="stylesheet" href="css/angular-chart.min.css">` and the reference to Chart.js `<script src="js/Chart.min.js"></script>`.

Todo
----

- [ ] Handle form bad inputs
- [ ] Prevent SQL injections
- [x] Chart display and choice
- [x] Home page & quick review
- [ ] New date handle in SQLite (in text database column ?)


Travis - CI
-----------

Check out .travis.yml config file

License
-------

The MIT License (MIT)

Copyright (c) 2016

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
