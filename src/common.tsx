import { h } from "@stencil/core";

function formMessage() {
  /* The following snipet of jsx is intended to be inserted at the end of every form-x component.
  The purpose of this jsx snippet is to show error or warning messages,
  inserted on the "message" slot with a gxg-form-message component
  */
  return (
    <div class="messages-wrapper" role="alert" aria-live="assertive">
      <slot name="message"></slot>
    </div>
  );
}
export { formMessage };
