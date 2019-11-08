/*

  [i] https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension


  -> about:debugging#/runtime/this-firefox
  -> Load Temporary Add-on...

 */
const allImages = document.querySelectorAll("img");

console.log(`Faceblock loaded, current page has <${allImages.length}> images`);