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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
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
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: giveaways; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.giveaways (
    id integer NOT NULL,
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
-- Name: giveaways_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.giveaways_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.giveaways_id_seq OWNER TO postgres;

--
-- Name: giveaways_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.giveaways_id_seq OWNED BY public.giveaways.id;


--
-- Name: news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    author_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image_url character varying(255)
);


ALTER TABLE public.news OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.news_id_seq OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    author_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image_url character varying(255)
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: user_giveaway; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_giveaway (
    user_id integer NOT NULL,
    giveaway_id integer NOT NULL
);


ALTER TABLE public.user_giveaway OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
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
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: giveaways id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.giveaways ALTER COLUMN id SET DEFAULT nextval('public.giveaways_id_seq'::regclass);


--
-- Name: news id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, content, user_id, content_type, content_id, created_at, updated_at, parent_comment_id) FROM stdin;
8	This is a test comment for a news item.	8	news	2	2024-01-17 14:28:56.81043	2024-01-17 14:28:56.81043	\N
10	A comment for a different news item.	3	news	6	2024-01-17 14:28:56.81043	2024-01-17 14:28:56.81043	\N
11	A comment for a different news item.	8	news	9	2024-01-17 14:32:33.767421	2024-01-17 14:32:33.767421	\N
12	Test comment	8	news	2	2024-01-18 19:58:48.656121	2024-01-18 19:58:48.656121	\N
15	TestKomentarEdit	8	news	11	2024-01-18 23:23:43.329922	2024-01-18 23:23:43.329922	\N
80	fd	35	news	13	2024-01-21 19:03:22.668903	2024-01-21 19:03:22.668903	29
17	fasdfasd	8	news	12	2024-01-19 14:01:50.980844	2024-01-19 14:01:50.980844	\N
81	dasdsadsa	35	news	13	2024-01-21 19:03:27.032217	2024-01-21 19:03:27.032217	\N
19	saas	8	giveaway	13	2024-01-19 15:32:15.473781	2024-01-19 15:32:15.473781	\N
20	y├í	8	review	28	2024-01-19 15:35:32.526396	2024-01-19 15:35:32.526396	\N
82	dsa	35	news	13	2024-01-21 19:03:32.26196	2024-01-21 19:03:32.26196	81
22	gsdgf	8	news	12	2024-01-20 22:43:48.848255	2024-01-20 22:43:48.848255	\N
23	test Koment	8	review	26	2024-01-20 22:44:20.857178	2024-01-20 22:44:20.857178	\N
24	test reply	8	review	26	2024-01-20 22:51:20.336374	2024-01-20 22:51:20.336374	\N
25	ggg	8	review	26	2024-01-20 22:51:33.527713	2024-01-20 22:51:33.527713	\N
26	fdsfds	8	review	26	2024-01-20 22:56:47.848329	2024-01-20 22:56:47.848329	25
27	hfghfg	8	review	26	2024-01-20 22:56:53.559273	2024-01-20 22:56:53.559273	25
28	dasdsa	8	review	26	2024-01-20 23:10:31.568527	2024-01-20 23:10:31.568527	24
29	dsad	8	news	13	2024-01-21 09:39:15.757232	2024-01-21 09:39:15.757232	\N
30	dasdsa	8	news	13	2024-01-21 09:39:19.659353	2024-01-21 09:39:19.659353	29
83	das	35	news	13	2024-01-21 19:03:42.547525	2024-01-21 19:03:42.547525	37
32	dasdsa	34	news	13	2024-01-21 13:41:49.09767	2024-01-21 13:41:49.09767	29
33	dsada	34	news	13	2024-01-21 13:41:52.538027	2024-01-21 13:41:52.538027	32
34	dsadsa	34	news	13	2024-01-21 13:41:55.520071	2024-01-21 13:41:55.520071	32
35	dsadsa	34	news	13	2024-01-21 13:41:59.805264	2024-01-21 13:41:59.805264	30
36	skuskareply	34	news	13	2024-01-21 13:42:07.120558	2024-01-21 13:42:07.120558	32
38	sadas	34	news	13	2024-01-21 13:48:31.576944	2024-01-21 13:48:31.576944	37
37	dasdsasda	34	news	13	2024-01-21 13:48:25.705898	2024-01-21 13:48:25.705898	\N
39	cdsa	34	news	13	2024-01-21 13:49:12.835606	2024-01-21 13:49:12.835606	38
40	dsadsada	34	news	13	2024-01-21 13:49:16.564843	2024-01-21 13:49:16.564843	38
41	dsa	34	news	13	2024-01-21 13:49:42.555528	2024-01-21 13:49:42.555528	37
42	dsads	34	news	12	2024-01-21 13:56:38.959255	2024-01-21 13:56:38.959255	22
43	dsadsa	34	news	12	2024-01-21 13:56:41.634368	2024-01-21 13:56:41.634368	42
44	rwerew	34	news	12	2024-01-21 13:57:09.475828	2024-01-21 13:57:09.475828	\N
45	htdgdfgf	34	news	12	2024-01-21 13:57:14.032804	2024-01-21 13:57:14.032804	17
46	dasda	34	news	12	2024-01-21 14:01:54.211086	2024-01-21 14:01:54.211086	44
47	dasdsa	34	news	12	2024-01-21 14:02:14.631008	2024-01-21 14:02:14.631008	46
48	dsadsa	34	news	12	2024-01-21 14:02:16.101094	2024-01-21 14:02:16.101094	46
49	hgfhfgh	34	news	12	2024-01-21 14:06:35.442599	2024-01-21 14:06:35.442599	44
50	hfghgfh	34	news	12	2024-01-21 14:06:37.476858	2024-01-21 14:06:37.476858	44
51	dasdsa	34	news	12	2024-01-21 14:07:32.726988	2024-01-21 14:07:32.726988	44
52	dsada	34	news	12	2024-01-21 14:08:06.052871	2024-01-21 14:08:06.052871	\N
53	dsasda	34	news	12	2024-01-21 14:12:25.726706	2024-01-21 14:12:25.726706	44
54	dsada	34	news	12	2024-01-21 14:12:49.320503	2024-01-21 14:12:49.320503	44
55	dasd	34	news	12	2024-01-21 14:12:51.411392	2024-01-21 14:12:51.411392	46
56	dasasd	34	news	12	2024-01-21 14:12:54.856657	2024-01-21 14:12:54.856657	53
57	dasdas	34	news	12	2024-01-21 14:12:59.011985	2024-01-21 14:12:59.011985	52
58	dsadas	34	news	12	2024-01-21 14:13:01.384333	2024-01-21 14:13:01.384333	57
59	dsadsad	34	news	12	2024-01-21 14:13:03.061388	2024-01-21 14:13:03.061388	57
62	dsad	8	review	29	2024-01-21 18:40:09.852499	2024-01-21 18:40:09.852499	\N
63	dasdsa	8	review	29	2024-01-21 18:40:10.855008	2024-01-21 18:40:10.855008	\N
64	dasd	8	review	29	2024-01-21 18:41:47.641149	2024-01-21 18:41:47.641149	\N
65	das	8	review	29	2024-01-21 18:41:49.511615	2024-01-21 18:41:49.511615	\N
66	dasd	8	review	29	2024-01-21 18:41:56.165577	2024-01-21 18:41:56.165577	64
67	dsa	8	review	29	2024-01-21 18:41:58.703895	2024-01-21 18:41:58.703895	66
69	dsaasa	8	review	29	2024-01-21 18:42:26.346096	2024-01-21 18:42:26.346096	\N
70	dsa	8	review	29	2024-01-21 18:42:30.236597	2024-01-21 18:42:30.236597	69
71	dsada	8	giveaway	13	2024-01-21 18:44:13.06721	2024-01-21 18:44:13.06721	\N
72	dasd	8	giveaway	13	2024-01-21 18:44:14.919223	2024-01-21 18:44:14.919223	19
73	dasd	8	giveaway	13	2024-01-21 18:44:18.448649	2024-01-21 18:44:18.448649	\N
74	da	8	giveaway	13	2024-01-21 18:44:21.467005	2024-01-21 18:44:21.467005	\N
75	yyaa	35	giveaway	13	2024-01-21 18:45:20.398913	2024-01-21 18:45:20.398913	\N
76	dsa	35	giveaway	13	2024-01-21 18:57:02.315061	2024-01-21 18:57:02.315061	75
77	fsdfds	35	giveaway	13	2024-01-21 18:57:14.516659	2024-01-21 18:57:14.516659	\N
78	fsdfffffff	35	giveaway	13	2024-01-21 18:57:16.982468	2024-01-21 18:57:16.982468	77
79	sssssssssssssssssss	35	giveaway	13	2024-01-21 18:57:20.203778	2024-01-21 18:57:20.203778	77
89	ahoj	8	giveaway	14	2024-01-21 19:16:37.1574	2024-01-21 19:16:37.1574	\N
90	fasdas	8	giveaway	14	2024-01-21 19:16:41.589713	2024-01-21 19:16:41.589713	\N
91	cau co robis	8	giveaway	14	2024-01-21 19:16:46.243116	2024-01-21 19:16:46.243116	90
\.


