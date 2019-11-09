function get() 
{
  return browser.storage.local.get().
  then(results => results.names || []).
  then(result => {
    status(`Returning: ${result.length}`);  
    return result;
  });
}

function set(newNames = []) 
{
  var next = { names: newNames };

  status(next);

  return browser.storage.local.set(next);
}

function status(m) {
  document.querySelector("#log").innerText = m;
}

function addNew() {
  var newName = document.querySelector('#n').value || 'abc';
  
  return get().
    then((existingNames) => set([ ...existingNames, newName ])).
    then(()              => showCurrent());
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
    status(`showing <${results.length}> results`);
    results.forEach(r => {
      var deleteButton = document.createElement('button');
      deleteButton.innerText = 'x';
      deleteButton.addEventListener('click', remove(r));
      
      var text = document.createElement('span');
      text.setAttribute('style', 'margin-left: 2px');
      text.innerText = escape(r);

      var li = document.createElement('li');
      li.appendChild(deleteButton);
      li.appendChild(text);
      
      list.appendChild(li);
    });

    settings.appendChild(list);
  });
}

var addButton = document.querySelector('#add');
addButton.addEventListener('click', addNew);

try 
{
  // [i] https://github.com/mdn/webextensions-examples/blob/master/navigation-stats/popup.js
  showCurrent();
}
catch (e)
{
  status(e.toString());
}