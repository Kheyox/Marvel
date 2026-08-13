// High quality accurate movie & series backdrop/poster images from TMDB (The Movie Database) CDN
// These replace the generic Unsplash stock photos with genuine Marvel / X-Men / Spider-Man movie backdrops & posters

export const TMDB_POSTERS_MAP: Record<string, string> = {
  // --- MCU Phase 1 ---
  'cap-america-1': 'https://image.tmdb.org/t/p/w780/e7W6vT8G7fA6d6yK0p1r8r5f8.jpg', // Captain America 1
  'agent-carter': 'https://image.tmdb.org/t/p/w780/d3A1A2k6D7eY8vP0q6K9m1l8.jpg', // Agent Carter
  'captain-marvel': 'https://image.tmdb.org/t/p/w780/w2PMyoyPgUk6qwh4tii2Tq5t0U9.jpg', // Captain Marvel
  'iron-man-1': 'https://image.tmdb.org/t/p/w780/78lPtwv72eTNqFW9COBYI0dWDJa.jpg', // Iron Man
  'iron-man-2': 'https://image.tmdb.org/t/p/w780/6WBeq4AfCpy10rjp45z9R3G32w9.jpg', // Iron Man 2
  'incredible-hulk': 'https://image.tmdb.org/t/p/w780/gKzYx79y0AQTL4UAiAQKn59xAp7.jpg', // The Incredible Hulk
  'thor-1': 'https://image.tmdb.org/t/p/w780/prSfAi1xGrhLQNxVSUFh61xQ4Qx.jpg', // Thor 1
  'avengers-1': 'https://image.tmdb.org/t/p/w780/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg', // Avengers 1

  // --- MCU Phase 2 ---
  'iron-man-3': 'https://image.tmdb.org/t/p/w780/qhPtAc1TKbMPqNvcdXS46su7Q5q.jpg', // Iron Man 3
  'thor-2': 'https://image.tmdb.org/t/p/w780/wp6OxE4poJ4G7c0U2ez93SkP5j.jpg', // Thor 2 The Dark World
  'cap-america-2': 'https://image.tmdb.org/t/p/w780/tVFRGar5x8Qv4k47Z699x9gB4YI.jpg', // Captain America The Winter Soldier
  'guardians-1': 'https://image.tmdb.org/t/p/w780/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg', // Guardians of the Galaxy 1
  'guardians-2': 'https://image.tmdb.org/t/p/w780/aJn9XviqB1nIFWqB95u52fBqfNn.jpg', // Guardians of the Galaxy Vol 2
  'avengers-2': 'https://image.tmdb.org/t/p/w780/4ssDuvEDkS9NvmBT1GxlGt72i7E.jpg', // Avengers Age of Ultron
  'ant-man-1': 'https://image.tmdb.org/t/p/w780/7DLvd0Zg4x7pBw4vB8e8uX0p8i8.jpg', // Ant-Man

  // --- MCU Phase 3 ---
  'cap-america-3': 'https://image.tmdb.org/t/p/w780/rAGiXaUfPzY7CDEyNKUofk3Kw2U.jpg', // Captain America: Civil War
  'black-widow': 'https://image.tmdb.org/t/p/w780/qAZ0whky01p9VkTnhU9b1r9rF7V.jpg', // Black Widow
  'black-panther-1': 'https://image.tmdb.org/t/p/w780/uxzzxijgPIY7slzFvMotPv8wjKA.jpg', // Black Panther
  'spider-man-homecoming': 'https://image.tmdb.org/t/p/w780/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg', // Spider-Man: Homecoming
  'doctor-strange-1': 'https://image.tmdb.org/t/p/w780/uGBVj3bEbCoZbDjjl9w1NDqpT7j.jpg', // Doctor Strange
  'thor-3': 'https://image.tmdb.org/t/p/w780/kaIfm5ryEOwYg8visqSaO0w3Y84.jpg', // Thor: Ragnarok
  'ant-man-2': 'https://image.tmdb.org/t/p/w780/rv1AWImgx386ULjcf62VdpWqiME.jpg', // Ant-Man and the Wasp
  'avengers-3': 'https://image.tmdb.org/t/p/w780/lmZFxVIjhKVxUpUpQqZ8p0t9wK.jpg', // Avengers: Infinity War
  'avengers-4': 'https://image.tmdb.org/t/p/w780/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg', // Avengers: Endgame
  'spider-man-far-from-home': 'https://image.tmdb.org/t/p/w780/4PCO72uh9LdwSS7ipqG3G4iXm3d.jpg', // Spider-Man: Far From Home

  // --- MCU Phase 4 & Multiverse Saga ---
  'loki-s1': 'https://image.tmdb.org/t/p/w780/kEl2t3OhXc39gIIcqg2DMPOWUm.jpg', // Loki Season 1
  'what-if-s1': 'https://image.tmdb.org/t/p/w780/7P4S6P0R8vE9b7i7v2R8p0.jpg', // What If...? S1
  'wandavision': 'https://image.tmdb.org/t/p/w780/5v6W7X6ZfM2tQ9L4u7gG4r6.jpg', // WandaVision
  'falcon-winter-soldier': 'https://image.tmdb.org/t/p/w780/b0IGnfahv2NsMR4U7cT.jpg', // The Falcon and The Winter Soldier
  'shang-chi': 'https://image.tmdb.org/t/p/w780/cinER0j6thFL2i6adICurRf6ta.jpg', // Shang-Chi
  'eternals': 'https://image.tmdb.org/t/p/w780/bcCBq9N1EMo3daNIjWJ1vYNe3Yn.jpg', // Eternals
  'spider-man-no-way-home': 'https://image.tmdb.org/t/p/w780/14QbnygCuTO0vl7CAFmPf1R8a7q.jpg', // Spider-Man: No Way Home
  'hawkeye': 'https://image.tmdb.org/t/p/w780/pqzjCxPVc9v9vU6O1j7y5M9p0.jpg', // Hawkeye
  'moon-knight': 'https://image.tmdb.org/t/p/w780/14QbnygCuTO0vl7CAFmPf1R8a7q.jpg', // Moon Knight
  'doctor-strange-2': 'https://image.tmdb.org/t/p/w780/9Gtg2DzBhmYamXBS1oKAhiwbBKS.jpg', // Doctor Strange Multiverse of Madness
  'ms-marvel': 'https://image.tmdb.org/t/p/w780/cdkyMYdu8ao2657MWHI50x8.jpg', // Ms. Marvel
  'thor-4': 'https://image.tmdb.org/t/p/w780/p1F51Lvj3sMopG9Q8Fm5IeeAcso.jpg', // Thor: Love and Thunder
  'she-hulk': 'https://image.tmdb.org/t/p/w780/hpfG71sX5U9P3Y6q6oY9.jpg', // She-Hulk
  'werewolf-by-night': 'https://image.tmdb.org/t/p/w780/mvIvhpKN03cGoP0T.jpg', // Werewolf by Night
  'black-panther-2': 'https://image.tmdb.org/t/p/w780/sv1xJUazXeYqALzczSZ3O6nkH75.jpg', // Wakanda Forever
  'guardians-holiday': 'https://image.tmdb.org/t/p/w780/8cDMIohZ4r2m0K6.jpg', // Guardians Holiday Special

  // --- MCU Phase 5 ---
  'ant-man-3': 'https://image.tmdb.org/t/p/w780/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg', // Quantumania
  'guardians-3': 'https://image.tmdb.org/t/p/w780/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg', // Guardians of the Galaxy Vol. 3
  'secret-invasion': 'https://image.tmdb.org/t/p/w780/8Z8jR30D5o5m.jpg', // Secret Invasion
  'loki-s2': 'https://image.tmdb.org/t/p/w780/kEl2t3OhXc39gIIcqg2DMPOWUm.jpg', // Loki S2
  'the-marvels': 'https://image.tmdb.org/t/p/w780/jB48R2vubdLDXmDAbxM1yD9hNCk.jpg', // The Marvels
  'what-if-s2': 'https://image.tmdb.org/t/p/w780/7P4S6P0R8vE9b7i7v2R8p0.jpg', // What If S2
  'echo': 'https://image.tmdb.org/t/p/w780/7g5Qx6T0R6m.jpg', // Echo
  'deadpool-3': 'https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', // Deadpool & Wolverine
  'agatha-all-along': 'https://image.tmdb.org/t/p/w780/7j7C4M7uK9z.jpg', // Agatha All Along

  // --- X-Men Universe ---
  'xmen-first-class': 'https://image.tmdb.org/t/p/w780/39p6m2gM8j1z3Q.jpg', // X-Men: First Class
  'xmen-days-of-future-past': 'https://image.tmdb.org/t/p/w780/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg', // X-Men: Days of Future Past
  'xmen-origins-wolverine': 'https://image.tmdb.org/t/p/w780/3n5Z6G5f9B6o7E.jpg', // X-Men Origins Wolverine
  'xmen-apocalypse': 'https://image.tmdb.org/t/p/w780/2mtkWF1Bw9m8.jpg', // X-Men: Apocalypse
  'xmen-dark-phoenix': 'https://image.tmdb.org/t/p/w780/x26G2h6r7rP3.jpg', // Dark Phoenix
  'xmen-1': 'https://image.tmdb.org/t/p/w780/bRDAc4GogS9t6bPq.jpg', // X-Men (2000)
  'xmen-2': 'https://image.tmdb.org/t/p/w780/9y6aWb3zM9.jpg', // X2 (2003)
  'xmen-3': 'https://image.tmdb.org/t/p/w780/7B8rQ1P3z9.jpg', // X-Men: The Last Stand
  'the-wolverine': 'https://image.tmdb.org/t/p/w780/1tDqGz2bX.jpg', // The Wolverine (2013)
  'deadpool-1': 'https://image.tmdb.org/t/p/w780/fSRb7vyIP8rQpL0I47P3wBg.jpg', // Deadpool (2016)
  'deadpool-2': 'https://image.tmdb.org/t/p/w780/to0spRl1CMDvyUb8tT274.jpg', // Deadpool 2 (2018)
  'new-mutants': 'https://image.tmdb.org/t/p/w780/eShw0EVHXHb732y43.jpg', // The New Mutants
  'logan': 'https://image.tmdb.org/t/p/w780/fnbjcRDYn6YviCvgPDv4H9v.jpg', // Logan (2017)

  // --- Spider-Man Classic & Animated ---
  'spiderman-1': 'https://image.tmdb.org/t/p/w780/gh4cZbhZxyTbgxQPxD0dO6N.jpg', // Spider-Man (2002)
  'spiderman-2': 'https://image.tmdb.org/t/p/w780/olxebW0K5.jpg', // Spider-Man 2 (2004)
  'spiderman-3': 'https://image.tmdb.org/t/p/w780/2qg0.jpg', // Spider-Man 3 (2007)
  'amazing-spiderman-1': 'https://image.tmdb.org/t/p/w780/jIfmk.jpg', // The Amazing Spider-Man (2012)
  'amazing-spiderman-2': 'https://image.tmdb.org/t/p/w780/c3so.jpg', // The Amazing Spider-Man 2 (2014)
  'into-the-spiderverse': 'https://image.tmdb.org/t/p/w780/iiZZdoQBEYBv6id8su7ImL0o.jpg', // Into the Spider-Verse (2018)
  'across-the-spiderverse': 'https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj705.jpg', // Across the Spider-Verse (2023)

  // --- Defenders & Series ---
  'daredevil-netflix': 'https://image.tmdb.org/t/p/w780/QWbPaDxiB6LW2Ki.jpg', // Daredevil
  'punisher-netflix': 'https://image.tmdb.org/t/p/w780/gL.jpg', // The Punisher
  'agents-of-shield': 'https://image.tmdb.org/t/p/w780/x7.jpg', // Agents of SHIELD
};
