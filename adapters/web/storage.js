function getNames() 
{
  return browser.storage.local.get('names').
    catch(e => { throw `GET-FAILED: ${e}`; }).
    then(result => result.names || []);
}

// [i] https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/set
function saveNames(next = []) 
{
  return browser.storage.local.set({ names: next }).
    catch(e => { throw `SET-FAILED: ${e}`; });
}

function addName(name) 
{
  if ((name || '') == '')
    return Promise.resolve();
    
  return getNames().then(existingNames => saveNames([ ...existingNames, name ]));
}

function removeName(name) 
{
  return get().then(existingNames => saveNames(existingNames.filter(it => it != name)));
}