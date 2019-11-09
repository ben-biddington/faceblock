function get() 
{
  return browser.storage.local.get().then(results => results.names || []);
}

function status(m) {
  document.querySelector("#log").innerHTML = m;
}

function addNew() {
  var newName = document.querySelector('#n').value || 'abc';

  return get().
    then(existingNames => browser.storage.local.set({ names: [...existingNames, newName] })).
    then(() => status(`Added <${newName}>`));
}

var addButton = document.querySelector('#add');
addButton.addEventListener('click', addNew);

try 
{
  // [i] https://github.com/mdn/webextensions-examples/blob/master/navigation-stats/popup.js
  get().
    then(results => results.names || []).
    then(results => {
      status(`results: ${JSON.stringify(results)}`);
    });
}
catch (e)
{
  status(e.toString());
}