{/* <input type="text" id="lagDataInput" onblur="makeReadOnly()" onkeydown="allowEditing(event)"> */}

  function makeReadOnly() {
    var input = document.getElementById('lagDataInput');
    input.readOnly = true;
  }

  function allowEditing(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      makeReadOnly();
    }
  }
