"use client";

import {
  ArrowRight,
  BadgeDollarSign,
  Banknote,
  Boxes,
  Check,
  ChevronDown,
  CircleCheck,
  Code2,
  Copy,
  ExternalLink,
  Gamepad2,
  Gem,
  Globe2,
  Headphones,
  Layers3,
  LoaderCircle,
  Mail,
  Menu,
  MessageCircle,
  Send,
  Play,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";

const DEMO_URL = "https://scorpioplay.com/slots-api";
const DOCS_URL = "https://slotcity.gitbook.io";

const games = [
  {
    name: "Gates of Olympus 1000",
    provider: "Pragmatic Play",
    category: "Slots",
    art: "olympus",
    image: "/gates of olympus 1000.jpg",
    label: "Fan favorite",
    url: "https://scorpioplay.com/play/1/vs20olympx",
  },
  {
    name: "Sweet Bonanza 1000",
    provider: "Pragmatic Play",
    category: "Slots",
    art: "fruits",
    image: "/sweet bonanza 1000.jpg",
    label: "Fan favorite",
    url: "https://scorpioplay.com/play/1/vs20fruitswx",
  },
  {
    name: "Joker's Jewel",
    provider: "Pragmatic Play",
    category: "Slots",
    art: "joker",
    image: "/joker jewel.png",
    label: "Fan favorite",
    url: "https://scorpioplay.com/play/1/vs5joker",
  },
  {
    name: "5 Lions Megaways",
    provider: "Pragmatic Play",
    category: "Slots",
    art: "lion",
    image: "/5 mega lion.png",
    label: "Fan favorite",
    url: "https://scorpioplay.com/play/1/vsways5lions2",
  },
  {
    name: "Fortune Tiger",
    provider: "PG Soft",
    category: "Slots",
    art: "tiger",
    image: "/fortune tiger.jpg",
    label: "Top performing",
  },
  {
    name: "Aviator",
    provider: "Spribe",
    category: "Crash",
    art: "aviator",
    image: "/aviator.jpg",
    label: "Fast rounds",
  },
  {
    name: "Crazy 777",
    provider: "JILI",
    category: "Slots",
    art: "sevens",
    image: "/crazy 777.jpg",
    label: "Classic play",
  },
  {
    name: "Caishen's Gold",
    provider: "Booongo",
    category: "Slots",
    art: "gold",
    image: "/caishens gold.jpg",
    label: "High engagement",
  },
  {
    name: "Lightning Roulette",
    provider: "Evolution",
    category: "Live",
    art: "roulette",
    image: "/lightning routette.jpg",
    label: "Live casino",
  },
];

const filters = ["All", "Slots", "Live", "Crash"];

const faqs = [
  {
    question: "How many games and providers are available?",
    answer:
      "Scorpio Play currently advertises access to 2,000+ games from 11+ providers, including slots, live casino, crash games, table games, and more.",
  },
  {
    question: "Which integration methods do you support?",
    answer:
      "Choose a transfer-wallet integration managed for each player, or a seamless wallet model where Scorpio Play sends transaction callbacks to your platform.",
  },
  {
    question: "Is technical integration support included?",
    answer:
      "Yes. The team provides step-by-step integration guidance and 24/7 technical support after onboarding.",
  },
];

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Scorpio Play home">
      <Image
        src="/logo_light.png"
        alt="Scorpio Play"
        width={100}
        height={88}
        className="logoImage"
        sizes="72px"
      />
    </a>
  );
}

