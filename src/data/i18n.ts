import type { ChatMessage } from "./mockData";

export interface Language {
  code: string; // BCP-47, used for both recognition and synthesis
  label: string;
  nativeLabel: string;
  contentSupported: boolean; // whether we have translated demo conversation text
}

export const languages: Language[] = [
  { code: "en-US", label: "English", nativeLabel: "English", contentSupported: true },
  { code: "es-US", label: "Spanish", nativeLabel: "Español", contentSupported: true },
  { code: "fr-FR", label: "French", nativeLabel: "Français", contentSupported: false },
  { code: "zh-CN", label: "Mandarin", nativeLabel: "中文", contentSupported: false },
  { code: "hi-IN", label: "Hindi", nativeLabel: "हिन्दी", contentSupported: false },
  { code: "ar-SA", label: "Arabic", nativeLabel: "العربية", contentSupported: false },
];

export const demoChatEs: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    text: "Mi arrendador en San Francisco se quedó con todo mi depósito de $3,200 y ya pasaron 34 días desde que me mudé. No me ha mandado nada por escrito. ¿Qué puedo hacer?",
    timestamp: "9:41 AM",
  },
  {
    id: "m2",
    role: "assistant",
    text:
      "En resumen: su arrendador ya se pasó del plazo legal, y la ley pone la responsabilidad en él, no en usted.\n\nSegún la ley de California, el arrendador tiene 21 días después de que usted se muda para enviar una declaración detallada de cualquier deducción y devolver el resto del depósito【1】. Ya van 34 días sin nada por escrito, así que ya no cumplió ese plazo.\n\nUna vez que usted disputa los cargos por escrito, los tribunales de California han determinado que es el arrendador — no usted — quien debe justificar cualquier deducción【2】. Si resulta que está reteniendo el depósito de mala fe, y no solo con retraso, usted podría recuperar hasta el doble del monto del depósito además de los $3,200【3】.\n\nComo su unidad está en San Francisco, también podría aplicar una ordenanza local, una vez que sepamos el tipo de edificio【4】.\n\nLe recomiendo: enviar una carta de exigencia por escrito citando el plazo de 21 días, darle 10 días para responder, y si no responde, presentar una demanda en la corte de reclamos menores — no se necesita abogado para un monto así.",
    citations: [
      { markerId: 1, sourceId: "src-1" },
      { markerId: 2, sourceId: "src-3" },
      { markerId: 3, sourceId: "src-2" },
      { markerId: 4, sourceId: "src-5" },
    ],
    timestamp: "9:41 AM",
  },
  {
    id: "m3",
    role: "user",
    text: "¿Puede simplemente decir que la alfombra necesitaba reemplazo y quedarse con el dinero por eso?",
    timestamp: "9:44 AM",
  },
  {
    id: "m4",
    role: "assistant",
    text:
      "Puede alegarlo, pero alegarlo no es lo mismo que probarlo. El desgaste normal de una alfombra después de un arrendamiento típico generalmente no se puede deducir; solo se puede deducir el daño más allá del uso normal, y aun así él debe entregarle la declaración detallada y, normalmente, facturas o estimados que respalden el costo【1】.\n\nComo ya se pasó del plazo de 21 días, la obligación de itemizar no desaparece — solo debilita más su posición mientras más tarde. Yo le pediría directamente, por escrito, la declaración detallada y las facturas antes de asumir que el reclamo de la alfombra se sostiene.",
    citations: [{ markerId: 1, sourceId: "src-1" }],
    timestamp: "9:44 AM",
  },
];

export const followUpsEs = [
  "¿Qué pasa si ignora la carta de exigencia?",
  "¿Cuánto cuesta presentar una demanda de reclamos menores?",
  "¿Debería tener esto por escrito antes de seguir adelante?",
];

export const fallbackReplyEs =
  "Esa es una buena siguiente pregunta. En general, una vez que usted envía una exigencia por escrito y el plazo pasa sin respuesta, la corte de reclamos menores es el siguiente paso estándar para un monto así — no se necesita abogado, y la cuota de presentación para este rango normalmente es menos de $75. Yo guardaría cada mensaje y el contrato original a la mano para la audiencia.";
