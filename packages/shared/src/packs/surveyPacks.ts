import type { SurveyPack } from '../types.js';

export const SURVEY_PACKS: SurveyPack[] = [
  {
    id: 'builtin-survey-classic',
    game: 'survey_showdown',
    title: 'Everyday Classics Survey',
    description: '14 classic 100-person survey boards packed with smart synonym matching.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-11-09T00:00:00.000Z',
    questions: [
      {
        id: 'sv-morning-1',
        prompt: 'Name something people do within 10 minutes of waking up.',
        answers: [
          { text: 'Check Their Phone', points: 36, aliases: ['phone', 'scroll phone', 'check messages', 'look at phone', 'alarm', 'notifications'] },
          { text: 'Use The Bathroom', points: 24, aliases: ['pee', 'toilet', 'restroom', 'washroom', 'bathroom'] },
          { text: 'Brush Their Teeth', points: 16, aliases: ['brush teeth', 'teeth', 'mouthwash', 'wash face'] },
          { text: 'Make Coffee', points: 12, aliases: ['drink coffee', 'coffee', 'caffeine', 'tea', 'brew coffee'] },
          { text: 'Hit Snooze / Go Back To Sleep', points: 8, aliases: ['snooze', 'sleep', 'back to bed', 'snooze button'] },
          { text: 'Stretch / Yawn', points: 4, aliases: ['stretch', 'yawn', 'groan', 'rub eyes'] }
        ]
      },
      {
        id: 'sv-fridge-2',
        prompt: 'Name something you almost always find inside a refrigerator.',
        answers: [
          { text: 'Milk', points: 34, aliases: ['dairy', 'oat milk', 'almond milk', 'carton of milk'] },
          { text: 'Eggs', points: 25, aliases: ['egg', 'dozen eggs', 'carton of eggs'] },
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
          { text: 'Talking Loudly', points: 35, aliases: ['talking', 'whispering', 'chatting', 'spoiling', 'commentary'] },
          { text: 'Bright Phone Screen', points: 27, aliases: ['phone', 'texting', 'ringing phone', 'cell phone', 'checking phone'] },
          { text: 'Kicking Your Seat', points: 16, aliases: ['kicking seat', 'kicking chair', 'feet on seat'] },
          { text: 'Loud Chewing / Wrapper Noise', points: 12, aliases: ['chewing', 'popcorn', 'candy wrapper', 'crunching', 'loud eating'] },
          { text: 'Crying Baby', points: 6, aliases: ['baby', 'crying kid', 'screaming child'] },
          { text: 'Tall Person Blocking View', points: 4, aliases: ['tall person', 'big hat', 'blocking screen', 'tall hair'] }
        ]
      },
      {
        id: 'sv-lose-5',
        prompt: 'Name an everyday item people lose all the time.',
        answers: [
          { text: 'Keys', points: 35, aliases: ['car keys', 'house keys'] },
          { text: 'TV Remote', points: 22, aliases: ['remote', 'remote control', 'controller'] },
          { text: 'Phone', points: 18, aliases: ['cell phone', 'iphone', 'smartphone'] },
          { text: 'Wallet / Purse', points: 11, aliases: ['wallet', 'credit card', 'id', 'purse'] },
          { text: 'Glasses / Sunglasses', points: 8, aliases: ['glasses', 'sunglasses', 'reading glasses'] },
          { text: 'One Sock / Earbud', points: 6, aliases: ['sock', 'socks', 'airpods', 'earbuds', 'headphones'] }
        ]
      },
      {
        id: 'sv-fear-6',
        prompt: 'Name a common fear or phobia that makes adults scream.',
        answers: [
          { text: 'Spiders', points: 36, aliases: ['spider', 'arachnophobia', 'tarantula', 'bugs', 'insects'] },
          { text: 'Heights', points: 23, aliases: ['falling', 'high places', 'cliffs'] },
          { text: 'Snakes', points: 17, aliases: ['snake', 'cobra', 'rattlesnake'] },
          { text: 'Public Speaking', points: 10, aliases: ['speaking in public', 'giving a speech', 'stage fright'] },
          { text: 'Mice / Rats', points: 8, aliases: ['mouse', 'rat', 'rodents'] },
          { text: 'Clowns / The Dark', points: 6, aliases: ['clowns', 'clown', 'darkness', 'the dark', 'ghosts'] }
        ]
      },
      {
        id: 'sv-beach-7',
        prompt: 'Name something you always pack for a day at the beach.',
        answers: [
          { text: 'Sunscreen', points: 34, aliases: ['sunblock', 'spf', 'tanning lotion'] },
          { text: 'Beach Towel', points: 26, aliases: ['towel', 'towels', 'blanket'] },
          { text: 'Sunglasses', points: 14, aliases: ['shades', 'glasses', 'hat'] },
          { text: 'Cooler / Drinks & Snacks', points: 12, aliases: ['cooler', 'water', 'drinks', 'snacks', 'sandwiches'] },
          { text: 'Umbrella / Beach Chair', points: 9, aliases: ['umbrella', 'chair', 'chairs', 'tent', 'shade'] },
          { text: 'Swimsuit / Flip-Flops', points: 5, aliases: ['swimsuit', 'bathing suit', 'sandals', 'flip flops', 'trunks'] }
        ]
      },
      {
        id: 'sv-elevator-8',
        prompt: 'Name something awkward people do to avoid eye contact in a crowded elevator.',
        answers: [
          { text: 'Stare At Their Phone', points: 42, aliases: ['phone', 'check phone', 'fake text', 'scroll'] },
          { text: 'Watch The Floor Numbers', points: 27, aliases: ['stare at numbers', 'floor numbers', 'buttons', 'lights'] },
          { text: 'Stare At The Door / Floor', points: 14, aliases: ['stare at floor', 'shoes', 'door', 'ceiling', 'walls'] },
          { text: 'Check Watch', points: 7, aliases: ['watch', 'look at wrist', 'check time'] },
          { text: 'Talk About The Weather', points: 6, aliases: ['small talk', 'weather', 'awkward cough', 'clear throat'] },
          { text: 'Read Inspection Certificate', points: 4, aliases: ['read sign', 'certificate', 'poster'] }
        ]
      },
      {
        id: 'sv-camping-9',
        prompt: 'Name something people forget to bring when they go camping.',
        answers: [
          { text: 'Matches / Lighter', points: 31, aliases: ['matches', 'lighter', 'fire starter'] },
          { text: 'Bug Spray', points: 24, aliases: ['mosquito spray', 'insect repellent', 'off'] },
          { text: 'Flashlight / Batteries', points: 18, aliases: ['flashlight', 'batteries', 'lantern', 'headlamp'] },
          { text: 'Toilet Paper', points: 13, aliases: ['tp', 'tissues', 'paper towels'] },
          { text: 'Pillow / Sleeping Bag', points: 8, aliases: ['pillow', 'blanket', 'sleeping bag', 'tent stakes'] },
          { text: 'Can Opener', points: 6, aliases: ['opener', 'bottle opener', 'utensils', 'forks'] }
        ]
      },
      {
        id: 'sv-badgift-10',
        prompt: 'Name a gift nobody actually wants to unwrap on their birthday.',
        answers: [
          { text: 'Socks / Underwear', points: 35, aliases: ['socks', 'underwear', 'clothes'] },
          { text: 'Cleaning Supplies / Vacuum', points: 22, aliases: ['vacuum', 'broom', 'mop', 'cleaning', 'iron'] },
          { text: 'Deodorant / Soap Set', points: 16, aliases: ['deodorant', 'mouthwash', 'soap', 'body wash', 'hygiene'] },
          { text: 'Diet Book / Gym Scale', points: 12, aliases: ['scale', 'weight scale', 'diet book', 'workout', 'exercise'] },
          { text: 'Fruitcake', points: 9, aliases: ['fruit cake', 'raisins', 'black licorice'] },
          { text: 'Expired / Empty Gift Card', points: 6, aliases: ['regift', 'used gift card', 'coupon', 'nothing'] }
        ]
      },
      {
        id: 'sv-hotel-11',
        prompt: 'Name the very first thing people check or test when walking into a hotel room.',
        answers: [
          { text: 'The Bed / Sheets', points: 38, aliases: ['bed', 'mattress', 'bounce on bed', 'sheets', 'bedbugs', 'pillows'] },
          { text: 'The Bathroom / Shower', points: 25, aliases: ['bathroom', 'toilet', 'shower', 'towels', 'free soap'] },
          { text: 'The Window View', points: 16, aliases: ['view', 'window', 'balcony', 'curtains'] },
          { text: 'The TV & Remote', points: 9, aliases: ['tv', 'television', 'channels', 'remote'] },
          { text: 'Air Conditioning / Thermostat', points: 7, aliases: ['ac', 'thermostat', 'temperature', 'heat'] },
          { text: 'Mini Fridge / Wi-Fi', points: 5, aliases: ['mini fridge', 'minibar', 'wifi', 'closet'] }
        ]
      },
      {
        id: 'sv-roadtrip-12',
        prompt: 'Name something that causes arguments on a long family road trip.',
        answers: [
          { text: 'Music / Radio Station', points: 31, aliases: ['music', 'playlist', 'radio', 'aux cord', 'songs'] },
          { text: 'Directions / Getting Lost', points: 25, aliases: ['directions', 'gps', 'wrong turn', 'lost', 'backseat driving'] },
          { text: 'Where To Stop & Eat', points: 18, aliases: ['food', 'restaurant', 'where to eat', 'fast food'] },
          { text: 'Bathroom Stops ("Hold It!")', points: 12, aliases: ['bathroom', 'pee break', 'rest stop', 'stopping'] },
          { text: 'Car Temperature (AC / Windows)', points: 8, aliases: ['ac', 'too cold', 'too hot', 'temperature', 'window'] },
          { text: '"Are We There Yet?" / Legroom', points: 6, aliases: ['kids fighting', 'touching me', 'are we there yet', 'seat space'] }
        ]
      },
      {
        id: 'sv-date-13',
        prompt: 'Name an immediate red flag on a first date at a restaurant.',
        answers: [
          { text: 'Rude To The Waiter', points: 39, aliases: ['rude to staff', 'mean to waiter', 'server', 'bad tipper', 'snapping fingers'] },
          { text: 'Glued To Their Phone', points: 24, aliases: ['on phone', 'texting', 'checking phone'] },
          { text: 'Talking Nonstop About Ex', points: 17, aliases: ['their ex', 'exes', 'old relationship'] },
          { text: 'Forgetting Wallet / Making You Pay', points: 9, aliases: ['forgot wallet', 'cheap', 'splitting pennies', 'bill'] },
          { text: 'Only Talking About Themselves', points: 6, aliases: ['bragging', 'arrogant', 'self absorbed', 'narcissist'] },
          { text: 'Chewing With Mouth Open', points: 5, aliases: ['loud chewing', 'bad manners', 'showing up late'] }
        ]
      },
      {
        id: 'sv-dog-14',
        prompt: 'Name something dogs lose their minds barking at.',
        answers: [
          { text: 'Mail Carrier / Delivery Driver', points: 37, aliases: ['mailman', 'ups', 'amazon driver', 'delivery', 'doorbell', 'knock'] },
          { text: 'Squirrels / Cats', points: 25, aliases: ['squirrel', 'cat', 'rabbits', 'birds'] },
          { text: 'Other Dogs Walking By', points: 16, aliases: ['other dogs', 'dog', 'neighbors'] },
          { text: 'Vacuum Cleaner', points: 10, aliases: ['vacuum', 'roomba', 'lawnmower'] },
          { text: 'Thunder / Fireworks', points: 7, aliases: ['thunder', 'fireworks', 'storm'] },
          { text: 'Absolutely Nothing / Ghosts', points: 5, aliases: ['nothing', 'wind', 'leaves', 'their reflection'] }
        ]
      }
    ]
  },
  {
    id: 'builtin-survey-discord',
    game: 'survey_showdown',
    title: 'Gamer & Online Life Survey',
    description: '12 hilarious boards about voice calls, PC setups, streamers, and co-op chaos.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-11-09T00:00:00.000Z',
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
      },
      {
        id: 'svd-afk-4',
        prompt: 'Name a reason someone suddenly goes AFK in the middle of a game.',
        answers: [
          { text: 'Food Delivery Arrived', points: 34, aliases: ['pizza', 'doordash', 'ubereats', 'food', 'doorbell', 'delivery'] },
          { text: 'Bathroom Emergency', points: 26, aliases: ['bathroom', 'pee', 'toilet', 'restroom'] },
          { text: 'Dog / Cat Causing Chaos', points: 15, aliases: ['dog', 'cat', 'let dog out', 'pet puking', 'pet'] },
          { text: 'Parents / Partner Calling Them', points: 12, aliases: ['mom', 'wife', 'husband', 'girlfriend', 'boyfriend', 'chores'] },
          { text: 'Grabbing A Drink / Water', points: 8, aliases: ['water', 'drink', 'fridge', 'snacks'] },
          { text: 'Phone Call', points: 5, aliases: ['phone', 'work call', 'answering phone'] }
        ]
      },
      {
        id: 'svd-channels-5',
        prompt: 'Name a text channel almost every friend-group Discord server has.',
        answers: [
          { text: '#general', points: 39, aliases: ['general', 'main chat', 'chat'] },
          { text: '#memes / #clips', points: 26, aliases: ['memes', 'clips', 'funny', 'shitposting', 'videos'] },
          { text: '#music / #bot-commands', points: 13, aliases: ['music', 'bots', 'bot commands', 'spam'] },
          { text: '#announcements / #rules', points: 10, aliases: ['rules', 'announcements', 'welcome'] },
          { text: '#food / #pets', points: 7, aliases: ['pets', 'food', 'dogs', 'cats', 'cooking'] },
          { text: '#nsfw / #vent / #spoilers', points: 5, aliases: ['spoilers', 'vent', 'admin', 'mod'] }
        ]
      },
      {
        id: 'svd-late-6',
        prompt: 'Name a clear sign you stayed up way too late gaming.',
        answers: [
          { text: 'Birds Start Chirping Outside', points: 37, aliases: ['birds', 'birds chirping', 'morning birds'] },
          { text: 'Sunlight Coming Through Window', points: 28, aliases: ['sun rising', 'sunrise', 'daylight', 'sunlight'] },
          { text: 'Work Alarm Goes Off In 2 Hours', points: 15, aliases: ['alarm', 'work soon', '4am', '5am', 'check clock'] },
          { text: 'Falling Asleep In Chair / Blurry Eyes', points: 10, aliases: ['eyes burning', 'blurry vision', 'nodding off', 'headache'] },
          { text: 'Matchmaking Lobbies Turn Foreign', points: 6, aliases: ['asian servers', 'eu servers', 'long queue', 'sweaty lobbies'] },
          { text: 'Roommate Wakes Up For Work', points: 4, aliases: ['family wakes up', 'dad wakes up', 'breakfast'] }
        ]
      },
      {
        id: 'svd-password-7',
        prompt: 'Name something terrible people use in weak passwords.',
        answers: [
          { text: '"123456" / Sequential Numbers', points: 36, aliases: ['1234', '123456', '12345678', 'qwerty', 'numbers'] },
          { text: 'The Word "Password"', points: 25, aliases: ['password', 'password1', 'admin'] },
          { text: 'Their Birthday / Birth Year', points: 17, aliases: ['birthday', 'birth year', 'anniversary', 'date of birth'] },
          { text: 'Their Pet’s Name', points: 11, aliases: ['dog name', 'pet name', 'cat name', 'fluffy'] },
          { text: 'Their Own Name', points: 7, aliases: ['first name', 'last name', 'username'] },
          { text: 'Favorite Sports Team', points: 4, aliases: ['sports team', 'city', '1111'] }
        ]
      },
      {
        id: 'svd-rpg-8',
        prompt: 'Name something RPG players spend way too long customizing before actually playing.',
        answers: [
          { text: 'Face / Hair / Appearance', points: 40, aliases: ['face', 'hair', 'hairstyle', 'character creator', 'sliders', 'nose', 'eyes'] },
          { text: 'Character Name', points: 24, aliases: ['name', 'username', 'naming'] },
          { text: 'Class / Starting Stats', points: 16, aliases: ['class', 'stats', 'build', 'race', 'skills'] },
          { text: 'Outfit / Armor Colors', points: 10, aliases: ['clothes', 'outfit', 'transmog', 'fashion', 'dye'] },
          { text: 'Graphics / Keybind Settings', points: 6, aliases: ['settings', 'graphics', 'fov', 'keybinds', 'mods'] },
          { text: 'Voice Pitch', points: 4, aliases: ['voice', 'grunt sound', 'tattoos'] }
        ]
      },
      {
        id: 'svd-coop-9',
        prompt: 'Name a game famous for ruining friendships.',
        answers: [
          { text: 'Mario Kart', points: 33, aliases: ['mario kart', 'blue shell'] },
          { text: 'Mario Party', points: 24, aliases: ['mario party', 'stealing stars'] },
          { text: 'Uno', points: 18, aliases: ['uno', 'draw four'] },
          { text: 'Monopoly', points: 12, aliases: ['monopoly', 'board games'] },
          { text: 'Overcooked', points: 8, aliases: ['overcooked', 'moving out', 'chained together'] },
          { text: 'Among Us / League Of Legends', points: 5, aliases: ['among us', 'league', 'league of legends', 'dokapon'] }
        ]
      },
      {
        id: 'svd-tabs-10',
        prompt: 'Name a browser tab almost everyone has open right now.',
        answers: [
          { text: 'YouTube', points: 35, aliases: ['youtube', 'twitch', 'video'] },
          { text: 'Email / Gmail', points: 23, aliases: ['gmail', 'email', 'inbox', 'outlook'] },
          { text: 'Google Search / Wiki', points: 16, aliases: ['google', 'wikipedia', 'reddit', 'game wiki'] },
          { text: 'Music / Spotify', points: 11, aliases: ['spotify', 'music', 'soundcloud'] },
          { text: 'Online Shopping / Amazon', points: 9, aliases: ['amazon', 'shopping', 'cart'] },
          { text: 'AI Chat / Docs / Work', points: 6, aliases: ['chatgpt', 'gemini', 'google docs', 'github', 'work'] }
        ]
      },
      {
        id: 'svd-streamer-11',
        prompt: 'Name a phrase every Twitch or YouTube streamer says 50 times a stream.',
        answers: [
          { text: '"Chat, Is This Real?" / "Hey Chat"', points: 34, aliases: ['chat', 'look at chat', 'what up chat', 'clip that'] },
          { text: '"Like & Subscribe!"', points: 25, aliases: ['subscribe', 'hit the bell', 'follow', 'twitch prime'] },
          { text: '"Thanks For The Sub / Gifted!"', points: 17, aliases: ['thanks for the sub', 'gifted subs', 'donos', 'bits', 'raid'] },
          { text: '"Let’s Goooo!"', points: 12, aliases: ['lets go', 'gg', 'poggers', 'locked in'] },
          { text: '"Can You Hear Me?"', points: 7, aliases: ['mic muted', 'audio check', 'brb'] },
          { text: '"One More Run"', points: 5, aliases: ['one more', 'no way', 'he is one shot'] }
        ]
      },
      {
        id: 'svd-phone-12',
        prompt: 'Name something that drains your phone battery way too fast.',
        answers: [
          { text: 'TikTok / Video Streaming', points: 34, aliases: ['tiktok', 'youtube', 'netflix', 'reels', 'videos'] },
          { text: 'Mobile Games', points: 23, aliases: ['games', 'gaming', 'pokemon go'] },
          { text: 'GPS / Maps Navigation', points: 17, aliases: ['maps', 'gps', 'google maps', 'location'] },
          { text: 'Max Screen Brightness', points: 12, aliases: ['brightness', 'screen on', 'flashlight'] },
          { text: 'Facetiming / Voice Calls', points: 8, aliases: ['facetime', 'discord mobile', 'zoom', 'camera'] },
          { text: 'Weak Signal / Hotspot', points: 6, aliases: ['hotspot', 'bluetooth', '5g', 'roaming', 'old battery'] }
        ]
      }
    ]
  },
  {
    id: 'builtin-survey-food-party',
    game: 'survey_showdown',
    title: 'Kitchen, Cravings & Party Survey',
    description: '13 tasty boards about pizza debates, midnight snacks, fast food, and house parties.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-11-09T00:00:00.000Z',
    questions: [
      {
        id: 'svf-pizza-1',
        prompt: 'Name the most popular pizza topping besides plain cheese.',
        answers: [
          { text: 'Pepperoni', points: 43, aliases: ['pepperoni'] },
          { text: 'Sausage', points: 19, aliases: ['italian sausage', 'meat'] },
          { text: 'Mushrooms', points: 14, aliases: ['mushroom', 'shrooms'] },
          { text: 'Peppers / Onions', points: 10, aliases: ['green peppers', 'bell peppers', 'onions', 'jalapenos'] },
          { text: 'Bacon / Ham', points: 8, aliases: ['bacon', 'ham', 'canadian bacon'] },
          { text: 'Pineapple / Olives', points: 6, aliases: ['pineapple', 'hawaiian', 'black olives', 'olives'] }
        ]
      },
      {
        id: 'svf-midnight-2',
        prompt: 'Name a snack people sneak out of the kitchen at 1:00 AM.',
        answers: [
          { text: 'Shredded Cheese / Cheese Slices', points: 31, aliases: ['cheese', 'shredded cheese', 'string cheese'] },
          { text: 'Cereal', points: 24, aliases: ['bowl of cereal', 'cereal'] },
          { text: 'Chips / Crackers', points: 18, aliases: ['chips', 'doritos', 'popcorn', 'pretzels', 'crackers'] },
          { text: 'Ice Cream / Cookies', points: 14, aliases: ['ice cream', 'cookies', 'oreos', 'chocolate', 'cake'] },
          { text: 'Cold Pizza / Leftovers', points: 8, aliases: ['pizza', 'cold pizza', 'leftovers'] },
          { text: 'Instant Ramen / Toast', points: 5, aliases: ['ramen', 'noodles', 'peanut butter', 'sandwich', 'toast'] }
        ]
      },
      {
        id: 'svf-drivethru-3',
        prompt: 'Name something annoying that happens in a fast-food drive-thru.',
        answers: [
          { text: 'Wrong Order / Missing Fries', points: 37, aliases: ['wrong order', 'missing item', 'forgot fries', 'forgot sauce', 'no napkins'] },
          { text: 'Ice Cream Machine Is Broken', points: 23, aliases: ['ice cream machine', 'shake machine broken', 'out of stock'] },
          { text: 'Car Ahead Orders For 12 People', points: 17, aliases: ['slow line', 'huge order', 'waiting forever', 'long line'] },
          { text: 'Broken / Crackly Speaker', points: 11, aliases: ['cant hear speaker', 'bad mic', 'static', 'repeating order'] },
          { text: 'Cold Fries', points: 7, aliases: ['cold food', 'soggy fries'] },
          { text: 'Dropping Coins / Card At Window', points: 5, aliases: ['dropping money', 'cant reach window', 'pulled too far'] }
        ]
      },
      {
        id: 'svf-drawer-4',
        prompt: 'Name something guaranteed to be inside every kitchen "junk drawer."',
        answers: [
          { text: 'Loose Batteries (Dead Or Alive)', points: 30, aliases: ['batteries', 'aa batteries'] },
          { text: 'Tape / Scissors', points: 24, aliases: ['scotch tape', 'duct tape', 'tape', 'scissors'] },
          { text: 'Pens & Dried-Out Markers', points: 18, aliases: ['pens', 'pencils', 'sharpie', 'markers'] },
          { text: 'Takeout Menus & Sauce Packets', points: 12, aliases: ['menus', 'soy sauce', 'ketchup packets', 'coupons'] },
          { text: 'Rubber Bands / Paperclips', points: 9, aliases: ['rubber bands', 'paperclips', 'twist ties', 'bread clips'] },
          { text: 'Mystery Keys / Screwdriver', points: 7, aliases: ['mystery key', 'old keys', 'screwdriver', 'allen wrench', 'matches'] }
        ]
      },
      {
        id: 'svf-debate-5',
        prompt: 'Name a food controversy that immediately starts an argument at dinner.',
        answers: [
          { text: 'Pineapple On Pizza', points: 42, aliases: ['pineapple', 'hawaiian pizza', 'pineapple pizza'] },
          { text: 'Is A Hot Dog A Sandwich?', points: 21, aliases: ['hot dog', 'is cereal soup', 'sandwich'] },
          { text: 'Well-Done Steak With Ketchup', points: 15, aliases: ['well done steak', 'steak temperature', 'ketchup on steak'] },
          { text: 'Cilantro (Tastes Like Soap)', points: 10, aliases: ['cilantro', 'pickles', 'mayonnaise'] },
          { text: 'Milk Before Cereal', points: 7, aliases: ['milk first', 'cereal milk'] },
          { text: 'Boneless Wings = Chicken Nuggets', points: 5, aliases: ['boneless wings', 'ranch vs blue cheese'] }
        ]
      },
      {
        id: 'svf-carnival-6',
        prompt: 'Name a food you smell the second you walk into a state fair or carnival.',
        answers: [
          { text: 'Funnel Cake / Fried Dough', points: 35, aliases: ['funnel cake', 'fried dough', 'churros', 'beignets', 'zeppole'] },
          { text: 'Popcorn / Kettle Corn', points: 25, aliases: ['popcorn', 'kettle corn'] },
          { text: 'Cotton Candy', points: 16, aliases: ['cotton candy', 'candy apples'] },
          { text: 'Corn Dogs / Hot Dogs', points: 12, aliases: ['corn dog', 'hot dogs', 'sausage and peppers'] },
          { text: 'Giant Turkey Legs / BBQ', points: 7, aliases: ['turkey leg', 'bbq', 'burgers'] },
          { text: 'Deep-Fried Oreos / Fries', points: 5, aliases: ['fried oreos', 'french fries', 'cheese curds'] }
        ]
      },
      {
        id: 'svf-taco-7',
        prompt: 'Name something people pile onto tacos or nachos.',
        answers: [
          { text: 'Shredded Cheese / Queso', points: 32, aliases: ['cheese', 'queso', 'cheddar'] },
          { text: 'Salsa / Hot Sauce', points: 23, aliases: ['salsa', 'pico de gallo', 'hot sauce'] },
          { text: 'Sour Cream', points: 16, aliases: ['sour cream', 'crema'] },
          { text: 'Guacamole / Avocado', points: 14, aliases: ['guac', 'guacamole', 'avocado'] },
          { text: 'Jalapeños', points: 9, aliases: ['jalapenos', 'peppers'] },
          { text: 'Cilantro / Lettuce & Onions', points: 6, aliases: ['lettuce', 'cilantro', 'onions', 'tomatoes', 'lime'] }
        ]
      },
      {
        id: 'svf-breakfast-8',
        prompt: 'Name a classic hot breakfast food.',
        answers: [
          { text: 'Eggs (Scrambled / Fried)', points: 34, aliases: ['eggs', 'omelette', 'scrambled eggs'] },
          { text: 'Bacon', points: 27, aliases: ['bacon', 'sausage'] },
          { text: 'Pancakes', points: 17, aliases: ['pancakes', 'flapjacks'] },
          { text: 'Waffles / French Toast', points: 11, aliases: ['waffles', 'french toast'] },
          { text: 'Hash Browns / Home Fries', points: 7, aliases: ['hash browns', 'potatoes', 'tater tots'] },
          { text: 'Oatmeal / Grits', points: 4, aliases: ['oatmeal', 'grits', 'biscuits and gravy'] }
        ]
      },
      {
        id: 'svf-sendback-9',
        prompt: 'Name a valid reason to send your dish back at a restaurant.',
        answers: [
          { text: 'Hair Or Bug In The Food', points: 39, aliases: ['hair', 'bug', 'fly', 'foreign object'] },
          { text: 'Raw / Undercooked Meat', points: 26, aliases: ['raw', 'undercooked', 'raw chicken', 'burnt', 'wrong temp'] },
          { text: 'Ice Cold When Meant To Be Hot', points: 16, aliases: ['cold', 'cold food', 'frozen middle'] },
          { text: 'Completely Wrong Dish', points: 11, aliases: ['wrong order', 'wrong meal'] },
          { text: 'Contains An Allergen You Asked Off', points: 5, aliases: ['allergy', 'nuts', 'dairy', 'gluten'] },
          { text: 'Dirty Plate / Spoiled Smell', points: 3, aliases: ['spoiled', 'rotten', 'dirty fork'] }
        ]
      },
      {
        id: 'svf-buffet-10',
        prompt: 'Name a rookie mistake at an all-you-can-eat buffet.',
        answers: [
          { text: 'Filling Up On Bread / Rice First', points: 38, aliases: ['bread', 'rolls', 'rice', 'pasta', 'carbs'] },
          { text: 'Chugging Huge Soda Immediately', points: 21, aliases: ['soda', 'drinking too much', 'fizzy drinks'] },
          { text: 'Piling Plate Too High On Trip #1', points: 17, aliases: ['eyes bigger than stomach', 'huge first plate', 'overeating'] },
          { text: 'Wearing Tight Jeans / Belt', points: 11, aliases: ['tight pants', 'skinny jeans', 'belt'] },
          { text: 'Eating Right Before Going', points: 8, aliases: ['snacking beforehand', 'eating lunch'] },
          { text: 'Skipping Prime Rib / Seafood', points: 5, aliases: ['cheap items', 'salad', 'skipping crab legs'] }
        ]
      },
      {
        id: 'svf-party-11',
        prompt: 'Name a polite excuse people use to leave a party early.',
        answers: [
          { text: 'Early Work / Plans Tomorrow', points: 37, aliases: ['work early', 'early morning', 'up early'] },
          { text: 'Need To Let The Dog Out / Pet', points: 23, aliases: ['dog', 'feed cat', 'pet', 'babysitter'] },
          { text: 'Not Feeling Well / Headache', points: 17, aliases: ['tired', 'headache', 'migraine', 'feeling sick'] },
          { text: 'Irish Goodbye (Sneak Out Quietly)', points: 11, aliases: ['irish goodbye', 'just leave', 'ghost'] },
          { text: 'Long Drive Home', points: 7, aliases: ['beat traffic', 'long drive', 'uber surge'] },
          { text: 'Partner Wants To Go', points: 5, aliases: ['spouse', 'ride is leaving', 'designated driver'] }
        ]
      },
      {
        id: 'svf-bbq-12',
        prompt: 'Name something you always see at a backyard summer cookout.',
        answers: [
          { text: 'Burgers & Hot Dogs On Grill', points: 38, aliases: ['burgers', 'hot dogs', 'grill', 'bbq', 'dad with tongs'] },
          { text: 'Cooler Full Of Ice & Drinks', points: 22, aliases: ['cooler', 'beer', 'lemonade', 'soda'] },
          { text: 'Potato Salad / Coleslaw / Chips', points: 15, aliases: ['potato salad', 'macaroni salad', 'chips and dip', 'coleslaw'] },
          { text: 'Watermelon / Corn On The Cob', points: 12, aliases: ['watermelon', 'corn', 'corn on the cob'] },
          { text: 'Lawn Chairs / Cornhole Game', points: 8, aliases: ['lawn chairs', 'cornhole', 'frisbee', 'music speaker'] },
          { text: 'Mosquitoes / Flies / Bees', points: 5, aliases: ['bugs', 'flies', 'mosquitoes', 'ants'] }
        ]
      },
      {
        id: 'svf-coffee-13',
        prompt: 'Name something people add to their morning coffee.',
        answers: [
          { text: 'Milk / Creamer', points: 41, aliases: ['milk', 'cream', 'creamer', 'half and half', 'oat milk'] },
          { text: 'Sugar / Sweetener', points: 28, aliases: ['sugar', 'splenda', 'stevia', 'honey'] },
          { text: 'Vanilla / Caramel Syrup', points: 14, aliases: ['vanilla', 'caramel', 'hazelnut', 'pumpkin spice', 'syrup'] },
          { text: 'Ice', points: 9, aliases: ['ice', 'iced coffee'] },
          { text: 'Whipped Cream / Cinnamon', points: 5, aliases: ['whipped cream', 'cinnamon', 'cocoa'] },
          { text: 'Extra Espresso Shot', points: 3, aliases: ['espresso', 'nothing', 'protein'] }
        ]
      }
    ]
  },
  {
    id: 'builtin-survey-work-pop',
    game: 'survey_showdown',
    title: 'Work, School & Pop Culture Survey',
    description: '13 fast-moving boards covering office survival, horror movie clichés, travel, and chores.',
    author: 'PartyNode Official',
    familyFriendly: true,
    builtIn: true,
    updatedAt: '2026-11-09T00:00:00.000Z',
    questions: [
      {
        id: 'svw-resume-1',
        prompt: 'Name something people exaggerate or lie about on a job resume.',
        answers: [
          { text: 'Excel / Software Proficiency', points: 33, aliases: ['excel', 'spreadsheets', 'computer skills', 'coding'] },
          { text: 'Speaking A Second Language', points: 24, aliases: ['spanish', 'foreign language', 'fluent', 'bilingual'] },
          { text: 'Past Job Title / Responsibilities', points: 19, aliases: ['job title', 'manager', 'leadership', 'duties'] },
          { text: 'Employment Dates (Hiding Gaps)', points: 11, aliases: ['dates', 'how long worked', 'gaps'] },
          { text: 'GPA / Degree / Certifications', points: 8, aliases: ['gpa', 'college', 'education'] },
          { text: 'Volunteer Work / Hobbies', points: 5, aliases: ['hobbies', 'volunteering', 'team player'] }
        ]
      },
      {
        id: 'svw-horror-2',
        prompt: 'Name a dumb mistake characters always make in horror movies.',
        answers: [
          { text: '"Let’s Split Up!"', points: 38, aliases: ['split up', 'separate', 'go alone'] },
          { text: 'Investigating A Creepy Noise In Basement', points: 25, aliases: ['check basement', 'hello who is there', 'follow noise', 'dark room'] },
          { text: 'Tripping & Falling While Running', points: 15, aliases: ['tripping', 'falling down', 'twist ankle'] },
          { text: 'Running Upstairs Instead Of Front Door', points: 10, aliases: ['run upstairs', 'attic', 'hiding in closet'] },
          { text: 'Dropping Keys / Car Won’t Start', points: 7, aliases: ['drop keys', 'car wont start', 'no cell signal'] },
          { text: 'Not Finishing Off The Villain', points: 5, aliases: ['dropping weapon', 'turning back on killer'] }
        ]
      },
      {
        id: 'svw-airport-3',
        prompt: 'Name the most stressful part of flying through an airport.',
        answers: [
          { text: 'TSA Security Line', points: 36, aliases: ['security', 'tsa', 'taking shoes off', 'bag check'] },
          { text: 'Flight Delays / Cancellations', points: 24, aliases: ['delay', 'delayed flight', 'cancelled', 'missing connection'] },
          { text: 'Lost Or Overweight Luggage', points: 15, aliases: ['lost bag', 'baggage claim', 'heavy suitcase', 'bag fees'] },
          { text: 'Finding Gate / Almost Missing Boarding', points: 12, aliases: ['running to gate', 'late', 'wrong terminal'] },
          { text: 'Middle Seat / Cramped Legroom', points: 8, aliases: ['middle seat', 'crying baby', 'turbulence'] },
          { text: 'Airport Parking / $9 Water Bottle', points: 5, aliases: ['parking', 'traffic', 'expensive food', 'forgot passport'] }
        ]
      },
      {
        id: 'svw-chores-4',
        prompt: 'Name a household chore almost everyone procrastinates doing.',
        answers: [
          { text: 'Folding & Putting Away Clean Laundry', points: 35, aliases: ['laundry', 'folding clothes', 'putting clothes away'] },
          { text: 'Washing Dishes / Pots & Pans', points: 26, aliases: ['dishes', 'soaking pan', 'unloading dishwasher'] },
          { text: 'Scrubbing The Bathroom / Toilet', points: 18, aliases: ['bathroom', 'cleaning toilet', 'shower'] },
          { text: 'Vacuuming / Mopping Floors', points: 10, aliases: ['vacuuming', 'mopping', 'sweeping', 'dusting'] },
          { text: 'Taking Out Trash / Recycling', points: 6, aliases: ['trash', 'garbage'] },
          { text: 'Mowing Lawn / Cleaning Fridge', points: 5, aliases: ['yard work', 'mowing', 'cleaning fridge'] }
        ]
      },
      {
        id: 'svw-resolution-5',
        prompt: 'Name a New Year’s resolution most people abandon by February.',
        answers: [
          { text: 'Going To The Gym / Exercising', points: 42, aliases: ['gym', 'workout', 'lose weight', 'running', 'fitness'] },
          { text: 'Eating Healthy / Dieting', points: 24, aliases: ['diet', 'no sugar', 'eat vegetables', 'cook at home'] },
          { text: 'Saving Money / Budgeting', points: 14, aliases: ['save money', 'stop spending', 'budget'] },
          { text: 'Reading More Books', points: 8, aliases: ['read more', 'books', 'learn language'] },
          { text: 'Less Screen Time / Social Media', points: 7, aliases: ['less phone', 'quit social media', 'sleep earlier'] },
          { text: 'Quitting Bad Habits / Soda / Caffeine', points: 5, aliases: ['quit smoking', 'dry january', 'quit soda'] }
        ]
      },
      {
        id: 'svw-meeting-6',
        prompt: 'Name something people secretly do during a boring Zoom or team meeting.',
        answers: [
          { text: 'Scroll Phone / Social Media', points: 35, aliases: ['phone', 'tiktok', 'reddit', 'texting'] },
          { text: 'Online Shopping', points: 22, aliases: ['amazon', 'shopping', 'browsing'] },
          { text: 'Answer Unrelated Emails / Slack', points: 17, aliases: ['other work', 'emails', 'chatting Coworkers'] },
          { text: 'Eat Snacks Off-Camera', points: 12, aliases: ['eat', 'lunch', 'snacks', 'cooking'] },
          { text: 'Play Games / Wordle', points: 9, aliases: ['solitaire', 'wordle', 'video games', 'chess'] },
          { text: 'Zone Out / Doodle / Wear Pajama Pants', points: 5, aliases: ['doodle', 'nap', 'zone out', 'chores'] }
        ]
      },
      {
        id: 'svw-travel-7',
        prompt: 'Name something people realize they forgot to pack only after arriving on vacation.',
        answers: [
          { text: 'Toothbrush / Toothpaste', points: 34, aliases: ['toothbrush', 'toothpaste', 'floss'] },
          { text: 'Phone Charger', points: 28, aliases: ['charger', 'charging cable', 'adapter'] },
          { text: 'Underwear / Extra Socks', points: 14, aliases: ['underwear', 'socks', 'pajamas'] },
          { text: 'Deodorant / Hairbrush', points: 10, aliases: ['deodorant', 'razor', 'comb', 'shampoo'] },
          { text: 'Swimsuit / Sunglasses', points: 8, aliases: ['swimsuit', 'sunglasses', 'jacket'] },
          { text: 'Medication / Pain Reliever', points: 6, aliases: ['advil', 'medicine', 'contacts', 'passport'] }
        ]
      },
      {
        id: 'svw-superhero-8',
        prompt: 'Name a superpower everyone wishes they had in everyday life.',
        answers: [
          { text: 'Teleportation (No Commute!)', points: 34, aliases: ['teleport', 'teleportation', 'portal'] },
          { text: 'Flying', points: 24, aliases: ['fly', 'flight'] },
          { text: 'Time Control / Pause Time', points: 16, aliases: ['stop time', 'time travel', 'rewind time'] },
          { text: 'Invisibility', points: 11, aliases: ['invisible', 'invisibility'] },
          { text: 'Mind Reading / Telekinesis', points: 9, aliases: ['read minds', 'telepathy', 'telekinesis'] },
          { text: 'Super Speed / Instant Healing', points: 6, aliases: ['super speed', 'healing', 'shapeshifting'] }
        ]
      },
      {
        id: 'svw-school-9',
        prompt: 'Name something students pray the teacher forgets about.',
        answers: [
          { text: 'Collecting Last Night’s Homework', points: 45, aliases: ['homework', 'assignment', 'worksheet'] },
          { text: 'Pop Quiz / Scheduled Test', points: 25, aliases: ['quiz', 'test', 'exam'] },
          { text: 'Class Presentations', points: 14, aliases: ['presentation', 'speech', 'calling on me'] },
          { text: 'Group Project Deadlines', points: 8, aliases: ['project', 'reading check'] },
          { text: 'Assigning Weekend Homework', points: 5, aliases: ['weekend homework', 'essay'] },
          { text: 'Seating Chart Change', points: 3, aliases: ['seating chart', 'detention'] }
        ]
      },
      {
        id: 'svw-checkout-10',
        prompt: 'Name an impulse item placed right next to grocery store checkout lanes.',
        answers: [
          { text: 'Candy Bars / Chocolate', points: 38, aliases: ['candy', 'chocolate', 'snickers', 'm&ms'] },
          { text: 'Chewing Gum / Mints', points: 26, aliases: ['gum', 'tic tacs', 'mints'] },
          { text: 'Cold Soda / Energy Drinks', points: 16, aliases: ['soda', 'coke', 'drinks', 'water'] },
          { text: 'Gossip Magazines', points: 9, aliases: ['magazines', 'tabloids'] },
          { text: 'Chapstick / Lip Balm', points: 6, aliases: ['chapstick', 'lighter', 'batteries'] },
          { text: 'Gift Cards / Chips', points: 5, aliases: ['gift cards', 'small chips', ' beef jerky'] }
        ]
      },
      {
        id: 'svw-doctor-11',
        prompt: 'Name something you always see in a dentist or doctor’s waiting room.',
        answers: [
          { text: '5-Year-Old Magazines', points: 37, aliases: ['magazines', 'highlights magazine', 'old magazines'] },
          { text: 'Muted TV Playing Daytime News / HGTV', points: 24, aliases: ['tv', 'television', 'weather channel', 'hgtv'] },
          { text: 'Hand Sanitizer & Tissue Boxes', points: 15, aliases: ['sanitizer', 'tissues', 'masks'] },
          { text: 'Fish Tank / Fake Houseplant', points: 11, aliases: ['fish tank', 'aquarium', 'fake plant', 'plants'] },
          { text: 'Wire Bead Maze Toy For Kids', points: 8, aliases: ['kids toys', 'bead maze', 'blocks'] },
          { text: 'Clipboard Sign-In Window', points: 5, aliases: ['clipboard', 'pamphlets', 'posters'] }
        ]
      },
      {
        id: 'svw-car-12',
        prompt: 'Name something people keep inside their car’s glove compartment or center console.',
        answers: [
          { text: 'Registration & Insurance Card', points: 39, aliases: ['registration', 'insurance', 'manual', 'papers'] },
          { text: 'Fast-Food Napkins', points: 24, aliases: ['napkins', 'tissues', 'wet wipes'] },
          { text: 'Sunglasses', points: 13, aliases: ['sunglasses', 'glasses'] },
          { text: 'Loose Coins / Quarters', points: 10, aliases: ['change', 'coins', 'quarters'] },
          { text: 'Phone Charging Cord', points: 8, aliases: ['charger', 'aux cord', 'adapter'] },
          { text: 'Tire Gauge / Flashlight / Gum', points: 6, aliases: ['flashlight', 'tire gauge', 'ice scraper', 'gum', 'hand sanitizer'] }
        ]
      },
      {
        id: 'svw-break-13',
        prompt: 'Name an appliance that seems to break at the worst possible moment.',
        answers: [
          { text: 'Printer (When You’re In A Rush)', points: 31, aliases: ['printer', 'ink'] },
          { text: 'Air Conditioner (During Heatwave)', points: 24, aliases: ['ac', 'air conditioner', 'heater', 'furnace'] },
          { text: 'Refrigerator', points: 17, aliases: ['fridge', 'freezer'] },
          { text: 'Washing Machine / Dryer', points: 13, aliases: ['washer', 'dryer', 'dishwasher'] },
          { text: 'Car Battery', points: 9, aliases: ['car', 'battery', 'water heater'] },
          { text: 'Wi-Fi Router / Coffee Maker', points: 6, aliases: ['wifi', 'router', 'coffee maker', 'toilet'] }
        ]
      }
    ]
  }
];
