import type { LocalizedText } from "@/content";

export type VisualWork = {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  description: LocalizedText;
  duration: string;
  width: number;
  height: number;
};

// Owner-supplied portfolio films. Descriptive titles do not imply a client commission.
export const visualWork: VisualWork[] = [
  { id: "after-the-rain", title: { en: "After the rain", ar: "بعد المطر" }, category: { en: "Automotive", ar: "سيارات" }, description: { en: "Rain, forest light and a quiet moment before the drive.", ar: "مطر وضوء الغابة ولحظة هدوء قبل الانطلاق." }, duration: "0:15", width: 1024, height: 576 },
  { id: "city-under-watch", title: { en: "City under watch", ar: "مدينة تحت الأنظار" }, category: { en: "Fashion film", ar: "فيلم أزياء" }, description: { en: "A monochrome city story, framed through movement and observation.", ar: "حكاية مدينة بالأبيض والأسود، من خلال الحركة والمراقبة." }, duration: "0:15", width: 1024, height: 576 },
  { id: "red-move", title: { en: "The red move", ar: "الخطوة الحمراء" }, category: { en: "Brand film", ar: "فيلم علامة تجارية" }, description: { en: "A playful product story built around red, packaging and a chess piece.", ar: "حكاية بصرية مرحة تجمع الأحمر والتغليف وقطعة شطرنج." }, duration: "0:12", width: 1024, height: 576 },
  { id: "summer-football", title: { en: "Summer football", ar: "كرة وصيف" }, category: { en: "Fashion film", ar: "فيلم أزياء" }, description: { en: "Football-inspired styling in the warmth of a sunlit courtyard.", ar: "إطلالة مستوحاة من كرة القدم في دفء فناء مضاء بالشمس." }, duration: "0:10", width: 1024, height: 576 },
  { id: "desert-motion", title: { en: "Desert motion", ar: "حركة في الصحراء" }, category: { en: "Automotive", ar: "سيارات" }, description: { en: "An electric-green silhouette against open roads and desert landmarks.", ar: "سيارة بلون أخضر لافت وسط طرق مفتوحة ومعالم الصحراء." }, duration: "0:15", width: 1024, height: 576 },
  { id: "engineered-bond", title: { en: "Engineered bond", ar: "ترابط بإتقان" }, category: { en: "Product film", ar: "فيلم منتج" }, description: { en: "An industrial product study in precision, material and light.", ar: "دراسة بصرية لمنتج صناعي تجمع الدقة والخامة والإضاءة." }, duration: "0:15", width: 1024, height: 576 },
  { id: "coastline", title: { en: "Coastline", ar: "على الساحل" }, category: { en: "Fashion film", ar: "فيلم أزياء" }, description: { en: "White fabric, sea air and the last light of the day.", ar: "قماش أبيض وهواء البحر وآخر ضوء في النهار." }, duration: "0:04", width: 1024, height: 576 },
  { id: "golden-hour", title: { en: "Golden hour", ar: "الساعة الذهبية" }, category: { en: "Fashion film", ar: "فيلم أزياء" }, description: { en: "Linen and warm tones above a mountain landscape.", ar: "كتان ودرجات دافئة أمام مشهد جبلي." }, duration: "0:03", width: 576, height: 768 },
  { id: "jersey-in-motion", title: { en: "Jersey in motion", ar: "تفاصيل تتحرك" }, category: { en: "Product film", ar: "فيلم منتج" }, description: { en: "A close look at colour, texture and the details of a football shirt.", ar: "نظرة قريبة على اللون والخامة وتفاصيل قميص كرة القدم." }, duration: "0:05", width: 1024, height: 576 },
  { id: "electric-identity", title: { en: "Electric identity", ar: "هوية مضيئة" }, category: { en: "Motion identity", ar: "هوية متحركة" }, description: { en: "A luminous lion emblem takes shape within an orbit of light.", ar: "شعار أسد مضيء يتشكل داخل مدار من الضوء." }, duration: "0:15", width: 1024, height: 576 },
  { id: "on-the-move", title: { en: "On the move", ar: "في الطريق" }, category: { en: "Brand story", ar: "حكاية علامة" }, description: { en: "People, travel and football, brought together in a longer brand story.", ar: "ناس وسفر وكرة قدم يجتمعون في حكاية أطول للعلامة." }, duration: "1:44", width: 576, height: 1024 },
];
