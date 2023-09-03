import { Schema, model } from 'mongoose';

const portfolioSchema = new Schema(
  {
    coverTitle: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    coverSubtitle: {
      type: String,
      required: true,
    },
    coverDescription: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    conclusion: {
      type: String,
      required: true,
    },
    
    portfolioBody: [
      {
        image: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Portfolio = model('Portfolio', portfolioSchema);
