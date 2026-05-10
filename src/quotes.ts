export interface Quote {
  quote: string;
  author: string;
  lang: "en" | "ar";
}

export const QUOTES: Quote[] = [
  // ── English ──────────────────────────────────────────────────────────────
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    lang: "en",
  },
  {
    quote: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein",
    lang: "en",
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    lang: "en",
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    lang: "en",
  },
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    lang: "en",
  },
  {
    quote:
      "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    lang: "en",
  },
  {
    quote:
      "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    author: "Mother Teresa",
    lang: "en",
  },
  {
    quote: "When you reach the end of your rope, tie a knot in it and hang on.",
    author: "Franklin D. Roosevelt",
    lang: "en",
  },
  {
    quote:
      "Always remember that you are absolutely unique. Just like everyone else.",
    author: "Margaret Mead",
    lang: "en",
  },
  {
    quote:
      "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson",
    lang: "en",
  },
  {
    quote:
      "You will face many defeats in life, but never let yourself be defeated.",
    author: "Maya Angelou",
    lang: "en",
  },
  {
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    lang: "en",
  },
  {
    quote:
      "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln",
    lang: "en",
  },
  {
    quote: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller",
    lang: "en",
  },
  {
    quote:
      "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    author: "Thomas A. Edison",
    lang: "en",
  },
  {
    quote:
      "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.",
    author: "Dr. Seuss",
    lang: "en",
  },
  {
    quote: "If you look at what you have in life, you'll always have more.",
    author: "Oprah Winfrey",
    lang: "en",
  },
  {
    quote:
      "If you want to live a happy life, tie it to a goal, not to people or things.",
    author: "Albert Einstein",
    lang: "en",
  },
  {
    quote:
      "Money and success don't change people; they merely amplify what is already there.",
    author: "Will Smith",
    lang: "en",
  },
  {
    quote:
      "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
    lang: "en",
  },
  {
    quote: "Not how long, but how well you have lived is the main thing.",
    author: "Seneca",
    lang: "en",
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    lang: "en",
  },
  {
    quote:
      "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    author: "Robert Louis Stevenson",
    lang: "en",
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    lang: "en",
  },
  {
    quote: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    lang: "en",
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    lang: "en",
  },
  {
    quote: "Keep your eyes on the stars, and your feet on the ground.",
    author: "Theodore Roosevelt",
    lang: "en",
  },
  {
    quote:
      "Too many of us are not living our dreams because we are living our fears.",
    author: "Les Brown",
    lang: "en",
  },
  {
    quote:
      "I alone cannot change the world, but I can cast a stone across the water to create many ripples.",
    author: "Mother Teresa",
    lang: "en",
  },
  {
    quote: "Nothing is impossible, the word itself says 'I'm possible'!",
    author: "Audrey Hepburn",
    lang: "en",
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    lang: "en",
  },
  {
    quote: "Act as if what you do makes a difference. It does.",
    author: "William James",
    lang: "en",
  },
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    lang: "en",
  },
  {
    quote: "You are never too old to set another goal or to dream a new dream.",
    author: "Malala Yousafzai",
    lang: "en",
  },
  {
    quote: "Reading is to the mind what exercise is to the body.",
    author: "Joseph Addison",
    lang: "en",
  },
  {
    quote:
      "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
    lang: "en",
  },
  {
    quote: "Whatever the mind of man can conceive and believe, it can achieve.",
    author: "Napoleon Hill",
    lang: "en",
  },
  {
    quote: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein",
    lang: "en",
  },
  {
    quote:
      "Two roads diverged in a wood, and I took the one less traveled by, and that has made all the difference.",
    author: "Robert Frost",
    lang: "en",
  },
  {
    quote: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
    lang: "en",
  },

  // ── Arabic ───────────────────────────────────────────────────────────────
  { quote: "على قدر أهل العزم تأتي العزائم.", author: "المتنبي", lang: "ar" },
  {
    quote: "وإذا كانت النفوس كباراً تعبت في مرادها الأجسام.",
    author: "المتنبي",
    lang: "ar",
  },
  {
    quote: "أعزّ مكانٍ في الدنى سرجُ سابحٍ وخيرُ جليسٍ في الزمان كتاب.",
    author: "المتنبي",
    lang: "ar",
  },
  { quote: "تكلّم حتى أراك.", author: "سقراط", lang: "ar" },
  {
    quote: "الجاهل عدو نفسه، فكيف يكون صديق غيره.",
    author: "علي بن أبي طالب",
    lang: "ar",
  },
  {
    quote: "أنا عبد من علّمني حرفاً واحداً.",
    author: "علي بن أبي طالب",
    lang: "ar",
  },
  {
    quote: "المرء بأصغريه: قلبه ولسانه.",
    author: "علي بن أبي طالب",
    lang: "ar",
  },
  {
    quote: "ما قلّ وكفى خير مما كثر وألهى.",
    author: "علي بن أبي طالب",
    lang: "ar",
  },
  {
    quote: "كن قريبًا من أصحاب العقول، فهم مرايا الروح.",
    author: "جبران خليل جبران",
    lang: "ar",
  },
  {
    quote: "الحياة مدرسة والألم أكبر أساتذتها.",
    author: "جبران خليل جبران",
    lang: "ar",
  },
  {
    quote: "إن الحياة تعريةٌ للروح لا للجسد.",
    author: "جبران خليل جبران",
    lang: "ar",
  },
  {
    quote: "الناس كالنبات، لكل منهم بيئته التي ينبت فيها.",
    author: "نجيب محفوظ",
    lang: "ar",
  },
  {
    quote: "إن لم تجد من تحبّه فكن أنت من يستحق أن يُحبّ.",
    author: "نجيب محفوظ",
    lang: "ar",
  },
  { quote: "الحرية لا تُعطى، تُؤخذ.", author: "نجيب محفوظ", lang: "ar" },
  {
    quote: "على هذه الأرض ما يستحق الحياة.",
    author: "محمود درويش",
    lang: "ar",
  },
  {
    quote: "نحن نملك الأمل بقدر ما نملك الذاكرة.",
    author: "محمود درويش",
    lang: "ar",
  },
  {
    quote: "الوطن هو أن تولد حيث تريد أن تموت.",
    author: "محمود درويش",
    lang: "ar",
  },
  {
    quote: "أنثى تستطيع أن تصنع من رجل شاعراً أو مجنوناً.",
    author: "نزار قباني",
    lang: "ar",
  },
  { quote: "الشعر صناعة إنسانية خالصة.", author: "نزار قباني", lang: "ar" },
  { quote: "الكتابة لا تُؤجَّل.", author: "نزار قباني", lang: "ar" },
];

export function randomQuote(lang?: "en" | "ar"): Quote {
  const pool = lang ? QUOTES.filter((q) => q.lang === lang) : QUOTES;
  return pool[Math.floor(Math.random() * pool.length)];
}
