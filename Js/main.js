
import { xLuIncludeFile } from "./xLuIncludeFile.js";
import {iniciarBuscador} from "./searching.js";
import "./carrusel.js";



async function iniciarGlobal() {
    await xLuIncludeFile();
    await iniciarBuscador();

    const eventoTerminado = new Event('TemplatesCargados');
    document.dispatchEvent(eventoTerminado);

}
document.addEventListener("DOMContentLoaded", iniciarGlobal);

