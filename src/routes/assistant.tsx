import { createFileRoute } from "@tanstack/react-router";
import { Camera, Headphones, ImagePlus, Mic, RotateCcw, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { CHAT_KEY, HISTORY_KEY, initialMessages, mockAnswer, speakTamil, type ChatMessage, type HistoryItem } from "@/lib/agri-data";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [
    { title: "தமிழ் AI உதவியாளர் — AgriTamil AI" }, { name: "description", content: "குரல், எழுத்து அல்லது பயிர் படத்துடன் தமிழில் விவசாய கேள்வி கேளுங்கள்." },
    { property: "og:title", content: "தமிழ் AI உதவியாளர் — AgriTamil AI" }, { property: "og:description", content: "தமிழில் எளிய மாதிரி விவசாய வழிகாட்டுதல்." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: AssistantPage,
});

type SpeechRecognitionLike = { lang: string; interimResults: boolean; onstart: () => void; onend: () => void; onerror: () => void; onresult: (event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void; start: () => void };

function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [image, setImage] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { const raw = localStorage.getItem(CHAT_KEY); if (raw) { try { setMessages(JSON.parse(raw) as ChatMessage[]); } catch { localStorage.removeItem(CHAT_KEY); } } }, []);
  const save = (next: ChatMessage[]) => { setMessages(next); localStorage.setItem(CHAT_KEY, JSON.stringify(next)); };
  const ask = (text: string) => {
    const clean = text.trim(); if (!clean || loading) return;
    const user: ChatMessage = { id: crypto.randomUUID(), role: "user", text: clean, image };
    save([...messages, user]); setVoiceText(""); setImage(undefined); setLoading(true);
    window.setTimeout(() => {
      const reply = mockAnswer(clean); const assistant: ChatMessage = { id: crypto.randomUUID(), role: "assistant", text: reply };
      const next = [...messages, user, assistant]; save(next); setLoading(false);
      const existing = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]") as HistoryItem[];
      localStorage.setItem(HISTORY_KEY, JSON.stringify([{ id: user.id, date: new Date().toLocaleDateString("ta-IN"), crop: "பொது கேள்வி", question: clean, result: "AI வழிகாட்டுதல் (மாதிரி)", confidence: 0, recommendation: reply, image }, ...existing]));
    }, 1100);
  };
  const startVoice = () => {
    const speechWindow = window as typeof window & { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike };
    const Recognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!Recognition) { toast.info("இந்த உலாவியில் குரல் பதிவு கிடைக்கவில்லை. கேள்வியை டைப் செய்யுங்கள்."); return; }
    const recognition = new Recognition(); recognition.lang = "ta-IN"; recognition.interimResults = false;
    recognition.onstart = () => setListening(true); recognition.onend = () => setListening(false); recognition.onerror = () => { setListening(false); toast.error("குரல் தெளிவாக பதிவாகவில்லை. மீண்டும் முயற்சிக்கவும்."); };
    recognition.onresult = (event) => { const text = event.results[0]?.[0]?.transcript; if (text) setVoiceText(text); };
    recognition.start();
  };
  const pickImage = (file?: File) => { if (!file) return; if (!file.type.match(/^image\/(jpeg|png)$/)) { toast.error("JPG, JPEG அல்லது PNG படத்தைத் தேர்வு செய்யுங்கள்."); return; } const reader = new FileReader(); reader.onload = () => { if (typeof reader.result === "string") setImage(reader.result); }; reader.readAsDataURL(file); };
  return <div className="mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-7xl lg:grid-cols-[310px_1fr]">
    <aside className="hidden border-r bg-secondary/35 p-6 lg:block"><span className="eyebrow">ஒரே உரையாடல்</span><h1 className="mt-4 text-2xl font-extrabold">தமிழ் AI உதவியாளர்</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">விவசாயத்தைப் பற்றி இயல்பான தமிழில் கேளுங்கள். இந்த MVP மாதிரி பதில்களை மட்டுமே வழங்குகிறது.</p><div className="mt-7 space-y-3">{["நெற்பயிருக்கு எப்போது நீர் பாய்ச்ச வேண்டும்?","மிளகாய் இலை மஞ்சளாகிறது. என்ன செய்யலாம்?","தக்காளிக்கு அடிப்படை உர மேலாண்மை சொல்லுங்கள்."].map(x=><button key={x} onClick={()=>ask(x)} className="w-full rounded-lg border bg-card p-3 text-left text-sm leading-6 transition-colors hover:border-primary">{x}</button>)}</div><div className="mt-8 rounded-lg border border-primary/20 bg-leaf-soft p-4"><ShieldCheck className="size-5 text-primary"/><p className="mt-2 text-xs leading-5 text-muted-foreground">தனிப்பட்ட தகவல்களைப் பகிர வேண்டாம். பதில்கள் செயல்விளக்க மாதிரிகள்.</p></div></aside>
    <section className="flex min-h-0 flex-col"><div className="flex items-center justify-between border-b px-4 py-4 sm:px-6"><div><h2 className="font-bold">வணக்கம்! 👨‍🌾</h2><p className="text-xs text-muted-foreground">உங்கள் கேள்வியை தமிழில் கேளுங்கள்</p></div><Button variant="ghost" size="icon" onClick={()=>{ save(initialMessages); toast.success("உரையாடல் அழிக்கப்பட்டது"); }} aria-label="உரையாடலை அழி"><RotateCcw/></Button></div>
      <Conversation className="h-[calc(100vh-17rem)] min-h-[420px]"><ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-4 py-8 sm:px-6">{messages.map(m=><Message key={m.id} from={m.role}><MessageContent className={m.role === "user" ? "bg-primary text-primary-foreground" : "max-w-[90%]"}>{m.image && <img src={m.image} alt="பதிவேற்றப்பட்ட பயிர்" className="mb-2 max-h-52 rounded-lg object-cover" />}<MessageResponse>{m.text}</MessageResponse></MessageContent>{m.role === "assistant" && <Button variant="ghost" size="sm" className="w-fit text-muted-foreground" onClick={()=>speakTamil(m.text)}><Headphones/> கேட்க</Button>}</Message>)}{loading && <Message from="assistant"><MessageContent><Shimmer>பதிலைத் தயாரிக்கிறது...</Shimmer></MessageContent></Message>}</ConversationContent><ConversationScrollButton /></Conversation>
      <div className="sticky bottom-18 border-t bg-background p-3 md:bottom-0 sm:p-5"><div className="mx-auto max-w-3xl">{image && <div className="mb-2 flex items-center gap-3 rounded-lg border bg-muted p-2"><img src={image} alt="பயிர் முன்னோட்டம்" className="size-14 rounded-md object-cover"/><span className="text-xs font-semibold">பயிர் படம் இணைக்கப்பட்டுள்ளது</span><Button variant="ghost" size="sm" className="ml-auto" onClick={()=>setImage(undefined)}>நீக்கு</Button></div>}<div className="mb-2 flex gap-2"><Button variant={listening ? "default" : "outline"} className="h-11 flex-1" onClick={startVoice}><Mic className={listening ? "animate-pulse" : ""}/>{listening ? "கேட்கிறது..." : "தமிழில் பேசுங்கள்"}</Button><Button variant="outline" size="icon" className="size-11" onClick={()=>inputRef.current?.click()} aria-label="பயிர் படத்தைச் சேர்"><ImagePlus/></Button><input ref={inputRef} type="file" className="hidden" accept="image/png,image/jpeg" capture="environment" onChange={e=>pickImage(e.target.files?.[0])}/></div><PromptInput accept="image/png,image/jpeg" onSubmit={(message)=>ask(message.text || voiceText)} className="rounded-xl border-input bg-card shadow-lg"><PromptInputTextarea value={voiceText} onChange={e=>setVoiceText(e.target.value)} autoFocus placeholder="உங்கள் விவசாய கேள்வியை தமிழில் கேளுங்கள்..." className="min-h-20 text-base"/><PromptInputFooter className="justify-between"><span className="flex items-center gap-1 text-[11px] text-muted-foreground"><Camera className="size-3"/> Demo AI</span><PromptInputSubmit disabled={!voiceText.trim() || loading} status={loading ? "submitted" : "ready"}/></PromptInputFooter></PromptInput></div></div>
    </section>
  </div>;
}