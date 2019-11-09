function get() 
{
  return getNames();
}

// [i] https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/set
function set(next = []) 
{
  return saveNames(next);
}

function status(m) {
  document.querySelector("#log").innerText = `${m}\n`;
}

function addNew() {
  const newName = document.querySelector('#n').value;
  
  return addName(newName).
    then(showCurrent).
    then(() => document.querySelector('#n').value = null);
}

function remove(name) {
  return removeName(name).then(() => showCurrent());
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