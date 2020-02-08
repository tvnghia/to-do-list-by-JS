window.addEventListener('DOMContentLoaded', function () {
  // create item
  function newItem() {
    var list = document.createElement('DIV');
    var div = document.createElement('DIV');
    var check = document.createElement('INPUT');
    var text = document.createElement('P');
    var del = document.createElement('BUTTON');

    list.className = 'list';
    check.className = 'check';
    del.className = 'dell';
    div.className = 'view';

    text.innerHTML = document.querySelector('.input-task').value;
    document.querySelector('.input-task').value = '';
    check.type = 'checkbox';
    del.innerHTML = 'X';

    list.appendChild(check);
    list.appendChild(text);
    list.appendChild(del);
    div.appendChild(list);

    document.querySelector('#result').appendChild(div);

    if(document.querySelector('.check-all').checked) {
      document.querySelector('.check-all').checked = false;
    }

    //event btn when check input
    document.querySelectorAll('.check').forEach(function(e) {
      if(document.querySelector('.comp').classList.contains('selected')) {
        if(!check.checked) {
          check.parentNode.parentNode.classList.add('hidden');
        }
      }
    })
  }

  // delete button
  function delItem() {
    document.querySelectorAll('.dell').forEach(function(button) {
      button.onclick = function() {
        this.parentNode.remove();

        itemCount();
        checkAll();
        hideFooter();
      }
    })
  }

  // check todo
  function checkItem() {
    document.querySelectorAll('.check').forEach(function(check){
      check.onchange = function() {
        if(check.checked) {
          this.parentNode.classList.add('del','complete');
          if(document.querySelector('.act').classList.contains('selected')) {
            check.parentNode.parentNode.classList.add('hidden');
          }
        } else {
          this.parentNode.classList.remove('del','complete');
          if(document.querySelector('.comp').classList.contains('selected')) {
            check.parentNode.parentNode.classList.add('hidden');
          }
        }
        itemCount();
        checkAll();
      }
    })
  }

  // check all
  function checkAll() {
    var item = parseInt(document.querySelectorAll('.list').length);
    var itemComp = parseInt(document.querySelectorAll('.complete').length);
    if(item === itemComp) {
      document.querySelector('.check-all').checked = true;
    } else {
      document.querySelector('.check-all').checked = false;
    }
    if(item === 0) {
      document.querySelector('.check-all').checked = false;
    }
  }

  // item count 
  function itemCount() {
    var itemCount = parseInt(document.querySelectorAll('.list').length) - parseInt(document.querySelectorAll('.complete').length);
    document.querySelector('.count').innerHTML = itemCount;
  }

  // hide footer
  function hideFooter() {
    if(document.querySelectorAll('.list').length !== 0) {
      document.querySelector('footer').style.display = 'block';
    } else {
      document.querySelector('footer').style.display = 'none';
    }
  }
  hideFooter();

  // select btn 
  function selectBtn(e) {
    document.querySelectorAll('.btn').forEach(function(btn) {
      btn.classList.remove('selected');
    })
    e.classList.add('selected');
  }

  // events btn
  function eventsBtn() {
    document.querySelectorAll('.list').forEach(function(e) {
      // all
      if(document.querySelector('.all').classList.contains('selected')) {
        e.parentNode.classList.remove('hidden');
      }
      //active
      if(document.querySelector('.act').classList.contains('selected')) {
        if(e.classList.contains('complete')) {
          e.parentNode.classList.add('hidden');
        } else {
          e.parentNode.classList.remove('hidden');
        }
      }
      //complete
      if(document.querySelector('.comp').classList.contains('selected')) {
        if(e.classList.contains('complete')) {
          e.parentNode.classList.remove('hidden');
        } else {
          e.parentNode.classList.add('hidden');
        }
      }
      //clear
      if(document.querySelector('.clear').classList.contains('selected')) {
        if(e.classList.contains('complete')) {
          e.parentNode.remove();
        }
      }
    })
  }

  // Enter item
  document.querySelector('.input-task').onkeypress = function(e) {
    if(e.which === 13 || e.keyCode === 13) {
      if(this.value === '') {
        return;
      }
      newItem();
      itemCount();
    }
    delItem();
    checkItem();
    hideFooter();
  }

  // Check all item
  document.querySelector('.check-all').onchange = function() {
    if(this.checked) {
      document.querySelectorAll('.check').forEach(function(check) {
        check.parentNode.classList.add('del','complete');
        check.checked = true;
      })
    } else {
      document.querySelectorAll('.check').forEach(function(check) {
        check.parentNode.classList.remove('del','complete');
        check.checked = false;
      })
    }
    itemCount();
  }
  // select button
  document.querySelectorAll('.btn').forEach(function(btn) {
    btn.onclick = function() {
      selectBtn(this);
      eventsBtn(this);
    }
  })
})
