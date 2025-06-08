// Knowledge Base for Workplace Janitorial Services
// RAG implementation with authentic company data

export interface KnowledgeItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  priority: number;
}

export const knowledgeBase: KnowledgeItem[] = [
  {
    id: "quality-maintenance",
    category: "quality",
    question: "How do we maintain worksite quality?",
    answer: "Our inspector routinely monitors the cleaning performance of our staff with unannounced visits to your building. Routine feedback on performance corrects issues and reinforces good behavior and habits. Account managers schedule walk-throughs to ensure work is being done to your expectations.",
    keywords: ["quality", "inspector", "monitoring", "performance", "walk-through"],
    priority: 9
  },
  {
    id: "security-measures",
    category: "security",
    question: "What steps are taken to safeguard your building and business security?",
    answer: "All staff pass criminal background checks as a hiring procedure. Our cleaning staff carry 1 set of keys which are coded so your building cannot be identified. A duplicate set of keys is kept in our office in a locked cabinet under video surveillance. Our office is also protected by an alarm and medical keys are used so no unauthorized copies can be made.",
    keywords: ["security", "background check", "keys", "surveillance", "criminal"],
    priority: 10
  },
  {
    id: "building-access",
    category: "access",
    question: "What do you require to access our building after business hours?",
    answer: "We require 2 sets of keys, alarm code, alarm company contact and clearance numbers. One set of keys is carried by our cleaning staff to access your building. Another set of keys is used by our inspector to visit your building as a part of our commitment to maintain high worksite quality standards.",
    keywords: ["access", "keys", "alarm", "after hours", "clearance"],
    priority: 8
  },
  {
    id: "billing-process",
    category: "billing",
    question: "How does your billing work?",
    answer: "For monthly cleaning services, we bill at the beginning of each month. We offer our clients 30 day terms, so the bill is not due to be paid until the end of the month. We also accept credit cards for your convenience. For one time work, we require a 25% payment upon booking. This commitment allows us to dedicate a crew to the booked date.",
    keywords: ["billing", "monthly", "payment", "credit card", "30 day terms"],
    priority: 9
  },
  {
    id: "rates-pricing",
    category: "pricing",
    question: "What are your rates?",
    answer: "Rates depend on the size of the building, the frequency of service and the specific cleaning program offered. We can ball park rates if you have the following information: 1. Size of the building. 2. Frequency of service desired. 3. Specific cleaning program desired.",
    keywords: ["rates", "pricing", "size", "frequency", "program"],
    priority: 10
  },
  {
    id: "washroom-inventory",
    category: "supplies",
    question: "How do you help us manage our washroom supply inventory?",
    answer: "We can replenish your inventory levels of bathroom supplies via our vendor managed inventory program. This means we keep track of toilet paper, paper towels, garbage bags, hand soap etc. and replenish them so you never run out.",
    keywords: ["washroom", "supplies", "inventory", "toilet paper", "soap"],
    priority: 8
  },
  {
    id: "biochem-partnership",
    category: "services",
    question: "How does your partnership with Biochem keep our washrooms fresh?",
    answer: "Our partnership with www.biochemenvironmental.com brings a line of natural products that are very effective in odor control. Touch free feminine hygiene disposal units, sink taps, soap dispenser and urinal flushing units reduce the spreading of diseases by reducing the number of contaminated touch surfaces. Hand sanitizer units kill 99% of bacteria to keep your staffs' and visitors' hands germ free.",
    keywords: ["biochem", "natural", "odor control", "touch free", "sanitizer"],
    priority: 7
  },
  {
    id: "insurance-coverage",
    category: "insurance",
    question: "Do you carry your own insurance?",
    answer: "Yes we do. We carry comprehensive liability insurance and all of our staff are covered by our WCB coverage.",
    keywords: ["insurance", "liability", "WCB", "coverage", "staff"],
    priority: 9
  },
  {
    id: "staff-screening",
    category: "staff",
    question: "How do you screen your staff?",
    answer: "Our staff are key to our success. Over the years we have gained a lot of experience in selecting and hiring the best staff in the industry. Through personal face to face interview process, we select prospects based on character and aptitude. We contact prospects' previous employers and managers and conduct a criminal record check. During our on boarding process, our management team works directly with new staff to ensure they are the right fit for our clientele. We continue monitoring our staff through our QAP.",
    keywords: ["staff", "screening", "interview", "criminal check", "QAP"],
    priority: 8
  },
  {
    id: "getting-started",
    category: "onboarding",
    question: "How do I get started?",
    answer: "Simply click on Contact Us or give us a call. Our onboarding process starts with learning about your needs. We will recommend a Cleaning Program and tweak it to your requirements and provide you with complete satisfaction.",
    keywords: ["getting started", "contact", "onboarding", "program", "satisfaction"],
    priority: 10
  },
  {
    id: "office-cleaning-programs",
    category: "services",
    question: "What are your office cleaning programs?",
    answer: "Our 3-5 Day/Week Office Cleaning Programs provide office cleaning staff at your work site performing the tasks required to achieve desired results. On site guaranteed for a set amount of time - always designed to be 30 minutes more than required to do all the tasks to completion. We adhere to a schedule where some duties will occur more frequently than other duties. Extra time on site means there are opportunities for the office cleaning staff to provide immediate attention towards spills or accidents.",
    keywords: ["office cleaning", "3-5 day", "30 minutes", "schedule", "immediate attention"],
    priority: 10
  },
  {
    id: "supplemental-janitor",
    category: "services",
    question: "What is the supplemental janitor program?",
    answer: "Our Supplemental Office Cleaning Team Program is designed to provide extra capacity to your office cleaning team for: 1. Special projects 2. Extra high seasonal demand 3. Evening work that otherwise require overtime payments to full time staff 4. Replacement of vacationing employees",
    keywords: ["supplemental", "extra capacity", "special projects", "seasonal", "overtime"],
    priority: 7
  },
  {
    id: "supplies-products",
    category: "supplies",
    question: "What supplies do you provide?",
    answer: "Workplace Janitorial provides a full line up of quality supplies to stock your washrooms and kitchenettes. Some of our products include: Paper towels, Toilet paper, Garbage bags, Hand soaps, Urinal screens, Air fresheners. Our partnership with www.biochemenvironmental.com brings a line of natural products that are very effective in odor control.",
    keywords: ["supplies", "paper towels", "toilet paper", "hand soap", "natural products"],
    priority: 8
  },
  {
    id: "contact-info",
    category: "contact",
    question: "How can I contact Workplace Janitorial Services?",
    answer: "Phone General Inquiries: (204) 415-2910. Address: Workplace Janitorial Services, 2-761 Marion Street, Winnipeg Manitoba R2J 0K6. Feel free to talk to our representative at any time using the phone number.",
    keywords: ["contact", "phone", "204-415-2910", "Marion Street", "Winnipeg"],
    priority: 10
  }
];

