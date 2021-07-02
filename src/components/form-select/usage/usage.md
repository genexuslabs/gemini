```
   <gxg-select
    label="Select a car:"
    label-position="above"
    max-width="240px"
    size="5"
    id="gxg-select"
  >
    <gxg-option value="0">Select car:</gxg-option>
    <gxg-option value="1">Audi</gxg-option>
    <gxg-option value="2">BMW</gxg-option>
    <gxg-option value="3">Citroen</gxg-option>
    <gxg-option value="4">Ford</gxg-option>
    <gxg-option value="5">Honda</gxg-option>
    <gxg-option value="6">Jaguar</gxg-option>
    <gxg-option value="7">Land Rover</gxg-option>
    <gxg-option value="8">Mercedes</gxg-option>
  </gxg-select>
  <br>
  <gxg-button id="btn-show-errors">Show errors</gxg-button>
  <script>
      const btnShowErrors = document.getElementById("btn-show-errors");
      btnShowErrors.addEventListener("click", function(){
      const gxgSelect = document.getElementById("gxg-select");
      const gxgFormMessage = document.createElement("gxg-form-message");
      gxgFormMessage.innerHTML = "You have to select a car";
      gxgFormMessage.setAttribute("type", "error");
      gxgFormMessage.setAttribute("slot", "message");
      gxgSelect.setAttribute("error",true);
      gxgSelect.appendChild(gxgFormMessage);
    });
  </script>
```
