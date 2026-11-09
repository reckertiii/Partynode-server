import type { BluffPack } from '../types.js';

export const BLUFF_PACKS: BluffPack[] = [
  {
    id: 'builtin-bluff-weird-world',
    game: 'bluff_battle',
    title: 'Stranger Than Fiction (World & History)',
    description: '20 bizarre, 100% real laws, historical blunders, and oddities from around the globe.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-11-09T00:00:00.000Z',
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
        category: 'Small Town Politics',
        prompt: 'In 2014, the town of Cormorant, Minnesota overwhelmingly re-elected _______ as its honorary mayor.',
        truth: 'A Great Pyrenees dog named Duke',
        decoys: ['A 9-year-old twins duo', 'A retired mail truck', 'An orange barn cat named Barnaby', 'A cardboard cutout of Dolly Parton']
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
        prompt: 'Before becoming a French-fry staple, 1830s ketchup was sold in pharmacies as patent medicine for _______.',
        truth: 'Indigestion and diarrhea',
        decoys: ['Male pattern baldness', 'Toothaches', 'Seasickness', 'Insomnia']
      },
      {
        id: 'bb-5',
        category: 'Olympic Chaos',
        prompt: 'At the chaotic 1904 St. Louis Olympic marathon, American runner Fred Lorz was disqualified after officials discovered he completed 11 miles of the race _______.',
        truth: 'Riding in his manager’s car',
        decoys: ['On a borrowed penny-farthing bicycle', 'Holding onto the back of a streetcar', 'Being carried on a mule', 'Taking a steamboat shortcut']
      },
      {
        id: 'bb-6',
        category: 'Military History',
        prompt: 'In 1932, the Australian military deployed soldiers armed with machine guns to western farmlands—and lost—in a conflict officially remembered as The Great _______ War.',
        truth: 'Emu',
        decoys: ['Kangaroo', 'Cane Toad', 'Dingo', 'Camel']
      },
      {
        id: 'bb-7',
        category: 'Royal Oddities',
        prompt: 'When Napoleon Bonaparte returned from battle to host a celebratory hunt in 1807, his plan backfired hilariously when hundreds of domesticated _______ swarmed and chased him to his carriage.',
        truth: 'Rabbits',
        decoys: ['Pheasants', 'Geese', 'Dachshunds', 'Beagle puppies']
      },
      {
        id: 'bb-8',
        category: 'Bizarre Disasters',
        prompt: 'In January 1919, a massive storage tank ruptured in Boston, sending a deadly 25-foot-tall wave of _______ rushing down city streets at 35 mph.',
        truth: 'Molasses',
        decoys: ['Pickling vinegar', 'Clam chowder broth', 'Melted candle wax', 'Maple syrup']
      },
      {
        id: 'bb-9',
        category: 'Border Disputes',
        prompt: 'For nearly 50 years, Canada and Denmark waged a peaceful territorial dispute over tiny Hans Island by taking turns planting flags and leaving bottles of _______.',
        truth: 'Whisky and schnapps',
        decoys: ['Maple syrup and pickled herring', 'Hot cocoa thermoses', 'Apology letters', 'Mustard']
      },
      {
        id: 'bb-10',
        category: 'Strange Taxes',
        prompt: 'In 1698, Russian Tsar Peter the Great introduced a special metal tax token that noblemen had to carry in public if they wanted to keep their _______.',
        truth: 'Beard',
        decoys: ['Fur hat', 'Pet bear', 'Pocket watch', 'Wooden boots']
      },
      {
        id: 'bb-11',
        category: 'Postal History',
        prompt: 'Right after the U.S. Parcel Post service launched in 1913, postal officials had to scramble to update regulations because frugal parents briefly started mailing their _______ with stamps.',
        truth: 'Children',
        decoys: ['Dirty laundry', 'Live dairy cows', 'Hot Sunday dinners', 'Grandmothers']
      },
      {
        id: 'bb-12',
        category: 'Spycraft',
        prompt: 'During the 1960s, the CIA spent roughly $20 million on "Operation Acoustic Kitty," a failed Cold War spy project that surgically wired microphones and antennas into a _______.',
        truth: 'House cat',
        decoys: ['Carrier pigeon', 'Stray raccoon', 'Stuffed baguette', 'Toy poodle']
      },
      {
        id: 'bb-13',
        category: 'Geography',
        prompt: 'In the town of Whittier, Alaska, nearly the entire population—along with the post office, store, police station, and clinic—lives inside _______.',
        truth: 'One single 14-story apartment building',
        decoys: ['A converted cruise ship', 'A retired WWII submarine hangar', 'Connected underground train cars', 'A giant geodesic dome']
      },
      {
        id: 'bb-14',
        category: 'Sports History',
        prompt: 'In 1923, jockey Frank Hayes became the only person in racing history to win a steeplechase horse race despite _______.',
        truth: 'Having died of a heart attack mid-race',
        decoys: ['Riding the wrong horse out of the gate', 'Facing backward in the saddle', 'Falling asleep at the starting bell', 'Losing both boots on jump one']
      },
      {
        id: 'bb-15',
        category: 'Aviation',
        prompt: 'To stop passengers from panicking over superstition, many international airlines skip row 13—and Italian carrier ITA/Alitalia also famously skipped row _______.',
        truth: '17',
        decoys: ['4', '9', '23', '0']
      },
      {
        id: 'bb-16',
        category: 'Weird Laws',
        prompt: 'On the Norwegian Arctic archipelago of Svalbard, permafrost prevents bodies from decomposing, so local regulations famously prohibit residents from _______ on the island.',
        truth: 'Dying / being buried',
        decoys: ['Digging a basement', 'Planting trees', 'Owning a lawnmower', 'Throwing away leftovers']
      },
      {
        id: 'bb-17',
        category: 'World Records',
        prompt: 'French entertainer Michel Lotito earned the nickname "Monsieur Mangetout" in Guinness World Records after spending two years eating an entire _______.',
        truth: 'Cessna 150 airplane',
        decoys: ['Grand piano', 'London telephone booth', 'Cast-iron bathtub', ' chandelier']
      },
      {
        id: 'bb-18',
        category: 'Presidential Lore',
        prompt: 'U.S. President Lyndon B. Johnson loved pranking visitors at his Texas ranch by driving toward a lake screaming that his brakes failed—because he secretly owned an _______ car.',
        truth: 'Amphibious (floating Amphicar)',
        decoys: ['Invisible-brake stunt', 'Remote-controlled', 'Ejector-seat', 'Reverse-steering']
      },
      {
        id: 'bb-19',
        category: 'Ancient Rome',
        prompt: 'Because wealthy Romans prized bright smiles, ancient Roman apothecaries famously imported jugs of Portuguese _______ to use as premium mouthwash and laundry whitener.',
        truth: 'Urine',
        decoys: ['Goat milk', 'Squid ink vinegar', 'Crushed oyster brine', 'Olive pit ash']
      },
      {
        id: 'bb-20',
        category: 'Modern Oddities',
        prompt: 'In 2008, Norway knighted a resident of Edinburgh Zoo named Nils Olav—making him Brigadier Sir Nils Olav, the highest-ranking _______ in the Norwegian Guard.',
        truth: 'King penguin',
        decoys: ['Puffin', 'Arctic fox', 'Reindeer', 'Harbor seal']
      }
    ]
  },
  {
    id: 'builtin-bluff-gaming-tech',
    game: 'bluff_battle',
    title: 'Cursed Tech & Gaming Lore',
    description: '20 real behind-the-scenes game dev hacks, internet glitches, and wild tech history.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-11-09T00:00:00.000Z',
    questions: [
      {
        id: 'bbg-1',
        category: 'Game Dev Hacks',
        prompt: 'In Fallout 3’s Broken Steel DLC, the moving presidential subway train was actually coded as a giant _______ equipped onto an NPC sprinting beneath the floor.',
        truth: 'Train-shaped helmet / hat',
        decoys: ['Reskinned deathclaw', 'Spinning wooden door', 'Floating equippable shield', 'Giant inventory briefcase']
      },
      {
        id: 'bbg-2',
        category: 'Internet History',
        prompt: 'The very first webcam ever set up at Cambridge University in 1991 was pointed exclusively at a _______ so researchers wouldn’t walk down the hall for nothing.',
        truth: 'Coffee pot',
        decoys: ['Vending machine', 'Shared laser printer', 'Parking lot gate', 'Office fish tank']
      },
      {
        id: 'bbg-3',
        category: 'Arcade Classics',
        prompt: 'Designer Toru Iwatani conceived the iconic shape of Pac-Man while looking down at a _______ with one slice taken out.',
        truth: 'Pizza',
        decoys: ['Wheel of cheddar cheese', 'Lemon pie', 'Broken vinyl record', 'grapefruit']
      },
      {
        id: 'bbg-4',
        category: 'Console Quirks',
        prompt: 'To stop children and pets from swallowing Nintendo Switch cartridges, Nintendo coats every card in denatonium benzoate—the same bitter chemical used in _______.',
        truth: 'Anti-nail-biting spray',
        decoys: ['Bug repellent', 'Envelope glue', 'glow sticks', 'car windshield fluid']
      },
      {
        id: 'bbg-5',
        category: 'Esports Weirdness',
        prompt: 'At a 2011 StarCraft community tournament, the consolation prize for 5th–8th place became legendary years later because it was 25 _______.',
        truth: 'Bitcoins',
        decoys: ['Subway gift cards', 'Signed mousepads', 'Crates of Bawls soda', 'Shares of GameStop']
      },
      {
        id: 'bbg-6',
        category: 'Software Bugs',
        prompt: 'In 1947, Grace Hopper’s team taped the literal "first actual case of bug being found" into a Harvard Mark II computer logbook after pulling a trapped _______ out of Relay #70.',
        truth: 'Moth',
        decoys: ['Cricket', 'June beetle', 'Daddy longlegs spider', 'Paperclip']
      },
      {
        id: 'bbg-7',
        category: 'MMO Pandemics',
        prompt: 'In 2005, epidemiologists studied World of Warcraft’s accidental "Corrupted Blood" plague, which escaped a raid dungeon because players dismissed infected _______ and re-summoned them in crowded cities.',
        truth: 'Hunter pets',
        decoys: ['Auctioneer NPCs', 'Repair bots', 'Quest-giver chickens', 'Mailbox mimics']
      },
      {
        id: 'bbg-8',
        category: 'Hardware Secrets',
        prompt: 'Early 2000s PlayStation 2 towers on the home screen weren’t random art—more towers and taller pillars grew based on _______.',
        truth: 'How many games & hours were saved on your memory card',
        decoys: ['What time of night the console booted', 'How dusty the cooling fan sensor got', 'Your controller button mash speed', 'The region code of the disc']
      },
      {
        id: 'bbg-9',
        category: 'Retro Speedruns',
        prompt: 'The iconic accelerating alien march in 1978’s Space Invaders wasn’t intentionally coded as a difficulty curve—the aliens sped up simply because _______.',
        truth: 'Fewer sprites on screen meant the processor lagged less',
        decoys: ['A timer variable overflowed past 100', 'The arcade cabinet warmed up', 'Background music tempo controlled movement', 'Shield pixels freed up RAM']
      },
      {
        id: 'bbg-10',
        category: 'Cybersecurity',
        prompt: 'Cloudflare’s San Francisco headquarters generates truly unpredictable cryptographic random numbers to encrypt internet traffic by filming a wall of 100 _______.',
        truth: 'Lava lamps',
        decoys: ['Goldfish bowls', 'Swinging metronomes', 'Ant farms', 'Spinning bingo cages']
      },
      {
        id: 'bbg-11',
        category: 'Tech Origins',
        prompt: 'Before pivoting to video consoles and Mario in the late 20th century, Nintendo was founded in Kyoto in 1889 as a workshop making handmade _______.',
        truth: 'Playing cards (Hanafuda)',
        decoys: ['Paper lanterns', 'Wooden chess sets', 'Silk kites', 'Wind-up tin trains']
      },
      {
        id: 'bbg-12',
        category: 'FPS Legends',
        prompt: 'To squeeze GoldenEye 007’s surprise split-screen multiplayer mode onto the N64 cartridge just weeks before launch, a tiny team coded it largely _______.',
        truth: 'Without telling Nintendo / management until it worked',
        decoys: ['By deleting the credits cutscene', 'Inside an Excel macro', 'Using leftover donkey kong sound files', 'Over a single weekend hackathon']
      },
      {
        id: 'bbg-13',
        category: 'Silicon Valley',
        prompt: 'Google rented a herd of 200 _______ at its Mountain View campus instead of noisy gas lawnmowers to trim the dry brush on the hills.',
        truth: 'Goats',
        decoys: ['Miniature sheep', 'Alpacas', 'Tortoises', 'Roomba prototypes']
      },
      {
        id: 'bbg-14',
        category: 'Sound Design',
        prompt: 'In Minecraft, the unsettling groans and screeches of the giant floating Ghast were recorded when composer C418 accidentally captured noises made by his _______.',
        truth: 'Sleeping cat being woken up',
        decoys: ['Squeaky studio refrigerator door', 'Boiling espresso machine', 'Neighbor’s rusty violin', 'Deflating air mattress']
      },
      {
        id: 'bbg-15',
        category: 'Domain Names',
        prompt: 'Before launching under the name Google, Larry Page and Sergey Brin originally named their Stanford search engine _______ because it analyzed the web’s "back links."',
        truth: 'BackRub',
        decoys: ['SpiderNet', 'LinkHound', 'PageStack', 'WebCrawlerPro']
      },
      {
        id: 'bbg-16',
        category: 'Wireless Tech',
        prompt: 'Bluetooth wireless technology—and its spiky rune logo—was named after Harald "Bluetooth" Gormsson, a 10th-century king of _______.',
        truth: 'Denmark and Norway',
        decoys: ['Iceland', 'Scotland', 'Saxony', 'Kievan Rus']
      },
      {
        id: 'bbg-17',
        category: 'RPG Glitches',
        prompt: 'In Sid Meier’s Civilization lore, peaceful leader Mahatma Gandhi became an internet meme for threatening nuclear war because developers joked about a supposed underflow setting his aggression to _______.',
        truth: '255',
        decoys: ['9,999', '-1', '100%', 'Infinity']
      },
      {
        id: 'bbg-18',
        category: 'Space Computing',
        prompt: 'In 2019, cosmic rays or radiation paranoia weren’t needed on Earth to flip a bit: in 2003, a single cosmic ray strike in Schaerbeek, Belgium famously added exactly _______ extra votes to a local election candidate.',
        truth: '4,096',
        decoys: ['1,000,000', '256', '65,535', '999']
      },
      {
        id: 'bbg-19',
        category: 'Anti-Piracy',
        prompt: 'In Serious Sam 3, instead of crashing pirated copies of the game, the developers spawned an unkillable, super-fast _______ that relentlessly hunted pirates forever.',
        truth: 'Pink scorpion',
        decoys: ['Tax auditor in a suit', 'Floating giant eyeball', 'Screaming headless clown', 'Golden chicken']
      },
      {
        id: 'bbg-20',
        category: 'Streaming Era',
        prompt: 'In 2014, over 1.16 million people collaborated chaotically in Twitch chat for 16 straight days to beat _______ by typing button inputs into chat.',
        truth: 'Pokémon Red',
        decoys: ['Dark Souls', 'Super Mario 64', 'The Legend of Zelda', 'QWOP']
      }
    ]
  },
  {
    id: 'builtin-bluff-wild-nature',
    game: 'bluff_battle',
    title: 'Freaky Nature & Science',
    description: '20 mind-bending truths from animal biology, deep space, and weird science.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-11-09T00:00:00.000Z',
    questions: [
      {
        id: 'bbn-1',
        category: 'Animal Kingdom',
        prompt: 'Scientists confirmed that wombats are the only known species on Earth that produces _______-shaped poop so it doesn’t roll off rocks.',
        truth: 'Cube',
        decoys: ['Pyramid', 'Spiral', 'Hexagon', 'Coin']
      },
      {
        id: 'bbn-2',
        category: 'Marine Biology',
        prompt: 'The pistol shrimp stuns prey by snapping its oversized claw shut so fast that the collapsing cavitation bubble briefly reaches temperatures nearly as hot as _______.',
        truth: 'The surface of the Sun',
        decoys: ['Molten volcano lava', 'A bolt of lightning', 'A blowtorch flame', 'Boiling lead']
      },
      {
        id: 'bbn-3',
        category: 'Space Smells',
        prompt: 'Apollo astronauts returning from moonwalks reported that lunar dust clinging to their spacesuits smelled unmistakably like _______.',
        truth: 'Spent gunpowder',
        decoys: ['Burnt toast', 'Wet pennies', 'Rotten eggs', 'Ozone and peppermint']
      },
      {
        id: 'bbn-4',
        category: 'Botany',
        prompt: 'Botanically speaking, strawberries and raspberries aren’t true berries—whereas _______ actually ARE classified by botanists as berries.',
        truth: 'Bananas (and watermelons)',
        decoys: ['Peanuts', 'Pineapples', 'Coconuts', 'Carrots']
      },
      {
        id: 'bbn-5',
        category: 'Weird Evolution',
        prompt: 'Because sharks first evolved roughly 400–450 million years ago, sharks are actually older as a group than both dinosaurs and _______ on Earth.',
        truth: 'Trees (and Saturn’s rings)',
        decoys: ['Oceans', 'Clouds', 'Volcanoes', 'The Moon']
      },
      {
        id: 'bbn-6',
        category: 'Reptile Defenses',
        prompt: 'When threatened by coyotes, the Texas horned lizard uses one of nature’s grossest self-defense moves: squirting aimed streams of foul-tasting blood out of its _______.',
        truth: 'Eyes',
        decoys: ['Tail tip', 'Ears', 'Nostrils', 'Front kneecaps']
      },
      {
        id: 'bbn-7',
        category: 'Bird Behavior',
        prompt: 'Australian firehawks (like black kites and brown falcons) have been documented intentionally picking up burning sticks to _______ so they can catch fleeing prey.',
        truth: 'Spread wildfires to unburned grass',
        decoys: ['Smoke snakes out of burrows', 'Warm their cliffside nests', 'Scare away crocodiles', 'Cook beetles mid-flight']
      },
      {
        id: 'bbn-8',
        category: 'Human Body',
        prompt: 'Your stomach lining has to regenerate constantly because human gastric acid is strong enough on the pH scale to corrode _______.',
        truth: 'Stainless steel / razor blades',
        decoys: ['Glass marbles', 'Ceramic tile', 'Gold coins', 'Rubber tires']
      },
      {
        id: 'bbn-9',
        category: 'Deep Ocean',
        prompt: 'The Greenland shark grows less than a centimeter per year and is the longest-living vertebrate known to science, with individuals estimated to live up to _______ years.',
        truth: '400 (to 500)',
        decoys: ['120', '1,200', '95', '850']
      },
      {
        id: 'bbn-10',
        category: 'Mammal Quirks',
        prompt: 'When European naturalists first examined a preserved platypus specimen in 1799, they tried pulling at its bill with scissors because they were convinced _______.',
        truth: 'Someone sewed a duck’s beak onto a beaver as a hoax',
        decoys: ['It was wearing a protective shell', 'A duck had swallowed a mole whole', 'It had a second mouth underneath', 'It was a mutated otter pup']
      },
      {
        id: 'bbn-11',
        category: 'Entomology',
        prompt: 'Researchers studying honeybees discovered that bees can understand the mathematical concept of _______, placing them in an elite club with dolphins and primates.',
        truth: 'Zero',
        decoys: ['Square roots', 'Prime numbers', 'Fractions', 'Pi']
      },
      {
        id: 'bbn-12',
        category: 'Sleep Science',
        prompt: 'Sea otters hold paws while floating on their backs so they don’t drift apart—and mothers will also wrap their pups in _______ like an anchor while diving for food.',
        truth: 'Giant kelp',
        decoys: ['Driftwood rings', 'Clamshell chains', 'Sea sponges', 'Eelgrass braids']
      },
      {
        id: 'bbn-13',
        category: 'Chemistry',
        prompt: 'Gallium is a silvery metal that stays solid on a table, yet has a melting point of just 85.6°F (29.8°C)—meaning it literally melts if you _______.',
        truth: 'Hold it in the palm of your hand',
        decoys: ['Shine a flashlight on it', 'Drop it in ice water', 'Blow on it twice', 'Sprinkle table salt on it']
      },
      {
        id: 'bbn-14',
        category: 'Astronomy',
        prompt: 'Because Venus spins extraordinarily slowly on its axis while orbiting the Sun faster, one single sidereal "day" on Venus is actually longer than _______.',
        truth: 'One full Venusian year',
        decoys: ['Ten Earth years', 'A human childhood', 'Mercury’s entire lifetime', 'Halley’s Comet’s orbit']
      },
      {
        id: 'bbn-15',
        category: 'Frog Weirdness',
        prompt: 'The hairy frog (Trichobatrachus robustus) of Central Africa earns its nickname "Wolverine frog" because when attacked, it intentionally breaks its own toe bones to _______.',
        truth: 'Push sharp bone claws through its skin',
        decoys: ['Play dead with floppy feet', 'Shoot bone splinters like darts', 'Squeeze under flat rocks', 'Make a loud cracking sound']
      },
      {
        id: 'bbn-16',
        category: 'Fungi',
        prompt: 'The largest living organism on Earth by area isn’t a blue whale or redwood—it’s a single underground _______ in Oregon’s Malheur National Forest spanning over 3.4 square miles.',
        truth: 'Honey fungus (mushroom network)',
        decoys: ['Dandelion root ball', 'Peat moss mat', 'Earthworm colony', 'Fern rhizome']
      },
      {
        id: 'bbn-17',
        category: 'Animal Voices',
        prompt: 'Despite weighing over two tons, hippos cannot actually swim or float—instead, they move across deep rivers by _______.',
        truth: 'Bouncing and galloping along the riverbed',
        decoys: ['Inflating throat air sacs', 'Dog-paddling upside down', 'Rolling like logs in the current', 'Holding onto logs']
      },
      {
        id: 'bbn-18',
        category: 'Weather',
        prompt: 'Atmospheric physicists calculate that an average fluffy white cumulus cloud floating overhead actually weighs roughly 1.1 million pounds—about the same as _______.',
        truth: '100 elephants',
        decoys: ['A school bus', 'Five feathers', 'Two grand pianos', 'The Eiffel Tower']
      },
      {
        id: 'bbn-19',
        category: 'Genetics',
        prompt: 'Koalas have evolved finger ridges so remarkably similar to human fingerprints under a microscope that crime-scene experts noted they could theoretically _______.',
        truth: 'Confuse forensic investigators at a crime scene',
        decoys: ['Unlock older touch-ID phones', 'Pick simple padlocks', 'Grip wet glass vertically', 'Tell a koala’s exact age']
      },
      {
        id: 'bbn-20',
        category: 'Paleontology',
        prompt: 'In terms of geological time, Cleopatra lived closer to the launch of the iPhone and Moon landing than she did to _______.',
        truth: 'The building of the Great Pyramid of Giza',
        decoys: ['The extinction of T-Rex', 'The fall of the Roman Empire', 'Alexander the Great’s birth', 'The eruption of Pompeii']
      }
    ]
  },
  {
    id: 'builtin-bluff-pop-food',
    game: 'bluff_battle',
    title: 'Secret Origins: Movies, Music & Food',
    description: '20 unbelievable true stories behind famous movies, snacks, brands, and pop culture.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-11-09T00:00:00.000Z',
    questions: [
      {
        id: 'bbp-1',
        category: 'Movie FX',
        prompt: 'Because 1960’s Psycho was filmed in black and white, Alfred Hitchcock created the infamous shower scene "blood" swirling down the drain using _______.',
        truth: 'Chocolate syrup',
        decoys: ['Motor oil', 'Blackberry jam', 'Prune juice', 'Shoe polish']
      },
      {
        id: 'bbp-2',
        category: 'Candy Inventions',
        prompt: 'Ironically, the electric cotton candy machine was co-invented in 1897 by confectioner John C. Wharton and William Morrison—who worked by day as a _______.',
        truth: 'Dentist',
        decoys: ['Sheep shearer', 'Glassblower', 'Firefighter', 'pillow stuffer']
      },
      {
        id: 'bbp-3',
        category: 'Corporate Promotions',
        prompt: 'After a 1992 Soviet naval disarmament deal, Pepsi briefly acquired 17 submarines, a cruiser, a frigate, and a destroyer as payment for _______.',
        truth: 'Pepsi cola syrup',
        decoys: ['Super Bowl ad slots', 'Vending machines', 'Doritos factories', 'Pizza Hut franchises']
      },
      {
        id: 'bbp-4',
        category: 'Tire Brands',
        prompt: 'Yes, it really is the exact same company: the prestigious Michelin Star restaurant guide was started in 1900 by the Michelin tire brothers in order to _______.',
        truth: 'Encourage motorists to drive farther and wear out more tires',
        decoys: ['Settle an argument over French onion soup', 'Feed traveling truck mechanics', 'Use up leftover map paper', 'Impress the French president']
      },
      {
        id: 'bbp-5',
        category: 'Cinema Sound',
        prompt: 'In Jurassic Park, sound designer Gary Rydstrom created the terrifying footsteps and roaring elements of the T-Rex—and blended the noises of mating _______ to voice the Velociraptors.',
        truth: 'Tortoises',
        decoys: ['Llamas', 'Bullfrogs', 'Ostriches', 'Badgers']
      },
      {
        id: 'bbp-6',
        category: 'Fast Food Flops',
        prompt: 'In the 1980s, A&W launched a "Third-Pound Burger" for the same price as McDonald’s Quarter Pounder, yet it flopped in focus groups because customers thought _______.',
        truth: '1/4 was bigger than 1/3 because 4 is bigger than 3',
        decoys: ['"Third-pound" sounded like leftover meat', 'It wouldn’t fit inside a car cupholder', 'The bun had too many sesame seeds', 'Three patties was illegal']
      },
      {
        id: 'bbp-7',
        category: 'Toy History',
        prompt: 'Before toddlers sculpted pretend spaghetti out of it, Play-Doh was originally manufactured in the 1930s as a putty designed to _______.',
        truth: 'Clean coal soot off wallpaper',
        decoys: ['Plug leaky kitchen pipes', 'Cushion dentures', 'Shine brass doorknobs', 'Trap pantry moths']
      },
      {
        id: 'bbp-8',
        category: 'Sci-Fi Props',
        prompt: 'In Star Wars: Episode I – The Phantom Menace, Qui-Gon Jinn’s sleek Jedi communicator prop was built from a repainted casting of a _______ razor.',
        truth: 'Gillette Sensor Excel women’s',
        decoys: [' Braun beard trimmer', 'Kitchen potato peeler', 'Staple remover', 'Garage door clicker']
      },
      {
        id: 'bbp-9',
        category: 'Snack Lore',
        prompt: 'Chemist Fredric Baur was so proud of inventing the tubular Pringles can that when he passed away in 2008, his family honored his wish to bury part of his ashes inside _______.',
        truth: 'An Original Pringles can',
        decoys: ['A golden tennis ball tube', 'A giant porcelain potato', 'A time capsule at Procter & Gamble', 'A Sour Cream & Onion delivery truck']
      },
      {
        id: 'bbp-10',
        category: 'Music History',
        prompt: 'Rock band Van Halen famously buried a clause inside their concert contract demanding backstage M&M’s with all the _______ ones removed—as a clever safety test to prove venues read technical rigging specs.',
        truth: 'Brown',
        decoys: ['Green', 'Blue', 'Red', 'Yellow']
      },
      {
        id: 'bbp-11',
        category: 'Kitchen Accidents',
        prompt: 'Engineer Percy Spencer realized microwaves could heat food in 1945 while testing radar magnetrons at Raytheon after noticing a _______ had melted in his pocket.',
        truth: 'Peanut cluster / candy bar',
        decoys: ['Stick of butter', 'Wax crayon', 'Pack of chewing gum', 'Plastic comb']
      },
      {
        id: 'bbp-12',
        category: 'Horror Movies',
        prompt: 'The iconic ghostly white mask worn by Michael Myers in the 1978 horror classic Halloween was actually a $2 store-bought mask of _______ painted white with widened eyeholes.',
        truth: 'Captain Kirk (William Shatner)',
        decoys: ['Richard Nixon', 'Elvis Presley', 'Mr. Spock', 'Frank Sinatra']
      },
      {
        id: 'bbp-13',
        category: 'Breakfast History',
        prompt: 'Popsicles were invented by accident in 1905 by an 11-year-old boy named Frank Epperson, who left a cup of powdered soda water and a _______ outside on his porch overnight in a freeze.',
        truth: 'Wooden stirring stick',
        decoys: ['Silver soup spoon', 'Cinnamon stick', 'Clean paintbrush handle', 'Candy cane']
      },
      {
        id: 'bbp-14',
        category: 'World Records',
        prompt: 'Lego is technically the largest manufacturer of _______ in the entire world by unit count, producing over 300 million tiny ones every single year.',
        truth: 'Rubber tires',
        decoys: ['Plastic windows', 'Toy hats', 'Pirate swords', 'Doors']
      },
      {
        id: 'bbp-15',
        category: 'Bakery Lore',
        prompt: 'The chocolate chip cookie wasn’t planned as a gooey chip treat—Ruth Wakefield chopped a Nestlé chocolate bar into Toll House dough in the 1930s, and it famously didn’t melt uniformly—selling Nestlé the recipe rights alongside _______.',
        truth: '$1 and a lifetime supply of chocolate',
        decoys: ['A brand-new oven', 'Shares in Hershey’s', 'A vacation to Switzerland', 'Her face on every bag']
      },
      {
        id: 'bbp-16',
        category: 'TV Trivia',
        prompt: 'When Cookie Monster munches cookies on Sesame Street sets, puppeteers usually feed him painted _______ instead of real chocolate chip cookies because grease and crumbs ruin the fur puppet.',
        truth: 'Rice cakes',
        decoys: ['Cardboard coasters', 'Kitchen sponges', 'Pita bread disks', 'Foam hockey pucks']
      },
      {
        id: 'bbp-17',
        category: 'Beverage Lore',
        prompt: 'Fanta orange soda was originally invented in 1940 in Germany out of leftover whey and apple pomace because wartime trade embargoes cut off imports of _______.',
        truth: 'Coca-Cola syrup',
        decoys: ['Spanish oranges', 'Cane sugar', 'Glass bottles', 'Root beer extract']
      },
      {
        id: 'bbp-18',
        category: 'Sports Trophies',
        prompt: 'Golf’s prestigious Claret Jug isn’t the weirdest trophy—winners at Martinsville Speedway in NASCAR aren’t handed a silver cup, they are famously awarded a 7-foot-tall _______.',
        truth: 'Grandfather clock',
        decoys: ['Smoked Virginia ham', 'Golden torque wrench', 'Rocking chair', 'Suit of medieval armor']
      },
      {
        id: 'bbp-19',
        category: 'Packaging Secrets',
        prompt: 'Bubble Wrap wasn’t originally invented to protect fragile shipping boxes—in 1957, engineers Alfred Fielding and Marc Chavannes tried marketing it first as _______.',
        truth: 'Textured 3D plastic wallpaper',
        decoys: ['Swimming pool insulation', 'Non-slip bath mats', 'Soundproof studio curtains', 'Winter coat lining']
      },
      {
        id: 'bbp-20',
        category: 'Movie Stunts',
        prompt: 'In The Lord of the Rings: The Two Towers, Viggo Mortensen’s anguished scream after kicking an orc helmet wasn’t acting—in that exact take, he accidentally _______.',
        truth: 'Broke two of his toes',
        decoys: ['Stepped on a prop spearhead', 'Pulled his hamstring', 'Dislocated his kneecap', 'Kicked a hidden steel anvil']
      }
    ]
  }
];
