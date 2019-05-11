
LOADING_SECOND = '2nd';

function loading_func_2nd(caller) {
  console.log('loading_func_2nd', caller);
}

console.log('loading/second.js', LOADING_FIRST);
loading_func_1st('loading/second.js');

console.log('loading/second.js', 'END');