--
-- Data for Name: giveaways; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.giveaways (id, title, content, author_id, created_at, image_url, participant_count, expiration_date) FROM stdin;
2	dasdadsa	<p>dsadsadsadasdsa</p>	8	2023-12-06 20:15:02.377582	http://localhost:3000/uploads/image-1701890102372.jpg	0	2023-12-15 00:00:00
1	testgiveaway	<p>testteeeee</p>	8	2023-12-06 20:05:56.02395	http://localhost:3000/uploads/image-1701889555987.jpg	22	2023-12-16 00:00:00
3	Skusa		8	2023-12-06 22:18:29.181625	http://localhost:3000/uploads/image-1701897509176.jpg	0	2023-12-30 00:00:00
4	dsadsadsad	<p>dsadsadsadsadsadsa</p>	8	2023-12-06 22:21:32.984402	http://localhost:3000/uploads/image-1701897692957.jpg	0	2023-12-22 00:00:00
5	dasdadasd	<p>dsadsadsad</p>	8	2023-12-06 22:39:25.257329	http://localhost:3000/uploads/image-1701898765230.jpg	0	2023-12-20 00:00:00
6	dsadsadsadsa	<p>asdasdsadddd</p>	8	2023-12-06 22:50:09.359025	http://localhost:3000/uploads/image-1701899409332.jpg	0	2023-12-22 00:00:00
7	dsadsada	<p>dsadsadsa</p>	8	2023-12-07 00:54:03.727011	http://localhost:3000/uploads/image-1701906843697.jpg	0	2023-12-31 00:00:00
8	dsadsa	<p>dsadsa</p>	8	2023-12-07 01:04:58.945575		1	2023-12-17 00:00:00
9	dsadasda	<figure class="image"><img style="aspect-ratio:3840/2160;" src="http://localhost:3000/uploads/image-1701909188684.jpg" width="3840" height="2160"></figure>	8	2023-12-07 01:33:12.629459	http://localhost:3000/uploads/image-1701909192601.jpg	0	2023-12-21 00:00:00
10	asdsasa	<p>dsadadsa</p><figure class="image"><img style="aspect-ratio:3840/2160;" src="http://localhost:3000/uploads/image-1701920896445.jpg" width="3840" height="2160"></figure>	8	2023-12-07 04:48:18.160848	http://localhost:3000/uploads/image-1701920898133.jpg	1	2023-12-24 00:00:00
11	dsadsad	<p>dsadsadsadsad</p>	8	2023-12-07 05:59:24.381083	http://localhost:3000/uploads/image-1701925164354.jpg	1	2023-12-24 00:00:00
13	tasopdsa	<p>so this is not working?</p>	8	2023-12-07 06:54:39.71952	http://localhost:3000/uploads/image-1705844399386.jpg	1	4444-04-03 00:00:00
12	dsadsada	<p>dasdsadas</p>	8	2023-12-07 06:44:08.327165	http://localhost:3000/uploads/image-1701927848300.jpg	1	2023-12-22 00:00:00
\.


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.news (id, title, content, author_id, created_at, image_url) FROM stdin;
1	dfpoaskdspoa	<p>dsadadssad</p>	8	2023-12-07 00:32:45.666195	
2	dsadsadsad	<p>dsadsadsadsadsada</p>	8	2023-12-07 00:49:09.464117	http://localhost:3000/uploads/image-1701906549429.jpg
3	dsadsadsa	<p>dsadsadsa</p>	8	2023-12-07 00:52:28.096603	http://localhost:3000/uploads/image-1701906748068.jpg
4	daSDSADSA	<p>DSADSADA</p>	8	2023-12-07 01:05:45.481353	http://localhost:3000/uploads/image-1701907545477.jpg
5	dfasdsad	<p>dasdsadsada</p>	8	2023-12-07 04:46:33.924566	http://localhost:3000/uploads/image-1701920793894.jpg
6	dasdsad	<p>dsadsadsa</p><figure class="image"><img style="aspect-ratio:3840/2160;" src="http://localhost:3000/uploads/image-1701920919094.jpg" width="3840" height="2160"></figure>	8	2023-12-07 04:48:40.526618	http://localhost:3000/uploads/image-1701920920498.jpg
7	dasdsa	<p>dsadsadsadsa</p><figure class="image"><img style="aspect-ratio:3840/2160;" src="http://localhost:3000/uploads/image-1701925113160.jpg" width="3840" height="2160"></figure>	8	2023-12-07 05:58:34.89907	http://localhost:3000/uploads/image-1701925114871.jpg
9	dsadsada	<p>dsadsadsa</p><figure class="image"><img style="aspect-ratio:3840/2160;" src="http://localhost:3000/uploads/image-1701927807913.jpg" width="3840" height="2160"></figure>	8	2023-12-07 06:43:31.615188	http://localhost:3000/uploads/image-1701927811587.jpg
10	testnews	<p>testestests</p><figure class="image"><img style="aspect-ratio:3840/2160;" src="http://localhost:3000/uploads/image-1701928496472.jpg" width="3840" height="2160"></figure>	8	2023-12-07 06:55:00.263851	http://localhost:3000/uploads/image-1701928500129.jpg
8	testEdit	<p>Localpato</p><figure class="image"><img style="aspect-ratio:3840/2160;" src="http://localhost:3000/uploads/image-1701927365621.jpg" width="3840" height="2160"></figure>	8	2023-12-07 06:36:12.401738	http://localhost:3000/uploads/image-1705436192753.jpg
11	TestEditNews	<p>TestujemeEditNes</p><figure class="image"><img style="aspect-ratio:3840/2160;" src="http://localhost:3000/uploads/image-1705440218949.jpg" width="3840" height="2160"></figure>	8	2024-01-12 01:52:50.301908	http://localhost:3000/uploads/image-1705440233989.jpg
12	testimag	<p>dsadad75778</p>	8	2024-01-19 14:01:39.472836	http://localhost:3000/uploads/image-1705669299467.jpg
14	dsadsa	<p>dsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsad</p><figure class="image"><img height="2160" width="3840" src="http://localhost:3000/uploads/image-1705866729746.jpg" style="aspect-ratio:3840/2160;"></figure>	35	2024-01-21 20:52:11.467316	http://localhost:3000/uploads/image-1705866731435.jpg
15	dsa	<p>dsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsaddsadsad</p>	8	2024-01-21 21:56:47.022193	
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, title, content, author_id, created_at, updated_at, image_url) FROM stdin;
1	Prv├í recenzia	Toto je obsah prvej recenzie. Tu by bolo viac textu...	1	2023-12-03 19:52:34.202291	2023-12-03 19:52:34.202291	\N
2	Druh├í recenzia	Toto je obsah druhej recenzie. Op├Ą┼ą, tu by bolo viac textu...	2	2023-12-03 19:52:34.202291	2023-12-03 19:52:34.202291	\N
3	Tretia recenzia	Toto je obsah tretej recenzie. A znova, tu by bolo viac textu...	3	2023-12-03 19:52:34.202291	2023-12-03 19:52:34.202291	\N
4	Test Review	fpolkasdjfp sfksj afjlsda jfkldsaj fklsdjkfl sjdaklf jsdaklf jklsdajf klsadjf lksdajlfk jsadlkf jsaldkfj klsdjf lksdajf klsadjfkl jsdalkf jsdaklf jlsdajf klsdjf lsjdklf jsdkl fjksldaf jklsadfj lksajfd klasdjf lsjdafl jsadlf jlsakdfj lsdjkfl sadjklf jsadkl 	8	2023-12-04 03:19:25.746719	2023-12-04 03:19:25.746719	\N
5	TestReview	<p> daskdp adk paskdpsak dpkaspd kaspd kpoas kdposakd paskdpksapdkpsakd poaskpdokaspo dkpasdaskdp adk paskdpsak dpkaspd kaspd kpoas kdposakd paskdpksapdkpsakd poaskpdokaspo dkpasdaskdp adk paskdpsak dpkaspd kaspd kpoas kdposakd paskdpksapdkpsakd poaskpdokaspo dkpasdaskdp adk paskdpsak dpkaspd kaspd kpoas kdposakd paskdpksapdkpsakd poaskpdokaspo dkpasdaskdp adk paskdpsak dpkaspd kaspd kpoas kdposakd paskdpksapdkpsakd poaskpdokaspo dkpasdaskdp adk paskdpsak dpkaspd kaspd kpoas kdposakd paskdpksapdkpsakd poaskpdokaspo dkpasdaskdp adk paskdpsak dpkaspd kaspd kpoas kdposakd paskdpksapdkpsakd poaskpdokaspo dkpasdaskdp adk paskdpsak dpkaspd kaspd kpoas kdposakd paskdpksapdkpsakd poaskpdokaspo dkpasdaskdp adk paskdpsak dpkaspd kaspd kpoas kdposakd paskdpksapdkpsakd poaskpdokaspo dkpasdaskdp adk paskdpsak dpkaspd kaspd kpoas kdposakd paskdpksapdkpsakd poaskpdokaspo dkpasdaskdp adk paskdpsak dpkaspd kaspd kpoas kdposakd paskdpksapdkpsakd poaskpdokaspo dkpas</p>	8	2023-12-04 03:29:36.188221	2023-12-04 03:29:36.188221	\N
6	TestObrazok	<p><img src="data:image/png;base64,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"></p>	8	2023-12-04 03:33:06.920145	2023-12-04 03:33:06.920145	\N
7	TestRecenzieDPASDPOSAKDP	<p>DASD/ ALD/ AS/D LA/SDL /ASLD/PASL/D LAS/DL/ASLDP/ ASLDP/OASPO/D KASP/ODKPOASK DPOASKOPD KASOP DKOPAS DKOPASK DOPASKOPDKASOPDKPOASDKPO</p><p>DASKLODASKOJDKLASJDLSAJD</p><p>KSLADKLKASKDLSAKDL"AS</p><p>"LSAKDL"ASKD"ASL"DKL"AS</p><p>DPL"SAKD"LASKDL"SAKD</p><p>LP"SALD"AS"LDSA</p><p>"LDSAKL"DASL"D</p><p>K"LDASKDL"ASL"D</p><p>KLP"ASKD"LASKL"DS</p><p>L"ASKDL"AL"DKASL"</p><p>KD"LASKDL"ASKL"DAKSL"</p>	8	2023-12-04 04:43:49.772681	2023-12-04 04:43:49.772681	\N
8	SkuskaRecenzia	<p>Toto je skuska postu, len nejaky textik dame atd ..las,d ├┤as├┤d, as├┤ldk ├┤saldk l├┤askd ├┤lsakd ├┤kas├┤d ksad</p><p>sadla├┤ldlk├┤sadkl├┤sakld├┤sa┼ł</p><p>kldasl├┤kdjaksl├┤kdas├┤lkds├┤a</p><p>klsajd├┤lasjdlsalkdsalkjdsa┼ł</p><p>lkasjdlksajdlksajldjsalkdjsa┼łkdlksaj</p><p>dkaskldsal├┤kdklak├┤sd├┤lksa</p><p>kdoplksajkdlaskdlksakdsa</p><p>dklsajdlksajdlksajkldsa</p><p>dlsajdlkasjdlksajldjsaldsalkdklsa</p><p>dlsakdjklasdksaljdlasjdksa</p><p>dlksajdlksajdlkasdljaslkd</p><p>dlksajdlsajdlksadlksakjd</p><p>salkdjaslkdjlaksdjlasksd</p><p>jdklasdjklasjdlksaljkdaslkj</p><p>dl├┤asd├┤laskdl├┤sak├┤ldas</p><p>dkpasldjaspdkjpasdkpsakd</p><p>dl├┤asdk├┤askd├┤sak├┤ldsa</p><p>&nbsp;</p>	8	2023-12-06 14:18:02.863538	2023-12-06 14:18:02.863538	\N
9	DalsiaSkuskarecenzieSObrazokom	<p>da├┤┬ždsakld┬ž├┤saddsa</p><p>dakl├┤sd├┤lasdklas</p><p>dklasdjklsadkl├┤jsa</p><p>kldaslkdaskljdsa</p><p>dlkasjldkasjkld</p><p>lkdasjkldjaskld</p><p>kldsajkldaslkj</p><figure class="image"><img style="aspect-ratio:3840/2160;" src="http://localhost:3000/uploads/image-1701869026181.jpg" width="3840" height="2160"></figure>	8	2023-12-06 14:23:48.281545	2023-12-06 14:23:48.281545	\N
10	SkuskaFotkaAutor	<p>dasdl├┤sakdpl├┤sakd├┤sakdl├┤skad</p>	8	2023-12-06 14:56:39.464664	2023-12-06 14:56:39.464664	\N
11	TestPostu	<p>TestPostu</p>	8	2023-12-06 17:03:49.816803	2023-12-06 17:03:49.816803	\N
16	testdasdsadsadsa	<p>dasdsaasda</p>	8	2023-12-06 18:59:34.141699	2023-12-06 18:59:34.141699	\N
17	testsetestse	<p>dsadsadsada</p>	8	2023-12-06 19:09:34.627619	2023-12-06 19:09:34.627619	http://localhost:3000/uploads/image-1701886174600.jpg
18	dasd		8	2023-12-06 22:19:05.000953	2023-12-06 22:19:05.000953	http://localhost:3000/uploads/image-1701897544995.jpg
19	sdasdsad	<p>dsadsadsad</p>	8	2023-12-06 22:24:50.66824	2023-12-06 22:24:50.66824	http://localhost:3000/uploads/image-1701897890642.jpg
20	dsadsadsad	<p>dasdsadsadsad</p>	8	2023-12-06 22:35:28.561039	2023-12-06 22:35:28.561039	http://localhost:3000/uploads/image-1701898528532.jpg
21	dasdsada	<p>dsadsadsal'dmsa;lkdsakdl;sakd;lsakl;dsal;kdsa</p><figure class="image"><img style="aspect-ratio:3840/2160;" src="http://localhost:3000/uploads/image-1701899216270.jpg" width="3840" height="2160"></figure><p>dlp;asdl;sadl;askd</p><p>ld;sakdl;sakdl;sak</p><p>;d</p><p>sal;dsa;ldsa</p><p>;ld</p><p>sald</p><p>sald</p><p>sald</p><p>lsa</p><p>dlsa;ldsa</p>	8	2023-12-06 22:47:08.167106	2023-12-06 22:47:08.167106	http://localhost:3000/uploads/image-1701899228140.jpg
22	reveeeas	<p>dasdsadsadsa</p>	8	2023-12-07 01:05:35.763034	2023-12-07 01:05:35.763034	http://localhost:3000/uploads/image-1701907535736.jpg
23	dasdsadsa	<figure class="image"><img style="aspect-ratio:3840/2160;" src="http://localhost:3000/uploads/image-1701909956154.jpg" width="3840" height="2160"></figure>	8	2023-12-07 01:46:00.317355	2023-12-07 01:46:00.317355	http://localhost:3000/uploads/image-1701909960289.jpg
24	Dasdsada	<p>dsadsadsadsad</p><figure class="image"><img style="aspect-ratio:3840/2160;" src="http://localhost:3000/uploads/image-1701920862774.jpg" width="3840" height="2160"></figure>	8	2023-12-07 04:47:48.162106	2023-12-07 04:47:48.162106	http://localhost:3000/uploads/image-1701920868133.jpg
25	sasAsas	<p>dsadsadsa</p><figure class="image"><img style="aspect-ratio:3840/2160;" src="http://localhost:3000/uploads/image-1701925133272.jpg" width="3840" height="2160"></figure>	8	2023-12-07 05:58:59.821099	2023-12-07 05:58:59.821099	http://localhost:3000/uploads/image-1701925139794.jpg
26	dsadsa	<p>dsada</p>	8	2023-12-07 06:06:46.282144	2023-12-07 06:06:46.282144	http://localhost:3000/uploads/image-1701925606274.jpg
27	dsadsad	<p>dsadsada</p><figure class="image"><img style="aspect-ratio:3840/2160;" src="http://localhost:3000/uploads/image-1701927825952.jpg" width="3840" height="2160"></figure>	8	2023-12-07 06:43:52.269691	2023-12-07 06:43:52.269691	http://localhost:3000/uploads/image-1701927832243.jpg
28	testsreviews	<p>dsadsadsa</p><figure class="image"><img style="aspect-ratio:3840/2160;" src="http://localhost:3000/uploads/image-1701928525570.jpg" width="3840" height="2160"></figure>	8	2023-12-07 06:55:31.031356	2023-12-07 06:55:31.031356	http://localhost:3000/uploads/image-1701928531004.jpg
13	tasopdsa	<p>so this is not working?</p>	8	2023-12-06 18:07:47.325489	2023-12-06 18:07:47.325489	\N
\.


