export interface HeroTheme {
  heroName: string;
  heroIcon: string;
  gradientBg: string;
  accentText: string;
  borderColor: string;
  badgeBg: string;
}

export function getHeroTheme(title: string, characters: string[] = [], universe: string = ''): HeroTheme {
  const t = (title + ' ' + characters.join(' ') + ' ' + universe).toLowerCase();

  if (t.includes('iron man') || t.includes('tony stark')) {
    return {
      heroName: 'Iron Man',
      heroIcon: '🦾',
      gradientBg: 'from-red-950 via-red-900/60 to-amber-950/80',
      accentText: 'text-amber-400',
      borderColor: 'border-amber-500/50',
      badgeBg: 'bg-gradient-to-r from-red-600 to-amber-500 text-black',
    };
  }

  if (t.includes('spider-man') || t.includes('spiderverse') || t.includes('peter parker') || t.includes('miles morales')) {
    return {
      heroName: 'Spider-Man',
      heroIcon: '🕷️',
      gradientBg: 'from-red-950 via-slate-950 to-blue-950/80',
      accentText: 'text-blue-400',
      borderColor: 'border-red-500/50',
      badgeBg: 'bg-gradient-to-r from-red-600 to-blue-600 text-white',
    };
  }

  if (t.includes('captain america') || t.includes('steve rogers') || t.includes('peggy carter') || t.includes('soldat de l’hiver') || t.includes('winter soldier')) {
    return {
      heroName: 'Captain America',
      heroIcon: '🛡️',
      gradientBg: 'from-blue-950 via-slate-900 to-red-950/80',
      accentText: 'text-red-400',
      borderColor: 'border-blue-500/50',
      badgeBg: 'bg-gradient-to-r from-blue-600 to-red-600 text-white',
    };
  }

  if (t.includes('thor') || t.includes('loki') || t.includes('asgard') || t.includes('odin')) {
    return {
      heroName: 'Thor & Asgard',
      heroIcon: '⚡',
      gradientBg: 'from-sky-950 via-slate-900 to-indigo-950/80',
      accentText: 'text-sky-300',
      borderColor: 'border-sky-500/50',
      badgeBg: 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white',
    };
  }

  if (t.includes('hulk') || t.includes('bruce banner') || t.includes('gamma')) {
    return {
      heroName: 'Hulk',
      heroIcon: '🧪',
      gradientBg: 'from-emerald-950 via-zinc-950 to-green-950/80',
      accentText: 'text-emerald-400',
      borderColor: 'border-emerald-500/50',
      badgeBg: 'bg-gradient-to-r from-emerald-600 to-green-800 text-white',
    };
  }

  if (t.includes('deadpool & wolverine') || (t.includes('deadpool') && t.includes('wolverine'))) {
    return {
      heroName: 'Deadpool & Wolverine',
      heroIcon: '⚔️',
      gradientBg: 'from-red-950 via-zinc-950 to-amber-950/80',
      accentText: 'text-amber-400',
      borderColor: 'border-amber-500/50',
      badgeBg: 'bg-gradient-to-r from-red-600 to-amber-500 text-black',
    };
  }

  if (t.includes('deadpool')) {
    return {
      heroName: 'Deadpool',
      heroIcon: '💀',
      gradientBg: 'from-red-950 via-zinc-950 to-black',
      accentText: 'text-red-400',
      borderColor: 'border-red-500/50',
      badgeBg: 'bg-red-600 text-white',
    };
  }

  if (t.includes('wolverine') || t.includes('logan') || t.includes('arme x') || t.includes('weapon x')) {
    return {
      heroName: 'Wolverine / Logan',
      heroIcon: '🐺',
      gradientBg: 'from-amber-950 via-zinc-950 to-stone-900',
      accentText: 'text-amber-400',
      borderColor: 'border-amber-500/50',
      badgeBg: 'bg-amber-500 text-black',
    };
  }

  if (t.includes('x-men') || t.includes('mutant') || t.includes('xavier') || t.includes('magneto') || t.includes('phoenix') || t.includes('cyclope')) {
    return {
      heroName: 'X-Men',
      heroIcon: '❌',
      gradientBg: 'from-blue-950 via-zinc-900 to-amber-950/80',
      accentText: 'text-blue-400',
      borderColor: 'border-blue-500/50',
      badgeBg: 'bg-gradient-to-r from-blue-600 to-amber-500 text-white',
    };
  }

  if (t.includes('gardiens') || t.includes('guardians') || t.includes('groot') || t.includes('star-lord') || t.includes('gamora') || t.includes('rocket')) {
    return {
      heroName: 'Les Gardiens',
      heroIcon: '🌌',
      gradientBg: 'from-purple-950 via-indigo-950 to-pink-950/80',
      accentText: 'text-purple-300',
      borderColor: 'border-purple-500/50',
      badgeBg: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
    };
  }

  if (t.includes('black panther') || t.includes('wakanda') || t.includes('t’challa') || t.includes('shuri')) {
    return {
      heroName: 'Black Panther',
      heroIcon: '🐾',
      gradientBg: 'from-purple-950 via-zinc-950 to-indigo-950/80',
      accentText: 'text-purple-400',
      borderColor: 'border-purple-500/50',
      badgeBg: 'bg-gradient-to-r from-purple-700 to-indigo-900 text-white',
    };
  }

  if (t.includes('doctor strange') || t.includes('wanda') || t.includes('scarlet witch') || t.includes('agatha') || t.includes('multiverse')) {
    return {
      heroName: 'Arts Mystiques',
      heroIcon: '🪄',
      gradientBg: 'from-amber-950 via-purple-950 to-red-950/80',
      accentText: 'text-amber-400',
      borderColor: 'border-amber-500/50',
      badgeBg: 'bg-gradient-to-r from-amber-500 to-purple-600 text-black',
    };
  }

  if (t.includes('ant-man') || t.includes('wasp') || t.includes('quantumania') || t.includes('scott lang')) {
    return {
      heroName: 'Ant-Man',
      heroIcon: '🐜',
      gradientBg: 'from-red-950 via-zinc-950 to-slate-900/80',
      accentText: 'text-red-400',
      borderColor: 'border-red-500/50',
      badgeBg: 'bg-gradient-to-r from-red-600 to-zinc-700 text-white',
    };
  }

  if (t.includes('black widow') || t.includes('hawkeye') || t.includes('falcon') || t.includes('shiel')) {
    return {
      heroName: 'Agents Avengers',
      heroIcon: '🎯',
      gradientBg: 'from-zinc-950 via-red-950 to-slate-900/80',
      accentText: 'text-red-400',
      borderColor: 'border-zinc-500/50',
      badgeBg: 'bg-gradient-to-r from-red-700 to-zinc-800 text-white',
    };
  }

  if (t.includes('fantastique') || t.includes('fantastic') || t.includes('reed richards') || t.includes('surfer')) {
    return {
      heroName: 'Les 4 Fantastiques',
      heroIcon: '4️⃣',
      gradientBg: 'from-blue-950 via-sky-950 to-indigo-950/80',
      accentText: 'text-sky-300',
      borderColor: 'border-blue-500/50',
      badgeBg: 'bg-gradient-to-r from-blue-600 to-sky-400 text-white',
    };
  }

  if (t.includes('venom') || t.includes('morbius') || t.includes('madame web') || t.includes('kraven')) {
    return {
      heroName: 'Sony Spider-Verse',
      heroIcon: '🖤',
      gradientBg: 'from-zinc-950 via-purple-950 to-red-950/80',
      accentText: 'text-purple-400',
      borderColor: 'border-purple-500/50',
      badgeBg: 'bg-gradient-to-r from-zinc-800 to-purple-900 text-white',
    };
  }

  if (t.includes('blade') || t.includes('ghost rider') || t.includes('daredevil') || t.includes('punisher') || t.includes('elektra')) {
    return {
      heroName: 'Marvel Knights',
      heroIcon: '🔥',
      gradientBg: 'from-orange-950 via-red-950 to-zinc-950/80',
      accentText: 'text-orange-400',
      borderColor: 'border-orange-500/50',
      badgeBg: 'bg-gradient-to-r from-orange-600 to-red-700 text-white',
    };
  }

  return {
    heroName: 'Marvel Universe',
    heroIcon: '⚡',
    gradientBg: 'from-[#050505] via-[#111] to-[#E62429]/30',
    accentText: 'text-[#E62429]',
    borderColor: 'border-[#E62429]/40',
    badgeBg: 'bg-[#E62429] text-white',
  };
}