export function MarketingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [activeGame, setActiveGame] = useState<(typeof games)[number] | null>(
    null,
  );
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [gamesVisible, setGamesVisible] = useState(false);
  const [accessModal, setAccessModal] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formError, setFormError] = useState("");
  const gameGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow =
      activeGame || menuOpen || accessModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [accessModal, activeGame, menuOpen]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const grid = gameGridRef.current;
    if (!grid) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGamesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const visibleGames =
    filter === "All" ? games : games.filter((game) => game.category === filter);

  const openAccessModal = () => {
    setMenuOpen(false);
    setFormStatus("idle");
    setFormError("");
    setAccessModal(true);
  };

  const submitAccessRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sending");
    setFormError("");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          requirements: data.get("requirements"),
          website: data.get("website"),
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Unable to send your request.");
      form.reset();
      setFormStatus("success");
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Unable to send your request.",
      );
      setFormStatus("error");
    }
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(
      `const session = await scorpio.games.launch({\n  gameId: "fortune-tiger",\n  playerId: user.id,\n  currency: "USD",\n  locale: "en"\n});`,
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main id="top">
      <div className="casinoDecor" aria-hidden="true">
        <span className="decorItem decorCoin coinOne">
          <b>$</b>
        </span>
        <span className="decorItem decorMoney moneyOne">
          <Banknote />
        </span>
        <span className="decorItem decorGem gemOne">
          <Gem />
        </span>
        <span className="decorItem decorJackpot jackpotOne">
          <small>MEGA</small>
          <b>JACKPOT</b>
        </span>
        <span className="decorItem decorSevens sevensOne">777</span>
        <span className="decorItem decorCoin coinTwo">
          <b>€</b>
        </span>
        <span className="decorItem decorMoney moneyTwo">
          <Banknote />
        </span>
        <span className="decorItem decorGem gemTwo">
          <Gem />
        </span>
        <span className="decorItem decorCoin coinThree">
          <b>★</b>
        </span>
        <span className="decorItem decorJackpot jackpotTwo">
          <small>ROYAL</small>
          <b>WIN</b>
        </span>
        <span className="decorItem decorSevens sevensTwo">7</span>
        <span className="decorItem decorMoney moneyThree">
          <Banknote />
        </span>
      </div>
      <div className="announcement">
        <span>
          <Sparkles size={14} /> New partners get guided integration support
        </span>
        <button onClick={openAccessModal}>
          Talk to our team <ArrowRight size={14} />
        </button>
      </div>

      <header className="siteHeader">
        <div className="container navInner">
          <Logo />
          <nav
            className={menuOpen ? "mainNav isOpen" : "mainNav"}
            aria-label="Main navigation"
          >
            <a href="#games" onClick={() => setMenuOpen(false)}>
              Games
            </a>
            <a href="#platform" onClick={() => setMenuOpen(false)}>
              Platform
            </a>
            <a href="#integration" onClick={() => setMenuOpen(false)}>
              Integration
            </a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>
              FAQ
            </a>
            <a href={DOCS_URL} target="_blank" rel="noreferrer">
              Docs <ExternalLink size={13} />
            </a>
            <button className="mobileCta" onClick={openAccessModal}>
              Get API access
            </button>
          </nav>
          <button className="navCta" onClick={openAccessModal}>
            Get API access <ArrowRight size={16} />
          </button>
          <button
            className="menuButton"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="heroGlow" />
        <div className="container heroGrid">
          <div className="heroCopy">
            <div className="eyebrow">
              <span /> Casino infrastructure, simplified
            </div>
            <h1 id="hero-title">
              One API.
              <br />A world of <em>games.</em>
            </h1>
            <p>
              Connect your platform to 2,000+ casino games from leading
              providers—through one powerful, cost-effective integration.
            </p>
            <div className="heroActions">
              <button onClick={openAccessModal} className="button primary">
                Start integrating <ArrowRight size={18} />
              </button>
              <a href="#games" className="button secondary">
                <Play size={17} fill="currentColor" /> Explore games
              </a>
            </div>
            <div className="heroProof">
              <div className="avatarStack" aria-hidden="true">
                <i>S</i>
                <i>P</i>
                <i>Q</i>
                <i>+</i>
              </div>
              <span>
                <b>Built for operators</b>
                <small>Reliable support, every step</small>
              </span>
            </div>
          </div>

          <div
            className="heroVisual"
            aria-label="Casino game collection preview"
          >
            <div className="visualOrbit orbitOne" />
            <div className="visualOrbit orbitTwo" />
            <div className="floatingPill pillTop">
              <CircleCheck size={15} /> API connected
            </div>
            <div className="floatingPill pillBottom">
              <Zap size={15} /> Instant launch
            </div>
            <div className="heroStatsCard">
              <span>Available library</span>
              <strong>
                <CountUp end={2000} />
                <sup>+</sup>
              </strong>
              <small>games ready to launch</small>
            </div>
          </div>
        </div>
        <div className="heroFoot container">
          <span>Trusted access to leading game providers</span>
          <div className="providerStrip" aria-label="Available providers">
            <b>
              PRAGMATIC <i>PLAY</i>
            </b>
            <b>PG SOFT</b>
            <b>EVOLUTION</b>
            <b>JILI</b>
            <b>HABANERO</b>
            <b>CQ9</b>
          </div>
        </div>
      </section>

      <section className="metrics" aria-label="Platform metrics">
        <div className="container metricsGrid">
          <div>
            <strong>
              <CountUp end={2000} />
              <span>+</span>
            </strong>
            <p>Games in one API</p>
          </div>
          <div>
            <strong>
              <CountUp end={11} />
              <span>+</span>
            </strong>
            <p>Leading providers</p>
          </div>
          <div>
            <strong>
              <CountUp end={4} />
              <span>%</span>
            </strong>
            <p>Standard GGR share</p>
          </div>
          <div>
            <strong>
              <CountUp end={24} />
              <span>/7</span>
            </strong>
            <p>Technical support</p>
          </div>
        </div>
      </section>

      <section className="gamesSection section" id="games">
        <div className="container">
          <div className="sectionHead gamesHead">
            <div>
              <div className="eyebrow dark">
                <span /> Live game catalog
              </div>
              <h2>
                Games players
                <br />
                <em>already love.</em>
              </h2>
            </div>
            <p>
              Offer a rich mix of slots, live casino, crash, and table
              games—curated from established global providers.
            </p>
          </div>
          <div className="filterBar" role="tablist" aria-label="Filter games">
            <div>
              {filters.map((item) => (
                <button
                  key={item}
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                  role="tab"
                  aria-selected={filter === item}
                >
                  {item}
                </button>
              ))}
            </div>
            <a href={DEMO_URL} target="_blank" rel="noreferrer">
              View all games <ArrowRight size={16} />
            </a>
          </div>
          <div
            ref={gameGridRef}
            className={gamesVisible ? "gameGrid revealGames" : "gameGrid"}
          >
            {visibleGames.map((game, index) => (
              <article
                className="gameCard"
                key={game.name}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`gameArt ${game.art}`}>
                  <span className="gameLabel">{game.label}</span>
                  <Image
                    src={game.image}
                    alt={`${game.name} game cover`}
                    fill
                    sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 380px"
                    className="gameCover"
                  />
                  <div className="artShine" />
                  <button
                    onClick={() => setActiveGame(game)}
                    aria-label={`Play demo of ${game.name}`}
                  >
                    <Play size={22} fill="currentColor" />
                  </button>
                </div>
                <div className="gameMeta">
                  <div>
                    <h3>{game.name}</h3>
                    <p>{game.provider}</p>
                  </div>
                  <span>{game.category}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="gamesMore">
            <span>
              <Gamepad2 /> Need a larger game catalog?
            </span>
            <button onClick={openAccessModal}>
              Add more games <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="platform section" id="platform">
        <div className="container">
          <div className="sectionHead centered">
            <div className="eyebrow">
              <span /> Built to scale
            </div>
            <h2>
              Everything behind a<br />
              <em>winning casino.</em>
            </h2>
            <p>
              Infrastructure that handles the complexity—so your team can focus
              on the player experience.
            </p>
          </div>
          <div className="bentoGrid">
            <article className="bentoCard integrationCard">
              <div className="cardIcon">
                <Code2 />
              </div>
              <div className="bentoCopy">
                <span>DEVELOPER FIRST</span>
                <h3>One clean integration</h3>
                <p>
                  Connect once and access every supported provider through a
                  unified API.
                </p>
              </div>
              <div className="apiDiagram">
                <div className="scorpioNode">
                  <span className="apiPulse pulseOne" />
                  <span className="apiPulse pulseTwo" />
                  <div className="apiLogoShell">
                    <Image
                      src="/logo_light.png"
                      alt=""
                      width={100}
                      height={88}
                      className="apiLogo"
                    />
                  </div>
                  <small>UNIFIED GAME API</small>
                </div>
                <i className="line l1" />
                <i className="line l2" />
                <i className="line l3" />
                <span className="providerNode n1">
                  <b>PP</b>
                  <small>Provider</small>
                </span>
                <span className="providerNode n2">
                  <b>PG</b>
                  <small>Provider</small>
                </span>
                <span className="providerNode n3">
                  <b>CQ9</b>
                  <small>Provider</small>
                </span>
              </div>
            </article>
            <article className="bentoCard">
              <div className="cardIcon mint">
                <BadgeDollarSign />
              </div>
              <div className="bentoCopy">
                <span>COST CONTROL</span>
                <h3>More margin, built in</h3>
                <p>
                  A transparent, low revenue-share model designed to protect
                  your growth.
                </p>
              </div>
              <div className="miniChart">
                <i />
                <i />
                <i />
                <i />
                <i />
                <span>Lower operating cost</span>
              </div>
            </article>
            <article className="bentoCard supportCard">
              <div className="cardIcon orange">
                <Headphones />
              </div>
              <div className="bentoCopy">
                <span>ALWAYS ON</span>
                <h3>24/7 human support</h3>
                <p>
                  Integration and operational help whenever your team needs it.
                </p>
              </div>
              <div className="supportPeople">
                <i>KM</i>
                <i>JL</i>
                <i>AR</i>
                <span>
                  <b>Online</b>
                  <small>Average reply &lt; 5 min</small>
                </span>
              </div>
            </article>
            <article className="bentoCard fantasyCard">
              <Image
                src="/fantasy-game-api.webp"
                alt="Fantasy casino game with an emerald dragon, golden slot portal, treasure, and magical crystals"
                fill
                sizes="(max-width: 820px) 100vw, 1180px"
                className="fantasyArtwork"
              />
              <div className="fantasyShade" />
              <div className="fantasyContent">
                <span className="fantasyBadge">
                  <Sparkles size={15} /> FANTASY GAME API
                </span>
                <h3>
                  Unlock worlds of
                  <br />
                  <em>player adventure.</em>
                </h3>
                <p>
                  Bring vivid fantasy titles, premium slots, and immersive game
                  experiences into your platform through one unified API.
                </p>
                <a href={DEMO_URL} target="_blank" rel="noreferrer">
                  Explore fantasy games <ArrowRight size={17} />
                </a>
              </div>
              <div
                className="fantasyStats"
                aria-label="Fantasy game API benefits"
              >
                <span>
                  <b>ONE</b>
                  <small>integration</small>
                </span>
                <span>
                  <b>2K+</b>
                  <small>game worlds</small>
                </span>
                <span>
                  <b>24/7</b>
                  <small>support</small>
                </span>
              </div>
            </article>
          </div>
          <div className="featureRow">
            <div>
              <ShieldCheck />
              <span>
                <b>Secure by design</b>
                <small>Protected sessions and callbacks</small>
              </span>
            </div>
            <div>
              <WalletCards />
              <span>
                <b>Two wallet models</b>
                <small>Transfer or seamless integration</small>
              </span>
            </div>
            <div>
              <Globe2 />
              <span>
                <b>Global-ready</b>
                <small>Multi-currency and localization</small>
              </span>
            </div>
            <div>
              <RefreshCw />
              <span>
                <b>Always expanding</b>
                <small>New providers and games added</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="integration section" id="integration">
        <div className="container integrationGrid">
          <div className="integrationCopy">
            <div className="eyebrow dark">
              <span /> Ship in days, not months
            </div>
            <h2>
              From first call to
              <br />
              <em>first spin.</em>
            </h2>
            <p>
              Our team guides your developers from credentials to production
              launch, with clear documentation and hands-on support.
            </p>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <b>Tell us about your platform</b>
                  <small>
                    We align on providers, markets, wallet model, and
                    commercials.
                  </small>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <b>Connect in sandbox</b>
                  <small>
                    Integrate game launch, wallet callbacks, and reporting.
                  </small>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <b>Go live and grow</b>
                  <small>
                    Launch your catalog with ongoing technical support.
                  </small>
                </div>
              </li>
            </ol>
            <button onClick={openAccessModal} className="textLink">
              Plan your integration <ArrowRight size={17} />
            </button>
          </div>
          <div className="codeWindow">
            <div className="windowBar">
              <span>
                <i />
                <i />
                <i />
              </span>
              <b>launch-game.js</b>
              <button onClick={copyCode}>
                {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre aria-label="Scorpio Play API integration example">
              <code>
                <span className="cPurple">const</span> scorpio ={" "}
                <span className="cPurple">new</span>{" "}
                <span className="cMint">ScorpioPlay</span>({"{"}
                {`\n`} apiKey: process.env.
                <span className="cGold">SCORPIO_API_KEY</span>
                {`\n`}
                {"}"});{`\n\n`}
                <span className="cPurple">const</span> session ={" "}
                <span className="cPurple">await</span> scorpio.games.
                <span className="cMint">launch</span>({"{"}
                {`\n`} gameId:{" "}
                <span className="cGold">&quot;fortune-tiger&quot;</span>,{`\n`}{" "}
                playerId: user.id,{`\n`} currency:{" "}
                <span className="cGold">&quot;USD&quot;</span>,{`\n`} locale:{" "}
                <span className="cGold">&quot;en&quot;</span>
                {`\n`}
                {"}"});{`\n\n`}window.location.href = session.
                <span className="cMint">launchUrl</span>;
              </code>
            </pre>
            <div className="codeStatus">
              <CircleCheck size={17} />
              <span>
                <b>201 Created</b>
                <small>Game session ready · 124ms</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="audience section">
        <div className="container">
          <div className="sectionHead centered light">
            <div className="eyebrow">
              <span /> Made for your model
            </div>
            <h2>
              One platform.
              <br />
              <em>Three ways to win.</em>
            </h2>
          </div>
          <div className="audienceGrid">
            <article>
              <span>01</span>
              <Gamepad2 />
              <h3>Casino operators</h3>
              <p>
                Launch a competitive game library without maintaining dozens of
                integrations.
              </p>
              <button onClick={openAccessModal}>
                Build your casino <ArrowRight size={15} />
              </button>
            </article>
            <article>
              <span>02</span>
              <Layers3 />
              <h3>Aggregators</h3>
              <p>
                Expand your catalog with one commercial and technical
                relationship.
              </p>
              <button onClick={openAccessModal}>
                Expand your offering <ArrowRight size={15} />
              </button>
            </article>
            <article>
              <span>03</span>
              <Boxes />
              <h3>Game providers</h3>
              <p>
                Reach more operators and bring your titles to market through our
                network.
              </p>
              <button onClick={openAccessModal}>
                Distribute your games <ArrowRight size={15} />
              </button>
            </article>
          </div>
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="container faqGrid">
          <div>
            <div className="eyebrow dark">
              <span /> Common questions
            </div>
            <h2>
              Clear answers.
              <br />
              <em>No runaround.</em>
            </h2>
            <p>
              Still deciding? Our team can walk through the technical and
              commercial fit with you.
            </p>
            <button onClick={openAccessModal} className="textLink">
              Ask us anything <ArrowRight size={17} />
            </button>
          </div>
          <div className="accordion">
            {faqs.map((item, index) => (
              <FaqItem
                key={item.question}
                {...item}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="ctaSection">
        <div className="container ctaBox">
          <div className="ctaGlow" />
          <div>
            <div className="eyebrow">
              <span /> Your next move
            </div>
            <h2>
              Ready to level up
              <br />
              your game library?
            </h2>
            <p>
              Join the operators building faster, leaner casino experiences with
              Scorpio Play.
            </p>
          </div>
          <div className="ctaActions">
            <button onClick={openAccessModal} className="button lightButton">
              Get API access <ArrowRight size={18} />
            </button>
            <small>
              <ShieldCheck size={15} /> No integration fee
            </small>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footerTop">
          <div>
            <Logo />
            <p>
              The cost-effective casino game API for ambitious iGaming
              businesses.
            </p>
          </div>
          <div>
            <h3>Product</h3>
            <a href="#games">Games</a>
            <a href="#platform">Platform</a>
            <a href={DOCS_URL}>Documentation</a>
          </div>
          <div>
            <h3>Company</h3>
            <a href="https://scorpioplay.com">About us</a>
            <a href="https://scorpioplay.com/blog">Insights</a>
          </div>
          <div className="footerContact">
            <h3>Get in touch</h3>
            <a href="mailto:affiliatemg@scorpioplay.com">
              <i>
                <Mail />
              </i>
              <span>
                <b>Email us</b>
                <small>affiliatemg@scorpioplay.com</small>
              </span>
            </a>
            <a href="https://t.me/morganb63" target="_blank" rel="noreferrer">
              <i>
                <MessageCircle />
              </i>
              <span>
                <b>Telegram</b>
                <small>@morganb63</small>
              </span>
            </a>
            <span className="supportContact">
              <i>
                <Headphones />
              </i>
              <span>
                <b>Full support</b>
                <small>Available 24/7</small>
              </span>
            </span>
          </div>
        </div>
        <div className="container footerBottom">
          <span>
            © {new Date().getFullYear()} Scorpio Play. All rights reserved.
          </span>
          <span>
            <a href="https://scorpioplay.com">Privacy</a>
            <a href="https://scorpioplay.com">Terms</a>
            <b>18+</b>
          </span>
        </div>
      </footer>

      <button
        className={showScrollTop ? "scrollTop visible" : "scrollTop"}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll back to top"
        title="Back to top"
      >
        <ArrowRight aria-hidden="true" />
      </button>

      {accessModal && (
        <div
          className="modalBackdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="access-modal-title"
          onMouseDown={() => setAccessModal(false)}
        >
          <div
            className="accessModal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modalClose"
              onClick={() => setAccessModal(false)}
              aria-label="Close API access form"
            >
              <X />
            </button>
            <div className="accessIntro">
              <Image
                src="/logo_light.png"
                alt="Scorpio Play"
                width={100}
                height={88}
                className="accessLogo"
              />
              <span>CASINO GAME API</span>
              <h2 id="access-modal-title">
                Let&apos;s build your
                <br />
                <em>game library.</em>
              </h2>
              <p>
                Tell us what your platform needs. Our integration team will
                review your request and contact you directly.
              </p>
              <div>
                <CircleCheck />
                <span>
                  <b>Guided integration</b>
                  <small>From sandbox to production</small>
                </span>
              </div>
              <div>
                <CircleCheck />
                <span>
                  <b>Fast response</b>
                  <small>Full technical and commercial support</small>
                </span>
              </div>
            </div>
            <div className="accessFormPanel">
              {formStatus === "success" ? (
                <div className="formSuccess">
                  <span>
                    <Check />
                  </span>
                  <h3>Request received.</h3>
                  <p>
                    Thank you. Your API requirements have been emailed to the
                    Scorpio Play team. We&apos;ll be in touch soon.
                  </p>
                  <button
                    className="button primary"
                    onClick={() => setAccessModal(false)}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={submitAccessRequest}>
                  <div className="formHeading">
                    <span>GET STARTED</span>
                    <h3>Request API access</h3>
                    <p>All fields are required.</p>
                  </div>
                  <label className="formHoneypot" aria-hidden="true">
                    Website
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                  <label>
                    <span>Your name</span>
                    <input
                      type="text"
                      name="name"
                      required
                      minLength={2}
                      maxLength={100}
                      autoComplete="name"
                      placeholder="John Smith"
                    />
                  </label>
                  <label>
                    <span>Business email</span>
                    <input
                      type="email"
                      name="email"
                      required
                      maxLength={160}
                      autoComplete="email"
                      placeholder="john@company.com"
                    />
                  </label>
                  <label>
                    <span>Requirements</span>
                    <textarea
                      name="requirements"
                      required
                      minLength={10}
                      maxLength={3000}
                      rows={5}
                      placeholder="Tell us about your platform, target markets, providers, and expected launch timeline..."
                    />
                  </label>
                  {formStatus === "error" && (
                    <p className="formError" role="alert">
                      {formError}
                    </p>
                  )}
                  <button
                    className="button primary submitButton"
                    type="submit"
                    disabled={formStatus === "sending"}
                  >
                    {formStatus === "sending" ? (
                      <>
                        <LoaderCircle className="spinner" /> Sending request...
                      </>
                    ) : (
                      <>
                        Send request <Send />
                      </>
                    )}
                  </button>
                  <small className="formPrivacy">
                    <ShieldCheck /> Your details are sent securely to our
                    contact team.
                  </small>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {activeGame && (
        <div
          className="modalBackdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeGame.name} demo`}
          onMouseDown={() => setActiveGame(null)}
        >
          <div
            className="demoModal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modalClose"
              onClick={() => setActiveGame(null)}
              aria-label="Close demo"
            >
              <X />
            </button>
            <div className={`modalArt gameArt ${activeGame.art}`}>
              <Image
                src={activeGame.image}
                alt={`${activeGame.name} game cover`}
                fill
                sizes="380px"
                className="gameCover"
              />
              <div className="artShine" />
            </div>
            <div className="modalCopy">
              <span className="modalTag">DEMO PREVIEW</span>
              <h2>{activeGame.name}</h2>
              <p>
                {activeGame.provider} · {activeGame.category}
              </p>
              <div className="demoNotice">
                <ShieldCheck size={18} />
                <span>
                  This page sends players to Scorpio Play's official game
                  catalog for the live API-powered demo.
                </span>
              </div>
              <a
                href={activeGame.url ?? DEMO_URL}
                target="_blank"
                rel="noreferrer"
                className="button primary"
              >
                Launch official demo <ExternalLink size={17} />
              </a>
              <small>Demo play only · No real-money wagering</small>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function FaqItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={open ? "faqItem open" : "faqItem"}>
      <button onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>{question}</span>
        <ChevronDown />
      </button>
      <div className="faqAnswer">
        <p>{answer}</p>
      </div>
    </div>
  );
}

function CountUp({ end, duration = 1500 }: { end: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reducedMotion) {
          setValue(end);
          return;
        }
        const startedAt = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(end * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [duration, end]);

  return (
    <span ref={elementRef} className="countValue">
      {value.toLocaleString("en-US")}
    </span>
  );
}
