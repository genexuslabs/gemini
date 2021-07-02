```
    <gxg-form-text label="Full name" label-position="top" placeholder="John Smith" id="gxg-form-text" max-width="240px"></gxg-form-text>
    <br>
    <gxg-button id="btn-show-errors">Show errors</gxg-button>

    <script>
      //Display error message
      const btnShowErrors = document.getElementById("btn-show-errors");
      btnShowErrors.addEventListener("click", function(){
      const gxgFormText = document.getElementById("gxg-form-text");
      const gxgFormMessage = document.createElement("gxg-form-message");
      gxgFormMessage.innerHTML = "Please, provide your full name";
      gxgFormMessage.setAttribute("type", "error");
      gxgFormMessage.setAttribute("slot", "message");
      gxgFormText.setAttribute("error",true);
      gxgFormText.appendChild(gxgFormMessage);
    });
    </script>
```