export class RAGSystem {
  private vectorStore: Map<string, number[]> = new Map();
  
  constructor() {
    this.initializeVectorStore();
  }

  // Simple TF-IDF based similarity for RAG without external dependencies
  private initializeVectorStore(): void {
    knowledgeBase.forEach(item => {
      const vector = this.createVector(item.answer + " " + item.keywords.join(" "));
      this.vectorStore.set(item.id, vector);
    });
  }

  private createVector(text: string): number[] {
    const words = text.toLowerCase().split(/\s+/);
    const wordCounts = new Map<string, number>();
    
    words.forEach(word => {
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    });
    
    // Create a simple vector representation
    const vocab = Array.from(new Set(knowledgeBase.flatMap(item => 
      (item.answer + " " + item.keywords.join(" ")).toLowerCase().split(/\s+/)
    )));
    
    return vocab.map(word => wordCounts.get(word) || 0);
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    
    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
  }

  public retrieveRelevantKnowledge(query: string, limit: number = 3): KnowledgeItem[] {
    const queryVector = this.createVector(query);
    const similarities: Array<{ item: KnowledgeItem; score: number }> = [];
    
    knowledgeBase.forEach(item => {
      const itemVector = this.vectorStore.get(item.id) || [];
      let score = this.cosineSimilarity(queryVector, itemVector);
      
      // Boost score based on keyword matches
      const queryWords = query.toLowerCase().split(/\s+/);
      const keywordMatches = item.keywords.filter(keyword => 
        queryWords.some(word => word.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(word))
      );
      
      score += keywordMatches.length * 0.2;
      score += item.priority * 0.1;
      
      similarities.push({ item, score });
    });
    
    return similarities
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .filter(item => item.score > 0.1)
      .map(item => item.item);
  }

  public getAnswerWithContext(query: string): string {
    const relevantKnowledge = this.retrieveRelevantKnowledge(query, 2);
    
    if (relevantKnowledge.length === 0) {
      return "";
    }
    
    // Return the most relevant answer
    return relevantKnowledge[0].answer;
  }

  public searchByCategory(category: string): KnowledgeItem[] {
    return knowledgeBase.filter(item => item.category === category);
  }
}

export const ragSystem = new RAGSystem();