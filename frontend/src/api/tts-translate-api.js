export const translateText = async (text, targetLang) => {
  const res = await fetch("http://localhost:5000/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, targetLang })
  });
  return await res.json();
};

export const speakText = async (text, language) => {
  const res = await fetch("http://localhost:5000/api/tts/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language })
  });
  return await res.json();
};
