export type TourReview = {
  id: string;
  title: string;
  quote: string;
  author: string;
  /** 1–5 */
  rating: number;
};

export type TourReviewsContent = {
  headline: string;
  /** Optional smaller uppercase line (e.g. on home next to about). */
  eyebrow?: string;
  tripAdvisorHref: string;
  ctaLabel: string;
  ctaHref: string;
  reviews: TourReview[];
};
