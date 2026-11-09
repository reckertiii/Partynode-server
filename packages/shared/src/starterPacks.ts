import type { ContentPack, PackSummary } from './types.js';

export const BUILT_IN_PACKS: ContentPack[] = [
  // ==========================================================================
  // Punchline Clash Packs
  // ==========================================================================
  {
    id: 'builtin-punchline-classic',
    game: 'punchline_clash',
    title: 'Late Night Laughs (Starter)',
    description: 'Crowd-pleasing comedy prompts perfect for any voice channel party.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-01-01T00:00:00.000Z',
    prompts: [
      'The worst thing to hear your pilot announce right before takeoff.',
      'A terrible slogan for a brand-new dentist office.',
      'What dogs are actually saying when they bark at the mail carrier.',
      'The real reason aliens keep flying past Earth without stopping.',
      'A suspiciously cheap superhero whose only power is _______.',
      'The worst possible item to bring to a desert island.',
      'What your microwave thinks about you at 2:00 AM.',
      'A rejected flavor of ice cream that never made it to stores.',
      'The fastest way to get kicked out of a fancy restaurant.',
      'An awful thing to write inside a romantic anniversary card.',
      'What medieval knights probably complained about in their group chat.',
      'A warning label that should come taped to every adult human.',
      'The least intimidating pirate ship name on the seven seas.',
      'A terrible excuse for showing up three hours late to your own wedding.',
      'If cats could leave Yelp reviews of their owners, the 1-star review would say: _______.',
      'The strangest thing to find hidden at the bottom of a ball pit.'
    ],
    finalPrompts: [
      'Write a three-word motto that describes this entire Discord server.',
      'Invent the title of a reality TV show starring everyone in this voice call.',
      'If our friend group opened a restaurant together, why would the health inspector shut it down on Day 1?'
    ]
  },
  {
    id: 'builtin-punchline-gamer',
    game: 'punchline_clash',
    title: 'Voice Chat Chaos',
    description: 'Gaming, internet culture, and late-night Discord energy.',
    author: 'PartyNode Official',
    familyFriendly: false,
    builtIn: true,
    updatedAt: '2026-01-01T00:00:00.000Z',
    prompts: [
      'The real reason someone in voice chat has been muted for 45 minutes.',
      'A patch note you never want to read for real life.',
      'The worst possible boss drop after a 4-hour raid.',
      'What "I will be on in 5 minutes" actually translates to.',
      'A streamer apology video title that immediately makes things worse.',
      'The most useless skill tree upgrade in an RPG about office jobs.',
      'Why the server admin suddenly created a new locked channel at 3 AM.',
      'The worst possible notification to accidentally screen-share.',
      'An esport nobody asked for: Competitive _______.',
      'What NPCs whisper about the main character after they walk out of the shop.',
      'A cursed keybind setup only a true maniac would use.',
      'The real reason our squad always loses the very first match of the night.'
    ],
    finalPrompts: [
      'Write the brutally honest server description that should appear on our invite splash screen.',
      'What achievement badge would everyone in this call unlock tonight?'
    ]
  },

  // ==========================================================================
  // Bluff Battle (Fibbage-Style) Packs
  // ==========================================================================
  {
    id: 'builtin-bluff-weird-world',
    game: 'bluff_battle',
    title: 'Stranger Than Fiction',
    description: 'Write believable lies to hide bizarre, 100% real facts from around the world.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-01-01T00:00:00.000Z',
    questions: [
      {
        id: 'bb-1',
        category: 'Weird Laws',
        prompt: 'In Switzerland, animal welfare laws make it illegal to own just one _______.',
        truth: 'Guinea pig',
        decoys: ['Goldfish', 'Ferret', 'Miniature goat', 'Parakeet']
      },
      {
        id: 'bb-2',
        category: 'History',
        prompt: 'In 2014, the small town of Cormorant, Minnesota re-elected _______ as its honorary mayor.',
        truth: 'A Great Pyrenees dog named Duke',
        decoys: ['A 9-year-old twins duo', 'A retired mail truck', 'An orange barn cat named Barnaby']
      },
      {
        id: 'bb-3',
        category: 'Space Mishaps',
        prompt: 'In 1962, NASA had to blow up the Mariner 1 space probe 293 seconds after launch because a programmer missed a single _______.',
        truth: 'Hyphen',
        decoys: ['Semicolon', 'Zero', 'Closing bracket', 'Decimal point']
      },
      {
        id: 'bb-4',
        category: 'Food Lore',
        prompt: 'Before it was marketed as a breakfast condiment, 1830s ketchup was sold in pharmacies as a cure for _______.',
        truth: 'Indigestion and diarrhea',
        decoys: ['Male pattern baldness', 'Toothaches', 'Seasickness', 'Insomnia']
      },
      {
        id: 'bb-5',
        category: 'Sports',
        prompt: 'At the 1900 Paris Olympics, the live target shooting event controversially replaced clay disks with live _______ before switching back forever.',
        truth: 'Pigeons',
        decoys: ['Watermelons', 'Floating champagne bottles', 'Stuffed scarecrows']
      },
      {
        id: 'bb-6',
        category: 'Nature',
        prompt: 'Scientists discovered that wombats are the only known animal in the world that produces _______-shaped poop.',
        truth: 'Cube',
        decoys: ['Pyramid', 'Spiral', 'Star', 'Hexagon']
      }
    ]
  },
  {
    id: 'builtin-bluff-gaming-tech',
    game: 'bluff_battle',
    title: 'Cursed Tech & Gaming Lore',
    description: 'Unbelievable behind-the-scenes stories from video games and internet history.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-01-01T00:00:00.000Z',
    questions: [
      {
        id: 'bbg-1',
        category: 'Game Dev Hacks',
        prompt: 'In Fallout 3’s Broken Steel DLC, the moving subway train was actually coded as a giant _______ attached to an invisible NPC running underneath the floor.',
        truth: 'Train-shaped helmet',
        decoys: ['Reskinned deathclaw', 'Spinning wooden door', 'Floating equippable shield']
      },
      {
        id: 'bbg-2',
        category: 'Internet History',
        prompt: 'The very first webcam ever invented at Cambridge University in 1991 was pointed exclusively at a _______ so researchers wouldn’t walk down the hall for nothing.',
        truth: 'Coffee pot',
        decoys: ['Vending machine', 'Shared laser printer', 'Parking lot gate']
      },
      {
        id: 'bbg-3',
        category: 'Arcade Classics',
        prompt: 'Toru Iwatani conceived the iconic shape of Pac-Man while staring at a _______ with one piece missing.',
        truth: 'Pizza',
        decoys: ['Wheel of cheddar cheese', 'Lemon pie', 'Broken vinyl record']
      },
      {
        id: 'bbg-4',
        category: 'Console Quirks',
        prompt: 'To stop kids from accidentally swallowing Nintendo Switch game cartridges, Nintendo coats every cartridge in denatonium benzoate, which tastes intensely like _______.',
        truth: 'Bitter earwax / nail-biting spray',
        decoys: ['Burnt licorice', 'Raw baking soda', 'Sour grapefruit peel']
      },
      {
        id: 'bbg-5',
        category: 'Esports Weirdness',
        prompt: 'At an early 2010 StarCraft tournament, one prize offered to 5th–8th place finishers became infamous because it was literally 25 _______ instead of cash.',
        truth: 'Bitcoins',
        decoys: ['Coupons for Subway', 'Mousepads', 'Cases of energy drinks']
      }
    ]
  },

  // ==========================================================================
  // Survey Showdown Packs
  // ==========================================================================
  {
    id: 'builtin-survey-classic',
    game: 'survey_showdown',
    title: 'Everyday Classics Survey',
    description: '100-person survey showdowns packed with smart synonym matching.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-01-01T00:00:00.000Z',
    questions: [
      {
        id: 'sv-morning-1',
        prompt: 'Name something people do within 10 minutes of waking up.',
        answers: [
          { text: 'Check Their Phone', points: 36, aliases: ['phone', 'scroll phone', 'check messages', 'look at phone', 'alarm'] },
          { text: 'Use The Bathroom', points: 24, aliases: ['pee', 'toilet', 'restroom', 'washroom', 'bathroom'] },
          { text: 'Brush Their Teeth', points: 16, aliases: ['brush teeth', 'teeth', 'mouthwash'] },
          { text: 'Make Coffee', points: 12, aliases: ['drink coffee', 'coffee', 'caffeine', 'tea'] },
          { text: 'Hit Snooze / Go Back To Sleep', points: 8, aliases: ['snooze', 'sleep', 'back to bed', 'snooze button'] },
          { text: 'Stretch / Yawn', points: 4, aliases: ['stretch', 'yawn', 'groan'] }
        ]
      },
      {
        id: 'sv-fridge-2',
        prompt: 'Name something you almost always find inside a refrigerator.',
        answers: [
          { text: 'Milk', points: 34, aliases: ['dairy', 'oat milk', 'almond milk', 'carton of milk'] },
          { text: 'Eggs', points: 25, aliases: ['egg', 'dozen eggs'] },
          { text: 'Butter', points: 15, aliases: ['margarine', 'stick of butter'] },
          { text: 'Cheese', points: 12, aliases: ['cheddar', 'shredded cheese', 'sliced cheese'] },
          { text: 'Ketchup / Condiments', points: 9, aliases: ['ketchup', 'mustard', 'mayo', 'ranch', 'hot sauce', 'condiments', 'sauces'] },
          { text: 'Leftovers', points: 5, aliases: ['old food', 'takeout', 'tupperware'] }
        ]
      },
      {
        id: 'sv-late-3',
        prompt: 'Name a common excuse people give for being late to work or school.',
        answers: [
          { text: 'Traffic / Car Trouble', points: 39, aliases: ['traffic', 'car broke down', 'flat tire', 'car', 'accident', 'stuck in traffic'] },
          { text: 'Overslept / Alarm Failed', points: 28, aliases: ['overslept', 'alarm', 'alarm didnt go off', 'slept in', 'woke up late'] },
          { text: 'Feeling Sick', points: 13, aliases: ['sick', 'stomach ache', 'headache', 'not feeling well', 'doctor'] },
          { text: 'Bad Weather', points: 10, aliases: ['weather', 'snow', 'rain', 'storm', 'icy roads'] },
          { text: 'Missed The Bus / Train', points: 6, aliases: ['bus', 'train', 'subway', 'public transit'] },
          { text: 'Pet Or Kid Emergency', points: 4, aliases: ['kids', 'dog', 'cat', 'pet', 'child', 'babysitter'] }
        ]
      },
      {
        id: 'sv-movie-4',
        prompt: 'Name something that annoys everyone in a movie theater.',
        answers: [
          { text: 'Talking Loudly', points: 35, aliases: ['talking', 'whispering', 'chatting', 'spoiling'] },
          { text: 'Bright Phone Screen', points: 27, aliases: ['phone', 'texting', 'ringing phone', 'cell phone', 'checking phone'] },
          { text: 'Kicking Your Seat', points: 16, aliases: ['kicking seat', 'kicking chair', 'feet on seat'] },
          { text: 'Loud Chewing / Wrapper Noise', points: 12, aliases: ['chewing', 'popcorn', 'candy wrapper', 'crunching', 'loud eating'] },
          { text: 'Crying Baby', points: 6, aliases: ['baby', 'crying kid', 'screaming child'] },
          { text: 'Tall Person Blocking View', points: 4, aliases: ['tall person', 'big hat', 'blocking screen'] }
        ]
      },
      {
        id: 'sv-lose-5',
        prompt: 'Name an everyday item people lose all the time.',
        answers: [
          { text: 'Keys', points: 35, aliases: ['car keys', 'house keys'] },
          { text: 'TV Remote', points: 22, aliases: ['remote', 'remote control', 'controller'] },
          { text: 'Phone', points: 18, aliases: ['cell phone', 'iphone', 'smartphone'] },
          { text: 'Wallet / Purse', points: 11, aliases: ['wallet', 'credit card', 'id'] },
          { text: 'Glasses / Sunglasses', points: 8, aliases: ['glasses', 'sunglasses', 'reading glasses'] },
          { text: 'One Sock / Earbud', points: 6, aliases: ['sock', 'socks', 'airpods', 'earbuds', 'headphones'] }
        ]
      }
    ]
  },
  {
    id: 'builtin-survey-discord',
    game: 'survey_showdown',
    title: 'Gamer & Online Life Survey',
    description: 'Surveys about gaming habits, voice calls, and PC setups.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-01-01T00:00:00.000Z',
    questions: [
      {
        id: 'svd-rage-1',
        prompt: 'Name something a gamer blames when they lose a match.',
        answers: [
          { text: 'Lag / Bad Ping', points: 38, aliases: ['lag', 'ping', 'internet', 'wifi', 'packet loss', 'latency'] },
          { text: 'Bad Teammates', points: 26, aliases: ['teammates', 'randoms', 'my team', 'healer'] },
          { text: 'Cheaters / Hackers', points: 15, aliases: ['hacker', 'cheater', 'aimbot', 'wallhack', 'smurf'] },
          { text: 'Broken Controller / Mouse', points: 11, aliases: ['controller', 'stick drift', 'mouse', 'keyboard', 'missed input'] },
          { text: 'Bad Game Balance / Hitboxes', points: 10, aliases: ['hitbox', 'bug', 'glitch', 'unbalanced', 'nerf', 'devs'] }
        ]
      },
      {
        id: 'svd-desk-2',
        prompt: 'Name something currently sitting on an average PC gamer’s desk.',
        answers: [
          { text: 'Empty Mugs / Drink Cans', points: 32, aliases: ['mug', 'coffee cup', 'water bottle', 'energy drink', 'soda can', 'cups', 'drinks'] },
          { text: 'Headset / Microphone', points: 24, aliases: ['headset', 'headphones', 'mic', 'microphone'] },
          { text: 'Keyboard & Mousepad', points: 18, aliases: ['keyboard', 'mouse', 'mousepad'] },
          { text: 'Phone / Charger Cable', points: 14, aliases: ['phone', 'charger', 'cable', 'wires'] },
          { text: 'Snacks / Wrappers', points: 7, aliases: ['snacks', 'chips', 'food', 'crumbs'] },
          { text: 'Collectible Figure / Toy', points: 5, aliases: ['figurine', 'funko pop', 'anime figure', 'plushie', 'duck'] }
        ]
      },
      {
        id: 'svd-bgnoise-3',
        prompt: 'Name a background noise you always hear through someone’s open mic.',
        answers: [
          { text: 'Mechanical Keyboard Clicking', points: 33, aliases: ['keyboard', 'typing', 'blue switches', 'clicking'] },
          { text: 'Desk Fan / Jet Engine PC', points: 22, aliases: ['fan', 'breathing', 'wind', 'ac', 'loud pc'] },
          { text: 'Dog Barking', points: 17, aliases: ['dog', 'barking', 'pet'] },
          { text: 'Family Member / Mom Yelling', points: 14, aliases: ['mom', 'parents', 'roommate', 'kids', 'vacuum'] },
          { text: 'Crunch Of Eating Chips', points: 9, aliases: ['eating', 'chewing', 'chips', 'crunching'] },
          { text: 'Smoke Detector Low-Battery Chirp', points: 5, aliases: ['smoke detector', 'fire alarm', 'beep', 'chirp'] }
        ]
      }
    ]
  },

  // ==========================================================================
  // BlitzQuiz Packs
  // ==========================================================================
  {
    id: 'builtin-blitz-trivia',
    game: 'blitz_quiz',
    title: 'Turbo Party Trivia Mix',
    description: 'Fast-paced pop culture, science, geography, and weird facts.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-01-01T00:00:00.000Z',
    questions: [
      {
        id: 'bq-1',
        category: 'Science',
        prompt: 'Which planet in our solar system spins clockwise on its axis (retrograde rotation)?',
        options: ['Mars', 'Venus', 'Jupiter', 'Neptune'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bq-2',
        category: 'Animals',
        prompt: 'How many hearts does an octopus have?',
        options: ['1', '2', '3', '8'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bq-3',
        category: 'Food & Drink',
        prompt: 'Which food never spoils and has been found edible inside 3,000-year-old Egyptian tombs?',
        options: ['Honey', 'Olive Oil', 'Sea Salt', 'Maple Syrup'],
        correctIndex: 0,
        timeLimitSec: 15
      },
      {
        id: 'bq-4',
        category: 'Geography',
        prompt: 'Which country has the most natural lakes in the world?',
        options: ['Finland', 'United States', 'Russia', 'Canada'],
        correctIndex: 3,
        timeLimitSec: 15
      },
      {
        id: 'bq-5',
        category: 'Gaming',
        prompt: 'In Pac-Man, what are the names of the four original ghosts?',
        options: [
          'Blinky, Pinky, Inky, & Clyde',
          'Blinky, Speedy, Bashful, & Sue',
          'Winky, Pinky, Dinky, & Bob',
          'Shadow, Sparky, Chaser, & Clyde'
        ],
        correctIndex: 0,
        timeLimitSec: 20
      },
      {
        id: 'bq-6',
        category: 'Weird Facts',
        prompt: 'What is the national animal of Scotland?',
        options: ['Highland Cow', 'Golden Eagle', 'Unicorn', 'Loch Ness Monster'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bq-7',
        category: 'Tech History',
        prompt: 'What was the very first item ever sold on eBay in 1995?',
        options: ['A Beanie Baby', 'A broken laser pointer', 'A Star Wars VHS tape', 'A used toaster'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bq-8',
        category: 'Human Body',
        prompt: 'Roughly what percentage of human DNA is shared with a banana?',
        options: ['About 5%', 'About 25%', 'About 50–60%', 'About 92%'],
        correctIndex: 2,
        timeLimitSec: 15
      }
    ]
  },
  {
    id: 'builtin-blitz-gaming',
    game: 'blitz_quiz',
    title: 'Arcade & Gaming Legends',
    description: 'Video game lore, iconic releases, and speedrun-worthy trivia.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-01-01T00:00:00.000Z',
    questions: [
      {
        id: 'bqg-1',
        category: 'Minecraft',
        prompt: 'Which mob in Minecraft was originally created because of a coding mistake when modeling a pig?',
        options: ['Enderman', 'Creeper', 'Ghast', 'Slime'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bqg-2',
        category: 'Hardware',
        prompt: 'What remains the best-selling home video game console of all time?',
        options: ['Nintendo Switch', 'Wii', 'PlayStation 2', 'PlayStation 4'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bqg-3',
        category: 'Nintendo',
        prompt: 'Before becoming a plumber, what was Mario’s original profession in 1981’s Donkey Kong?',
        options: ['Carpenter', 'Chef', 'Electrician', 'Firefighter'],
        correctIndex: 0,
        timeLimitSec: 15
      },
      {
        id: 'bqg-4',
        category: 'PC Classics',
        prompt: 'In Portal, what dessert are test subjects repeatedly promised?',
        options: ['Blueberry Pie', 'Chocolate Pudding', 'Cake', 'Waffles'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bqg-5',
        category: 'Indie Hits',
        prompt: 'Which solo developer created Stardew Valley (code, art, music, and writing)?',
        options: ['Toby Fox', 'Eric "ConcernedApe" Barone', 'Lucas Pope', 'LocalThunk'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bqg-6',
        category: 'Retro',
        prompt: 'What is the famous Konami Code input sequence?',
        options: [
          '↑ ↑ ↓ ↓ ← → ← → B A',
          '↑ ↓ ↑ ↓ ← → A B',
          '← → ← → ↑ ↑ ↓ ↓ B A',
          'A B A C A B B'
        ],
        correctIndex: 0,
        timeLimitSec: 15
      }
    ]
  }
];

export function summarizePack(pack: ContentPack): PackSummary {
  let itemCount = 0;
  if (pack.game === 'punchline_clash') {
    itemCount = pack.prompts.length + pack.finalPrompts.length;
  } else {
    itemCount = pack.questions.length;
  }
  return {
    id: pack.id,
    game: pack.game,
    title: pack.title,
    description: pack.description,
    author: pack.author,
    familyFriendly: pack.familyFriendly,
    builtIn: pack.builtIn,
    updatedAt: pack.updatedAt,
    itemCount
  };
}
