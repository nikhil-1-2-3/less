export const birthdayConfig = {
  birthdayPersonName: "Ishika", // Birthday Queen's Name
  senderName: "Nikhil",
  tagline: "The Cutest Birthday Adventure Across The Miles! 🎀✨",
  
  // Audio Config
  audio: {
    bgmUrl: null, // Uses built-in Web Audio synthesized dreamy birthday melody
    volume: 0.3,
  },

  // STAGE 01 — THE SECRET ENVELOPE
  stage01: {
    greeting: "Hey, Ishika! 💗",
    subheading: "Even across all the miles, someone prepared a magical little world just for you.",
    questionText: "Are you ready to discover your birthday surprise?",
    buttonText: "OPEN MY SURPRISE 💌",
    dodgingButtonText: "Not ready yet! 🙈",
  },

  // STAGE 02 — THE BESTIE PERSONALITY TEST
  stage02: {
    title: "The Bestie Personality Quiz 🧸",
    subtitle: "Answer these 4 cute questions to unlock the secret bakery!",
    scanTitle: "ANALYZING BESTIE CUTENESS...",
    scanSteps: [
      "Scanning bestie energy...",
      "Measuring sparkle levels across the distance...",
      "Calculating sweetness quotient...",
      "Result: 100% BIRTHDAY ROYALTY 👑🎀"
    ],
    questions: [
      {
        id: 1,
        question: "Who is the official Birthday Royalty today?",
        type: "correct_answer",
        options: [
          { text: "Ishika (The absolute queen ✨)", isCorrect: true, emoji: "👑" },
          { text: "A random unicorn in space 🦄", isCorrect: false, emoji: "🌌" },
          { text: "The sleepy panda next door 🐼", isCorrect: false, emoji: "💤" },
          { text: "Some alien from Mars 👽", isCorrect: false, emoji: "🚀" }
        ],
        successMessage: "Correct! All hail Queen Ishika! 👑💖",
        retryMessage: "Hehe, try again bestie! We both know who the queen is! 🎀",
      },
      {
        id: 2,
        question: "How awesome is our long-distance friendship?",
        type: "correct_answer",
        options: [
          { text: "100%", isCorrect: false, emoji: "🌸" },
          { text: "1,000,000%", isCorrect: false, emoji: "✨" },
          { text: "Infinity + 9999% Beyond 🚀", isCorrect: true, emoji: "💖" },
          { text: "Off the charts cute! 📊", isCorrect: true, emoji: "🔥" }
        ],
        successMessage: "BINGO! Distance means nothing when bestie energy is 100%! 💥💓",
        retryMessage: "Aww come on, don't be modest! Aim higher! 🎀",
      },
      {
        id: 3,
        question: "What is the secret formula for our virtual friendship?",
        type: "correct_answer",
        options: [
          { text: "Late night calls, infinite memes & sharing everything 📱🍓", isCorrect: true, emoji: "🍰" },
          { text: "Eating raw onions on Zoom 🧅", isCorrect: false, emoji: "🤢" },
          { text: "Doing homework on a Saturday 📚", isCorrect: false, emoji: "😩" },
          { text: "Staring at a blank wall 🧱", isCorrect: false, emoji: "👀" }
        ],
        successMessage: "Exactly! Memes, late night chats & sweet vibes forever! 🧁✨",
        retryMessage: "Hehe, nope! Think about our daily chats! 🎀",
      },
      {
        id: 4,
        question: "Which adorable companion matches your mood right now?",
        type: "preference",
        options: [
          { text: "Fluffy Bunny with Bows 🐰", emoji: "🐰" },
          { text: "Cozy Teddy Bear 🧸", emoji: "🧸" },
          { text: "Sparkly Pink Kitten 🐱", emoji: "🐱" },
          { text: "Dreamy Strawberry 🍓", emoji: "🍓" }
        ],
        successMessage: "Awww! That character is totally your twin! 💕",
      }
    ]
  },

  // STAGE 03 — THE MAGICAL CAKE ROOM
  stage03: {
    title: "The Dreamy Birthday Bakery 🎂",
    subtitle: "Custom-design your birthday cake, light the candles, and make a wish!",
    flavors: [
      { id: "strawberry", name: "Strawberry Dream", color: "#FF75AA", topColor: "#FFB6D5", frosting: "#FFFFFF" },
      { id: "vanilla", name: "Vanilla Glaze", color: "#FFF8F0", topColor: "#FFDDEE", frosting: "#F28CB5" },
      { id: "chocolate", name: "Berry Chocolate", color: "#793D5C", topColor: "#F28CB5", frosting: "#FF75AA" },
      { id: "matcha", name: "Matcha Blossom", color: "#D4EDDA", topColor: "#FFB6D5", frosting: "#FFFFFF" },
      { id: "lavender", name: "Lavender Velvet", color: "#E8DFFF", topColor: "#F28CB5", frosting: "#FFF8F0" }
    ],
    decorations: [
      { id: "strawberries", name: "Fresh Strawberries 🍓", icon: "🍓" },
      { id: "sprinkles", name: "Heart Sprinkles 💕", icon: "💕" },
      { id: "bows", name: "Coquette Bows 🎀", icon: "🎀" },
      { id: "stars", name: "Golden Stars ✨", icon: "✨" },
      { id: "bunnies", name: "Sugar Bunnies 🐰", icon: "🐰" }
    ],
    candleColors: [
      { id: "rosegold", name: "Rose Gold", color: "#F28CB5", flame: "#FFD700" },
      { id: "lavender", name: "Lavender Glow", color: "#E8DFFF", flame: "#FF75AA" },
      { id: "strawberry", name: "Strawberry Pink", color: "#FF75AA", flame: "#FFA500" },
      { id: "rainbow", name: "Rainbow Magic", color: "#FFB6D5", flame: "#00FFFF" }
    ],
    wishPrompt: "Write down your secret birthday wish below...",
    wishPlaceholder: "I wish for infinite happiness, success & for us to meet soon...",
    instructionSteps: [
      "Step 1: Pick your cake flavor & toppings",
      "Step 2: Choose candle color",
      "Step 3: Click to light candles 🔥",
      "Step 4: Type your secret wish ✨",
      "Step 5: Blow out candles to unlock Stage 4! 💨"
    ]
  },

  // STAGE 04 — THE FRIENDSHIP MEMORY GARDEN (LONG DISTANCE BESTIES THEME)
  stage04: {
    title: "Long-Distance Bestie Scrapbook 📱✈️",
    subtitle: "Distance means so little when a friendship means so much!",
    memories: [
      {
        id: 1,
        title: "Late Night Calls & Memes",
        date: "2:00 AM Chats",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        caption: "Miles apart, but talking on video call until 2 AM feels like sitting in the same room! ☕💬",
        sticker: "📱",
        rotation: -4,
      },
      {
        id: 2,
        title: "Counting Miles, Sharing Hearts",
        date: "Across The Map",
        image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
        caption: "No matter how many kilometers lie between us, you're always my #1 bestie! 📍💖",
        sticker: "🗺️",
        rotation: 3,
      },
      {
        id: 3,
        title: "Virtual Movie & Tea Nights",
        date: "Cozy Sync",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        caption: "Watching movies in sync, sharing playlist recommendations, and sending 100 reels a day! 🍿🎧",
        sticker: "🎬",
        rotation: -2,
      },
      {
        id: 4,
        title: "The Day We Finally Meet!",
        date: "Future Core Memory",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
        caption: "One day soon, we are finally going to meet in real life, give each other a huge hug, and celebrate! 🥳🎀",
        sticker: "✨",
        rotation: 5,
      }
    ],
    memoryChallenge: {
      question: "Which virtual bestie memory means the most to us?",
      options: [
        "Every single late night chat & call 💕",
        "Sending memes & laughing endlessly 📱",
        "The excitement of planning when we meet ✈️",
        "All of the above (Infinity & beyond!) ✨"
      ],
      rewardMessage: "Correct! Distance has got nothing on our friendship! ✨💖"
    }
  },

  // STAGE 05 — THE SECRET GIFT LAB
  stage05: {
    title: "The Secret Gift Vault 🎁",
    subtitle: "Click each pink gift box to unwrap your surprises! (PS: Look out for hidden easter eggs 🧸✨)",
    boxes: [
      {
        id: "gift1",
        name: "Sweet Compliments Box",
        ribbonColor: "#FF75AA",
        icon: "💌",
        title: "A Sweet Reminder For Ishika 🌸",
        content: "Even though we live far apart, your kindness, sweet energy, and sense of humor make my day brighter every time we talk. You are truly one of a kind!",
        badge: "Compliment #1"
      },
      {
        id: "gift2",
        name: "Bestie Voucher Pass",
        ribbonColor: "#E8DFFF",
        icon: "📜",
        title: "Official Long-Distance Pass 🎟️",
        content: "This voucher entitles you to: 1x GIANT REAL-LIFE HUG when we finally meet, 100x Late Night Calls, and unlimited meme-sharing rights for life!",
        badge: "VIP Pass"
      },
      {
        id: "gift3",
        name: "Heartfelt Birthday Wish",
        ribbonColor: "#F28CB5",
        icon: "💖",
        title: "A Wish For Your Year Ahead 🌠",
        content: "May this new age bring you top grades, amazing new adventures, peace of mind, good health, and everything your heart desires!",
        badge: "Special Wish"
      }
    ],
    secretBox: {
      id: "giftSecret",
      name: "SECRET MAGICAL GIFT STAR 🌟",
      ribbonColor: "#FFD700",
      icon: "👑",
      title: "YOU FOUND THE SECRET GIFT! 🌟✨",
      content: "Woah Ishika! You found the hidden star! You get a secret bonus gift: 10,000 virtual hugs & a guarantee that we will celebrate your next birthday together!",
      badge: "Secret Unlocked!"
    }
  },

  // STAGE 06 — THE GRAND BIRTHDAY UNIVERSE
  stage06: {
    title: "HAPPY BIRTHDAY",
    name: "ISHIKA! 🎂💗",
    subheading: "Welcome to your grand celebration! You are so deeply loved and cherished.",
    typewriterLetter: `Dearest Ishika,

Happy Birthday! 🌸

Even though we haven't met in person yet and live far apart, having you as a friend has been such a wonderful blessing. You have this amazing way of making every day brighter with your smiles, messages, and sweet energy.

Distance is just a number when a bond is this genuine. I am so grateful for all our late-night chats, shared jokes, music recommendations, and endless support.

As you step into this beautiful new chapter of your life, I hope it brings you endless laughter, success in everything you do, wonderful adventures, and everything your heart wishes for.

And I can't wait for the day we finally meet in real life to celebrate properly!

Happy Birthday, Queen Ishika! Keep ruling the world and shining bright! 👑💖✨

With all my bestie love,
- Nikhil 🎀`,
    confettiBurstText: "LET'S CELEBRATE AGAIN 🎉",
    replayText: "REPLAY OUR ADVENTURE ✨",
    readLetterText: "READ YOUR SECRET LETTER 💌",
  },

  // Floating micro-toast messages (Trick G)
  toastMessages: [
    "Sending extra birthday hugs to Ishika... 🫂💗",
    "A little sparkle just for Ishika! ✨",
    "Bestie magic across the miles! 🪄🎀",
    "Distance means nothing to us! 🍓",
    "Keep shining, birthday star Ishika! 🌟",
    "Cuteness levels off the charts! 📈💖"
  ]
};
