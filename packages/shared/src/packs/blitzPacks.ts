import type { BlitzPack } from '../types.js';

export const BLITZ_PACKS: BlitzPack[] = [
  {
    id: 'builtin-blitz-trivia',
    game: 'blitz_quiz',
    title: 'Turbo Party Trivia Mix',
    description: '28 fast-paced questions spanning animals, geography, food, weird history, and world records.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-11-09T00:00:00.000Z',
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
        category: 'Weird Facts',
        prompt: 'What is the official national animal of Scotland?',
        options: ['Highland Cow', 'Golden Eagle', 'Unicorn', 'Loch Ness Monster'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bq-6',
        category: 'Tech History',
        prompt: 'What was the very first item ever sold on eBay in 1995?',
        options: ['A Beanie Baby', 'A broken laser pointer', 'A Star Wars VHS tape', 'A used toaster'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bq-7',
        category: 'Genetics',
        prompt: 'Roughly what percentage of human DNA is shared with a banana?',
        options: ['About 5%', 'About 20%', 'About 50–60%', 'About 92%'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bq-8',
        category: 'Geography',
        prompt: 'Which continent lies in all four hemispheres (Northern, Southern, Eastern, and Western)?',
        options: ['Africa', 'Asia', 'South America', 'Australia'],
        correctIndex: 0,
        timeLimitSec: 15
      },
      {
        id: 'bq-9',
        category: 'Animals',
        prompt: 'What is a group of crows famously called?',
        options: ['A Conspiracy', 'A Parliament', 'A Murder', 'A Shadow'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bq-10',
        category: 'Food & Drink',
        prompt: 'Which spice is the most expensive in the world by weight because each flower thread is harvested by hand?',
        options: ['Vanilla bean', 'Cardamom', 'Truffle salt', 'Saffron'],
        correctIndex: 3,
        timeLimitSec: 15
      },
      {
        id: 'bq-11',
        category: 'World capitals',
        prompt: 'What is the capital city of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bq-12',
        category: 'Sports',
        prompt: 'How many dimples are on a standard regulation golf ball (typically)?',
        options: ['Around 108', 'Around 336', 'Around 720', 'Around 1,024'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bq-13',
        category: 'Language',
        prompt: 'What is the little plastic or metal tube at the end of a shoelace called?',
        options: ['Aglet', 'Ferrule', 'Grommet', 'Pip'],
        correctIndex: 0,
        timeLimitSec: 15
      },
      {
        id: 'bq-14',
        category: 'Animals',
        prompt: 'Which mammal is capable of true sustained flight (not just gliding)?',
        options: ['Flying Squirrel', 'Sugar Glider', 'Colugo', 'Bat'],
        correctIndex: 3,
        timeLimitSec: 12
      },
      {
        id: 'bq-15',
        category: 'Geography',
        prompt: 'Which country spans the largest number of time zones (including overseas territories)?',
        options: ['Russia', 'France', 'United States', 'China'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bq-16',
        category: 'Anatomy',
        prompt: 'Where is the smallest bone in the human body (the stapes) located?',
        options: ['Little toe', 'Middle ear', 'Tip of the nose', 'Pinky finger'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bq-17',
        category: 'Food Lore',
        prompt: 'Hawaiian pizza (ham and pineapple) was actually invented in 1962 in which country?',
        options: ['United States', 'Italy', 'Canada', 'Australia'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bq-18',
        category: 'Olympics',
        prompt: 'What colors are the five interlocking Olympic rings?',
        options: [
          'Blue, Yellow, Black, Green, Red',
          'Blue, Orange, Purple, Green, Red',
          'Gold, Silver, Bronze, Blue, Red',
          'Blue, White, Black, Green, Yellow'
        ],
        correctIndex: 0,
        timeLimitSec: 18
      },
      {
        id: 'bq-19',
        category: 'Animals',
        prompt: 'What color is a polar bear’s skin underneath its translucent white-looking fur?',
        options: ['Pink', 'White', 'Silver-gray', 'Black'],
        correctIndex: 3,
        timeLimitSec: 15
      },
      {
        id: 'bq-20',
        category: 'Geography',
        prompt: 'Which ocean is the deepest on Earth, home to the Challenger Deep?',
        options: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Southern Ocean'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bq-21',
        category: 'Board Games',
        prompt: 'In standard Monopoly, how much cash do you collect when you pass GO?',
        options: ['$100', '$150', '$200', '$500'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bq-22',
        category: 'Art',
        prompt: 'Who painted "The Starry Night" in 1889?',
        options: ['Claude Monet', 'Pablo Picasso', 'Salvador Dalí', 'Vincent van Gogh'],
        correctIndex: 3,
        timeLimitSec: 12
      },
      {
        id: 'bq-23',
        category: 'Everyday Symbols',
        prompt: 'What is the official typographic name for the punctuation mark "‽" that combines a question mark and an exclamation point?',
        options: ['Ampersand', 'Interrobang', 'Octothorpe', 'Tilde'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bq-24',
        category: 'Food & Drink',
        prompt: 'What main ingredient is traditional hummus made from?',
        options: ['Chickpeas', 'Lentils', 'White beans', 'Eggplant'],
        correctIndex: 0,
        timeLimitSec: 12
      },
      {
        id: 'bq-25',
        category: 'Animals',
        prompt: 'Which bird is the only one known to fly backward effortlessly?',
        options: ['Kingfisher', 'Barn Swallow', 'Hummingbird', 'Swift'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bq-26',
        category: 'Geography',
        prompt: 'Which U.S. state is actually the closest geographically to the continent of Africa?',
        options: ['Florida', 'Maine', 'North Carolina', 'Georgia'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bq-27',
        category: 'Inventions',
        prompt: 'In what decade was the World Wide Web first opened to the general public by Tim Berners-Lee?',
        options: ['1970s', '1980s', '1990s', '2000s'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bq-28',
        category: 'Mythology',
        prompt: 'In Greek mythology, who flew too close to the Sun on wings made of feathers and wax?',
        options: ['Icarus', 'Perseus', 'Orpheus', 'Achilles'],
        correctIndex: 0,
        timeLimitSec: 12
      }
    ]
  },
  {
    id: 'builtin-blitz-gaming',
    game: 'blitz_quiz',
    title: 'Arcade & Gaming Legends',
    description: '28 rapid-fire questions covering Nintendo, PlayStation, PC classics, indie hits, and gaming lore.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-11-09T00:00:00.000Z',
    questions: [
      {
        id: 'bqg-1',
        category: 'Minecraft',
        prompt: 'Which mob in Minecraft was originally created due to a coding mistake when modeling a pig?',
        options: ['Enderman', 'Creeper', 'Ghast', 'Slime'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bqg-2',
        category: 'Hardware',
        prompt: 'What remains the best-selling home video game console of all time (over 160 million units)?',
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
        prompt: 'In Valve’s Portal, what dessert are test subjects repeatedly promised?',
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
      },
      {
        id: 'bqg-7',
        category: 'Arcade',
        prompt: 'In Pac-Man, what are the names of the four original ghosts?',
        options: [
          'Blinky, Speedy, Bashful, & Sue',
          'Blinky, Pinky, Inky, & Clyde',
          'Winky, Pinky, Dinky, & Bob',
          'Shadow, Sparky, Chaser, & Clyde'
        ],
        correctIndex: 1,
        timeLimitSec: 18
      },
      {
        id: 'bqg-8',
        category: 'Pokémon',
        prompt: 'Which Pokémon is #001 at the very start of the original Kanto Pokédex?',
        options: ['Pikachu', 'Mew', 'Rhydon', 'Bulbasaur'],
        correctIndex: 3,
        timeLimitSec: 12
      },
      {
        id: 'bqg-9',
        category: 'RPGs',
        prompt: 'In The Elder Scrolls V: Skyrim, what three-word Dragon Shout blasts enemies off cliffs?',
        options: ['Yol Toor Shul', 'Fus Ro Dah', 'Wuld Nah Kest', 'Od Ah Viing'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bqg-10',
        category: 'Zelda',
        prompt: 'What is the name of Link’s trusty horse introduced in Ocarina of Time?',
        options: ['Roach', 'Agro', 'Epona', 'Torrent'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bqg-11',
        category: 'Halo',
        prompt: 'What is Master Chief’s Spartan service tag number in Halo?',
        options: ['Spartan-007', 'Spartan-104', 'Spartan-117', 'Spartan-312'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bqg-12',
        category: 'FromSoftware',
        prompt: 'Who directed Dark Souls, Bloodborne, Sekiro, and Elden Ring?',
        options: ['Hideo Kojima', 'Hidetaka Miyazaki', 'Shinji Mikami', 'Yoko Taro'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bqg-13',
        category: 'Co-Op Hits',
        prompt: 'In Lethal Company, what are employees collecting from abandoned moons to meet the Company’s quota?',
        options: ['Alien eggs', 'Scrap', 'Fuel rods', 'Cryo pods'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bqg-14',
        category: 'Card Roguelikes',
        prompt: 'In Balatro, special modifier cards based on clowns that multiply your chips and mult are called what?',
        options: ['Jesters', 'Wildcards', 'Jokers', 'Tricks'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bqg-15',
        category: 'Shooters',
        prompt: 'On classic Counter-Strike map Dust II, how many bomb sites exist?',
        options: ['1 (Middle)', '2 (A and B)', '3 (A, B, and C)', '4'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bqg-16',
        category: 'Sonic',
        prompt: 'How many tails does Sonic’s sidekick Miles "Tails" Prower actually have?',
        options: ['1', '2', '3', '9'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bqg-17',
        category: 'Indie RPGs',
        prompt: 'Which 2015 indie RPG by Toby Fox features a skeleton named Sans and lets you beat the game without killing any monsters?',
        options: ['EarthBound', 'Hollow Knight', 'Undertale', 'Celeste'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bqg-18',
        category: 'The Sims',
        prompt: 'What is the fictional gibberish language spoken by characters in The Sims called?',
        options: ['Simlish', 'Simspeak', 'Plumbobian', 'Maxish'],
        correctIndex: 0,
        timeLimitSec: 12
      },
      {
        id: 'bqg-19',
        category: 'Fighting Games',
        prompt: 'Which Street Fighter warrior is famous for shouting "Hadouken!" and "Shoryuken!"?',
        options: ['Guile', 'Blanka', 'Ryu', 'Zangief'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bqg-20',
        category: 'Animal Crossing',
        prompt: 'Which tanuki businessman happily puts you in zero-interest home loan debt in Animal Crossing?',
        options: ['K.K. Slider', 'Blathers', 'Redd', 'Tom Nook'],
        correctIndex: 3,
        timeLimitSec: 12
      },
      {
        id: 'bqg-21',
        category: 'Baldur’s Gate 3',
        prompt: 'What tabletop rule system is Baldur’s Gate 3 directly based on?',
        options: ['Pathfinder 2e', 'Warhammer Fantasy', 'Dungeons & Dragons (5th Edition)', 'Call of Cthulhu'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bqg-22',
        category: 'Minecraft',
        prompt: 'How many blocks of obsidian do you need at absolute minimum (skipping corners) to light a Nether Portal?',
        options: ['8', '10', '12', '14'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bqg-23',
        category: 'PlayStation',
        prompt: 'In God of War (2018), what is the name of Kratos’s son?',
        options: ['Atreus', 'Deimos', 'Mimir', 'Brok'],
        correctIndex: 0,
        timeLimitSec: 12
      },
      {
        id: 'bqg-24',
        category: 'Tetris',
        prompt: 'What is clearing four lines at once with the long straight I-piece officially called in Tetris?',
        options: ['A Quadra', 'A Cascade', 'A Tetris', 'A Matrix'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bqg-25',
        category: 'Witcher',
        prompt: 'Regardless of which sleek stallion Geralt of Rivia rides in The Witcher, what does he name every single horse?',
        options: ['Kelpie', 'Dandelion', 'Roach', 'Ciri'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bqg-26',
        category: 'Sandbox',
        prompt: 'In Terraria, throwing the Guide Voodoo Doll into Underworld lava summons which boss to unlock Hardmode?',
        options: ['Eye of Cthulhu', 'Moon Lord', 'Skeletron', 'Wall of Flesh'],
        correctIndex: 3,
        timeLimitSec: 15
      },
      {
        id: 'bqg-27',
        category: 'Console Controllers',
        prompt: 'Going clockwise from the top button, what are the four face symbols on a standard PlayStation controller?',
        options: [
          'Triangle, Circle, Cross (X), Square',
          'Circle, Triangle, Square, Cross (X)',
          'Triangle, Square, Cross (X), Circle',
          'Square, Triangle, Circle, Cross (X)'
        ],
        correctIndex: 0,
        timeLimitSec: 18
      },
      {
        id: 'bqg-28',
        category: 'Esports',
        prompt: 'In Rocket League, how many players per team compete in standard Soccar mode?',
        options: ['2', '3', '4', '5'],
        correctIndex: 1,
        timeLimitSec: 10
      }
    ]
  },
  {
    id: 'builtin-blitz-movies-music',
    game: 'blitz_quiz',
    title: 'Movies, TV, Anime & Music',
    description: '28 blockbusters, animated favorites, chart-topping hits, and iconic quotes.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-11-09T00:00:00.000Z',
    questions: [
      {
        id: 'bqm-1',
        category: 'Sci-Fi Cinema',
        prompt: 'In The Matrix (1999), which colored pill does Neo swallow to wake up from the simulation?',
        options: ['Blue pill', 'Red pill', 'Green pill', 'Gold pill'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bqm-2',
        category: 'Animation',
        prompt: 'In Pixar’s Ratatouille, what is the name of the rat who dreams of becoming a French chef?',
        options: ['Linguini', 'Emile', 'Remy', 'Gusteau'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bqm-3',
        category: 'Music Legends',
        prompt: 'Which band released the iconic 1975 six-minute rock opera song "Bohemian Rhapsody"?',
        options: ['Led Zeppelin', 'Queen', 'Pink Floyd', 'Fleetwood Mac'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bqm-4',
        category: 'Studio Ghibli',
        prompt: 'Which Hayao Miyazaki animated film won the Academy Award for Best Animated Feature in 2003?',
        options: ['My Neighbor Totoro', 'Princess Mononoke', 'Howl’s Moving Castle', 'Spirited Away'],
        correctIndex: 3,
        timeLimitSec: 15
      },
      {
        id: 'bqm-5',
        category: 'Fantasy Epics',
        prompt: 'How many members make up the original Fellowship of the Ring when departing Rivendell?',
        options: ['7', '8', '9', '12'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bqm-6',
        category: 'TV Shows',
        prompt: 'In Breaking Bad, what alias does chemistry teacher Walter White adopt?',
        options: ['Schrödinger', 'Heisenberg', 'Oppenheimer', 'Bohr'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bqm-7',
        category: '90s Blockbusters',
        prompt: 'In Jurassic Park (1993), dinosaur DNA is extracted from prehistoric mosquitoes preserved in what material?',
        options: ['Glacial ice', 'Volcanic ash', 'Amber (tree resin)', 'Tar pits'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bqm-8',
        category: 'Pop Music',
        prompt: 'What remains the best-selling studio album of all time worldwide?',
        options: ['Thriller – Michael Jackson', 'Back in Black – AC/DC', 'Abbey Road – The Beatles', 'Rumours – Fleetwood Mac'],
        correctIndex: 0,
        timeLimitSec: 15
      },
      {
        id: 'bqm-9',
        category: 'Anime',
        prompt: 'In One Piece, what treasure is Monkey D. Luffy sailing the Grand Line to find?',
        options: ['The Seven Dragon Balls', 'The One Piece', 'The Philosopher’s Stone', 'The Sacred Jewel'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bqm-10',
        category: 'Comedy TV',
        prompt: 'In The Office (U.S.), what paper company do Michael Scott, Jim, Pam, and Dwight work for?',
        options: ['Vance Refrigeration', 'Initech', 'Dunder Mifflin', 'Prestige Worldwide'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bqm-11',
        category: 'Time Travel',
        prompt: 'In Back to the Future, how fast must the DeLorean travel to activate the flux capacitor?',
        options: ['65 mph', '77 mph', '88 mph', '100 mph'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bqm-12',
        category: 'Animated Hits',
        prompt: 'In Shrek, what vegetable does Shrek famously compare ogres to because "they have layers"?',
        options: ['Cabbages', 'Onions', 'Artichokes', 'Potatoes'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bqm-13',
        category: 'Star Wars',
        prompt: 'Who is Luke Skywalker’s astromech droid companion alongside C-3PO?',
        options: ['BB-8', 'R2-D2', 'IG-11', 'K-2SO'],
        correctIndex: 1,
        timeLimitSec: 10
      },
      {
        id: 'bqm-14',
        category: 'Music Theory',
        prompt: 'How many strings are on a standard acoustic or electric guitar?',
        options: ['4', '5', '6', '8'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bqm-15',
        category: 'Superheroes',
        prompt: 'In Spider-Man: Into the Spider-Verse, which teenager from Brooklyn becomes the new Spider-Man?',
        options: ['Miguel O’Hara', 'Ben Reilly', 'Hobie Brown', 'Miles Morales'],
        correctIndex: 3,
        timeLimitSec: 12
      },
      {
        id: 'bqm-16',
        category: 'Directors',
        prompt: 'Which director filmed Inception, Interstellar, The Dark Knight, and Oppenheimer?',
        options: ['Denis Villeneuve', 'Christopher Nolan', 'Steven Spielberg', 'James Cameron'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bqm-17',
        category: 'TV Animation',
        prompt: 'In Avatar: The Last Airbender, which element is Aang’s native bending art?',
        options: ['Water', 'Earth', 'Fire', 'Air'],
        correctIndex: 3,
        timeLimitSec: 12
      },
      {
        id: 'bqm-18',
        category: 'Film Awards',
        prompt: 'Which South Korean dark comedy thriller made Oscars history in 2020 as the first non-English film to win Best Picture?',
        options: ['Oldboy', 'Train to Busan', 'Parasite', 'Minari'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bqm-19',
        category: 'Cartoon Classics',
        prompt: 'In SpongeBob SquarePants, what instrument does Squidward Tentacles proudly play?',
        options: ['Oboe', 'Clarinet', 'Saxophone', 'Flute'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bqm-20',
        category: 'Toy Story',
        prompt: 'What is the name of the next-door kid in Toy Story (1995) who tortures and Frankensteins toys?',
        options: ['Andy', 'Sid', 'Al', 'Buster'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bqm-21',
        category: 'Instruments',
        prompt: 'How many keys (white and black combined) are on a standard full-size piano?',
        options: ['64', '76', '88', '100'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bqm-22',
        category: 'Sci-Fi Books & Film',
        prompt: 'On the desert planet Arrakis in Dune, giant sandworms guard which priceless resource?',
        options: ['Unobtainium', 'Spice Melange', 'Kyber Crystals', 'Vibranium'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bqm-23',
        category: 'Anime',
        prompt: 'In Attack on Titan, soldiers zip around rooftops fighting Titans using gas-powered grappling hooks called what?',
        options: ['ODM / 3D Maneuver Gear', 'Chakra Wire', 'Titan Fang Rig', 'Sky Lance Pack'],
        correctIndex: 0,
        timeLimitSec: 15
      },
      {
        id: 'bqm-24',
        category: 'Adventure Movies',
        prompt: 'What creature is archaeologist Indiana Jones famously terrified of?',
        options: ['Spiders', 'Rats', 'Bats', 'Snakes'],
        correctIndex: 3,
        timeLimitSec: 12
      },
      {
        id: 'bqm-25',
        category: 'Electronic Music',
        prompt: 'Which masked French electronic duo gave us "One More Time," "Harder, Better, Faster, Stronger," and "Get Lucky"?',
        options: ['Justice', 'Daft Punk', 'Disclosure', 'Swedish House Mafia'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bqm-26',
        category: 'Sitcoms',
        prompt: 'In Seinfeld, which eccentric neighbor routinely bursts straight through Jerry’s apartment door?',
        options: ['George Costanza', 'Newman', 'Cosmo Kramer', 'Frank Costanza'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bqm-27',
        category: 'Disney',
        prompt: 'In The Lion King, what does "Hakuna Matata" mean?',
        options: ['Long live the king', 'No worries', 'Follow the stars', 'Strength in pride'],
        correctIndex: 1,
        timeLimitSec: 10
      },
      {
        id: 'bqm-28',
        category: 'Mystery',
        prompt: 'What street address in London is home to fictional detective Sherlock Holmes?',
        options: ['10 Downing Street', '221B Baker Street', '4 Privet Drive', '32 Windsor Gardens'],
        correctIndex: 1,
        timeLimitSec: 12
      }
    ]
  },
  {
    id: 'builtin-blitz-science-space',
    game: 'blitz_quiz',
    title: 'Space, Science & Brainiac Speedrun',
    description: '28 lightning-fast questions on space, physics, chemistry, computing, and inventions.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-11-09T00:00:00.000Z',
    questions: [
      {
        id: 'bqs-1',
        category: 'Chemistry',
        prompt: 'Which chemical element has the Periodic Table symbol "Au"?',
        options: ['Silver', 'Aluminum', 'Gold', 'Argon'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bqs-2',
        category: 'Astronomy',
        prompt: 'Roughly how long does it take sunlight to travel from the Sun to Earth?',
        options: ['8 seconds', '8 minutes 20 seconds', '1 hour', '24 hours'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bqs-3',
        category: 'Biology',
        prompt: 'Which organelle is universally memed in biology class as "the powerhouse of the cell"?',
        options: ['Ribosome', 'Golgi apparatus', 'Nucleus', 'Mitochondria'],
        correctIndex: 3,
        timeLimitSec: 10
      },
      {
        id: 'bqs-4',
        category: 'Space Exploration',
        prompt: 'What was the name of the Apollo 11 Lunar Module that landed Neil Armstrong and Buzz Aldrin on the Moon in 1969?',
        options: ['Eagle', 'Columbia', 'Discovery', 'Voyager'],
        correctIndex: 0,
        timeLimitSec: 15
      },
      {
        id: 'bqs-5',
        category: 'Physics',
        prompt: 'At what temperature are the Celsius and Fahrenheit scales the exact same number?',
        options: ['0 degrees', '-32 degrees', '-40 degrees', '-100 degrees'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bqs-6',
        category: 'Atmosphere',
        prompt: 'Which gas makes up roughly 78% of Earth’s atmosphere?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bqs-7',
        category: 'Computing',
        prompt: 'How many bits are in one standard byte?',
        options: ['4', '8', '16', '64'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bqs-8',
        category: 'Planets',
        prompt: 'Olympus Mons—the tallest known volcano in our solar system (nearly 3x Mount Everest)—stands on which planet?',
        options: ['Mars', 'Jupiter’s moon Io', 'Venus', 'Mercury'],
        correctIndex: 0,
        timeLimitSec: 15
      },
      {
        id: 'bqs-9',
        category: 'Geology',
        prompt: 'On the Mohs hardness scale of minerals, what mineral sits at the maximum score of 10?',
        options: ['Quartz', 'Titanium', 'Topaz', 'Diamond'],
        correctIndex: 3,
        timeLimitSec: 12
      },
      {
        id: 'bqs-10',
        category: 'Medicine',
        prompt: 'Who discovered penicillin in 1928 after noticing mold killing bacteria in a petri dish?',
        options: ['Louis Pasteur', 'Alexander Fleming', 'Marie Curie', 'Jonas Salk'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bqs-11',
        category: 'Web & HTTP',
        prompt: 'While HTTP 404 means "Not Found," what is humorous HTTP status code 418 officially defined as?',
        options: ['Server On Fire', 'I’m a teapot', 'Too Many Cats', 'Out to Lunch'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bqs-12',
        category: 'Astronomy',
        prompt: 'Which galaxy is the closest major spiral galaxy to our Milky Way (and on a slow 4.5-billion-year collision course with us)?',
        options: ['Whirlpool Galaxy', 'Sombrero Galaxy', 'Andromeda Galaxy', 'Triangulum'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bqs-13',
        category: 'Math',
        prompt: 'What is the ONLY even prime number?',
        options: ['0', '2', '4', 'There are none'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bqs-14',
        category: 'Chemistry',
        prompt: 'Which two elements are liquid at standard room temperature and pressure?',
        options: ['Mercury and Bromine', 'Mercury and Gallium', 'Cesium and Sodium', 'Lead and Chlorine'],
        correctIndex: 0,
        timeLimitSec: 18
      },
      {
        id: 'bqs-15',
        category: 'Dinosaurs',
        prompt: 'During which geological period did Tyrannosaurus rex actually live?',
        options: ['Triassic', 'Jurassic', 'Cretaceous', 'Permian'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bqs-16',
        category: 'Human Body',
        prompt: 'Which universal donor blood type can typically donate red blood cells to anyone?',
        options: ['AB Positive', 'A Negative', 'O Positive', 'O Negative'],
        correctIndex: 3,
        timeLimitSec: 15
      },
      {
        id: 'bqs-17',
        category: 'Space',
        prompt: 'Which spacecraft launched in 1977 became the first human-made object to enter interstellar space in 2012?',
        options: ['Pioneer 10', 'Voyager 1', 'New Horizons', 'Cassini'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bqs-18',
        category: 'Physics',
        prompt: 'What subatomic particle carries a negative electrical charge?',
        options: ['Proton', 'Neutron', 'Electron', 'Photon'],
        correctIndex: 2,
        timeLimitSec: 12
      },
      {
        id: 'bqs-19',
        category: 'History of Science',
        prompt: 'Who became the first person in history to win two Nobel Prizes in two different scientific fields (Physics and Chemistry)?',
        options: ['Albert Einstein', 'Linus Pauling', 'Marie Curie', 'Nikola Tesla'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bqs-20',
        category: 'Solar System',
        prompt: 'Which planet currently holds the record for the most confirmed moons (over 140) in our solar system?',
        options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bqs-21',
        category: 'Weather',
        prompt: 'What instrument measures atmospheric air pressure to forecast weather changes?',
        options: ['Anemometer', 'Hygrometer', 'Barometer', 'Seismograph'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bqs-22',
        category: 'Chemistry',
        prompt: '"Dry ice" is the frozen solid form of which gas?',
        options: ['Nitrogen', 'Carbon Dioxide', 'Helium', 'Methane'],
        correctIndex: 1,
        timeLimitSec: 12
      },
      {
        id: 'bqs-23',
        category: 'Computing',
        prompt: 'Who is widely credited as the world’s first computer programmer for her 1843 algorithm notes on Babbage’s Analytical Engine?',
        options: ['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Margaret Hamilton'],
        correctIndex: 0,
        timeLimitSec: 15
      },
      {
        id: 'bqs-24',
        category: 'Botany',
        prompt: 'During photosynthesis, plants absorb carbon dioxide and sunlight and release which gas as a byproduct?',
        options: ['Nitrogen', 'Hydrogen', 'Methane', 'Oxygen'],
        correctIndex: 3,
        timeLimitSec: 10
      },
      {
        id: 'bqs-25',
        category: 'Optics',
        prompt: 'In visible light, which color has the longest wavelength (and lowest frequency)?',
        options: ['Violet', 'Blue', 'Green', 'Red'],
        correctIndex: 3,
        timeLimitSec: 15
      },
      {
        id: 'bqs-26',
        category: 'Ancient World',
        prompt: 'Of the Seven Wonders of the Ancient World, which is the ONLY one still standing largely intact today?',
        options: [
          'Colossus of Rhodes',
          'Great Pyramid of Giza',
          'Lighthouse of Alexandria',
          'Hanging Gardens of Babylon'
        ],
        correctIndex: 1,
        timeLimitSec: 15
      },
      {
        id: 'bqs-27',
        category: 'Speed',
        prompt: 'Roughly how fast does sound travel through dry air at sea level?',
        options: ['~120 mph', '~340 mph', '~767 mph (343 m/s)', '~2,500 mph'],
        correctIndex: 2,
        timeLimitSec: 15
      },
      {
        id: 'bqs-28',
        category: 'Geometry',
        prompt: 'How many sides does a dodecagon have?',
        options: ['10', '12', '16', '20'],
        correctIndex: 1,
        timeLimitSec: 12
      }
    ]
  }
];
