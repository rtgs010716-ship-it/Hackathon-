import { Link, useRouterState } from "@tanstack/react-router";
import { Bot, Camera, Home, LibraryBig, Menu, MessageCircle, Sprout, UserRound, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "முகப்பு", en: "Home", icon: Home },
  { to: "/assistant", label: "AI உதவி", en: "AI Assistant", icon: MessageCircle },
  { to: "/disease-detection", label: "நோய் கண்டறிதல்", en: "Disease Detection", icon: Camera },
  { to: "/knowledge", label: "விவசாய அறிவு", en: "Knowledge", icon: LibraryBig },
  { to: "/history", label: "வரலாறு", en: "History", icon: Bot },
  { to: "/about", label: "எங்களை பற்றி", en: "About", icon: Sprout },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (state) => state.location.pathname });
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 lg:px-6">
          <Link to="/" className="flex items-center gap-2.5" aria-label="AgriTamil AI முகப்பு">
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-xl text-primary-foreground shadow-sm">🌱</span>
            <span><strong className="block text-base leading-tight text-foreground">AgriTamil AI</strong><small className="text-xs text-muted-foreground">விவசாயியின் AI நண்பன்</small></span>
          </Link>
          <nav className="hidden items-center gap-1 xl:flex" aria-label="முக்கிய வழிசெலுத்தல்">
            {nav.map((item) => <Link key={item.to} to={item.to} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" activeProps={{ className: "bg-secondary text-primary" }}>{item.en}</Link>)}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button asChild variant="ghost" size="icon" aria-label="கணக்கு"><Link to="/account"><UserRound /></Link></Button>
            <Button asChild className="h-11 rounded-lg px-5"><Link to="/assistant"><MessageCircle /> தமிழில் கேளுங்கள்</Link></Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="பட்டியல்">{open ? <X /> : <Menu />}</Button>
        </div>
        {open && <nav className="border-t bg-background p-3 md:hidden">{nav.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="flex min-h-12 items-center gap-3 rounded-lg px-3 text-sm font-medium hover:bg-secondary"><item.icon className="size-5 text-primary" />{item.label}<span className="ml-auto text-xs text-muted-foreground">{item.en}</span></Link>)}<Link to="/account" onClick={() => setOpen(false)} className="flex min-h-12 items-center gap-3 rounded-lg px-3 text-sm font-medium"><UserRound className="size-5 text-primary" /> கணக்கு</Link></nav>}
      </header>
      <main>{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-50 grid h-18 grid-cols-5 border-t bg-background/98 px-1 pb-[env(safe-area-inset-bottom)] md:hidden" aria-label="மொபைல் வழிசெலுத்தல்">
        {nav.slice(0, 5).map((item) => { const active = item.to === "/" ? path === "/" : path.startsWith(item.to); return <Link key={item.to} to={item.to} className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${active ? "text-primary" : "text-muted-foreground"}`}><item.icon className="size-5" /><span>{item.label}</span></Link>; })}
      </nav>
    </div>
  );
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mb-8 max-w-3xl"><span className="eyebrow">{eyebrow}</span><h1 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">{title}</h1><p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p></div>;
}

export function AppFooter() {
  return <footer className="border-t bg-forest py-10 text-forest-foreground"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 sm:flex-row lg:px-6"><div><div className="text-lg font-bold">🌱 AgriTamil AI</div><p className="mt-2 text-sm text-forest-muted">தமிழ் விவசாயிகளுக்கான எளிய டிஜிட்டல் துணை.</p></div><div className="flex flex-wrap gap-6 text-sm"><Link to="/about">About</Link><Link to="/about">Privacy</Link><a href="mailto:hello@agritamil.demo">Contact</a></div><p className="text-xs text-forest-muted">Hackathon demo · Not a guaranteed diagnosis</p></div></footer>;
}