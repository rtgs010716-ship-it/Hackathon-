import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Camera, CloudSun, Droplets, FileClock, Headphones, History, IndianRupee, LibraryBig, MapPin, MessageCircle, Mic, Sprout, Tractor, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppFooter } from "@/components/app-shell";
import heroImage from "@/assets/tamil-farmer-hero.svg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "AgriTamil AI — விவசாயியின் AI நண்பன்" },
    { name: "description", content: "தமிழில் கேட்டு எளிய விவசாய ஆலோசனை பெறும் AI உதவியாளர் மாதிரி." },
    { property: "og:title", content: "AgriTamil AI — விவசாயியின் AI நண்பன்" },
    { property: "og:description", content: "தமிழில் பேசுங்கள், பயிர் படத்தைப் பதிவேற்றி எளிய வழிகாட்டுதல் பெறுங்கள்." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: HomePage,
});

const features = [
  [Mic, "தமிழ் குரல் உதவியாளர்", "Tamil Voice Assistant", "டைப் செய்யாமல் உங்கள் கேள்வியை இயல்பாகப் பேசுங்கள்."],
  [Camera, "பயிர் நோய் கண்டறிதல்", "Crop Disease Detection", "பயிர் படத்தின் மூலம் ஒரு ஆரம்பகட்ட மாதிரி பகுப்பாய்வு."],
  [Bot, "எளிய AI ஆலோசனை", "AI Advice", "புரிந்துகொள்ள எளிய, செயலில் பயன்படுத்தக்கூடிய தமிழ் பதில்கள்."],
  [Headphones, "தமிழ் குரல் பதில்", "Tamil Voice Response", "திரையில் உள்ள வழிகாட்டுதலை தமிழில் கேட்டறியுங்கள்."],
  [LibraryBig, "பயிர் அறிவுக் களஞ்சியம்", "Crop Knowledge", "முக்கிய பயிர்களுக்கான அடிப்படை பராமரிப்பு தகவல்கள்."],
  [History, "விவசாயி வரலாறு", "Farmer History", "முன்னைய கேள்விகளையும் மாதிரி முடிவுகளையும் மீண்டும் பாருங்கள்."],
];
const future = [[CloudSun,"வானிலை"],[IndianRupee,"சந்தை விலை"],[Droplets,"நீர்ப்பாசனம்"],[Sprout,"பயிர் பரிந்துரை"],[MapPin,"அருகிலுள்ள நிபுணர்கள்"],[FileClock,"பண்ணை பதிவுகள்"],[Tractor,"ஸ்மார்ட் விவசாயம்"]];

