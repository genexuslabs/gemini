```
<gxg-form-textarea
id="gxg-textarea"
max-width="240px"
label="Describe your experience"
placeholder="I have experience as a.."
rows="4">
</gxg-form-textarea>
<br>
<gxg-button id="btn-show-errors">Show errors</gxg-button>

<script>
//Display error message
const btnShowErrors = document.getElementById("btn-show-errors");
btnShowErrors.addEventListener("click", function(){
    const gxgFormTextArea = document.getElementById("gxg-textarea");
    const gxgFormMessage = document.createElement("gxg-form-message");
    gxgFormMessage.innerHTML = "Please, describe your experience";
    gxgFormMessage.setAttribute("type", "error");
    gxgFormMessage.setAttribute("slot", "message");
    gxgFormTextArea.setAttribute("error",true);
    gxgFormTextArea.appendChild(gxgFormMessage);
});
</script>
```
