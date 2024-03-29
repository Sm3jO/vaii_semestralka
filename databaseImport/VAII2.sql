--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer DEFAULT nextval('public.comments_id_seq'::regclass) NOT NULL,
    content text NOT NULL,
    user_id integer NOT NULL,
    content_type character varying(50) NOT NULL,
    content_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    parent_comment_id integer
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: giveaways_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.giveaways_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.giveaways_id_seq OWNER TO postgres;

--
-- Name: giveaways; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.giveaways (
    id integer DEFAULT nextval('public.giveaways_id_seq'::regclass) NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    author_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image_url character varying(255),
    participant_count integer DEFAULT 0,
    expiration_date timestamp without time zone
);


ALTER TABLE public.giveaways OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.news_id_seq OWNER TO postgres;

--
-- Name: news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news (
    id integer DEFAULT nextval('public.news_id_seq'::regclass) NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    author_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image_url character varying(255)
);


ALTER TABLE public.news OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer DEFAULT nextval('public.reviews_id_seq'::regclass) NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    author_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image_url character varying(255)
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: user_giveaway; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_giveaway (
    user_id integer NOT NULL,
    giveaway_id integer NOT NULL
);


ALTER TABLE public.user_giveaway OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    profile_picture character varying(255),
    role character varying(50) DEFAULT 'user'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    bio text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, content, user_id, content_type, content_id, created_at, updated_at, parent_comment_id) FROM stdin;
1	Cyberpunk is awesome!!!	2	review	1	2024-01-21 21:53:27.979371	2024-01-21 21:53:27.979371	\N
2	No i don't think so ­čą▓	2	review	1	2024-01-21 21:53:40.750329	2024-01-21 21:53:40.750329	1
3	Lets go new dlc\n	1	news	2	2024-01-21 22:10:20.939412	2024-01-21 22:10:20.939412	\N
4	Maybe i will win	1	giveaway	1	2024-01-21 22:13:58.097201	2024-01-21 22:13:58.097201	\N
6	Im sure you will not win ­čśÄ­čĹő­čĹő	2	giveaway	1	2024-01-21 22:14:33.987913	2024-01-21 22:14:33.987913	4
\.


