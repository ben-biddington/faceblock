/*

  [i] https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension


  -> about:debugging#/runtime/this-firefox
  -> Load Temporary Add-on...

 */

const init = () => {
    const allImages = [...document.querySelectorAll("img")];

    console.log(`Faceblock loaded, current page has <${allImages.length}> images.`);
    console.log(`Faceblock loaded, current page has <${allImages.length}> images.`);
    console.log(`List: ${allImages.map(it => it.getAttribute('src')).join('\n')}`);

    const people = [ 'Luxon', 'Andy Foster', 'Sonny Bill Williams' ];
}

try 
{
    init();
}
catch(e) 
{
    console.log(e);
}