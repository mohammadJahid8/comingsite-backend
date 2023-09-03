import { Schema, model } from 'mongoose';

const blogSchema = new Schema(
  {
    coverTitle: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    coverDescription: {
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
    url: {
      type: String,
    },
    minRead: {
      type: Number,
      required: true,
    },
    conclusion: {
      type: String,
      required: true,
    },
    blogBody: [
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
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Blog = model('Blog', blogSchema);