--
-- Data for Name: giveaways; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.giveaways (id, title, content, author_id, created_at, image_url, participant_count, expiration_date) FROM stdin;
1	Cyberpunk 2077 Giveaway	<p><strong>Cyberpunk 2077 CD Keys Giveaway</strong></p><p><strong>Embark on a Cyberpunk Adventure Win a Free CD Key for Cyberpunk 2077</strong></p><p>Are you ready to dive into the neon-drenched, gritty world of Cyberpunk 2077? If so, then you're in luck! We're giving away a limited number of free CD keys for this highly anticipated game.</p><p><strong>About Cyberpunk 2077</strong></p><p>Immerse yourself in a dystopian future where technology and body modification run rampant. Play as V, a mercenary seeking fame and fortune in Night City, a sprawling metropolis where anything is possible ÔÇô for a price.</p><p><strong>What You Can Win</strong></p><p>One lucky winner will receive a free CD key for Cyberpunk 2077. This key can be redeemed on Steam, GOG.com, or Epic Games Store.</p><p><br><strong>This giveaway is open to residents of the United States and Canada only.</strong></p><p><strong>Entrants must be 18 years of age or older.</strong></p><p><strong>The winner will be notified via email.</strong></p><p><strong>The CD key will be emailed to the winner within 24 hours of the giveaway closing.</strong><br><br>&nbsp;</p><figure class="image"><img height="2160" width="3840" src="http://localhost:3000/uploads/image-1705871610728.jpg" style="aspect-ratio:3840/2160;"></figure>	1	2024-01-21 22:13:46.330899	http://localhost:3000/uploads/image-1705871626303.jpg	2	2024-12-31 00:00:00
\.


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.news (id, title, content, author_id, created_at, image_url) FROM stdin;
2	Cyberpunk 2077 Phantom Liberty	<p>The sprawling, neon-drenched metropolis of Night City is once again thrust into chaos with the release of Cyberpunk 2077: Phantom Liberty, a pulse-pounding expansion that plunges players into a world of espionage, intrigue, and perilous political machinations. As cyber-enhanced mercenary V, you'll embark on a daring mission to rescue the President of the New United States of America, whose orbital shuttle has been shot down over the notorious district of Dogtown.</p><p>Dogtown, a once-thriving industrial hub now transformed into a lawless wasteland, stands as the epicenter of this thrilling narrative. Navigating its treacherous streets and dilapidated buildings, V must forge alliances with a diverse cast of characters, each with their own hidden agendas and motives. From ruthless gangs to cunning corporate operatives, the line between friend and foe blurs as V delves deeper into the web of intrigue that threatens to engulf the city.</p><figure class="image"><img height="2160" width="3840" src="http://localhost:3000/uploads/image-1705871382265.jpg" style="aspect-ratio:3840/2160;"></figure><p>Phantom Liberty introduces a wealth of new gameplay mechanics that elevate the cyberpunk experience to new heights. Stealth and subterfuge take center stage as V infiltrates heavily guarded compounds, deciphers coded messages, and utilizes advanced hacking skills to manipulate the environment to their advantage. The expansion also features a variety of high-octane combat encounters, testing V's reflexes and tactical prowess as they face off against formidable foes.</p><p>In addition to its captivating storyline and engaging gameplay, Phantom Liberty delivers a visually stunning and atmospheric experience. Dogtown, with its crumbling skyscrapers, abandoned factories, and neon-lit alleyways, provides a stark contrast to the familiar neon-soaked streets of Night City. The expansion's soundtrack seamlessly blends gritty industrial beats with atmospheric ambient sounds, creating an immersive sonic backdrop for V's perilous journey.</p><p>Whether you're a seasoned cyberpunk veteran or a newcomer to the genre, Phantom Liberty promises to deliver an unforgettable experience. With its captivating story, thrilling gameplay, and immersive visuals, this expansion expands the boundaries of what Cyberpunk 2077 can offer, leaving players eager for more.</p>	1	2024-01-21 22:09:58.651705	http://localhost:3000/uploads/image-1705871398623.jpg
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, title, content, author_id, created_at, updated_at, image_url) FROM stdin;
1	Cyberpunk 2077	<p>As a passionate gamer and reviewer, I had high expectations for Cyberpunk 2077, the much-anticipated open-world RPG developed by CD Projekt Red. This game promised to transport players to a dystopian future filled with intrigue, danger, and endless possibilities. Did it live up to the immense hype? In many ways, it did, and I'm excited to share my thoughts on this epic journey.<br>&nbsp;</p><figure class="image"><img height="2160" width="3840" src="http://localhost:3000/uploads/image-1705870360502.jpg" style="aspect-ratio:3840/2160;"></figure><p>Visual Spectacle (5/5): From the moment I stepped into Night City, I was mesmerized by its sheer visual spectacle. The neon-soaked streets, towering skyscrapers, and meticulously crafted character designs create a world that's both stunning and hauntingly familiar. Cyberpunk 2077 sets a new standard for visual storytelling in gaming, and I found myself frequently pausing just to take in the breathtaking views.<br>&nbsp;</p><p>Immersive Storytelling (4.5/5): What truly sets Cyberpunk 2077 apart is its storytelling. The game weaves a complex narrative web of conspiracies, alliances, and personal struggles. Playing as V, a customizable protagonist, I was immersed in the gritty underbelly of Night City. The writing is sharp, and the voice acting is outstanding, making every character feel alive. My choices had weight and consequences, giving me a sense of agency in shaping the city's fate.<br>&nbsp;</p><p>Gameplay Variety (4.5/5): Cyberpunk 2077 offers an impressive variety of gameplay experiences. Whether I wanted to sneak through missions, hack my way to victory, engage in intense gunfights, or simply cruise through the city streets, the game accommodated my playstyle. The freedom to approach challenges in multiple ways added depth and kept me engaged for hours on end.<br>&nbsp;</p><p>Character Development (4.5/5): Character progression in Cyberpunk 2077 is a deep and rewarding experience. As V, I had the freedom to customize my character with cyberware upgrades, explore diverse skill trees, and enhance myself with cybernetic implants. This depth of character development allowed me to craft a V that suited my preferred playstyle, making each playthrough feel fresh and exciting.<br>&nbsp;</p><p>Issues and Controversies (3/5): It's important to address the elephant in the roomÔÇöthe game's troubled launch. Cyberpunk 2077 faced criticism for performance issues, especially on older hardware, and a slew of bugs that occasionally hindered the experience. CD Projekt Red has since released multiple patches to address these issues, and the game has seen significant improvements. However, it's essential to acknowledge that the rocky launch left a lasting impact.<br>&nbsp;</p><p>Conclusion: In conclusion, Cyberpunk 2077, despite its turbulent debut, remains a remarkable achievement in the gaming world. It delivers a captivating narrative, breathtaking visuals, and diverse gameplay options that pull you into its dystopian universe. While the initial technical hurdles were a setback, the potential and ambition of the game are undeniable. If you're a fan of immersive RPGs and futuristic settings, Cyberpunk 2077 is a journey worth embarking on, especially after the post-launch improvements.</p><p>Overall Rating: 4.5/5 - A futuristic masterpiece with the promise of an even brighter future.</p>	2	2024-01-21 21:53:10.317098	2024-01-21 21:53:10.317098	http://localhost:3000/uploads/image-1705870390288.jpg
\.


--
-- Data for Name: user_giveaway; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_giveaway (user_id, giveaway_id) FROM stdin;
1	1
2	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, profile_picture, role, created_at, bio) FROM stdin;
2	test1	test1@gmail.com	$2b$10$IZbwATsmZj86mw361o.OEeEgQYAezGojFEuZ8k6vYmbW9L1XYDtIC	http://localhost:3000/uploads/image-1705870441060.jpg	user	2024-01-21 21:39:28.243973+01	\N
1	admin	admin@gmail.com	$2b$10$3eCg6Cng2FCUiNoPuYeY/.ArJA3tWnzuyeBi6Pkxb8rndHZ4iWria	http://localhost:3000/uploads/image-1705871431806.jpg	admin	2024-01-21 21:33:12.174776+01	Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release 
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 6, true);


--
-- Name: giveaways_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.giveaways_id_seq', 1, true);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 2, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: giveaways giveaways_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.giveaways
    ADD CONSTRAINT giveaways_pkey PRIMARY KEY (id);


--
-- Name: news news_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: user_giveaway user_giveaway_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_giveaway
    ADD CONSTRAINT user_giveaway_pkey PRIMARY KEY (user_id, giveaway_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: comments comments_parent_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_parent_comment_id_fkey FOREIGN KEY (parent_comment_id) REFERENCES public.comments(id);


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: giveaways giveaways_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.giveaways
    ADD CONSTRAINT giveaways_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: news news_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: user_giveaway user_giveaway_giveaway_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_giveaway
    ADD CONSTRAINT user_giveaway_giveaway_id_fkey FOREIGN KEY (giveaway_id) REFERENCES public.giveaways(id);


--
-- Name: user_giveaway user_giveaway_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_giveaway
    ADD CONSTRAINT user_giveaway_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

