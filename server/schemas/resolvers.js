const { Quiz, Lesson, Post } = require('../models');

const resolvers = {
  Query: {
    quizzes: async () => {

      return await Quiz.find();
    },
    quiz: async (parent, { id }) => {

      const foundQuiz = await Quiz.findOne({id: id});

      if (!foundQuiz) {
        throw new Error('Cannot find a quiz with this id!');
      }

      return foundQuiz;
    },
    lessons: async () => {

      return await Lesson.find();
    },
    lesson: async (parent, { id }) => {

      const foundLesson = await Lesson.findOne({ id: id });

      if (!foundLesson) {
        throw new Error('Cannot find a lesson with this id!');
      }

      return foundLesson;
    },
    posts: async () => {

      return await Post.find();
    },
    post: async (parent, { id }) => {

      const foundPost = await Post.findOne({ id: id });

      if (!foundPost) {
        throw new Error('Cannot find a post with this id!');
      }

      return foundPost;
    },
    commentsByPostId: async (parent, { postId }) => {
        return await Comments.find({ postId });
    },
  },
  Mutation: {
    saveQuiz: async (parent, {quizData}) => {
      const { id, title, description, date, questions } = quizData;

      return await Quiz.create({
        id,
        title,
        description,
        date,
        questions
      })
    },
    removeQuiz: async (parent, { id }) => {
      const foundQuiz = await Quiz.findOne({ id: id });

      if (!foundQuiz) {
        throw new Error('Cannot find a quiz with this id!');
      }
      
      const { title, questions, date } = foundQuiz;

      await Quiz.deleteOne({ id });

      return { id, title, description: foundQuiz.description, date, questions };
    },
    saveLesson: async (parent, { lessonData }) => {
      const { id, title, date, sections } = lessonData;

      return await Lesson.create({
        id,
        title,
        date,
        sections
      })
    },
    removeLesson: async (parent, { id }) => {
      const foundLesson = await Lesson.findOne({ id: id });

      if (!foundLesson) {
        throw new Error('Cannot find a lesson with this id!');
      }

      const { title, sections } = foundLesson;

      await Lesson.deleteOne({ id });

      return { id, title, sections };
    },
    savePost: async (parent, { postData }) => {
      const { id, title, text, comments } = postData;

      return await Post.create({
        id,
        title,
        text,
        comments
      })
    },
    removePost: async (parent, { id }) => {
      const foundPost = await Post.findOne({ id: id });

      if (!foundPost) {
        throw new Error('Cannot find a post with this id!');
      }

      const { title, text, comments } = foundPost;

      await Post.deleteOne({ id });

      return { id, title, text, comments };
    },
    addCommentToPost: async (parent, { postId, comment }) => {
      try {
        const post = await Post.findOne({ id: postId });
        if (!post) {
          throw new Error('Post not found');
        }

        const newComment = {
          text: comment.text,
        };

        post.comments.push(newComment);
        await post.save();

        return post;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
