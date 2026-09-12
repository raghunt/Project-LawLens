import { storage } from "../storage";
import { type InsertLaw } from "@shared/schema";

const lawsData: InsertLaw[] = [
  {
    title: "Internal Revenue Code Section 911 - Foreign Earned Income Exclusion",
    description: "Allows qualifying individuals to exclude foreign earned income from US taxation, subject to annual limits and eligibility requirements.",
    country: "United States",
    status: "current",
    category: "Tax Law",
    sourceUrl: "https://www.irs.gov/individuals/international-taxpayers/foreign-earned-income-exclusion"
  },
  {
    title: "Digital Personal Data Protection Act 2023",
    description: "Comprehensive framework for digital personal data protection with obligations for data processors and rights for data principals.",
    country: "India",
    status: "current",
    category: "Technology & Privacy",
    sourceUrl: "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023"
  },
  {
    title: "Remote and Hybrid Work Clarification Act",
    description: "Proposed legislation to clarify tax treatment and worker classification for remote and hybrid work arrangements.",
    country: "United States",
    status: "proposed",
    category: "Employment & Labor",
    sourceUrl: "#"
  },
  {
    title: "Foreign Exchange Management Act (FEMA) - Liberalised Remittance Scheme",
    description: "Framework governing foreign exchange transactions and remittances by Indian residents.",
    country: "India",
    status: "current",
    category: "Tax & Finance",
    sourceUrl: "https://www.rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=10204"
  },
  {
    title: "Inflation Reduction Act - Clean Energy Tax Credits",
    description: "Tax incentives for renewable energy investments, electric vehicles, and energy efficiency improvements.",
    country: "United States",
    status: "current",
    category: "Tax & Finance",
    sourceUrl: "https://www.irs.gov/credits-deductions/credits-for-new-clean-vehicles"
  },
  {
    title: "New Education Policy 2020 - Implementation Framework",
    description: "Comprehensive reform of India's education system with focus on holistic development and skill-based learning.",
    country: "India",
    status: "current",
    category: "Education",
    sourceUrl: "https://www.education.gov.in/nep/about-nep"
  },
  {
    title: "Healthcare Portability and Affordability Act",
    description: "Proposed legislation to improve healthcare coverage portability across state lines and reduce costs.",
    country: "United States",
    status: "proposed",
    category: "Healthcare",
    sourceUrl: "#"
  },
  {
    title: "Startup India Initiative - Tax Benefits",
    description: "Tax exemptions and benefits for recognized startups under the Startup India program.",
    country: "India",
    status: "current",
    category: "Business & Corporate",
    sourceUrl: "https://www.startupindia.gov.in/content/sih/en/tax_benefits.html"
  }
];

export async function initializeLawsData() {
  for (const lawData of lawsData) {
    await storage.createLaw(lawData);
  }
}
