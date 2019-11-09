function get() 
{
  return browser.storage.local.get('names').
    catch(e => status(`GET-FAILED: ${e}`)).
    then(result => result.names || []).
    then(result => {
      status(`GET: ${JSON.stringify(result)}`);  
      
      return result
    });
}

// [i] https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/set
function set(next = []) 
{
  status(`SET: ${JSON.stringify(next)}`);

  return browser.storage.local.set({ names: next }).
    then(() => status("OK")).
    catch(e => status(`SET-FAILED: ${e}`));
}

function status(m) {
  document.querySelector("#log").innerText = `${m}\n`;
}

function addNew() {
  const newName = document.querySelector('#n').value || 'abc';
  
  return get().
    then(existingNames => set([ ...existingNames, newName ])).
    then(()            => showCurrent());
}

function remove(name) {
  return get().
    then(existingNames => set(existingNames.filter(it => it != name))).
    then(() => showCurrent());
}

function showCurrent() {
  var settings = document.querySelector('#settings');

  var list = document.createElement('ul');

  return get().then(results => {
    results.forEach(r => {
      var deleteButton = document.createElement('a');
      deleteButton.innerText = 'x';
      deleteButton.setAttribute('href', '');
      deleteButton.addEventListener('click', () => remove(r));
      
      var text = document.createElement('span');
      text.setAttribute('style', 'margin-left: 2px');
      text.innerText = escape(r);

      var li = document.createElement('li');
      li.appendChild(deleteButton);
      li.appendChild(text);
      
      list.appendChild(li);
    });

    while (settings.firstChild) {
      settings.removeChild(settings.firstChild);
    }

    settings.appendChild(list);
  });
}

document.querySelector('#add').addEventListener('click', addNew);
document.querySelector('#n').addEventListener('keypress', e => {
  if (e.which == 13 || e.keycode == 13) {
    addNew();
  }
});

try 
{
  // [i] https://github.com/mdn/webextensions-examples/blob/master/navigation-stats/popup.js
  showCurrent();
}
catch (e)
{
  status(e.toString());
}