function HomePage() {
  return <>
    <section className="relative min-h-[650px] overflow-hidden bg-forest text-forest-foreground lg:min-h-[700px]">
      <img src={heroImage} width={1600} height={1000} alt="நெல் வயலில் கைபேசியுடன் பயிரைப் பார்வையிடும் தமிழ் விவசாயி" className="absolute inset-0 h-full w-full object-cover object-[65%_center] opacity-75" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-forest)_0%,var(--color-forest)_35%,transparent_82%)]" />
      <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-4 py-20 lg:min-h-[700px] lg:px-6">
        <div className="gentle-rise max-w-2xl"><span className="inline-flex rounded-full border border-forest-muted/40 bg-forest/70 px-4 py-2 text-sm font-semibold">தமிழ் விவசாயிகளுக்காக உருவாக்கப்பட்டது</span><h1 className="mt-6 text-4xl font-black leading-tight sm:text-6xl">விவசாயியின்<br/><span className="text-accent">AI நண்பன்</span></h1><p className="mt-6 max-w-xl text-lg font-semibold leading-8">தமிழில் பேசுங்கள். பயிரின் படத்தை பதிவேற்றுங்கள். எளிய விவசாய ஆலோசனையை பெறுங்கள்.</p><p className="mt-3 text-sm text-forest-muted">Your AI-powered agricultural assistant for Tamil-speaking farmers.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-13 bg-accent px-6 text-accent-foreground hover:bg-accent/90"><Link to="/assistant"><Mic /> தமிழில் கேளுங்கள்</Link></Button><Button asChild size="lg" variant="outline" className="h-13 border-forest-muted bg-background/95 px-6 text-foreground"><Link to="/disease-detection"><Camera /> என் பயிரைச் சோதிக்க</Link></Button></div><p className="mt-5 text-xs text-forest-muted">● Prototype demo · நிபுணர் ஆலோசனைக்கு மாற்றாகாது</p></div>
      </div>
    </section>
    <section className="page-wrap !pb-8"><div className="mb-6 flex items-end justify-between"><div><span className="eyebrow">விரைவான அணுகல்</span><h2 className="mt-3 text-2xl font-extrabold">வணக்கம்! 👨‍🌾</h2></div><span className="hidden text-sm text-muted-foreground sm:block">இன்று உங்கள் பயிருக்கு எப்படி உதவலாம்?</span></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[[MessageCircle,"AI-யிடம் கேள்","/assistant"],[Camera,"பயிரைச் சோதி","/disease-detection"],[LibraryBig,"பயிர் அறிவு","/knowledge"],[History,"என் வரலாறு","/history"]].map(([Icon,label,to]) => <Link key={label as string} to={to as "/assistant"} className="surface-card flex min-h-24 items-center gap-4 p-5 transition-transform hover:-translate-y-1"><span className="grid size-12 place-items-center rounded-lg bg-secondary text-primary"><Icon className="size-6" /></span><strong>{label as string}</strong><ArrowRight className="ml-auto size-4 text-muted-foreground" /></Link>)}</div><div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">{[["12","கேள்விகள்"],["5","பயிர்கள்"],["3","நோய் பகுப்பாய்வு"],["8","சேமித்த பதிவுகள்"]].map(([n,l])=><div key={l} className="rounded-lg border bg-leaf-soft p-4"><b className="text-2xl text-primary">{n}</b><p className="text-xs text-muted-foreground">{l}</p></div>)}</div></section>
    <section className="bg-secondary/55 py-16"><div className="mx-auto max-w-7xl px-4 lg:px-6"><div className="grid gap-10 lg:grid-cols-2"><div><span className="eyebrow">விவசாயி எதிர்கொள்ளும் சவால்கள்</span><h2 className="section-title mt-4">சரியான தகவல், சரியான நேரத்தில்</h2><p className="mt-4 leading-7 text-muted-foreground">மொழித் தடைகள், தாமதமான நோய் கண்டறிதல், சிக்கலான தொழில்நுட்ப தகவல்கள் ஆகியவை விவசாய முடிவுகளை கடினமாக்குகின்றன.</p></div><div className="grid gap-3 sm:grid-cols-3">{["தமிழில் தகவல் குறைவு","பயிர் நோய் குழப்பம்","நிபுணரை அணுக தாமதம்"].map((x,i)=><div key={x} className="surface-card p-5"><span className="text-2xl font-black text-accent">0{i+1}</span><p className="mt-3 font-bold">{x}</p></div>)}</div></div></div></section>
    <section className="page-wrap"><div className="text-center"><span className="eyebrow">எப்படி செயல்படுகிறது?</span><h2 className="section-title mt-4">மூன்று எளிய படிகள்</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{[[Mic,"தமிழில் கேளுங்கள்","குரல் அல்லது எழுத்து மூலம் உங்கள் கேள்வியை பதிவு செய்யுங்கள்."],[Camera,"படத்தைச் சேருங்கள்","தேவைப்பட்டால் பயிரின் தெளிவான படத்தை எடுக்கவும்."],[Sprout,"வழிகாட்டுதல் பெறுங்கள்","எளிய தமிழ் மாதிரி பரிந்துரையைப் படிக்கவும் அல்லது கேட்கவும்."]].map(([Icon,t,d],i)=><div key={t as string} className="relative text-center"><div className="mx-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground"><Icon className="size-7" /></div><span className="absolute left-[55%] top-2 text-5xl font-black text-secondary">{i+1}</span><h3 className="mt-5 font-bold">{t as string}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{d as string}</p></div>)}</div></section>
    <section className="bg-muted py-16"><div className="mx-auto max-w-7xl px-4 lg:px-6"><span className="eyebrow">ஒரே இடத்தில்</span><h2 className="section-title mt-4">விவசாயத்திற்கு உதவும் ஆறு அம்சங்கள்</h2><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{features.map(([Icon,ta,en,d])=><div key={ta as string} className="surface-card p-6"><span className="grid size-11 place-items-center rounded-lg bg-secondary text-primary"><Icon className="size-5"/></span><h3 className="mt-4 font-bold">{ta as string}</h3><p className="mt-1 text-xs font-semibold uppercase text-primary">{en as string}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{d as string}</p></div>)}</div></div></section>
    <section className="page-wrap"><div className="rounded-xl bg-forest p-7 text-forest-foreground sm:p-10"><span className="text-xs font-bold uppercase text-accent">அடுத்த கட்டம் · Future scope</span><h2 className="mt-3 text-2xl font-extrabold">நாளைய முழுமையான விவசாய தளம்</h2><div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">{future.map(([Icon,label])=><div key={label as string} className="rounded-lg border border-forest-muted/30 bg-forest-foreground/5 p-4 text-center"><Icon className="mx-auto size-6 text-accent"/><p className="mt-2 text-xs font-semibold">{label as string}</p></div>)}</div></div></section>
    <AppFooter />
  </>;
}