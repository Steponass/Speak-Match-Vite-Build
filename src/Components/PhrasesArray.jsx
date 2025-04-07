// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    id: "presentation-general",
    context: "professional",
    category: "Presentation",
    function: "General",
    targetPhrases1: {
      category: "Intro",
      phrases: [
        "I'm glad to be here today",
        "I'm excited to share my thoughts with you",
        "I'm honored to be here",
      ],
    },
    targetPhrases2: {
      category: "Transition",
      phrases: [
        "Let’s move to the next point",
        "Next I’d like to focus on",
        "Now let's turn our attention to",
      ],
    },
    targetPhrases3: {
      category: "End",
      phrases: [
        "Let me summarize our main ideas",
        "To conclude, let’s recap briefly",
        "Thanks, and I welcome your thoughts",
      ],
    },
  },

  {
    id: "meeting-discussion",
    context: "professional",
    category: "Meeting",
    function: "Discussion",
    targetPhrases1: {
      category: "Agree",
      phrases: [
        "I'm with you on this",
        "I couldn't agree more",
        "I'm on board with that",
      ],
    },
    targetPhrases2: {
      category: "Disagree",
      phrases: [
        "I see it differently",
        "I'm not quite convinced",
      ],
    },
    targetPhrases3: {
      category: "Ask",
      phrases: [
        "What's your take on this?",
        "How do you feel about it?",
        "Where do you stand on this",
      ],
    },
    targetPhrases4: {
      category: "Suggest",
      phrases: [
        "We could consider",
        "We might want to try",
      ],
    },
  },

  {
    id: "meeting-leading",
    context: "professional",
    category: "Meeting",
    function: "Leading",
    targetPhrases1: {
      category: "Stay on topic",
      phrases: [
        "Let's stay on topic",
        "We're getting off topic",
        "Let's stick with the agenda",
      ],
    },
    targetPhrases2: {
      category: "Invite",
      phrases: [
        "Feel free to contribute your insights",
        "Please share your perspectives",
        "The floor is open for discussion",
      ],
    },
    targetPhrases3: {
      category: "Transition",
      phrases: [
        "Let’s shift gears to",
        "Moving onto our next item",
        "Shifting our attention to",
      ],
    },
    targetPhrases4: {
      category: "Ask to clarify",
      phrases: [
        "Can you expand on that?",
        "Could you unpack that a bit?",
        "Can you break it down for us?",
      ],
    },
  },

  // End of PhrasesArray
];



/*   Contracted/non-contracted 

  {
    id: "presentation-general",
    context: "professional",
    category: "Presentation",
    function: "General",
    targetPhrases1: {
      category: "Intro",
      phrases: [
        {contracted: "I'm glad to be here today", nonContracted: "I am glad to be here today"},
        {contracted: "I'm excited to share my thoughts with you", nonContracted: "I am excited to share my thoughts with you"},
        {contracted: "I'm honored to be here", nonContracted: "I am honored to be here"},
      ],
    },
    targetPhrases2: {
      category: "Transition",
      phrases: [
        {contracted: "Let’s move to the next point", nonContracted: "Let us move to the next point"},
        {contracted: "Next I’d like to focus on", nonContracted: "Next I would like to focus on"},
        {contracted: "Now let's turn our attention to", nonContracted: "Now let us turn our attention to"},
      ],
    },
    targetPhrases3: {
      category: "End",
      phrases: [
        {contracted: "Let me summarize our main ideas", nonContracted: "Let me summarize our main ideas"},
        {contracted: "So let’s recap briefly", nonContracted: "So let us recap briefly"},
        {contracted: "Thanks and I welcome your thoughts", nonContracted: "Thanks and I welcome your thoughts"},
      ],
    },
  },


*/

/*   Contracted/non-contracted 

  {
    id: "presentation-general",
    context: "professional",
    category: "Presentation",
    function: "General",
    targetPhrases1: {
      category: "Intro",
      phrasesContracted: [
        "I'm glad to be here today",
        "I'm excited to share my thoughts with you",
        "I'm honored to be here",
      ],
      phrasesNonContracted: [
        "I am glad to be here today",
        "I am excited to share my thoughts with you",
        "I am honored to be here",
      ],
    },
    targetPhrases2: {
      category: "Transition",
      phrasesContracted: [
        "Let’s move to the next point",
        "Next I’d like to focus on",
        "Now let's turn our attention to",
      ],
      phrasesNonContracted: [
        "Let us move to the next point",
        "Next I would like to focus on",
        "Now let us turn our attention to",
      ],
    },
  
    targetPhrases3: {
      category: "End",
        phrasesContracted: [
        "Let me summarize our main ideas",
        "So let’s recap briefly",
        "Thanks and I welcome your thoughts",
      ],
      phrasesNonContracted: [
        "Let me summarize our main ideas",
        "So let us recap briefly",
        "Thanks and I welcome your thoughts",
      ],
      
    }
},


*/