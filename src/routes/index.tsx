import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, ArrowRight, Menu, X, Check, Bitcoin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/n19-hub-logo.jpg.asset.json';
import { articles } from '@/lib/n19-content';
import { submitInquiry } from '@/lib/contact.functions';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'N19 HUB | Research. Scale. Build.' },
    { name: 'description', content: 'N19 HUB is a technology research and consultancy studio helping founders and builders understand Web3, Bitcoin, AI and emerging ecosystems.' },
    { property: 'og:title', content: 'N19 HUB | Research. Scale. Build.' },
    { property: 'og:description', content: 'Ecosystem research, market strategy, community building and education for teams building the next internet.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: N19,
});
const services = [
  ['Ecosystem Research', 'Understand the landscape before you build.', ['Market and ecosystem research', 'Competitor analysis', 'Builder ecosystem mapping', 'Community research', 'Trend analysis', 'Research reports']],
  ['Go to Market Strategy', 'Turn clear insight into your next move.', ['Market entry strategy', 'Positioning', 'Launch strategy', 'Growth planning', 'Community led growth', 'Ecosystem partnerships']],
  ['Education & Consultancy', 'Build knowledge that leads to action.', ['Technology education', 'Developer workshops', 'Community programmes', 'Technical ecosystem education', 'Founder advisory', 'Strategic consulting']],
];
const reasons = [
  ['Deep ecosystem knowledge', 'We understand the ecosystems, communities and dynamics that shape emerging technology.'],
  ['Practical experience', 'Our perspective comes from working directly with builders, founders and communities.'],
  ['Research that is readable', 'We turn complex subjects into clear insights that people can understand and use.'],
  ['Community and content expertise', 'We turn knowledge into useful content and communities into meaningful participation.'],
  ['A connected network', 'We connect teams with builders, communities and opportunities across ecosystems.'],
  ['Proven programme delivery', 'Three hackathon cohorts delivered. More than ten startups engaged. We take ideas through to outcomes.'],
];
const help = ['Ecosystem research', 'Go to market strategy', 'Community building', 'Content strategy', 'Education and workshops', 'Advisory'];
const substack = 'https://substack.com/@smwangi';
const course = 'https://bitcoiners.africa/embed/course-signup?lang=en&lv=ba&utm_campaign=basedlabs_education';