--
-- Data for Name: user_giveaway; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_giveaway (user_id, giveaway_id) FROM stdin;
10	1
8	1
8	8
8	10
8	11
8	13
8	12
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, profile_picture, role, created_at, bio) FROM stdin;
2	test1	test1@example.com	test1	\N	user	2023-12-02 23:31:09.770433+01	\N
3	test2	test2@gmail.com	test1	\N	user	2023-12-02 23:31:43.789863+01	\N
4	test3	test3@gmail.com	test3	\N	user	2023-12-03 00:07:53.764112+01	\N
31	auto1	auto1@gmail.com	$2b$10$ZRnnqHOCZKnERAQG/wV1a.YG6MXgrvwF6aBhZRIi48eD.uqXoRLm6	http://localhost:3000/uploads/default-profile-picture.jpg	user	2024-01-19 21:09:11.399344+01	\N
27	ahoj	obhajoba@gmail.com	$2b$10$mS90p/c.qf4rKzL7haw8L.Vc24qZKY5eZhrgLqdaaYZA556.HDFM2	http://localhost:3000/uploads/default-profile-picture.jpg	user	2023-12-08 11:33:51.236399+01	\N
30	test1010	test101@gmail.com	$2b$10$jd9DuLFZyQ0Hm.SO5XPRi.XO2W68mjEoOuWbfGbz.qwRUhcVQQMGC	http://localhost:3000/uploads/default-profile-picture.jpg	user	2024-01-19 18:31:02.794786+01	\N
14	test99	test99@gmail.com	$2b$10$cLfB6xXfYlafeaf.pXfVw.uGhOtH2u8KT11TMc32h7tNy16LiMYBu	http://localhost:3000/uploads/default-profile-picture.jpg	admin	2023-12-07 05:55:29.094611+01	\N
32	auto7	auto7@gmail.com	$2b$10$Emrs0UDa4qd0LyP8TnMtS.uUykS9A9.WQdNW/E4.ggxxuQ6UQ67cu	http://localhost:3000/uploads/default-profile-picture.jpg	user	2024-01-20 02:52:30.069275+01	\N
19	test888	test888@gmail.com	$2b$10$11GUqchy0fkoHmlGlV4kTea67ni6tfV1v/mMbkbyXFv2yRsfWHeLi	http://localhost:3000/uploads/default-profile-picture.jpg	user	2023-12-07 06:45:28.813453+01	\N
23	testaaa	testaa@gmail.com	$2b$10$g3HEZoDh8XouyeS3kcgtw.uE2Gs7lNYDW/w5RfHCZW//9N0nfUyhi	http://localhost:3000/uploads/default-profile-picture.jpg	user	2023-12-08 10:44:32.608117+01	\N
25	testvaiiuzivatel		$2b$10$ENepZ7CkvOt6bPSq7Fu2du1oVh8qXvcDa9c6Lj0aGbDpD/hngxhaa	\N	user	2023-12-08 11:29:43.654037+01	\N
26	dasdsadsad	obhajoba10dsadsa@gmail.com	$2b$10$jkkyDulzxgC3.n0LpntOfumgNVgPoSki554bBOxSvfjiQ9AI6WYlO	http://localhost:3000/uploads/default-profile-picture.jpg	user	2023-12-08 11:30:45.40266+01	\N
11	TestRegister	TestRegister@gmail.com	$2b$10$pH2q1RBJoMjh9gqZD7y5peE2iKFkovSALlzMS9fp3awCUKEII3kqO	\N	user	2023-12-06 16:24:29.245995+01	\N
29	tesusra	testregister@gmail.com	$2b$10$qHrFclrnzgNfyz3t07RhpuMCyzAmMAZ9s6exZqkbgRFv2U2AcXmhO	http://localhost:3000/uploads/image-1705684966235.jpg	user	2024-01-19 17:53:23.502981+01	\N
10	test50	test10@gmail.com	$2b$10$VeJsFuZX3TXzieMEGts1mu36.47vLNrWPEwN0tUrHrQVMyxVU.3s6	http://localhost:3000/uploads/default-profile-picture.jpg	user	2023-12-06 16:05:07.681208+01	\N
5	ahoj7Testa	ahoj7Test@gmail.com	$2b$10$E4Ggkt.Hv05o6.L23FfZCeF4R5BM3idNb5HpPhijUrY2WAm1h58v6	http://localhost:3000/uploads/default-profile-picture.jpg	user	2023-12-03 00:08:48.708433+01	\N
8	test8	test8@gmail.com	$2b$10$pl93K0ds5ajjVZZuru3eE.USLveT.OmT0PyeRA6nox0w4uZyH8Ljy	http://localhost:3000/uploads/image-1705837740740.jpg	admin	2023-12-04 02:03:05.758894+01	TestujemBio
34	test12345	test1234@gmail.com	$2b$10$eRMrMj4yI0Hr3EhBSFtJQe1a1tVIOYrQ9AZzxsV31fcqo3K6mP306	http://localhost:3000/uploads/default-profile-picture.jpg	user	2024-01-21 13:26:00.634893+01	Hi my name is
36	RegisterTest	RegisterTest@gmail.com	$2b$10$8a35jxV1t4xidRMhjD90Zuk0PnUs7ClRvU./jcHs3LuUrq81gGgcS	http://localhost:3000/uploads/default-profile-picture.jpg	user	2024-01-21 16:07:53.890703+01	\N
9	test9945	test999@gmail.com	$2b$10$msgxJPFcQnhanXkVyp.PjeDam9BAKQnYeo.m4Sqluht.TSyr0jBxa	http://localhost:3000/uploads/default-profile-picture.jpg	admin	2023-12-06 15:55:47.546153+01	\N
35	test99999	test9999@gmail.com	$2b$10$K1TjFA9FsXoIVQSx0isoqOcRPgwmdCMfv04BXd06Bqju1wzznYZP2	http://localhost:3000/uploads/image-1705843570312.jpg	author	2024-01-21 14:23:40.901499+01	dasdsadsa
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 91, true);


--
-- Name: giveaways_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.giveaways_id_seq', 15, true);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 15, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 29, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 36, true);


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

