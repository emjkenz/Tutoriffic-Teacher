const { Quiz, Lesson, Post, commentSchema } = require('../models');

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
      const { id, title, description, dueDate, questions } = quizData;

      return await Quiz.create({
        id,
        title,
        description,
        dueDate,
        questions
      })
    },
    removeQuiz: async (parent, { id }) => {
      const foundQuiz = await Quiz.findOne({ id: id });

      if (!foundQuiz) {
        throw new Error('Cannot find a quiz with this id!');
      }
      
      const { title, questions, dueDate } = foundQuiz;

      await Quiz.deleteOne({ id });

      return { id, title, description: foundQuiz.description, dueDate, questions };
    },
    saveLesson: async (parent, { lessonData }) => {
      const { id, title, sections } = lessonData;

      return await Lesson.create({
        id,
        title,
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
    // saveComment: async (parent, { commentData }) => {
    //   console.log("commentData: ", commentData)
    //   const { id, title, text, postId } = commentData;

    //   return await Comments.create({
    //     id,
    //     title,
    //     text,
    //     postId
    //   })
    // },
    // addCommentToPost: async (parent, { postId, comment }) => {
    //   try {
    //     const post = await Post.findOne({ id: postId });

    //     if (!post) {
    //       throw new Error('Post not found');
    //     }

    //     const newComment = {
    //       text: comment.text,
    //       postId: postId,
    //     };

    //     post.comments.push(newComment);

    //     await post.save();

    //     return post;
    //   } catch (error) {
    //     throw new Error(error.message);
    //   }
    // },
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
