/*

  [i] https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension


  -> about:debugging#/runtime/this-firefox
  -> Load Temporary Add-on...

 */

 // Returns list of blocked urls
const block = (disallowed, list) => {
    const matchesAny = text => disallowed.map(it => it.replace(/\s/g, '_')).some(d => text.match(new RegExp(`${d}`, 'i')));

    return list.filter(matchesAny);
};

const init = () => {
    const allImages = [...document.querySelectorAll("img")];

    console.log(`Faceblock loaded, current page has <${allImages.length}> images.`);
    console.log(`Faceblock loaded, current page has <${allImages.length}> images.`);

    const people = [ 'Luxon', 'Andy Foster', 'Sonny Bill Williams', 'Jo Young', 'zara_on_trampoline' ];

    const blockable = block(people, allImages.map(it => it.getAttribute('src')))

    console.log(`List: ${allImages.map(it => it.getAttribute('src')).join('\n')}`);
    console.log(`Blockable: ${blockable.join('\n')}`);
}

try 
{
    init();
}
catch(e) 
{
    console.log(e);
}