function N19() {
  const [menu, setMenu] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'saved' | 'error'>('idle');
  const send = useServerFn(submitInquiry);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    try {
      await send({ data: { name: String(data.get('name')), email: String(data.get('email')), service: String(data.get('service')), message: String(data.get('message')), website: String(data.get('website') ?? '') } });
      setStatus('saved'); form.reset();
    } catch { setStatus('error'); }
  }
  return <div className="n19-site min-h-screen bg-background text-foreground">
    <header className="n19-header border-b border-border bg-background">
      <div className="site-shell flex min-h-20 items-center justify-between gap-6">
        <a href="#home" aria-label="N19 HUB home" className="flex items-center gap-3"><img src={logo.url} alt="N19 HUB logo" className="size-12 rounded-full object-cover"/><span className="font-display text-xl font-semibold">N19<span className="ml-1 text-primary">HUB</span></span></a>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm md:flex"><a className="nav-link" href="#home">Home</a><a className="nav-link" href="#about">About</a><a className="nav-link" href="#blogs">Blogs</a><a className="nav-link" href="#contact">Contact</a><Button asChild><a href="#contact">Get started <ArrowUpRight/></a></Button></nav>
        <Button variant="outline" size="icon" className="md:hidden" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={()=>setMenu(!menu)}>{menu ? <X/> : <Menu/>}</Button>
      </div>
      {menu && <nav aria-label="Mobile navigation" className="site-shell flex flex-wrap gap-6 border-t border-border py-5 text-sm">{['Home','About','Blogs','Contact'].map(x=><a href={`#${x.toLowerCase()}`} key={x} onClick={()=>setMenu(false)}>{x}</a>)}</nav>}
    </header>
    <main>
      <section id="home" className="n19-hero scroll-mt-24">
        <div className="site-shell">
          <div className="flex items-center gap-3 text-sm text-primary"><span className="size-2 rounded-full bg-primary"/>Research. Scale. Build.</div>
          <h1 className="n19-title">N19 HUB<span className="text-primary">.</span></h1>
          <div className="n19-hero-bottom"><h2>Research to<br/>make you scale.</h2><div><p className="text-lg leading-8 text-muted-foreground">We do deep research on technology, Web3 and AI. We help founders, teams and builders understand markets, craft go to market strategies, build communities and enter new ecosystems with confidence.</p><div className="mt-7 flex flex-wrap items-center gap-6"><Button size="lg" asChild><a href="#contact">Get started with us <ArrowRight/></a></Button><a href="#about" className="text-link">Learn about us <ArrowUpRight className="size-4"/></a></div></div></div>
          <div className="n19-stats">{[['3+','Years in the ecosystem'],['500+','Builders worked with'],['20+','Projects shipped']].map(([value,label])=><div key={label}><span>{value}</span><p>{label}</p></div>)}</div>
        </div>
      </section>
      <section id="about" className="section-band scroll-mt-24 border-t border-border bg-surface"><div className="site-shell">
        <div className="n19-two-column"><div><p className="eyebrow">About N19 HUB</p><h2 className="n19-heading mt-5">A research studio<br/>built for builders.</h2></div><div className="space-y-5 text-lg leading-8 text-muted-foreground"><p>N19 HUB is a technology research and consultancy studio focused on the systems shaping the next generation of the internet.</p><p>Our work spans Web3, Bitcoin, AI and emerging digital infrastructure. We combine research with practical ecosystem experience to help founders and teams make better decisions.</p><p>Building is only one part of the equation. You also need to understand the market, the community, the ecosystem and the people you are building for.</p><p>We bring together research, strategy, content, community and practical experience to turn complex ideas into clear opportunities.</p></div></div>
        <div className="n19-principles mt-16">{[
          ['Mission','To make complex technology legible and actionable for founders, teams, builders and communities.'],
          ['Vision','A world where the best ideas are not locked behind jargon, geography or inaccessible information.'],
          ['How we work','We embed ourselves in the ecosystems we research, combining data with real world experience.'],
          ['Who we work with','Protocols and DAOs, startups entering new markets, founders, builders and teams building the future.'],
        ].map(([title,copy],i)=><div key={title}><span className="text-sm text-primary">0{i+1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div>
      </div></section>
      <section className="section-band"><div className="site-shell"><div className="n19-two-column"><div><p className="eyebrow">Why N19 HUB?</p><h2 className="n19-heading mt-5">We have been<br/>in the room.</h2><p className="mt-6 max-w-md leading-7 text-muted-foreground">We know how it works. Six reasons founders and teams choose to work with us.</p></div><div className="divide-y divide-border border-y border-border">{reasons.map(([title,copy],i)=><article className="n19-reason" key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></div></section>
      <section id="services" className="section-band border-y border-border bg-surface"><div className="site-shell"><p className="eyebrow">What we do</p><h2 className="n19-heading mt-5">From research to execution.</h2><div className="mt-12 divide-y divide-border border-t border-border">{services.map(([title,copy,items],i)=><article className="service-row" key={String(title)}><span className="service-number">0{i+1}</span><div><h3>{title}</h3><p>{copy}</p></div><ul>{Array.isArray(items) && items.map(item=><li className="flex items-center gap-3" key={item}><Check className="size-4 shrink-0 text-primary"/>{item}</li>)}</ul></article>)}</div><Button asChild size="lg" className="mt-8"><a href="#contact">Work with us <ArrowUpRight/></a></Button></div></section>
      <section className="section-band"><div className="site-shell n19-two-column"><div><p className="eyebrow">Free Bitcoin course</p><h2 className="n19-heading mt-5">Start your journey<br/>of learning Bitcoin.</h2><p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">We have partnered with African Bitcoiners to make Bitcoin education more accessible. Start with a free, beginner friendly course designed to help you understand Bitcoin from the ground up.</p><Button asChild size="lg" className="mt-8 h-auto min-h-12 whitespace-normal py-3"><a href={course} target="_blank" rel="noreferrer">Start your Bitcoin learning journey <ArrowUpRight/></a></Button></div><div className="n19-course"><Bitcoin className="size-20" strokeWidth={1}/><p>Bitcoin,<br/>explained simply.</p><span>Free to learn. Open to everyone.</span></div></div></section>
      <section id="blogs" className="section-band scroll-mt-24 border-t border-border"><div className="site-shell"><div className="flex flex-wrap items-end justify-between gap-8"><div><p className="eyebrow">From the journal</p><h2 className="n19-heading mt-5">Ideas worth exploring.</h2><p className="mt-6 max-w-xl leading-7 text-muted-foreground">Writing on Bitcoin, Web3, AI, builders and the systems shaping the next internet. Sharp, readable, no fluff.</p></div><a href="https://medium.com/@sonimwangi6" target="_blank" rel="noreferrer" className="text-link">All articles <ArrowUpRight className="size-4"/></a></div><div className="mt-12 divide-y divide-border border-y border-border">{articles.map(([category,title,href],i)=><a className="article-row" key={title} href={href} target="_blank" rel="noreferrer"><span className="article-index">{String(i+1).padStart(2,'0')}</span><span className="article-category">{category}</span><h3>{title}</h3><ArrowUpRight className="size-5 text-primary"/></a>)}</div></div></section>
      <section className="n19-subscribe bg-surface border-y border-border"><div className="site-shell flex flex-wrap items-center justify-between gap-8"><div><p className="eyebrow">No noise. Just signal.</p><h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Stay ahead of the curve.</h2><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">Subscribe to our Substack for research, analysis and sharp takes on technology, Web3 and AI.</p></div><Button size="lg" asChild><a href={substack} target="_blank" rel="noreferrer">Subscribe <ArrowUpRight/></a></Button></div></section>
      <section id="contact" className="contact-section scroll-mt-24"><div className="site-shell n19-two-column"><div><p className="eyebrow inverse">Contact · Work with us</p><h2 className="n19-heading mt-6">Let’s build<br/>something together.</h2><p className="mt-7 max-w-xl text-lg leading-8 text-primary-foreground/85">Have a research question, project idea, partnership opportunity or something you are trying to figure out? We would love to hear from you.</p><p className="mt-5 max-w-xl leading-8 text-primary-foreground/85">Whether you are launching a product, growing a community or entering a new market, tell us what you are building and what you need help with.</p></div><form onSubmit={submit} className="contact-form"><h3 className="font-display text-2xl font-semibold">Start a conversation.</h3><div><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" required minLength={2} maxLength={120} placeholder="Your name"/></div><div><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com"/></div><div><label htmlFor="service">What can we help with?</label><select id="service" name="service" required defaultValue=""><option value="" disabled>Select an option</option>{help.map(x=><option key={x}>{x}</option>)}</select></div><div className="hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div><div><label htmlFor="message">Message</label><textarea id="message" name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Tell us what you are working on"/></div><Button disabled={status==='sending'} type="submit" size="lg" className="bg-background text-primary hover:bg-background/90">{status==='sending' ? 'Saving your message…' : 'Send message'}<ArrowRight/></Button><p role="status" className="min-h-6 text-sm text-primary-foreground/85">{status==='saved' ? 'Thank you. Your inquiry has been saved for the N19 HUB team.' : status==='error' ? 'Your message could not be saved. Please try again.' : ''}</p></form></div></section>
    </main>
    <footer className="py-12"><div className="site-shell flex flex-wrap justify-between gap-10"><div><a href="#home" className="flex items-center gap-3"><img src={logo.url} alt="N19 logo" className="size-10 rounded-full"/><span className="font-display text-lg font-semibold">N19 HUB</span></a><p className="mt-5 text-sm text-muted-foreground">Researching technology. Building possibilities.</p><p className="mt-3 text-xs text-muted-foreground">© 2026 N19 HUB.</p></div><div className="flex flex-wrap items-start gap-7 text-sm"><a className="nav-link" href="#about">About</a><a className="nav-link" href="#blogs">Blogs</a><a className="nav-link" href={substack} target="_blank" rel="noreferrer">Substack ↗</a><a className="nav-link" href="https://paragraph.com/@basedarticles" target="_blank" rel="noreferrer">Paragraph ↗</a></div></div></footer>
  </div>;
}
