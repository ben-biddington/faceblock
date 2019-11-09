/*

  [i] https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension


  -> about:debugging#/runtime/this-firefox
  -> Load Temporary Add-on...

 */

try 
{
  getNames().then(blockList => {

    console.log(`Using blocklist: ${blockList}`);

    const application = new core.Application(
        { log: console.log }, 
        blockList);
  
    application.onBlocking(e => {
      const allImagesonPage = [...document.querySelectorAll("img")];
  
      e.images.forEach(toBlock => {
        const elements = allImagesonPage.filter(it => it.getAttribute('src') === toBlock.src);
        elements.forEach(it => {
          it.setAttribute('alt', 'blocked by faceblock');
          it.setAttribute('src', '');
        });
      });
    });
  
    application.start([...document.querySelectorAll("img")].map(image => ({ src: image.getAttribute('src'), alt: image.getAttribute('alt')}) ));

  }); 
}
catch(e) 
{
  console.log(e);
}