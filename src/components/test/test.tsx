import { Component, h, Element } from "@stencil/core";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true
})
export class GxgTest {
  @Element() el: HTMLElement;

  render() {
    return [
      <div class="container">
        <section class="section-dev" data-title="shortcut">
          <h2>Formulario de Contacto</h2>

          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              data-shortcut="Alt+N"
            />
          </div>

          <div>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              data-shortcut="Alt+E"
              data-shortcut-prevent="Enter"
              aria-keyshortcuts="Alt+E"
            />
          </div>

          <div>
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea
              id="mensaje"
              name="mensaje"
              data-shortcut="Alt+M"
            ></textarea>
          </div>

          <div>
            <button
              id="enviar"
              data-shortcut="Enter"
              data-shortcut-action="click"
            >
              Enviar
            </button>
          </div>
        </section>
      </div>,
      <gxg-shortcuts src="../assets/json/shortcuts.json"></gxg-shortcuts>
    ];
  }
}
