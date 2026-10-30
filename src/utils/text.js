// Shortens long product copy to whole sentences that fit within `max` characters.
export const summarize = (text = '', max = 200) => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  let out = '';
  for (const sentence of sentences) {
    if ((out + sentence).trim().length > max) break;
    out += sentence;
  }
  return (out || sentences[0]).trim();
};
