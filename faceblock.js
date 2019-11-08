/*

  [i] https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension


  -> about:debugging#/runtime/this-firefox
  -> Load Temporary Add-on...

 */

try 
{
    const application = new core.Application(
        { log: console.log }, 
        [ 'Luxon', 'Andy Foster', 'Sonny Bill Williams', 'Jo Young', 'zara_on_trampoline', 'Bono' ]);

    console.log(application);

    application.start([...document.querySelectorAll("img")].map(image => ({ src: image.getAttribute('src')}) ));
}
catch(e) 
{
    console.log(e);
}